/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TransitPolicies.cs
 * Path: src/LeeWay.TransitHub.Application/Security/TransitPolicies.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Security Contract
 * Purpose: Provide stable policy names shared by API endpoints, tests, documentation, and Agent Lee tool contracts.
 * Inputs: Authorization use cases.
 * Outputs: Canonical policy-name constants.
 * Mutation Scope: None.
 * Dependencies: ASP.NET Core policy registration consumes these names.
 * Tests: Architecture and runtime authorization tests.
 * Security Impact: Prevents string drift and accidental policy mismatch.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

namespace LeeWay.TransitHub.Application.Security;

public static class TransitPolicies
{
    public const string Authenticated = "TransitHub.Authenticated";
    public const string TenantMember = "TransitHub.TenantMember";
    public const string FleetRead = "TransitHub.FleetRead";
    public const string FleetManage = "TransitHub.FleetManage";
    public const string TenantAdministration = "TransitHub.TenantAdministration";
    public const string PlatformAdministration = "TransitHub.PlatformAdministration";
    public const string TrainingProctor = "TransitHub.TrainingProctor";
    public const string AgentToolExecute = "TransitHub.AgentToolExecute";
    public const string OperationsRead = "TransitHub.OperationsRead";
    public const string OperationsPublish = "TransitHub.OperationsPublish";
}
