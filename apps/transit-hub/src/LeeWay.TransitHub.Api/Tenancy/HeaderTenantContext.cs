/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: HeaderTenantContext.cs
 * Path: src/LeeWay.TransitHub.Api/Tenancy/HeaderTenantContext.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Tenancy Context
 * Purpose: Hold one scoped HTTP request tenant context.
 * Inputs: Validated tenant ID and code from boundary middleware.
 * Outputs: Resolved context and immutable snapshot.
 * Mutation Scope: Scoped request state only.
 * Dependencies: ITenantContext and TenantContextSnapshot.
 * Tests: Runtime tenant-context checks and future authorization tests.
 * Security Impact: Prevents static or cross-request tenant state.
 * Database Impact: Future repositories consume the resolved tenant identity.
 * Sovereign Cycle: Perception -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 2.0.0
 */

using LeeWay.TransitHub.Application.Tenancy;

namespace LeeWay.TransitHub.Api.Tenancy;

public sealed class HeaderTenantContext : ITenantContext
{
    public bool IsResolved { get; private set; }
    public Guid TenantId { get; private set; }
    public string TenantCode { get; private set; } = string.Empty;

    public void Resolve(Guid tenantId, string tenantCode)
    {
        if (IsResolved) throw new InvalidOperationException("Tenant context is already resolved for this request.");
        if (tenantId == Guid.Empty) throw new ArgumentException("Tenant ID cannot be empty.", nameof(tenantId));
        if (string.IsNullOrWhiteSpace(tenantCode)) throw new ArgumentException("Tenant code is required.", nameof(tenantCode));

        TenantId = tenantId;
        TenantCode = tenantCode.Trim().ToUpperInvariant();
        IsResolved = true;
    }

    public TenantContextSnapshot Snapshot() => new(IsResolved, TenantId, TenantCode);
}
