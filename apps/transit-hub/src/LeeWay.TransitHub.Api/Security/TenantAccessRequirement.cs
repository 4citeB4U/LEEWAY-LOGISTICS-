/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TenantAccessRequirement.cs
 * Path: src/LeeWay.TransitHub.Api/Security/TenantAccessRequirement.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Authorization Requirement
 * Purpose: Represent the requirement that an authenticated identity tenant claim match the resolved request tenant.
 * Inputs: Authorization policy evaluation.
 * Outputs: Marker requirement evaluated by TenantAccessAuthorizationHandler.
 * Mutation Scope: None.
 * Dependencies: Microsoft.AspNetCore.Authorization.
 * Tests: Runtime matching and mismatched-tenant tests.
 * Security Impact: Creates a fail-closed tenant membership requirement.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 4.0.0
 */

using Microsoft.AspNetCore.Authorization;

namespace LeeWay.TransitHub.Api.Security;

public sealed class TenantAccessRequirement : IAuthorizationRequirement
{
}
