/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: DashboardController.cs
 * Path: src/LeeWay.TransitHub.Api/Controllers/DashboardController.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Controller
 * Purpose: Expose governed HTTP operations implemented by DashboardController.
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

using LeeWay.TransitHub.Application.Models;
using LeeWay.TransitHub.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace LeeWay.TransitHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class DashboardController(DashboardService service) : ControllerBase
{
    [HttpGet]
    public ActionResult<DashboardSummary> Get() => Ok(service.GetSummary());
}
