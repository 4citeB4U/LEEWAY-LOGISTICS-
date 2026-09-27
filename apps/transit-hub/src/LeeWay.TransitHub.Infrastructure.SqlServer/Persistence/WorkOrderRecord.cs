/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: WorkOrderRecord.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/Persistence/WorkOrderRecord.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / SQL Entity
 * Purpose: Persist one tenant-owned maintenance work-order row.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: TenantId and the tenant-aware vehicle foreign key prevent cross-tenant relationships.
 * Database Impact: Maps to maintenance.WorkOrders.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 5.0.0
 */

using LeeWay.TransitHub.Domain.Enums;

namespace LeeWay.TransitHub.Infrastructure.SqlServer.Persistence;

public sealed class WorkOrderRecord
{
    public Guid TenantId { get; set; }
    public Guid Id { get; set; }
    public Guid VehicleId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Priority { get; set; }
    public WorkOrderStatus Status { get; set; }
    public string? AssignedTechnician { get; set; }
    public DateTimeOffset CreatedUtc { get; set; }
    public DateTimeOffset? CompletedUtc { get; set; }
}
