/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: CaseStatus.cs
 * Path: src/LeeWay.TransitHub.Domain/Enums/CaseStatus.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Enumeration
 * Purpose: Define customer-case lifecycle states.
 * Inputs: Business lifecycle decisions.
 * Outputs: Strongly typed CaseStatus value.
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

public enum CaseStatus
{
    New = 1,
    Investigating = 2,
    Resolved = 3,
    Closed = 4
}
