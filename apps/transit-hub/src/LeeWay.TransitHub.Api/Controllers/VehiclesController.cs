/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: VehiclesController.cs
 * Path: src/LeeWay.TransitHub.Api/Controllers/VehiclesController.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Controller
 * Purpose: Expose governed HTTP operations implemented by VehiclesController.
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

using LeeWay.TransitHub.Application.Services;
using LeeWay.TransitHub.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LeeWay.TransitHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class VehiclesController(VehicleService service) : ControllerBase
{
    [HttpGet]
    public ActionResult<IReadOnlyCollection<Vehicle>> GetAll() => Ok(service.GetAll());

    [HttpGet("{id:guid}")]
    public ActionResult<Vehicle> GetById(Guid id)
    {
        Vehicle? vehicle = service.GetById(id);
        return vehicle is null ? NotFound() : Ok(vehicle);
    }

    [HttpPost]
    public ActionResult<Vehicle> Create(CreateVehicleRequest request)
    {
        Vehicle vehicle = service.Create(request.FleetNumber, request.Manufacturer, request.Model, request.ModelYear);
        return CreatedAtAction(nameof(GetById), new { id = vehicle.Id }, vehicle);
    }
}

public sealed record CreateVehicleRequest(string FleetNumber, string Manufacturer, string Model, int ModelYear);
