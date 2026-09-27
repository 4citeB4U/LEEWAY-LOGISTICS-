/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TenantSecurityTests.cs
 * Path: tests/LeeWay.TransitHub.SecurityTests/TenantSecurityTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Security
 * Purpose: Prove tenant identity and organization hierarchy reject unsafe boundary values.
 * Inputs: Invalid tenant and organization inputs.
 * Outputs: Security pass or exact failure.
 * Mutation Scope: None.
 * Dependencies: xUnit and Domain tenancy.
 * Tests: This file is part of the security suite.
 * Security Impact: Validates foundational tenant boundaries.
 * Database Impact: No database access.
 * Sovereign Cycle: Execution -> Veritas -> Echo
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 2.0.0
 */

using LeeWay.TransitHub.Domain.Tenancy;

namespace LeeWay.TransitHub.SecurityTests;

public sealed class TenantSecurityTests
{
    [Fact]
    public void Tenant_RejectsEmptyIdentity()
    {
        Assert.Throws<ArgumentException>(() =>
            new Tenant(Guid.Empty, "SAFE", "Safe Tenant", SaaSDeploymentProfile.SharedSaaS));
    }

    [Fact]
    public void OrganizationUnit_CannotBeItsOwnParent()
    {
        Guid unitId = Guid.NewGuid();

        Assert.Throws<ArgumentException>(() =>
            new OrganizationUnit(unitId, Guid.NewGuid(), unitId, "DEPOT", "Depot", OrganizationUnitType.Depot));
    }
}
