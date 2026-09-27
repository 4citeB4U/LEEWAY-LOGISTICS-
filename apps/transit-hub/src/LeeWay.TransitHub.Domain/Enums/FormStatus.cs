/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: FormStatus.cs
 * Path: src/LeeWay.TransitHub.Domain/Enums/FormStatus.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Enumeration
 * Purpose: Define employee-form lifecycle states.
 * Inputs: Business lifecycle decisions.
 * Outputs: Strongly typed FormStatus value.
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

public enum FormStatus
{
    Draft = 1,
    Submitted = 2,
    Approved = 3,
    Rejected = 4
}
