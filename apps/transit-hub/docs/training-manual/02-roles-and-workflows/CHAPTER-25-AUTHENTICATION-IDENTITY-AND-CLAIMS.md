<!--
LEEWAY ENTERPRISE FILE HEADER
File: CHAPTER-25-AUTHENTICATION-IDENTITY-AND-CLAIMS.md
Path: docs/training-manual/02-roles-and-workflows/CHAPTER-25-AUTHENTICATION-IDENTITY-AND-CLAIMS.md
Project: LeeWay Enterprise Transit Hub
Layer: Training Manual / Governed Chapter
Purpose: Teach Chapter 25 — Authentication, Identity, and Claims with role-specific procedures, evidence, exercises, and Agent Lee proctor guidance.
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

# Chapter 25 — Authentication, Identity, and Claims

## Purpose

This chapter teaches operators, administrators, developers, support specialists, and LeeWay agents how the Transit Hub establishes identity before it makes an authorization decision. Authentication answers **who or what is making the request**. Authorization answers **what that authenticated subject may do**. These are related but separate controls. A valid sign-in does not create unlimited authority, and an authorization policy cannot operate correctly when the identity is unknown or untrusted.

## Audience and prerequisites

The audience includes tenant owners, technical administrators, support staff, developers, security reviewers, and Agent Lee proctors. Learners should understand tenants, organization units, HTTP requests, and the Phase 02 tenant context. Before using this chapter in a production implementation, the organization must select and configure a trusted identity provider. The Phase 04 development header scheme is evidence instrumentation only. It exists to prove claim and policy behavior without pretending that a production login system already exists.

## Learning objectives

After completing this chapter, a learner should be able to:

1. Distinguish authentication from authorization.
2. Explain users, service identities, claims, roles, permissions, and capabilities.
3. Trace how an ASP.NET Core authentication scheme produces a `ClaimsPrincipal`.
4. Explain why development header authentication is disabled outside Development.
5. Identify the evidence still required before production identity can be claimed.

## Business context

Transportation companies have many types of actors. A driver may report a defect, a dispatcher may assign work, a mechanic may complete a repair, a safety manager may review an incident, a tenant owner may administer users, and Agent Lee may call an approved tool as a service identity. The system must know which actor is present and preserve that identity in evidence. Shared accounts and untraceable service credentials defeat auditability. The same person may also have different authority in different tenants, so identity must be combined with tenant membership and current context.

## Identity vocabulary

A **subject** is the user, service, device, or agent requesting access. An **identity provider** verifies the subject and issues trusted identity information. A **claim** is a name-value statement about the subject, such as a subject identifier, role, tenant identifier, or capability. A **role** groups organizational responsibility. A **permission** names an allowed class of operation. A **capability** identifies a specific external tool package or service boundary. A **ClaimsPrincipal** is the .NET representation of the current subject and its identities and claims.

The Transit Hub uses standard claim types for subject ID, user name, and roles. It also defines explicit custom claim types for tenant ID, tenant code, permission, and LeeWay capability. These claim names are constants in `TransitClaimTypes.cs` so endpoints and policies cannot drift through inconsistent spelling.

## Authentication request flow

The Phase 04 development flow is:

```text
HTTP request
  -> DevelopmentHeaderAuthenticationHandler
  -> validate required development identity headers
  -> normalize known roles
  -> derive permission claims from the governed role matrix
  -> construct ClaimsIdentity
  -> construct ClaimsPrincipal
  -> store principal on HttpContext.User
  -> tenant resolution
  -> authorization policies
  -> controller action
```

The handler returns one of three outcomes. **Success** means a valid development identity was constructed. **No result** means no identity was supplied or the scheme is disabled outside Development. **Failure** means headers were supplied but were incomplete, malformed, or contained an unknown role. These outcomes are intentionally distinct. Missing credentials should cause a protected endpoint to challenge with HTTP 401. Invalid credentials should also fail authentication. A valid identity that lacks permission should reach authorization and receive HTTP 403.

## Why the development scheme is not production identity

The header scheme trusts process-local development requests and therefore is unsuitable for a public network. A client capable of setting arbitrary headers could impersonate another subject. The handler reduces accidental misuse by refusing to run outside the Development environment, but that does not make it a secure production sign-in system. Production identity requires a trusted issuer, signed and validated tokens or secure server-managed sessions, key rotation, issuer and audience validation, expiration handling, account lifecycle, multifactor policy where required, revocation behavior, and operational monitoring.

The provider-neutral design allows a later OpenID Connect or OAuth 2.0 compatible identity provider to issue the same logical roles and custom claims. The controllers and policy names should not need to know whether the issuer is Microsoft Entra ID, another enterprise identity provider, or a customer-specific federated authority. The mapping layer must translate external group or scope information into the Transit Hub’s canonical claims and must be tested for each supported provider.

## User identities and service identities

A user identity represents a human operator. A service identity represents software acting within a controlled assignment. Agent Lee uses a service identity, not a hidden administrator account. The role `AgentService` identifies the class of subject, while the capability claim `leeway.enterprise-transit-hub` proves that the identity was granted this specific tool package. The service identity still needs a tenant claim that matches the current tenant context. It does not receive platform administration merely because Agent Lee is the orchestrator.

Service identities require separate credentials, separate rotation, narrower permissions, and detailed receipts. A service identity must never reuse a human user’s credentials. Human approval must be represented separately when an action requires it. The application should record both the requesting service identity and the authorizing human identity when they differ.

## Evidence and troubleshooting

When authentication fails, inspect the HTTP status, environment name, configured scheme, authentication logs, and supplied headers or token metadata. Do not log secrets, raw access tokens, passwords, or full confidential claims. Safe evidence includes the scheme name, subject identifier, tenant identifier, role names, policy name, result classification, correlation ID, and timestamp.

Common mistakes include confusing a role with a permission, treating tenant headers as authentication, trusting UI state, enabling development authentication in production, and assigning one powerful role to avoid designing policies. Each mistake creates either excessive authority or false confidence.

## Guided lab

1. Start the API in Development using the governed Phase 04 script.
2. Call `/api/security/whoami` without identity headers and observe HTTP 401.
3. Supply a valid user ID, name, role, identity tenant ID, and identity tenant code.
4. Confirm the response shows the canonical role and `DEVELOPMENT_ONLY_HEADER_AUTHENTICATION` evidence mode.
5. Change the role to an unknown value and verify authentication fails.
6. Explain why the same header technique must not be exposed as production sign-in.

## Knowledge check

Explain the difference between 401 and 403. Describe the minimum evidence required before replacing `productionIdentityBound = false` with a production-ready status. Identify which claims belong to the identity provider and which values are resolved by the application request boundary.

## Agent Lee proctor instructions

Agent Lee must require the learner to trace a request from the handler to `HttpContext.User`, then distinguish authentication evidence from authorization evidence. The learner does not pass by reciting definitions alone. The learner must identify the development-only boundary and must not claim that Phase 04 created a production identity provider.
