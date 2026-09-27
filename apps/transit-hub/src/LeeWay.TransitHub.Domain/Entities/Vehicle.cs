/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: Vehicle.cs
 * Path: src/LeeWay.TransitHub.Domain/Entities/Vehicle.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Entity
 * Purpose: Represent a governed transit vehicle and protect its lifecycle rules.
 * Inputs: Vehicle identity, descriptive values, and state commands.
 * Outputs: Valid Vehicle state or validation exception.
 * Mutation Scope: Vehicle status and outage reason through methods only.
 * Dependencies: VehicleStatus.
 * Tests: VehicleTests and regression tests.
 * Security Impact: Rejects invalid input before persistence.
 * Database Impact: Maps to SQL Server and Oracle vehicle records.
 * Sovereign Cycle: Origin -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Domain.Enums;

namespace LeeWay.TransitHub.Domain.Entities;

public sealed class Vehicle
{
    public Vehicle(Guid id, string fleetNumber, string manufacturer, string model, int modelYear)
    {
        if (id == Guid.Empty) throw new ArgumentException("Vehicle ID cannot be empty.", nameof(id));
        int currentYear = DateTime.UtcNow.Year;
        if (modelYear < 1980 || modelYear > currentYear + 1) throw new ArgumentOutOfRangeException(nameof(modelYear));
        Id = id;
        FleetNumber = Require(fleetNumber, nameof(fleetNumber));
        Manufacturer = Require(manufacturer, nameof(manufacturer));
        Model = Require(model, nameof(model));
        ModelYear = modelYear;
        Status = VehicleStatus.Available;
        CreatedUtc = DateTimeOffset.UtcNow;
    }

    public Guid Id { get; }
    public string FleetNumber { get; }
    public string Manufacturer { get; }
    public string Model { get; }
    public int ModelYear { get; }
    public VehicleStatus Status { get; private set; }
    public string? OutOfServiceReason { get; private set; }
    public DateTimeOffset CreatedUtc { get; }

    public void PlaceOutOfService(string reason)
    {
        OutOfServiceReason = Require(reason, nameof(reason));
        Status = VehicleStatus.OutOfService;
    }

    public void ReturnToService()
    {
        Status = VehicleStatus.Available;
        OutOfServiceReason = null;
    }

    private static string Require(string value, string parameterName)
    {
        if (string.IsNullOrWhiteSpace(value)) throw new ArgumentException("A non-empty value is required.", parameterName);
        return value.Trim();
    }
}
