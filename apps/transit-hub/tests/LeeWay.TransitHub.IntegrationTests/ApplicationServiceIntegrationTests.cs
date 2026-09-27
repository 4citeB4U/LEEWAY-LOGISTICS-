/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: ApplicationServiceIntegrationTests.cs
 * Path: tests/LeeWay.TransitHub.IntegrationTests/ApplicationServiceIntegrationTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Integration
 * Purpose: Prove application services operate through real in-memory adapters.
 * Inputs: Application services and repositories.
 * Outputs: Executable integration evidence.
 * Mutation Scope: Test-only in-memory store.
 * Dependencies: xUnit, Application, and Infrastructure.InMemory.
 * Tests: This file is the test suite.
 * Security Impact: Fictional data only.
 * Database Impact: No database connection.
 * Sovereign Cycle: Execution -> Veritas -> Echo
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Application.Models;
using LeeWay.TransitHub.Application.Services;
using LeeWay.TransitHub.Infrastructure.InMemory.Repositories;
using LeeWay.TransitHub.Infrastructure.InMemory.Storage;

namespace LeeWay.TransitHub.IntegrationTests;

public sealed class ApplicationServiceIntegrationTests
{
    [Fact]
    public void VehicleService_CreatesVehicleAndReceipt()
    {
        var store = new InMemoryTransitStore();
        var receipts = new InMemoryReceiptWriter(store);
        var service = new VehicleService(new InMemoryVehicleRepository(store), receipts);
        var vehicle = service.Create("LW-2000", "Gillig", "Low Floor", 2024);
        Assert.Equal("LW-2000", vehicle.FleetNumber);
        Assert.Single(receipts.GetAll());
    }

    [Fact]
    public void WorkOrderService_CreatesWorkForKnownVehicle()
    {
        var store = new InMemoryTransitStore();
        var vehicles = new InMemoryVehicleRepository(store);
        var service = new WorkOrderService(new InMemoryWorkOrderRepository(store), vehicles, new InMemoryReceiptWriter(store));
        var vehicle = Assert.Single(vehicles.GetAll());
        var workOrder = service.Create(new CreateWorkOrderRequest(vehicle.Id, "Door check", "Inspect passenger door.", 3));
        Assert.Equal(vehicle.Id, workOrder.VehicleId);
    }
}
