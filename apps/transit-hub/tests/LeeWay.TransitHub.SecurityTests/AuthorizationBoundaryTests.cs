/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: AuthorizationBoundaryTests.cs
 * Path: tests/LeeWay.TransitHub.SecurityTests/AuthorizationBoundaryTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Security
 * Purpose: Verify sensitive permissions are restricted to intended human and service roles.
 * Inputs: Role-permission catalog.
 * Outputs: Security test pass or exact failure.
 * Mutation Scope: None.
 * Dependencies: xUnit and Application security contracts.
 * Tests: Four positive and negative authorization-boundary tests.
 * Security Impact: Protects platform, tenant, and Agent Lee least-privilege boundaries.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 4.0.0
 */

using LeeWay.TransitHub.Application.Security;

namespace LeeWay.TransitHub.SecurityTests;

public sealed class AuthorizationBoundaryTests
{
    [Fact]
    public void TenantOwner_HasTenantAdministrationPermission()
    {
        Assert.True(TransitPermissions.RoleHasPermission(
            TransitRoles.TenantOwner,
            TransitPermissions.TenantAdministration));
    }

    [Fact]
    public void Driver_CannotAdministerTenant()
    {
        Assert.False(TransitPermissions.RoleHasPermission(
            TransitRoles.Driver,
            TransitPermissions.TenantAdministration));
    }

    [Fact]
    public void AgentService_HasGovernedToolExecutionPermission()
    {
        Assert.True(TransitPermissions.RoleHasPermission(
            TransitRoles.AgentService,
            TransitPermissions.AgentToolExecute));
    }

    [Fact]
    public void AgentService_CannotAdministerPlatform()
    {
        Assert.False(TransitPermissions.RoleHasPermission(
            TransitRoles.AgentService,
            TransitPermissions.PlatformAdministration));
    }
}
