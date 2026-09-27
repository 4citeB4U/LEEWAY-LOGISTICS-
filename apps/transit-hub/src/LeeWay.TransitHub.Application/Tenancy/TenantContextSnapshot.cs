/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TenantContextSnapshot.cs
 * Path: src/LeeWay.TransitHub.Application/Tenancy/TenantContextSnapshot.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Tenancy Model
 * Purpose: Carry immutable resolved or unresolved tenant context.
 * Inputs: Resolution state, tenant ID, and tenant code.
 * Outputs: A serializable immutable context snapshot.
 * Mutation Scope: None.
 * Dependencies: No external dependencies.
 * Tests: Runtime endpoint and unit tests.
 * Security Impact: Avoids exposing mutable context state.
 * Database Impact: No direct database impact.
 * Sovereign Cycle: Perception -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 2.0.0
 */

namespace LeeWay.TransitHub.Application.Tenancy;

public sealed record TenantContextSnapshot(bool IsResolved, Guid TenantId, string TenantCode);
