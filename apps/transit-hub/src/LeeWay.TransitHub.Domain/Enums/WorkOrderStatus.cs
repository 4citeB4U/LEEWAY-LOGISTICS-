/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: WorkOrderStatus.cs
 * Path: src/LeeWay.TransitHub.Domain/Enums/WorkOrderStatus.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Enumeration
 * Purpose: Define valid maintenance work-order states.
 * Inputs: Business lifecycle decisions.
 * Outputs: Strongly typed WorkOrderStatus value.
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

public enum WorkOrderStatus
{
    Open = 1,
    Assigned = 2,
    InProgress = 3,
    Completed = 4,
    Cancelled = 5
}
