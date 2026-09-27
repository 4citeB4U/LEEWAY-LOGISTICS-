/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: OperationsController.cs
 * Path: src/LeeWay.TransitHub.Api/Controllers/OperationsController.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Controller
 * Purpose: Expose governed HTTP operations implemented by OperationsController.
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
using LeeWay.TransitHub.Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace LeeWay.TransitHub.Api.Controllers;

[ApiController]
[Route("api/incidents")]
public sealed class IncidentsController(IncidentService service) : ControllerBase
{
    [HttpGet] public ActionResult<IReadOnlyCollection<ServiceIncident>> GetAll() => Ok(service.GetAll());
    [HttpPost] public ActionResult<ServiceIncident> Create(CreateIncidentRequest request) => Ok(service.Create(request.Route, request.Summary, request.Severity));
}

[ApiController]
[Route("api/customer-cases")]
public sealed class CustomerCasesController(CustomerCaseService service) : ControllerBase
{
    [HttpGet] public ActionResult<IReadOnlyCollection<CustomerCase>> GetAll() => Ok(service.GetAll());
    [HttpPost] public ActionResult<CustomerCase> Create(CreateCustomerCaseRequest request) => Ok(service.Create(request.ReferenceNumber, request.Subject, request.Channel));
}

[ApiController]
[Route("api/employee-forms")]
public sealed class EmployeeFormsController(EmployeeFormService service) : ControllerBase
{
    [HttpGet] public ActionResult<IReadOnlyCollection<EmployeeForm>> GetAll() => Ok(service.GetAll());
    [HttpPost] public ActionResult<EmployeeForm> Create(CreateEmployeeFormRequest request) => Ok(service.Create(request.EmployeeNumber, request.FormType, request.Details));
}

[ApiController]
[Route("api/inspections")]
public sealed class InspectionsController(InspectionService service) : ControllerBase
{
    [HttpGet] public ActionResult<IReadOnlyCollection<VehicleInspection>> GetAll() => Ok(service.GetAll());
    [HttpPost] public ActionResult<VehicleInspection> Create(CreateInspectionRequest request) => Ok(service.Create(request.VehicleId, request.Inspector, request.Result, request.Notes));
}

public sealed record CreateIncidentRequest(string Route, string Summary, IncidentSeverity Severity);
public sealed record CreateCustomerCaseRequest(string ReferenceNumber, string Subject, string Channel);
public sealed record CreateEmployeeFormRequest(string EmployeeNumber, string FormType, string Details);
public sealed record CreateInspectionRequest(Guid VehicleId, string Inspector, InspectionResult Result, string Notes);
