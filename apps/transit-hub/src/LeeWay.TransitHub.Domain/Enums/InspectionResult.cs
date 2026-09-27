/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: InspectionResult.cs
 * Path: src/LeeWay.TransitHub.Domain/Enums/InspectionResult.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Enumeration
 * Purpose: Define vehicle-inspection outcomes.
 * Inputs: Business lifecycle decisions.
 * Outputs: Strongly typed InspectionResult value.
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

public enum InspectionResult
{
    Pass = 1,
    PassWithAdvisory = 2,
    Fail = 3
}
