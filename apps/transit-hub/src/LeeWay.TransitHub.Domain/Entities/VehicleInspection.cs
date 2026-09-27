/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: VehicleInspection.cs
 * Path: src/LeeWay.TransitHub.Domain/Entities/VehicleInspection.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Entity
 * Purpose: Represent a completed vehicle inspection.
 * Inputs: Vehicle, inspector, result, and notes.
 * Outputs: Immutable inspection record.
 * Mutation Scope: Immutable after construction.
 * Dependencies: InspectionResult.
 * Tests: Integration tests.
 * Security Impact: Uses fictional training data.
 * Database Impact: Maps to VehicleInspection records.
 * Sovereign Cycle: Origin -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Domain.Enums;

namespace LeeWay.TransitHub.Domain.Entities;

public sealed class VehicleInspection
{
    public VehicleInspection(Guid id, Guid vehicleId, string inspector, InspectionResult result, string notes)
    {
        if (id == Guid.Empty) throw new ArgumentException("Inspection ID cannot be empty.", nameof(id));
        if (vehicleId == Guid.Empty) throw new ArgumentException("Vehicle ID cannot be empty.", nameof(vehicleId));
        Id = id;
        VehicleId = vehicleId;
        Inspector = Require(inspector, nameof(inspector));
        Result = result;
        Notes = Require(notes, nameof(notes));
        InspectedUtc = DateTimeOffset.UtcNow;
    }

    public Guid Id { get; }
    public Guid VehicleId { get; }
    public string Inspector { get; }
    public InspectionResult Result { get; }
    public string Notes { get; }
    public DateTimeOffset InspectedUtc { get; }

    private static string Require(string value, string parameterName)
    {
        if (string.IsNullOrWhiteSpace(value)) throw new ArgumentException("A non-empty value is required.", parameterName);
        return value.Trim();
    }
}
