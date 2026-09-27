/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: DashboardService.cs
 * Path: src/LeeWay.TransitHub.Application/Services/DashboardService.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Service
 * Purpose: Synthesize operational counts for the browser dashboard.
 * Inputs: All repository collections.
 * Outputs: DashboardSummary.
 * Mutation Scope: Read-only.
 * Dependencies: Repository abstractions and domain statuses.
 * Tests: Integration tests.
 * Security Impact: Returns aggregate counts only.
 * Database Impact: Later replaced by optimized SQL queries.
 * Sovereign Cycle: Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Application.Abstractions;
using LeeWay.TransitHub.Application.Models;
using LeeWay.TransitHub.Domain.Enums;

namespace LeeWay.TransitHub.Application.Services;

public sealed class DashboardService(
    IVehicleRepository vehicles,
    IWorkOrderRepository workOrders,
    IIncidentRepository incidents,
    ICustomerCaseRepository customerCases,
    IEmployeeFormRepository employeeForms,
    IInspectionRepository inspections)
{
    public DashboardSummary GetSummary()
    {
        var vehicleItems = vehicles.GetAll();
        var workOrderItems = workOrders.GetAll();
        var formItems = employeeForms.GetAll();
        return new DashboardSummary(
            vehicleItems.Count,
            vehicleItems.Count(x => x.Status == VehicleStatus.OutOfService),
            workOrderItems.Count(x => x.Status is not WorkOrderStatus.Completed and not WorkOrderStatus.Cancelled),
            incidents.GetAll().Count,
            customerCases.GetAll().Count,
            formItems.Count(x => x.Status is FormStatus.Draft or FormStatus.Submitted),
            inspections.GetAll().Count);
    }
}
