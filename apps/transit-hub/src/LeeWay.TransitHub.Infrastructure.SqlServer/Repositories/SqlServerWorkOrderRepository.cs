/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: SqlServerWorkOrderRepository.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/Repositories/SqlServerWorkOrderRepository.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / SQL Repository
 * Purpose: Implement IWorkOrderRepository with tenant-scoped EF Core persistence.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: Requires resolved tenant context and tenant-aware vehicle foreign keys.
 * Database Impact: Reads and writes maintenance.WorkOrders.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 5.0.0
 */

using LeeWay.TransitHub.Application.Abstractions;
using LeeWay.TransitHub.Application.Tenancy;
using LeeWay.TransitHub.Domain.Entities;
using LeeWay.TransitHub.Domain.Enums;
using LeeWay.TransitHub.Infrastructure.SqlServer.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LeeWay.TransitHub.Infrastructure.SqlServer.Repositories;

public sealed class SqlServerWorkOrderRepository(
    TransitHubDbContext database,
    ITenantContext tenantContext) : IWorkOrderRepository
{
    public IReadOnlyCollection<WorkOrder> GetAll()
    {
        RequireTenant();
        return database.WorkOrders.AsNoTracking()
            .OrderByDescending(record => record.CreatedUtc)
            .AsEnumerable()
            .Select(record => ToDomain(record))
            .ToArray();
    }

    public WorkOrder? GetById(Guid id)
    {
        RequireTenant();
        WorkOrderRecord? record = database.WorkOrders.AsNoTracking().SingleOrDefault(candidate => candidate.Id == id);
        return record is null ? null : ToDomain(record);
    }

    public void Add(WorkOrder workOrder)
    {
        ArgumentNullException.ThrowIfNull(workOrder);
        RequireTenant();
        database.WorkOrders.Add(new WorkOrderRecord
        {
            TenantId = tenantContext.TenantId,
            Id = workOrder.Id,
            VehicleId = workOrder.VehicleId,
            Title = workOrder.Title,
            Description = workOrder.Description,
            Priority = workOrder.Priority,
            Status = workOrder.Status,
            AssignedTechnician = workOrder.AssignedTechnician,
            CreatedUtc = workOrder.CreatedUtc,
            CompletedUtc = workOrder.CompletedUtc
        });
        database.SaveChanges();
    }

    private void RequireTenant()
    {
        if (!tenantContext.IsResolved || tenantContext.TenantId == Guid.Empty)
        {
            throw new InvalidOperationException("A resolved tenant context is required for SQL Server work-order access.");
        }
    }

    private static WorkOrder ToDomain(WorkOrderRecord record)
    {
        WorkOrder workOrder = new(record.Id, record.VehicleId, record.Title, record.Description, record.Priority);
        if (!string.IsNullOrWhiteSpace(record.AssignedTechnician)) workOrder.Assign(record.AssignedTechnician);
        if (record.Status is WorkOrderStatus.InProgress or WorkOrderStatus.Completed) workOrder.Start();
        if (record.Status == WorkOrderStatus.Completed) workOrder.Complete();
        return workOrder;
    }
}
