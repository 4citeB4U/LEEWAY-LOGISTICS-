/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: HealthController.cs
 * Path: src/LeeWay.TransitHub.Api/Controllers/HealthController.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Controller
 * Purpose: Expose governed HTTP operations implemented by HealthController.
 * Inputs: HTTP route, body, and query values.
 * Outputs: HTTP status and JSON response.
 * Mutation Scope: Delegates mutations to application services only.
 * Dependencies: ASP.NET Core MVC and application services.
 * Tests: Build, integration tests, and manual endpoint checks.
 * Security Impact: Authentication is deferred; training data only.
 * Database Impact: No direct database access.
 * Sovereign Cycle: Perception -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using Microsoft.AspNetCore.Mvc;

namespace LeeWay.TransitHub.Api.Controllers;

[ApiController]
[Route("health")]
public sealed class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new { status = "Healthy", utc = DateTimeOffset.UtcNow });
}
