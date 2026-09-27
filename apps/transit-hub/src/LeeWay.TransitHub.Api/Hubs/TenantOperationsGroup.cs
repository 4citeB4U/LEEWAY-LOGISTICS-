/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TenantOperationsGroup.cs
 * Path: src/LeeWay.TransitHub.Api/Hubs/TenantOperationsGroup.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Realtime Contract
 * Purpose: Create a deterministic SignalR group name for one tenant without exposing the tenant code.
 * Inputs: Non-empty tenant GUID.
 * Outputs: Stable tenant group name.
 * Mutation Scope: None.
 * Dependencies: ASP.NET Core SignalR group naming.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Uses tenant GUID and fails on empty identity.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

namespace LeeWay.TransitHub.Api.Hubs;

public static class TenantOperationsGroup
{
    public static string For(Guid tenantId)
    {
        if (tenantId == Guid.Empty) throw new ArgumentException("Tenant ID cannot be empty.", nameof(tenantId));
        return $"tenant:{tenantId:N}:operations";
    }
}
