/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TenantTests.cs
 * Path: tests/LeeWay.TransitHub.UnitTests/TenantTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Unit
 * Purpose: Prove tenant validation, lifecycle, normalization, and organization ownership rules.
 * Inputs: Tenant and organization-unit commands.
 * Outputs: Pass or exact domain-rule failure.
 * Mutation Scope: None.
 * Dependencies: xUnit and Domain tenancy.
 * Tests: This file is part of the unit suite.
 * Security Impact: Proves unsafe identifiers and empty ownership are rejected.
 * Database Impact: No database access.
 * Sovereign Cycle: Execution -> Veritas -> Echo
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 2.0.0
 */

using LeeWay.TransitHub.Domain.Tenancy;

namespace LeeWay.TransitHub.UnitTests;

public sealed class TenantTests
{
    [Fact]
    public void Constructor_NormalizesCodeAndStartsProvisioning()
    {
        var tenant = new Tenant(Guid.NewGuid(), " north-fleet ", "North Fleet", SaaSDeploymentProfile.SharedSaaS);

        Assert.Equal("NORTH-FLEET", tenant.Code);
        Assert.Equal(TenantStatus.Provisioning, tenant.Status);
    }

    [Fact]
    public void Constructor_RejectsUnsafeCodeCharacters()
    {
        Assert.Throws<ArgumentException>(() =>
            new Tenant(Guid.NewGuid(), "north fleet!", "North Fleet", SaaSDeploymentProfile.SharedSaaS));
    }

    [Fact]
    public void SuspendAndActivate_ProtectLifecycleState()
    {
        var tenant = new Tenant(Guid.NewGuid(), "NORTH", "North Fleet", SaaSDeploymentProfile.IsolatedData);
        tenant.Activate();
        tenant.Suspend("Contract review");

        Assert.Equal(TenantStatus.Suspended, tenant.Status);
        Assert.Equal("Contract review", tenant.SuspensionReason);

        tenant.Activate();
        Assert.Equal(TenantStatus.Active, tenant.Status);
        Assert.Null(tenant.SuspensionReason);
    }

    [Fact]
    public void OrganizationUnit_RequiresTenantOwnership()
    {
        Assert.Throws<ArgumentException>(() =>
            new OrganizationUnit(Guid.NewGuid(), Guid.Empty, null, "DEPOT-1", "Main Depot", OrganizationUnitType.Depot));
    }
}
