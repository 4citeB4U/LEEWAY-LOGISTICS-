/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: SqlServerOperationsEventRepository.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/Repositories/SqlServerOperationsEventRepository.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / SQL Repository
 * Purpose: Persist and query immutable tenant-scoped operations events through EF Core and SQL Server RLS.
 * Inputs: Resolved tenant context and operations event entities.
 * Outputs: Tenant-filtered event collections and persisted rows.
 * Mutation Scope: Inserts operations.OperationsEvents rows only.
 * Dependencies: TransitHubDbContext, ITenantContext, EF Core, and operations domain.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Requires resolved tenant and never bypasses global query filters.
 * Database Impact: Reads and inserts operations.OperationsEvents.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Application.Abstractions;
using LeeWay.TransitHub.Application.Tenancy;
using LeeWay.TransitHub.Domain.Operations;
using LeeWay.TransitHub.Infrastructure.SqlServer.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LeeWay.TransitHub.Infrastructure.SqlServer.Repositories;

public sealed class SqlServerOperationsEventRepository(
    TransitHubDbContext database,
    ITenantContext tenantContext) : IOperationsEventRepository
{
    public IReadOnlyCollection<OperationsEvent> GetRecent(int limit)
    {
        RequireTenant();
        return database.OperationsEvents.AsNoTracking()
            .OrderByDescending(record => record.OccurredUtc)
            .Take(limit)
            .AsEnumerable()
            .Select(ToDomain)
            .ToArray();
    }

    public OperationsEvent? GetById(Guid id)
    {
        RequireTenant();
        OperationsEventRecord? record = database.OperationsEvents.AsNoTracking()
            .SingleOrDefault(candidate => candidate.Id == id);
        return record is null ? null : ToDomain(record);
    }

    public void Add(OperationsEvent operationsEvent)
    {
        ArgumentNullException.ThrowIfNull(operationsEvent);
        RequireTenant();
        if (operationsEvent.TenantId != tenantContext.TenantId)
        {
            throw new InvalidOperationException("Operations event tenant does not match the active tenant context.");
        }
        database.OperationsEvents.Add(new OperationsEventRecord
        {
            TenantId = operationsEvent.TenantId,
            Id = operationsEvent.Id,
            Type = operationsEvent.Type,
            Severity = operationsEvent.Severity,
            Subject = operationsEvent.Subject,
            PayloadJson = operationsEvent.PayloadJson,
            CreatedBySubject = operationsEvent.CreatedBySubject,
            OccurredUtc = operationsEvent.OccurredUtc
        });
        database.SaveChanges();
    }

    private void RequireTenant()
    {
        if (!tenantContext.IsResolved || tenantContext.TenantId == Guid.Empty)
        {
            throw new InvalidOperationException("A resolved tenant context is required for SQL Server operations-event access.");
        }
    }

    private static OperationsEvent ToDomain(OperationsEventRecord record) => new(
        record.TenantId,
        record.Id,
        record.Type,
        record.Severity,
        record.Subject,
        record.PayloadJson,
        record.CreatedBySubject,
        record.OccurredUtc);
}
