/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: InMemoryTransitStore.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.InMemory/Storage/InMemoryTransitStore.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / In-Memory Store
 * Purpose: Hold deterministic fictional training data before databases are enabled.
 * Inputs: Repository operations.
 * Outputs: Process-local collections.
 * Mutation Scope: Process-local collections only.
 * Dependencies: Domain entities and governance receipts.
 * Tests: Integration and regression tests.
 * Security Impact: Fictional data only.
 * Database Impact: No database connection.
 * Sovereign Cycle: Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Domain.Entities;
using LeeWay.TransitHub.Domain.Enums;
using LeeWay.TransitHub.Governance.Receipts;
using LeeWay.TransitHub.Domain.Operations;

namespace LeeWay.TransitHub.Infrastructure.InMemory.Storage;

public sealed class InMemoryTransitStore
{
    public object SyncRoot { get; } = new();
    public Dictionary<Guid, Vehicle> Vehicles { get; } = new();
    public Dictionary<Guid, WorkOrder> WorkOrders { get; } = new();
    public List<ServiceIncident> Incidents { get; } = new();
    public List<CustomerCase> CustomerCases { get; } = new();
    public List<EmployeeForm> EmployeeForms { get; } = new();
    public List<VehicleInspection> Inspections { get; } = new();
    public List<LeeWayExecutionReceipt> Receipts { get; } = new();
    public Dictionary<Guid, OperationsEvent> OperationsEvents { get; } = new();

    public InMemoryTransitStore()
    {
        var vehicle = new Vehicle(Guid.Parse("3d4f9670-7987-4c6c-8ed5-bc83762f8b41"), "LW-1001", "New Flyer", "Xcelsior CHARGE NG", 2025);
        Vehicles[vehicle.Id] = vehicle;
        WorkOrders[Guid.Parse("c0f6ae09-9fef-4a7c-8348-e76cfed6ef20")] = new WorkOrder(Guid.Parse("c0f6ae09-9fef-4a7c-8348-e76cfed6ef20"), vehicle.Id, "Brake inspection", "Inspect front brake assembly.", 2);
        Incidents.Add(new ServiceIncident(Guid.Parse("0d2027c4-26f8-46ef-9c83-85cad8aa6542"), "GreenLine", "Training delay record", IncidentSeverity.Moderate));
        CustomerCases.Add(new CustomerCase(Guid.Parse("d7e61c3b-3b22-48a8-bb68-1bcb63f912df"), "CASE-1001", "Training accessibility request", "Web"));
        EmployeeForms.Add(new EmployeeForm(Guid.Parse("a71413f7-1b49-43e8-bde7-a6b667cfbb32"), "EMP-1001", "Safety Acknowledgment", "Training-only record."));
        Inspections.Add(new VehicleInspection(Guid.Parse("a23c965c-eccb-4b75-a8f7-1f70dffdd764"), vehicle.Id, "Inspector One", InspectionResult.Pass, "Training inspection passed."));
    }
}
