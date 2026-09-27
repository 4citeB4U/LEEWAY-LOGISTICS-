/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: IncidentSeverity.cs
 * Path: src/LeeWay.TransitHub.Domain/Enums/IncidentSeverity.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Enumeration
 * Purpose: Define service-incident severity levels.
 * Inputs: Business lifecycle decisions.
 * Outputs: Strongly typed IncidentSeverity value.
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

public enum IncidentSeverity
{
    Low = 1,
    Moderate = 2,
    High = 3,
    Critical = 4
}
