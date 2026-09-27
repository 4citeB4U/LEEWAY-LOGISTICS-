/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: OperationsEventsController.cs
 * Path: src/LeeWay.TransitHub.Api/Controllers/OperationsEventsController.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Controller
 * Purpose: Expose authorized tenant-scoped event query and publish endpoints.
 * Inputs: Authenticated HTTP request, tenant context, query limit, and schema-first request body.
 * Outputs: Tenant-filtered JSON event responses and real-time notifications.
 * Mutation Scope: Delegates event creation to OperationsEventService.
 * Dependencies: ASP.NET Core MVC, authorization policies, and OperationsEventService.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: GET requires operations.read; POST requires operations.publish; tenant ID never comes from body.
 * Database Impact: No direct database access.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using System.Security.Claims;
using LeeWay.TransitHub.Application.Models;
using LeeWay.TransitHub.Application.Security;
using LeeWay.TransitHub.Application.Services;
using LeeWay.TransitHub.Domain.Operations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LeeWay.TransitHub.Api.Controllers;

[ApiController]
[Route("api/operations/events")]
public sealed class OperationsEventsController(OperationsEventService service) : ControllerBase
{
    [HttpGet]
    [Authorize(Policy = TransitPolicies.OperationsRead)]
    public ActionResult<IReadOnlyCollection<OperationsEvent>> GetRecent([FromQuery] int limit = 100) =>
        Ok(service.GetRecent(limit));

    [HttpGet("{id:guid}")]
    [Authorize(Policy = TransitPolicies.OperationsRead)]
    public ActionResult<OperationsEvent> GetById(Guid id)
    {
        OperationsEvent? operationsEvent = service.GetById(id);
        return operationsEvent is null ? NotFound() : Ok(operationsEvent);
    }

    [HttpPost]
    [Authorize(Policy = TransitPolicies.OperationsPublish)]
    public async Task<ActionResult<OperationsEvent>> Publish(
        CreateOperationsEventRequest request,
        CancellationToken cancellationToken)
    {
        string subject = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "unknown-subject";
        OperationsEvent operationsEvent = await service.PublishAsync(request, subject, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = operationsEvent.Id }, operationsEvent);
    }
}
