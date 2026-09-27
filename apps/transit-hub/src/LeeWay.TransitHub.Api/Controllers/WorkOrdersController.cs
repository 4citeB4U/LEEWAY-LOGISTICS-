/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: WorkOrdersController.cs
 * Path: src/LeeWay.TransitHub.Api/Controllers/WorkOrdersController.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Controller
 * Purpose: Expose governed HTTP operations implemented by WorkOrdersController.
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
using LeeWay.TransitHub.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LeeWay.TransitHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class WorkOrdersController(WorkOrderService service) : ControllerBase
{
    [HttpGet]
    public ActionResult<IReadOnlyCollection<WorkOrder>> GetAll() => Ok(service.GetAll());

    [HttpPost]
    public ActionResult<WorkOrder> Create(CreateWorkOrderRequest request)
    {
        WorkOrder workOrder = service.Create(request);
        return Created($"/api/workorders/{workOrder.Id}", workOrder);
    }
}
