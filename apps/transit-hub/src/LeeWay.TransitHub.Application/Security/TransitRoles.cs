/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TransitRoles.cs
 * Path: src/LeeWay.TransitHub.Application/Security/TransitRoles.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Security Contract
 * Purpose: Define canonical transportation SaaS and LeeWay service roles without binding the application to one identity provider.
 * Inputs: Role names from authenticated identity claims.
 * Outputs: Canonical role names, normalization, and validation.
 * Mutation Scope: None.
 * Dependencies: System collections and identity-provider-neutral application contracts.
 * Tests: Unit and security tests for known, normalized, and rejected roles.
 * Security Impact: Rejects unknown role names and prevents spelling drift in authorization policies.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 4.0.0
 */

namespace LeeWay.TransitHub.Application.Security;

public static class TransitRoles
{
    public const string PlatformOwner = "PlatformOwner";
    public const string TenantOwner = "TenantOwner";
    public const string TenantAdministrator = "TenantAdministrator";
    public const string FleetManager = "FleetManager";
    public const string Dispatcher = "Dispatcher";
    public const string SafetyManager = "SafetyManager";
    public const string Mechanic = "Mechanic";
    public const string Driver = "Driver";
    public const string Viewer = "Viewer";
    public const string AgentService = "AgentService";

    private static readonly string[] KnownRoles =
    [
        PlatformOwner,
        TenantOwner,
        TenantAdministrator,
        FleetManager,
        Dispatcher,
        SafetyManager,
        Mechanic,
        Driver,
        Viewer,
        AgentService
    ];

    public static IReadOnlyList<string> All => KnownRoles;

    public static bool IsKnown(string? role) =>
        !string.IsNullOrWhiteSpace(role) &&
        KnownRoles.Any(known => string.Equals(known, role.Trim(), StringComparison.OrdinalIgnoreCase));

    public static string Normalize(string role)
    {
        if (string.IsNullOrWhiteSpace(role))
        {
            throw new ArgumentException("Role is required.", nameof(role));
        }

        string? known = KnownRoles.FirstOrDefault(candidate =>
            string.Equals(candidate, role.Trim(), StringComparison.OrdinalIgnoreCase));

        return known ?? throw new ArgumentOutOfRangeException(nameof(role), role, "Unknown Transit Hub role.");
    }
}
