<!--
LEEWAY ENTERPRISE FILE HEADER
File: REQ-0004-IDENTITY-AUTHORIZATION-AND-CONTINUOUS-LEARNING.md
Path: docs/requirements/REQ-0004-IDENTITY-AUTHORIZATION-AND-CONTINUOUS-LEARNING.md
Project: LeeWay Enterprise Transit Hub
Layer: Requirements / Phase 04
Purpose: Define Phase 04 requirements for identity-provider-neutral authentication evidence, roles, permissions, tenant-aware authorization, Agent Lee service identity, and continuous learning.
Inputs: Product charter, tenancy foundation, LeeWay capability package, and training requirements.
Outputs: Testable functional, security, documentation, and evidence requirements.
Mutation Scope: Requirements only.
Dependencies: Phase 04 implementation and official ASP.NET Core security guidance.
Tests: Build, 35+ tests, runtime 401/403/200 checks, manual build, learning gate, governance, and receipt.
Security Impact: Requires fail-closed identity and authorization without claiming production readiness.
Database Impact: No database mutation.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 4.0.0
-->

# REQ-0004 — Identity, Authorization, and Continuous Learning

## Functional requirements

- Canonical roles, permissions, claims, and policy names shall be represented in provider-neutral application contracts.
- A development-only authentication scheme shall create deterministic test identities and shall return no identity outside Development.
- Protected endpoints shall demonstrate authenticated, tenant-member, fleet-read, fleet-manage, and AgentService capability policies.
- Identity tenant claims shall match the resolved request tenant before tenant-scoped authorization succeeds.
- AgentService shall not inherit platform administration.

## Continuous learning requirements

- Phase 04 shall add Lesson 04, a private workbook, twelve questions, answer rubrics, a family teaching plan, four commercial manual chapters, Agent Lee knowledge updates, and architecture tests.
- Every future implementation phase shall update the learning registry and pass the continuous-learning verifier.
- Commercial and private learning shall remain separated.

## Truth constraints

Phase 04 shall not claim a production identity provider, production account lifecycle, production token validation, final tenant database isolation, completed 300-page manual, or unrestricted Agent Lee authority.
