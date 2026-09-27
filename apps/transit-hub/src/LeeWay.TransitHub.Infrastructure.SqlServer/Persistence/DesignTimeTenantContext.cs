/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: DesignTimeTenantContext.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/Persistence/DesignTimeTenantContext.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / Design-Time Support
 * Purpose: Provide an unresolved tenant context only for EF Core design-time model and migration construction.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: Never authorizes runtime data access.
 * Database Impact: No database access by itself.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 5.0.0
 */

using LeeWay.TransitHub.Application.Tenancy;

namespace LeeWay.TransitHub.Infrastructure.SqlServer.Persistence;

internal sealed class DesignTimeTenantContext : ITenantContext
{
    public bool IsResolved => false;
    public Guid TenantId => Guid.Empty;
    public string TenantCode => string.Empty;
    public TenantContextSnapshot Snapshot() => new(false, Guid.Empty, string.Empty);
}
