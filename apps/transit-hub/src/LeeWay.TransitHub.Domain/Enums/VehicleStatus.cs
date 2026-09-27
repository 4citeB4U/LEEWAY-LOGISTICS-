/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: VehicleStatus.cs
 * Path: src/LeeWay.TransitHub.Domain/Enums/VehicleStatus.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Enumeration
 * Purpose: Define valid transit vehicle lifecycle states.
 * Inputs: Business lifecycle decisions.
 * Outputs: Strongly typed VehicleStatus value.
 * Mutation Scope: Declares states only.
 * Dependencies: None.
 * Tests: Domain and regression tests.
 * Security Impact: None.
 * Database Impact: Maps to constrained database values.
 * Sovereign Cycle: Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

namespace LeeWay.TransitHub.Domain.Enums;

public enum VehicleStatus
{
    Available = 1,
    InService = 2,
    Maintenance = 3,
    OutOfService = 4,
    Retired = 5
}
