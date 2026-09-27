<!--
LEEWAY ENTERPRISE FILE HEADER
File: LESSON-02-SAAS-TENANCY-TRAINING-AND-AGENT-BOUNDARIES.md
Path: docs/learning/LESSON-02-SAAS-TENANCY-TRAINING-AND-AGENT-BOUNDARIES.md
Project: LeeWay Enterprise Transit Hub
Layer: Learning / Phase 02
Purpose: Teach SaaS tenancy, Agent Lee boundaries, capability packaging, and training governance.
Inputs: Phase 02 implementation and architecture decisions.
Outputs: A guided learning path and knowledge check.
Mutation Scope: Documentation only.
Dependencies: Product, domain, application, API, capability, and test files.
Tests: Learner explanation, code tracing, and scored knowledge check.
Security Impact: Teaches tenant and least-privilege boundaries.
Database Impact: Explains why persistence isolation is deferred.
Sovereign Cycle: Perception -> Structure -> Veritas -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 2.0.0
-->

# Lesson 02 — SaaS Tenancy, Training, and Agent Boundaries

## Learning objectives

After this lesson, explain what a tenant is, why tenant ownership must precede database implementation, how tenant context enters an HTTP request, why Agent Lee is external, how the capability package works, and why the 300-page manual is a release gate.

## Read these files in order

1. `docs/product/PRODUCT-CHARTER.md`
2. `docs/architecture/ADR-0002-MULTITENANT-SAAS-ARCHITECTURE.md`
3. `src/LeeWay.TransitHub.Domain/Tenancy/Tenant.cs`
4. `src/LeeWay.TransitHub.Domain/Tenancy/OrganizationUnit.cs`
5. `src/LeeWay.TransitHub.Application/Tenancy/ITenantContext.cs`
6. `src/LeeWay.TransitHub.Api/Tenancy/HeaderTenantContext.cs`
7. `src/LeeWay.TransitHub.Api/Tenancy/TenantResolutionMiddleware.cs`
8. `src/LeeWay.TransitHub.Application/Product/TransitHubProductProfileService.cs`
9. `src/LeeWay.TransitHub.Api/Controllers/PlatformController.cs`
10. `leeway/capabilities/enterprise-transit-hub/capability-manifest.json`
11. `docs/training-manual/manual.manifest.json`
12. `tests/LeeWay.TransitHub.UnitTests/TenantTests.cs`

## Request paths

`GET /api/platform/profile -> PlatformController -> TransitHubProductProfileService -> deterministic product profile -> JSON`

`HTTP headers -> TenantResolutionMiddleware -> HeaderTenantContext -> PlatformController -> tenant-context JSON`

## Critical distinction

Tenant context resolution is now implemented as a foundation. Operational records are not yet filtered by tenant in SQL Server because SQL Server persistence and authorization are not active. Do not claim production tenant isolation until those later gates pass.

## Knowledge check

1. Why is a tenant more than a string header?
2. Why must every persistent operational record eventually carry tenant ownership?
3. Why does middleware resolve context instead of the domain entity reading HTTP headers?
4. Why is Agent Lee not referenced by a runtime assembly inside the Domain project?
5. What continues working when Agent Lee is unavailable?
6. What does the capability manifest provide to the LeeWay ecosystem?
7. Why does the manual manifest track a page budget rather than claiming the manual is already complete?
8. Which evidence would be required before calling tenant isolation production-ready?
