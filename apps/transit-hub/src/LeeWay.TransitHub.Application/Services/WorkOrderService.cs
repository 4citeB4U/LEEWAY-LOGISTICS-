/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: WorkOrderService.cs
 * Path: src/LeeWay.TransitHub.Application/Services/WorkOrderService.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Service
 * Purpose: Coordinate governed maintenance work-order use cases.
 * Inputs: Work-order requests and repository contracts.
 * Outputs: WorkOrder entities and receipts.
 * Mutation Scope: Adds work orders through repository contract.
 * Dependencies: Work-order, vehicle, and receipt contracts.
 * Tests: WorkOrder and integration tests.
 * Security Impact: Rejects requests for unknown vehicles.
 * Database Impact: Repository implementation determines persistence.
 * Sovereign Cycle: Perception -> Structure -> Execution -> Veritas -> Echo
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Application.Abstractions;
using LeeWay.TransitHub.Application.Models;
using LeeWay.TransitHub.Domain.Entities;
using LeeWay.TransitHub.Governance.Receipts;
using LeeWay.TransitHub.Governance.Stages;

namespace LeeWay.TransitHub.Application.Services;

public sealed class WorkOrderService
{
    private readonly IWorkOrderRepository _workOrders;
    private readonly IVehicleRepository _vehicles;
    private readonly IReceiptWriter _receipts;

    public WorkOrderService(IWorkOrderRepository workOrders, IVehicleRepository vehicles, IReceiptWriter receipts)
    {
        _workOrders = workOrders ?? throw new ArgumentNullException(nameof(workOrders));
        _vehicles = vehicles ?? throw new ArgumentNullException(nameof(vehicles));
        _receipts = receipts ?? throw new ArgumentNullException(nameof(receipts));
    }

    public IReadOnlyCollection<WorkOrder> GetAll() => _workOrders.GetAll();

    public WorkOrder Create(CreateWorkOrderRequest request)
    {
        ArgumentNullException.ThrowIfNull(request);
        if (_vehicles.GetById(request.VehicleId) is null) throw new KeyNotFoundException("Vehicle was not found.");
        var workOrder = new WorkOrder(Guid.NewGuid(), request.VehicleId, request.Title, request.Description, request.Priority);
        _workOrders.Add(workOrder);
        _receipts.Write(ReceiptFactory.Pass($"Create work order {workOrder.Id}", SovereignStage.Veritas, request.VehicleId.ToString()));
        return workOrder;
    }
}
