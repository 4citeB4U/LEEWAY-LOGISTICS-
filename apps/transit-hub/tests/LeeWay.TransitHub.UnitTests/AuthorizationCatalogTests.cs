/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: AuthorizationCatalogTests.cs
 * Path: tests/LeeWay.TransitHub.UnitTests/AuthorizationCatalogTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Unit
 * Purpose: Prove role normalization and permission matrix behavior independently of HTTP and identity-provider infrastructure.
 * Inputs: TransitRoles and TransitPermissions.
 * Outputs: Unit test pass or exact failure.
 * Mutation Scope: None.
 * Dependencies: xUnit and Application security contracts.
 * Tests: Five role and permission tests.
 * Security Impact: Protects canonical authorization vocabulary and least-privilege intent.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 4.0.0
 */

using LeeWay.TransitHub.Application.Security;

namespace LeeWay.TransitHub.UnitTests;

public sealed class AuthorizationCatalogTests
{
    [Fact]
    public void EveryDeclaredRole_IsRecognized()
    {
        Assert.All(TransitRoles.All, role => Assert.True(TransitRoles.IsKnown(role)));
    }

    [Fact]
    public void Normalize_IsCaseInsensitiveAndReturnsCanonicalValue()
    {
        Assert.Equal(TransitRoles.FleetManager, TransitRoles.Normalize("fleetmanager"));
    }

    [Fact]
    public void Normalize_RejectsUnknownRole()
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => TransitRoles.Normalize("SuperUnlimitedUser"));
    }

    [Fact]
    public void PlatformOwner_HasPlatformAdministrationPermission()
    {
        Assert.True(TransitPermissions.RoleHasPermission(
            TransitRoles.PlatformOwner,
            TransitPermissions.PlatformAdministration));
    }

    [Fact]
    public void Viewer_DoesNotHaveFleetManagementPermission()
    {
        Assert.False(TransitPermissions.RoleHasPermission(
            TransitRoles.Viewer,
            TransitPermissions.FleetManage));
    }
}
