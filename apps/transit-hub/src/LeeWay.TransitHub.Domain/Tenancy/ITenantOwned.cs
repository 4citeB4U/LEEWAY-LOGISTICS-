/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: ITenantOwned.cs
 * Path: src/LeeWay.TransitHub.Domain/Tenancy/ITenantOwned.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Tenancy Contract
 * Purpose: Require tenant ownership on tenant-scoped domain records.
 * Inputs: Tenant ID.
 * Outputs: A compile-time tenant-ownership contract.
 * Mutation Scope: None.
 * Dependencies: System.Guid only.
 * Tests: Architecture and tenant-isolation tests.
 * Security Impact: Creates a visible tenant boundary.
 * Database Impact: Future persistence mappings use TenantId.
 * Sovereign Cycle: Origin -> Structure -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 2.0.0
 */

namespace LeeWay.TransitHub.Domain.Tenancy;

public interface ITenantOwned
{
    Guid TenantId { get; }
}
