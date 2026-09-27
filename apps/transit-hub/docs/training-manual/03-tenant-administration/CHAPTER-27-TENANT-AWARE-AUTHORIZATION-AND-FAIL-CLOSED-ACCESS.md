<!--
LEEWAY ENTERPRISE FILE HEADER
File: CHAPTER-27-TENANT-AWARE-AUTHORIZATION-AND-FAIL-CLOSED-ACCESS.md
Path: docs/training-manual/03-tenant-administration/CHAPTER-27-TENANT-AWARE-AUTHORIZATION-AND-FAIL-CLOSED-ACCESS.md
Project: LeeWay Enterprise Transit Hub
Layer: Training Manual / Governed Chapter
Purpose: Teach Chapter 27 — Tenant-Aware Authorization and Fail-Closed Access with role-specific procedures, evidence, exercises, and Agent Lee proctor guidance.
Inputs: Current Phase 04 implementation, official ASP.NET Core security guidance, LeeWay policies, and transportation workflows.
Outputs: Commercial training chapter source included in the generated master manual.
Mutation Scope: Documentation only.
Dependencies: Phase 04 security contracts, learning gate, and manual builder.
Tests: Manual build, chapter count, architecture tests, and human review.
Security Impact: Teaches fail-closed identity, tenant, permission, privacy, and service-account boundaries.
Database Impact: Documents future persistence enforcement; no database mutation.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 4.0.0
-->

# Chapter 27 — Tenant-Aware Authorization and Fail-Closed Access

## Purpose

This chapter connects authenticated identity to the active SaaS tenant. Multitenancy is not secure merely because each record has a TenantId. The request must resolve one active tenant, the identity must be authorized for that tenant, and every data access path must enforce the same ownership boundary.

## Learning objectives

The learner should be able to trace tenant resolution and tenant authorization, explain why two tenant identifiers are compared in Phase 04, identify cross-tenant attack paths, distinguish request-level protection from database-level protection, and state what remains before production-grade isolation can be claimed.

## Two independent inputs

Phase 04 intentionally uses two tenant inputs in development evidence. `X-LeeWay-Tenant-Id` and `X-LeeWay-Tenant-Code` identify the tenant requested by the current operation. `X-LeeWay-Identity-Tenant-Id` and `X-LeeWay-Identity-Tenant-Code` represent tenant membership issued as identity claims. The tenant middleware resolves the request tenant. The authentication handler creates the identity claims. The tenant authorization handler compares them.

Using separate values allows a negative test. A valid identity for Tenant A can attempt to request Tenant B. Authentication succeeds because the subject is valid, but authorization returns 403 because the identity tenant does not match the requested tenant.

## Request flow

```text
Client request
  -> authentication handler creates ClaimsPrincipal
  -> tenant middleware validates request tenant headers
  -> scoped ITenantContext is resolved
  -> authorization middleware evaluates named policy
  -> TenantAccessAuthorizationHandler compares identity claims to ITenantContext
  -> policy succeeds or fails
  -> controller action executes only after success
```

The ordering matters. Authentication must occur before authorization so policies have a principal. Tenant resolution must occur before authorization so the custom requirement has a request tenant to compare. The composition root therefore calls `UseAuthentication`, then tenant middleware, then `UseAuthorization`.

## Fail-closed rules

The middleware rejects partial tenant headers. The authentication handler rejects partial identity headers. The authorization handler does not guess when context is unresolved. A mismatch does not fall back to a default tenant. These rules are fail closed: uncertainty results in denial rather than expanded access.

Default tenants are dangerous in SaaS applications. A background job, cached singleton, or missing header can accidentally use the wrong customer context. Tenant context is scoped to one request and cannot be resolved twice. Long-running workers will require an explicit tenant work item rather than relying on an ambient HTTP context.

## Tenant code and tenant ID

The GUID is the durable technical identifier. The tenant code is a readable operational identifier. Both are compared in the Phase 04 evidence path. The code is normalized to uppercase. A production identity mapping may use only the durable ID for authorization and treat the code as display metadata, but it must not accept conflicting values silently.

## Cross-tenant threats

Threats include changing a route or header tenant ID, guessing another tenant’s record ID, reusing cached data, missing query filters, background jobs with stale context, support accounts with excessive authority, Agent Lee tools that omit tenant scope, exports containing multiple tenants, and logs that expose customer data. Authorization policies address only part of this threat set.

## Defense in depth

Production tenant isolation requires multiple independent controls:

1. Trusted authentication and tenant membership claims.
2. Request-level tenant resolution and authorization.
3. Tenant-owned domain contracts.
4. Tenant-aware repositories.
5. Database query filters or dedicated database selection.
6. Database constraints and indexes that include tenant identity.
7. Resource-based authorization after loading records.
8. Cache keys that include tenant identity.
9. Tenant-scoped background jobs and message envelopes.
10. Security, integration, and penetration tests.
11. Audit receipts that record tenant, subject, action, and result.

Phase 04 implements items one only in development evidence form, item two as a runtime foundation, and the contract portion of item three from earlier phases. It does not claim production database isolation.

## Support and platform access

Platform operators may need to diagnose a customer issue. PlatformOwner is not a license to browse all tenant data without purpose. Support access should require a case, reason, time limit, customer policy, and receipt. Impersonation should be avoided or clearly marked. The subject performing the action and the tenant context must both remain visible in evidence.

## Agent Lee tenant scope

Agent Lee’s service identity must include AgentService, the Transit Hub capability, and tenant membership. Each tool call must specify the tenant and pass the same authorization path as a human request. Agent Lee must not infer tenant context from conversation alone when a tool mutation or private lookup is involved. The tool contract must carry a resolved tenant identifier and authorization evidence.

## Guided lab

1. Create two GUIDs representing Tenant A and Tenant B.
2. Authenticate the development identity for Tenant A.
3. Request Tenant A and call `/api/security/tenant-member`; expect HTTP 200.
4. Keep the identity tenant as A but request Tenant B; expect HTTP 403.
5. Remove one request tenant header; expect HTTP 400 from tenant resolution.
6. Remove identity headers; expect HTTP 401 from the protected endpoint.
7. Explain which component produced each status.

## Operational troubleshooting

A 400 indicates malformed request context. A 401 indicates missing or failed authentication. A 403 indicates a valid identity that did not satisfy the policy. A 404 may be used later to reduce resource enumeration, but the internal receipt should still record the actual authorization result. Logs must never reveal another tenant’s record content while reporting a denial.

## Agent Lee proctor instructions

Require a complete spoken trace of authentication, tenant resolution, policy evaluation, and controller execution. Present a mismatched-tenant scenario and ask the learner to predict the status code and evidence source. The learner must state that request-level authorization is necessary but not sufficient for production isolation.
