/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TenantAccessAuthorizationHandler.cs
 * Path: src/LeeWay.TransitHub.Api/Security/TenantAccessAuthorizationHandler.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Authorization Handler
 * Purpose: Authorize only when the authenticated tenant claims equal the already-resolved request tenant context.
 * Inputs: ClaimsPrincipal, TenantAccessRequirement, and scoped ITenantContext.
 * Outputs: Succeeded or failed authorization requirement.
 * Mutation Scope: Read-only request evaluation.
 * Dependencies: ITenantContext, TransitClaimTypes, and ASP.NET Core authorization.
 * Tests: Runtime same-tenant and cross-tenant denial checks.
 * Security Impact: Prevents authenticated identities from crossing tenant boundaries by header or route manipulation.
 * Database Impact: No direct access; later repositories add independent enforcement.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 4.0.0
 */

using LeeWay.TransitHub.Application.Security;
using LeeWay.TransitHub.Application.Tenancy;
using Microsoft.AspNetCore.Authorization;

namespace LeeWay.TransitHub.Api.Security;

public sealed class TenantAccessAuthorizationHandler : AuthorizationHandler<TenantAccessRequirement>
{
    private readonly ITenantContext _tenantContext;

    public TenantAccessAuthorizationHandler(ITenantContext tenantContext)
    {
        _tenantContext = tenantContext ?? throw new ArgumentNullException(nameof(tenantContext));
    }

    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        TenantAccessRequirement requirement)
    {
        if (!_tenantContext.IsResolved)
        {
            return Task.CompletedTask;
        }

        string? tenantIdText = context.User.FindFirst(TransitClaimTypes.TenantId)?.Value;
        string? tenantCode = context.User.FindFirst(TransitClaimTypes.TenantCode)?.Value;

        if (Guid.TryParse(tenantIdText, out Guid identityTenantId) &&
            identityTenantId == _tenantContext.TenantId &&
            string.Equals(tenantCode, _tenantContext.TenantCode, StringComparison.OrdinalIgnoreCase))
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}
