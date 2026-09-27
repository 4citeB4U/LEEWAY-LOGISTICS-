/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: WorkOrderTests.cs
 * Path: tests/LeeWay.TransitHub.UnitTests/WorkOrderTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Unit
 * Purpose: Prove maintenance work-order lifecycle rules.
 * Inputs: WorkOrder instances.
 * Outputs: Executable test evidence.
 * Mutation Scope: Test-only objects.
 * Dependencies: xUnit and Domain.
 * Tests: This file is the test suite.
 * Security Impact: Fictional data only.
 * Database Impact: None.
 * Sovereign Cycle: Execution -> Veritas -> Echo
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Domain.Entities;
using LeeWay.TransitHub.Domain.Enums;

namespace LeeWay.TransitHub.UnitTests;

public sealed class WorkOrderTests
{
    [Fact]
    public void Start_RequiresAssignedTechnician()
    {
        var workOrder = new WorkOrder(Guid.NewGuid(), Guid.NewGuid(), "Brake check", "Inspect brakes.", 2);
        Assert.Throws<InvalidOperationException>(() => workOrder.Start());
    }

    [Fact]
    public void AssignedWork_CanStartAndComplete()
    {
        var workOrder = new WorkOrder(Guid.NewGuid(), Guid.NewGuid(), "Brake check", "Inspect brakes.", 2);
        workOrder.Assign("Technician One");
        workOrder.Start();
        workOrder.Complete();
        Assert.Equal(WorkOrderStatus.Completed, workOrder.Status);
        Assert.NotNull(workOrder.CompletedUtc);
    }
}
