/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: SaaSDeploymentProfile.cs
 * Path: src/LeeWay.TransitHub.Domain/Tenancy/SaaSDeploymentProfile.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Tenancy Enum
 * Purpose: Define supported SaaS isolation and deployment profiles.
 * Inputs: Commercial isolation requirements.
 * Outputs: Strongly typed deployment-profile values.
 * Mutation Scope: None.
 * Dependencies: No outward dependencies.
 * Tests: ProductProfileTests and architecture review.
 * Security Impact: Supports explicit isolation classification.
 * Database Impact: Guides future connection and deployment selection.
 * Sovereign Cycle: Origin -> Structure -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 2.0.0
 */

namespace LeeWay.TransitHub.Domain.Tenancy;

public enum SaaSDeploymentProfile
{
    SharedSaaS = 1,
    IsolatedData = 2,
    DedicatedEnterprise = 3
}
