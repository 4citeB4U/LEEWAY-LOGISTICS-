<!--
LEEWAY ENTERPRISE FILE HEADER
File: ADR-0006-IDENTITY-PROVIDER-NEUTRAL-AUTHORIZATION.md
Path: docs/architecture/ADR-0006-IDENTITY-PROVIDER-NEUTRAL-AUTHORIZATION.md
Project: LeeWay Enterprise Transit Hub
Layer: Architecture Decision Record
Purpose: Record the decision to separate canonical Transit Hub authorization contracts from the eventual production identity provider.
Inputs: SaaS roles, tenant boundaries, ASP.NET Core security model, Agent Lee service identity, and deployment requirements.
Outputs: Accepted architecture decision, consequences, and deferred production choices.
Mutation Scope: Architecture documentation only.
Dependencies: REQ-0004, security contracts, tenancy ADR, and LeeWay capability boundaries.
Tests: Architecture tests, runtime authorization checks, and human review.
Security Impact: Avoids provider lock-in while requiring trusted production authentication before release.
Database Impact: None.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 4.0.0
-->

# ADR-0006 — Identity-Provider-Neutral Authorization

## Status

Accepted for Phase 04 foundation.

## Decision

The Transit Hub owns canonical roles, permissions, custom claim names, and policy names. A production identity provider will authenticate subjects and map trusted external identity data into those application contracts. Phase 04 uses a Development-only header handler solely to prove policy behavior.

Agent Lee authenticates as an external service identity with AgentService, explicit Transit Hub capability, tenant membership, and least-privilege permissions. Agent Lee is not embedded and receives no hidden bypass.

## Consequences

Controllers and application contracts are not tied to one identity vendor. Multiple enterprise identity providers can be supported through explicit mapping. Production deployment remains blocked until a trusted provider, secure token or session validation, user lifecycle, role assignment persistence, revocation, monitoring, and security review are completed.

The middleware order is authentication, tenant resolution, authorization, then endpoint execution. Resource-specific decisions will later use imperative resource authorization after tenant-filtered retrieval.
