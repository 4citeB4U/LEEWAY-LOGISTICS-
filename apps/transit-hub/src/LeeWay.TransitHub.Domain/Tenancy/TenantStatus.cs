/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TenantStatus.cs
 * Path: src/LeeWay.TransitHub.Domain/Tenancy/TenantStatus.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Tenancy Enum
 * Purpose: Define valid tenant lifecycle states.
 * Inputs: Tenant lifecycle decisions.
 * Outputs: Strongly typed tenant status values.
 * Mutation Scope: None.
 * Dependencies: No outward dependencies.
 * Tests: TenantTests.
 * Security Impact: Prevents invalid free-form tenant states.
 * Database Impact: Maps to future tenant status fields.
 * Sovereign Cycle: Origin -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 2.0.0
 */

namespace LeeWay.TransitHub.Domain.Tenancy;

public enum TenantStatus
{
    Provisioning = 1,
    Active = 2,
    Suspended = 3,
    Closed = 4
}
