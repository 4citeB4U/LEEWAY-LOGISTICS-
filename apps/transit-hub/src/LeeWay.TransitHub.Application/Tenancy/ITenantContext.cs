/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: ITenantContext.cs
 * Path: src/LeeWay.TransitHub.Application/Tenancy/ITenantContext.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Tenancy Contract
 * Purpose: Expose the active tenant context without coupling use cases to HTTP.
 * Inputs: Resolved tenant identity.
 * Outputs: Tenant state and immutable snapshot.
 * Mutation Scope: None.
 * Dependencies: TenantContextSnapshot.
 * Tests: Unit, integration, and future authorization tests.
 * Security Impact: Prevents hidden global tenant assumptions.
 * Database Impact: Future repositories consume tenant context for isolation.
 * Sovereign Cycle: Perception -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 2.0.0
 */

namespace LeeWay.TransitHub.Application.Tenancy;

public interface ITenantContext
{
    bool IsResolved { get; }
    Guid TenantId { get; }
    string TenantCode { get; }
    TenantContextSnapshot Snapshot();
}
