/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TransitPermissions.cs
 * Path: src/LeeWay.TransitHub.Application/Security/TransitPermissions.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Security Contract
 * Purpose: Define permission vocabulary and a reviewable role-to-permission foundation for transportation operations and Agent Lee tools.
 * Inputs: Canonical Transit Hub roles and requested permission names.
 * Outputs: Permission constants, immutable role matrix, and permission checks.
 * Mutation Scope: None.
 * Dependencies: TransitRoles and .NET collections.
 * Tests: Unit and security tests for allowed and denied role-permission combinations.
 * Security Impact: Makes least privilege explicit and testable while production identity storage remains deferred.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

namespace LeeWay.TransitHub.Application.Security;

public static class TransitPermissions
{
    public const string PlatformAdministration = "platform.administration";
    public const string TenantAdministration = "tenant.administration";
    public const string FleetRead = "fleet.read";
    public const string FleetManage = "fleet.manage";
    public const string DispatchManage = "dispatch.manage";
    public const string MaintenanceManage = "maintenance.manage";
    public const string SafetyManage = "safety.manage";
    public const string TrainingProctor = "training.proctor";
    public const string AgentToolExecute = "agent.tool.execute";
    public const string OperationsRead = "operations.read";
    public const string OperationsPublish = "operations.publish";

    private static readonly IReadOnlyDictionary<string, IReadOnlySet<string>> RolePermissions =
        new Dictionary<string, IReadOnlySet<string>>(StringComparer.OrdinalIgnoreCase)
        {
            [TransitRoles.PlatformOwner] = Set(
                PlatformAdministration,
                TenantAdministration,
                FleetRead,
                FleetManage,
                DispatchManage,
                MaintenanceManage,
                SafetyManage,
                TrainingProctor,
                AgentToolExecute,
                OperationsRead,
                OperationsPublish),
            [TransitRoles.TenantOwner] = Set(
                TenantAdministration,
                FleetRead,
                FleetManage,
                DispatchManage,
                MaintenanceManage,
                SafetyManage,
                TrainingProctor,
                OperationsRead,
                OperationsPublish),
            [TransitRoles.TenantAdministrator] = Set(
                TenantAdministration,
                FleetRead,
                TrainingProctor,
                OperationsRead),
            [TransitRoles.FleetManager] = Set(
                FleetRead,
                FleetManage,
                DispatchManage,
                MaintenanceManage,
                SafetyManage,
                OperationsRead,
                OperationsPublish),
            [TransitRoles.Dispatcher] = Set(FleetRead, DispatchManage, OperationsRead, OperationsPublish),
            [TransitRoles.SafetyManager] = Set(FleetRead, SafetyManage,
                OperationsRead,
                OperationsPublish),
            [TransitRoles.Mechanic] = Set(FleetRead, MaintenanceManage, OperationsRead),
            [TransitRoles.Driver] = Set(FleetRead, OperationsRead),
            [TransitRoles.Viewer] = Set(FleetRead, OperationsRead),
            [TransitRoles.AgentService] = Set(FleetRead, TrainingProctor, AgentToolExecute, OperationsRead)
        };

    public static IReadOnlySet<string> GetForRole(string role) =>
        RolePermissions[TransitRoles.Normalize(role)];

    public static bool RoleHasPermission(string role, string permission)
    {
        if (string.IsNullOrWhiteSpace(permission))
        {
            throw new ArgumentException("Permission is required.", nameof(permission));
        }

        return GetForRole(role).Contains(permission.Trim());
    }

    private static IReadOnlySet<string> Set(params string[] permissions) =>
        new HashSet<string>(permissions, StringComparer.OrdinalIgnoreCase);
}
