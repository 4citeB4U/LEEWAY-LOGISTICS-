/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: OrganizationUnitType.cs
 * Path: src/LeeWay.TransitHub.Domain/Tenancy/OrganizationUnitType.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Tenancy Enum
 * Purpose: Define supported organizational hierarchy types.
 * Inputs: Transportation organization models.
 * Outputs: Strongly typed organization-unit types.
 * Mutation Scope: None.
 * Dependencies: No outward dependencies.
 * Tests: TenantTests.
 * Security Impact: Prevents ambiguous organization classification.
 * Database Impact: Maps to future organization-unit records.
 * Sovereign Cycle: Origin -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 2.0.0
 */

namespace LeeWay.TransitHub.Domain.Tenancy;

public enum OrganizationUnitType
{
    Company = 1,
    Division = 2,
    Depot = 3,
    Terminal = 4,
    Garage = 5,
    SchoolDistrict = 6,
    School = 7,
    OperatingRegion = 8
}
