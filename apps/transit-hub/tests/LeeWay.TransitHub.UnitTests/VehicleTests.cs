/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: VehicleTests.cs
 * Path: tests/LeeWay.TransitHub.UnitTests/VehicleTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Unit
 * Purpose: Prove Vehicle constructor and lifecycle rules.
 * Inputs: Vehicle instances.
 * Outputs: Executable test pass or failure.
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

public sealed class VehicleTests
{
    [Fact]
    public void Constructor_RejectsBlankFleetNumber()
    {
        Assert.Throws<ArgumentException>(() => new Vehicle(Guid.NewGuid(), " ", "New Flyer", "Xcelsior", 2025));
    }

    [Fact]
    public void PlaceOutOfService_RequiresReasonAndChangesStatus()
    {
        var vehicle = new Vehicle(Guid.NewGuid(), "LW-T1", "New Flyer", "Xcelsior", 2025);
        vehicle.PlaceOutOfService("Brake inspection required.");
        Assert.Equal(VehicleStatus.OutOfService, vehicle.Status);
        Assert.Equal("Brake inspection required.", vehicle.OutOfServiceReason);
    }

    [Fact]
    public void ReturnToService_ClearsReason()
    {
        var vehicle = new Vehicle(Guid.NewGuid(), "LW-T2", "New Flyer", "Xcelsior", 2025);
        vehicle.PlaceOutOfService("Inspection required.");
        vehicle.ReturnToService();
        Assert.Equal(VehicleStatus.Available, vehicle.Status);
        Assert.Null(vehicle.OutOfServiceReason);
    }
}
