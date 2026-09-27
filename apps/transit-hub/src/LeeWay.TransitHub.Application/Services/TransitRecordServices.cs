/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TransitRecordServices.cs
 * Path: src/LeeWay.TransitHub.Application/Services/TransitRecordServices.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Services
 * Purpose: Coordinate incidents, customer cases, employee forms, and inspections.
 * Inputs: Use-case values and repository contracts.
 * Outputs: Created entities and query collections.
 * Mutation Scope: Adds records through repository contracts.
 * Dependencies: Application abstractions and Domain entities.
 * Tests: Integration and regression tests.
 * Security Impact: Entity constructors validate required values.
 * Database Impact: Repository implementations determine persistence.
 * Sovereign Cycle: Perception -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Application.Abstractions;
using LeeWay.TransitHub.Domain.Entities;
using LeeWay.TransitHub.Domain.Enums;

namespace LeeWay.TransitHub.Application.Services;

public sealed class IncidentService(IIncidentRepository repository)
{
    public IReadOnlyCollection<ServiceIncident> GetAll() => repository.GetAll();
    public ServiceIncident Create(string route, string summary, IncidentSeverity severity)
    {
        var incident = new ServiceIncident(Guid.NewGuid(), route, summary, severity);
        repository.Add(incident);
        return incident;
    }
}

public sealed class CustomerCaseService(ICustomerCaseRepository repository)
{
    public IReadOnlyCollection<CustomerCase> GetAll() => repository.GetAll();
    public CustomerCase Create(string referenceNumber, string subject, string channel)
    {
        var customerCase = new CustomerCase(Guid.NewGuid(), referenceNumber, subject, channel);
        repository.Add(customerCase);
        return customerCase;
    }
}

public sealed class EmployeeFormService(IEmployeeFormRepository repository)
{
    public IReadOnlyCollection<EmployeeForm> GetAll() => repository.GetAll();
    public EmployeeForm Create(string employeeNumber, string formType, string details)
    {
        var form = new EmployeeForm(Guid.NewGuid(), employeeNumber, formType, details);
        repository.Add(form);
        return form;
    }
}

public sealed class InspectionService(IInspectionRepository repository)
{
    public IReadOnlyCollection<VehicleInspection> GetAll() => repository.GetAll();
    public VehicleInspection Create(Guid vehicleId, string inspector, InspectionResult result, string notes)
    {
        var inspection = new VehicleInspection(Guid.NewGuid(), vehicleId, inspector, result, notes);
        repository.Add(inspection);
        return inspection;
    }
}
