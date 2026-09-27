/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: SqlServerVehicleRepository.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/Repositories/SqlServerVehicleRepository.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / SQL Repository
 * Purpose: Implement IVehicleRepository with EF Core, automatic query filtering, database RLS, and tenant-scoped uniqueness.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: Requires resolved tenant context for every operation and never calls IgnoreQueryFilters.
 * Database Impact: Reads and writes fleet.Vehicles.
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

public sealed class SqlServerVehicleRepository(
    TransitHubDbContext database,
    ITenantContext tenantContext) : IVehicleRepository
{
    public IReadOnlyCollection<Vehicle> GetAll()
    {
        RequireTenant();
        return database.Vehicles.AsNoTracking()
            .OrderBy(record => record.FleetNumber)
            .AsEnumerable()
            .Select(record => ToDomain(record))
            .ToArray();
    }

    public Vehicle? GetById(Guid id)
    {
        RequireTenant();
        VehicleRecord? record = database.Vehicles.AsNoTracking().SingleOrDefault(candidate => candidate.Id == id);
        return record is null ? null : ToDomain(record);
    }

    public void Add(Vehicle vehicle)
    {
        ArgumentNullException.ThrowIfNull(vehicle);
        RequireTenant();
        database.Vehicles.Add(new VehicleRecord
        {
            TenantId = tenantContext.TenantId,
            Id = vehicle.Id,
            FleetNumber = vehicle.FleetNumber,
            Manufacturer = vehicle.Manufacturer,
            Model = vehicle.Model,
            ModelYear = vehicle.ModelYear,
            Status = vehicle.Status,
            OutOfServiceReason = vehicle.OutOfServiceReason,
            CreatedUtc = vehicle.CreatedUtc
        });
        database.SaveChanges();
    }

    private void RequireTenant()
    {
        if (!tenantContext.IsResolved || tenantContext.TenantId == Guid.Empty)
        {
            throw new InvalidOperationException("A resolved tenant context is required for SQL Server vehicle access.");
        }
    }

    private static Vehicle ToDomain(VehicleRecord record)
    {
        Vehicle vehicle = new(record.Id, record.FleetNumber, record.Manufacturer, record.Model, record.ModelYear);
        if (record.Status == VehicleStatus.OutOfService)
        {
            vehicle.PlaceOutOfService(record.OutOfServiceReason ?? "Persisted out-of-service state");
        }
        return vehicle;
    }
}
