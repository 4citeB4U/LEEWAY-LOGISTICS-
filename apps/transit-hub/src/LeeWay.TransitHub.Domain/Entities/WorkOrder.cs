/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: WorkOrder.cs
 * Path: src/LeeWay.TransitHub.Domain/Entities/WorkOrder.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Entity
 * Purpose: Represent and protect a maintenance work-order lifecycle.
 * Inputs: Vehicle, maintenance details, priority, and lifecycle commands.
 * Outputs: Valid WorkOrder state or validation exception.
 * Mutation Scope: Assignment, status, and completion timestamp through methods only.
 * Dependencies: WorkOrderStatus.
 * Tests: WorkOrderTests and integration tests.
 * Security Impact: Rejects invalid work-order input.
 * Database Impact: Maps to WorkOrder tables and procedures.
 * Sovereign Cycle: Origin -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Domain.Enums;

namespace LeeWay.TransitHub.Domain.Entities;

public sealed class WorkOrder
{
    public WorkOrder(Guid id, Guid vehicleId, string title, string description, int priority)
    {
        if (id == Guid.Empty) throw new ArgumentException("Work-order ID cannot be empty.", nameof(id));
        if (vehicleId == Guid.Empty) throw new ArgumentException("Vehicle ID cannot be empty.", nameof(vehicleId));
        if (priority is < 1 or > 5) throw new ArgumentOutOfRangeException(nameof(priority));
        Id = id;
        VehicleId = vehicleId;
        Title = Require(title, nameof(title));
        Description = Require(description, nameof(description));
        Priority = priority;
        Status = WorkOrderStatus.Open;
        CreatedUtc = DateTimeOffset.UtcNow;
    }

    public Guid Id { get; }
    public Guid VehicleId { get; }
    public string Title { get; }
    public string Description { get; }
    public int Priority { get; }
    public WorkOrderStatus Status { get; private set; }
    public string? AssignedTechnician { get; private set; }
    public DateTimeOffset CreatedUtc { get; }
    public DateTimeOffset? CompletedUtc { get; private set; }

    public void Assign(string technician)
    {
        AssignedTechnician = Require(technician, nameof(technician));
        Status = WorkOrderStatus.Assigned;
    }

    public void Start()
    {
        if (string.IsNullOrWhiteSpace(AssignedTechnician)) throw new InvalidOperationException("Assign a technician before starting work.");
        Status = WorkOrderStatus.InProgress;
    }

    public void Complete()
    {
        if (Status != WorkOrderStatus.InProgress) throw new InvalidOperationException("Only in-progress work can be completed.");
        Status = WorkOrderStatus.Completed;
        CompletedUtc = DateTimeOffset.UtcNow;
    }

    private static string Require(string value, string parameterName)
    {
        if (string.IsNullOrWhiteSpace(value)) throw new ArgumentException("A non-empty value is required.", parameterName);
        return value.Trim();
    }
}
