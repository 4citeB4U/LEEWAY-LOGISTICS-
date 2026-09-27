<!--
LEEWAY ENTERPRISE FILE HEADER
File: LESSON-04-IDENTITY-ROLES-AUTHORIZATION-AND-CONTINUOUS-LEARNING.md
Path: docs/learning/LESSON-04-IDENTITY-ROLES-AUTHORIZATION-AND-CONTINUOUS-LEARNING.md
Project: LeeWay Enterprise Transit Hub
Layer: Learning / Technical Lesson
Purpose: Teach Leonard Lee to explain and defend authentication, claims, roles, permissions, policies, tenant matching, Agent Lee service identity, and the continuous learning release gate.
Inputs: Phase 04 source files, runtime evidence, official ASP.NET Core security guidance, and LeeWay Standards.
Outputs: File inspection order, request trace, exercises, interview explanation, and twelve knowledge questions.
Mutation Scope: Documentation only.
Dependencies: Phase 04 code, tests, manuals, capability contracts, and private workbook.
Tests: Human answer review, evidence trace, and Agent Lee proctor scoring.
Security Impact: Requires truthful distinction between development evidence authentication and production identity.
Database Impact: None.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 4.0.0
-->

# Lesson 04 — Identity, Roles, Authorization, and Continuous Learning

## What Phase 04 builds

Phase 04 adds a provider-neutral authorization foundation. It does not activate a production identity provider. A development-only header authentication handler creates deterministic identities so that roles, permission claims, tenant matching, and Agent Lee service capability policies can be compiled, tested, and exercised.

It also makes learning a mandatory release surface. Future phases cannot receive a full PASS unless the lesson, private workbook, question bank, commercial manual, Agent Lee knowledge index, automated tests, and receipt are updated together.

## Read these files in order

1. `src/LeeWay.TransitHub.Application/Security/TransitRoles.cs`
2. `src/LeeWay.TransitHub.Application/Security/TransitPermissions.cs`
3. `src/LeeWay.TransitHub.Application/Security/TransitClaimTypes.cs`
4. `src/LeeWay.TransitHub.Application/Security/TransitPolicies.cs`
5. `src/LeeWay.TransitHub.Api/Security/DevelopmentHeaderAuthenticationHandler.cs`
6. `src/LeeWay.TransitHub.Api/Tenancy/TenantResolutionMiddleware.cs`
7. `src/LeeWay.TransitHub.Api/Security/TenantAccessAuthorizationHandler.cs`
8. `src/LeeWay.TransitHub.Api/Security/TransitSecurityServiceCollectionExtensions.cs`
9. `src/LeeWay.TransitHub.Api/Controllers/AccessControlController.cs`
10. `src/LeeWay.TransitHub.Api/Program.cs`
11. `tests/LeeWay.TransitHub.UnitTests/AuthorizationCatalogTests.cs`
12. `tests/LeeWay.TransitHub.SecurityTests/AuthorizationBoundaryTests.cs`
13. `tests/LeeWay.TransitHub.ArchitectureTests/ContinuousLearningArchitectureTests.cs`
14. `docs/learning/learning-phase-registry.json`
15. `operations/powershell/Verify-ContinuousLearningGate.ps1`

## Trace the secured request

```text
HTTP request
-> DevelopmentHeaderAuthenticationHandler
-> ClaimsPrincipal on HttpContext.User
-> TenantResolutionMiddleware
-> scoped ITenantContext
-> authorization middleware
-> named Transit policy
-> TenantAccessAuthorizationHandler
-> AccessControlController action
-> JSON response or 401/403
```

## Status-code reasoning

- **400**: request tenant headers are partial or malformed.
- **401**: protected endpoint has no successfully authenticated subject.
- **403**: subject is authenticated but does not satisfy role, permission, capability, or tenant policy.
- **200**: every requirement for the endpoint succeeded.

## Professional explanation

> I implemented an identity-provider-neutral authorization foundation in ASP.NET Core. A development-only authentication scheme constructs claims for controlled runtime evidence, while named policies enforce authentication, permissions, tenant matching, and Agent Lee capability assignment. The scheme is disabled outside Development and is not represented as production identity. I also added a continuous learning release gate so every implementation phase updates the commercial manual, technical lessons, private question bank, Agent Lee knowledge index, tests, and evidence.

## What remains incomplete

Production identity still requires a trusted OpenID Connect or equivalent provider, secure token validation, account and invitation lifecycle, credential and key management, multifactor and conditional-access decisions where applicable, revocation, user-role persistence, tenant membership administration, resource-based authorization, database tenant enforcement, security testing, and deployment evidence.

## Knowledge Test 04

1. What is the difference between authentication and authorization?
2. How do claims, roles, permissions, and policies differ?
3. Why is the development header authentication handler prohibited outside Development?
4. Trace a secured request from HTTP headers to controller execution.
5. Why must identity tenant claims match the request tenant context?
6. What is the difference between HTTP 401 and HTTP 403?
7. Why is hiding a button insufficient authorization?
8. When is resource-based authorization required?
9. Why does AgentService also require a capability claim?
10. Why can AgentService not receive platform administration by default?
11. What does the continuous learning gate verify every phase?
12. What must be completed before production identity can be claimed?
