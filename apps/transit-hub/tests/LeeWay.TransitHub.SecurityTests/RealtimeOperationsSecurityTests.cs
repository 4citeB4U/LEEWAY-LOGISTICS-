/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: RealtimeOperationsSecurityTests.cs
 * Path: tests/LeeWay.TransitHub.SecurityTests/RealtimeOperationsSecurityTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Security
 * Purpose: Verify role permissions and stable policy names for tenant-scoped realtime operations.
 * Inputs: Governed request data and existing application contracts.
 * Outputs: Deterministic application behavior and evidence.
 * Mutation Scope: Owned project state only.
 * Dependencies: .NET 10 and LeeWay governed contracts.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Tenant and least-privilege boundaries apply.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Application.Security;

namespace LeeWay.TransitHub.SecurityTests;

public sealed class RealtimeOperationsSecurityTests
{
    [Fact]
    public void Dispatcher_CanReadAndPublishOperations()
    {
        Assert.True(TransitPermissions.RoleHasPermission(TransitRoles.Dispatcher, TransitPermissions.OperationsRead));
        Assert.True(TransitPermissions.RoleHasPermission(TransitRoles.Dispatcher, TransitPermissions.OperationsPublish));
    }

    [Fact]
    public void Viewer_CanReadButCannotPublishOperations()
    {
        Assert.True(TransitPermissions.RoleHasPermission(TransitRoles.Viewer, TransitPermissions.OperationsRead));
        Assert.False(TransitPermissions.RoleHasPermission(TransitRoles.Viewer, TransitPermissions.OperationsPublish));
    }

    [Fact]
    public void AgentService_CannotPublishWithoutDelegatedToolPath()
    {
        Assert.True(TransitPermissions.RoleHasPermission(TransitRoles.AgentService, TransitPermissions.OperationsRead));
        Assert.False(TransitPermissions.RoleHasPermission(TransitRoles.AgentService, TransitPermissions.OperationsPublish));
    }

    [Fact]
    public void RealtimePolicyNames_AreStable()
    {
        Assert.Equal("TransitHub.OperationsRead", TransitPolicies.OperationsRead);
        Assert.Equal("TransitHub.OperationsPublish", TransitPolicies.OperationsPublish);
    }
}
