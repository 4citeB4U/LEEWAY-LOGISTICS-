/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: VehicleRecord.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/Persistence/VehicleRecord.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / SQL Entity
 * Purpose: Persist one tenant-owned vehicle row without coupling the domain entity to EF Core.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: TenantId is mandatory and participates in indexes and row-level security.
 * Database Impact: Maps to fleet.Vehicles.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 5.0.0
 */

using LeeWay.TransitHub.Domain.Enums;

namespace LeeWay.TransitHub.Infrastructure.SqlServer.Persistence;

public sealed class VehicleRecord
{
    public Guid TenantId { get; set; }
    public Guid Id { get; set; }
    public string FleetNumber { get; set; } = string.Empty;
    public string Manufacturer { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public int ModelYear { get; set; }
    public VehicleStatus Status { get; set; }
    public string? OutOfServiceReason { get; set; }
    public DateTimeOffset CreatedUtc { get; set; }
}
