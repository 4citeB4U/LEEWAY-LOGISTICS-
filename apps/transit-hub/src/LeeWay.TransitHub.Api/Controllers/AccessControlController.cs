/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: AccessControlController.cs
 * Path: src/LeeWay.TransitHub.Api/Controllers/AccessControlController.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Security Evidence Controller
 * Purpose: Expose read-only secured endpoints that prove authentication, role permissions, tenant matching, and Agent Lee service capability checks.
 * Inputs: Authenticated requests, authorization policies, and claims.
 * Outputs: Minimal identity and authorization evidence responses.
 * Mutation Scope: Read-only.
 * Dependencies: TransitPolicies, ASP.NET Core authorization, and ClaimsPrincipal.
 * Tests: Runtime 401, 403, same-tenant, cross-tenant, fleet-manager, viewer, and AgentService checks.
 * Security Impact: Returns only non-secret evidence and never replaces production identity or resource-level database enforcement.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 4.0.0
 */

using System.Security.Claims;
using LeeWay.TransitHub.Application.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LeeWay.TransitHub.Api.Controllers;

[ApiController]
[Route("api/security")]
public sealed class AccessControlController : ControllerBase
{
    [HttpGet("whoami")]
    [Authorize(Policy = TransitPolicies.Authenticated)]
    public IActionResult WhoAmI() => Ok(new
    {
        authenticated = User.Identity?.IsAuthenticated == true,
        subject = User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
        name = User.Identity?.Name,
        roles = User.FindAll(ClaimTypes.Role).Select(claim => claim.Value).Distinct().Order().ToArray(),
        tenantId = User.FindFirst(TransitClaimTypes.TenantId)?.Value,
        tenantCode = User.FindFirst(TransitClaimTypes.TenantCode)?.Value,
        authenticationType = User.Identity?.AuthenticationType,
        productionIdentityBound = false,
        evidenceMode = "DEVELOPMENT_ONLY_HEADER_AUTHENTICATION"
    });

    [HttpGet("tenant-member")]
    [Authorize(Policy = TransitPolicies.TenantMember)]
    public IActionResult TenantMember() => Ok(new { authorized = true, policy = TransitPolicies.TenantMember });

    [HttpGet("fleet-read")]
    [Authorize(Policy = TransitPolicies.FleetRead)]
    public IActionResult FleetRead() => Ok(new { authorized = true, policy = TransitPolicies.FleetRead });

    [HttpGet("fleet-manage")]
    [Authorize(Policy = TransitPolicies.FleetManage)]
    public IActionResult FleetManage() => Ok(new { authorized = true, policy = TransitPolicies.FleetManage });

    [HttpGet("agent-tool")]
    [Authorize(Policy = TransitPolicies.AgentToolExecute)]
    public IActionResult AgentTool() => Ok(new
    {
        authorized = true,
        policy = TransitPolicies.AgentToolExecute,
        capability = "leeway.enterprise-transit-hub",
        agentLeeEmbedded = false
    });
}
