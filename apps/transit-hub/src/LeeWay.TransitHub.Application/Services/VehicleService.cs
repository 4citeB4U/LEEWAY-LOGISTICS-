/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: VehicleService.cs
 * Path: src/LeeWay.TransitHub.Application/Services/VehicleService.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Service
 * Purpose: Coordinate governed vehicle use cases.
 * Inputs: Vehicle queries and creation data.
 * Outputs: Vehicle entities and receipts.
 * Mutation Scope: Adds vehicles through repository contract.
 * Dependencies: IVehicleRepository, IReceiptWriter, Vehicle, and governance receipts.
 * Tests: Unit and integration tests.
 * Security Impact: Validates identifiers and delegates entity validation.
 * Database Impact: Repository implementation determines persistence.
 * Sovereign Cycle: Perception -> Structure -> Execution -> Veritas -> Echo
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Application.Abstractions;
using LeeWay.TransitHub.Domain.Entities;
using LeeWay.TransitHub.Governance.Receipts;
using LeeWay.TransitHub.Governance.Stages;

namespace LeeWay.TransitHub.Application.Services;

public sealed class VehicleService
{
    private readonly IVehicleRepository _vehicles;
    private readonly IReceiptWriter _receipts;

    public VehicleService(IVehicleRepository vehicles, IReceiptWriter receipts)
    {
        _vehicles = vehicles ?? throw new ArgumentNullException(nameof(vehicles));
        _receipts = receipts ?? throw new ArgumentNullException(nameof(receipts));
    }

    public IReadOnlyCollection<Vehicle> GetAll() => _vehicles.GetAll();

    public Vehicle? GetById(Guid id)
    {
        if (id == Guid.Empty) throw new ArgumentException("Vehicle ID cannot be empty.", nameof(id));
        return _vehicles.GetById(id);
    }

    public Vehicle Create(string fleetNumber, string manufacturer, string model, int modelYear)
    {
        var vehicle = new Vehicle(Guid.NewGuid(), fleetNumber, manufacturer, model, modelYear);
        _vehicles.Add(vehicle);
        _receipts.Write(ReceiptFactory.Pass($"Create vehicle {vehicle.FleetNumber}", SovereignStage.Veritas, vehicle.Id.ToString()));
        return vehicle;
    }
}
