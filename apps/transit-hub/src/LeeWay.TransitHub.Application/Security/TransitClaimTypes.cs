/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TransitClaimTypes.cs
 * Path: src/LeeWay.TransitHub.Application/Security/TransitClaimTypes.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Security Contract
 * Purpose: Define custom claim names used to connect authenticated identities to tenants and LeeWay capability grants.
 * Inputs: Claims issued by a development scheme or future production identity provider.
 * Outputs: Canonical tenant, tenant-code, permission, and capability claim names.
 * Mutation Scope: None.
 * Dependencies: System.Security.Claims consumers and external identity mapping.
 * Tests: Runtime authentication and authorization checks.
 * Security Impact: Reduces ambiguous claim interpretation and keeps provider mapping explicit.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 4.0.0
 */

namespace LeeWay.TransitHub.Application.Security;

public static class TransitClaimTypes
{
    public const string TenantId = "leeway:tenant_id";
    public const string TenantCode = "leeway:tenant_code";
    public const string Permission = "leeway:permission";
    public const string Capability = "leeway:capability";
}
