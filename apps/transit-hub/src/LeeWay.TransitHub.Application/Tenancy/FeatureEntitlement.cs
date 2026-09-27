/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: FeatureEntitlement.cs
 * Path: src/LeeWay.TransitHub.Application/Tenancy/FeatureEntitlement.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / SaaS Model
 * Purpose: Describe whether a tenant plan enables a product feature.
 * Inputs: Feature key, name, enabled state, and plan.
 * Outputs: Immutable entitlement data.
 * Mutation Scope: None.
 * Dependencies: No external dependencies.
 * Tests: Future subscription and authorization tests.
 * Security Impact: Supports least-privilege feature access.
 * Database Impact: Future entitlement persistence.
 * Sovereign Cycle: Origin -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 2.0.0
 */

namespace LeeWay.TransitHub.Application.Tenancy;

public sealed record FeatureEntitlement(
    string Key,
    string DisplayName,
    bool Enabled,
    string MinimumPlan);
