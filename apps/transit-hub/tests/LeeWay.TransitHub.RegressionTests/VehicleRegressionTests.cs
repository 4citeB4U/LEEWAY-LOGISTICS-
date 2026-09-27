/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: VehicleRegressionTests.cs
 * Path: tests/LeeWay.TransitHub.RegressionTests/VehicleRegressionTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Regression
 * Purpose: Prevent the stale outage-reason defect from returning.
 * Inputs: Vehicle lifecycle.
 * Outputs: Regression pass or failure.
 * Mutation Scope: Test-only object.
 * Dependencies: xUnit and Domain.
 * Tests: This file is the regression suite.
 * Security Impact: None.
 * Database Impact: None.
 * Sovereign Cycle: Execution -> Veritas -> Echo
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Domain.Entities;
using LeeWay.TransitHub.Domain.Enums;

namespace LeeWay.TransitHub.RegressionTests;

public sealed class VehicleRegressionTests
{
    [Fact]
    public void ReturningToService_DoesNotLeaveStaleOutageReason()
    {
        var vehicle = new Vehicle(Guid.NewGuid(), "LW-R1", "New Flyer", "Xcelsior", 2025);
        vehicle.PlaceOutOfService("Temporary reason");
        vehicle.ReturnToService();
        Assert.Equal(VehicleStatus.Available, vehicle.Status);
        Assert.Null(vehicle.OutOfServiceReason);
    }
}
