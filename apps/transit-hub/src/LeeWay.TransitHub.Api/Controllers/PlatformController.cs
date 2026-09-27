/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: PlatformController.cs
 * Path: src/LeeWay.TransitHub.Api/Controllers/PlatformController.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Controller
 * Purpose: Expose deterministic product identity and current tenant-context state.
 * Inputs: HTTP GET requests and injected product and tenant services.
 * Outputs: Product-profile and tenant-context JSON.
 * Mutation Scope: Read-only.
 * Dependencies: TransitHubProductProfileService and ITenantContext.
 * Tests: Runtime endpoint checks and future integration tests.
 * Security Impact: Discloses current boundaries without exposing secrets.
 * Database Impact: No direct database access.
 * Sovereign Cycle: Perception -> Structure -> Execution -> Veritas -> Synthesis
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 2.0.0
 */

using LeeWay.TransitHub.Application.Product;
using LeeWay.TransitHub.Application.Tenancy;
using Microsoft.AspNetCore.Mvc;

namespace LeeWay.TransitHub.Api.Controllers;

[ApiController]
[Route("api/platform")]
public sealed class PlatformController : ControllerBase
{
    private readonly TransitHubProductProfileService _profiles;
    private readonly ITenantContext _tenantContext;

    public PlatformController(TransitHubProductProfileService profiles, ITenantContext tenantContext)
    {
        _profiles = profiles ?? throw new ArgumentNullException(nameof(profiles));
        _tenantContext = tenantContext ?? throw new ArgumentNullException(nameof(tenantContext));
    }

    [HttpGet("profile")]
    public ActionResult<TransitHubProductProfile> GetProfile() => Ok(_profiles.GetProfile());

    [HttpGet("tenant-context")]
    public ActionResult<TenantContextSnapshot> GetTenantContext() => Ok(_tenantContext.Snapshot());
}
