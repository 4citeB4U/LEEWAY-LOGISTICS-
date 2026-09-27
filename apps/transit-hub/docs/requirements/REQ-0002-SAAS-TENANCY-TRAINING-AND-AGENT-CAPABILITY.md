<!--
LEEWAY ENTERPRISE FILE HEADER
File: REQ-0002-SAAS-TENANCY-TRAINING-AND-AGENT-CAPABILITY.md
Path: docs/requirements/REQ-0002-SAAS-TENANCY-TRAINING-AND-AGENT-CAPABILITY.md
Project: LeeWay Enterprise Transit Hub
Layer: Requirements / Product Foundation
Purpose: Define testable Phase 02 SaaS, training, and Agent Lee requirements.
Inputs: Commercial directive and LeeWay Standards.
Outputs: Traceable acceptance criteria.
Mutation Scope: Documentation only.
Dependencies: Product charter, ADRs, source, tests, and capability package.
Tests: Automated build, tests, endpoints, governance, and manual review.
Security Impact: Requires explicit tenant and agent boundaries.
Database Impact: Defers production isolation until database phase.
Sovereign Cycle: Perception -> Origin -> Structure -> Veritas
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 2.0.0
-->

# REQ-0002 — SaaS Tenancy, Training, and Agent Capability Foundation

## Requirement

The Transit Hub shall operate as a LeeWay commercial B2B SaaS product while remaining interview-defensible and teachable. Tenant must be a first-class domain concept. Agent Lee shall remain external to the application and use a governed capability package. A controlled 300-page manual and role-based training system shall be release requirements.

## Acceptance criteria

- Tenant, organization unit, deployment profile, and tenant-owned contracts compile and pass tests.
- HTTP requests may resolve a scoped tenant context from development headers without forcing current untenantized endpoints to fail.
- `/api/platform/profile` reports commercial, LeeWay, training, and external-orchestrator identity.
- `/api/platform/tenant-context` reports unresolved context without headers and resolved context with valid headers.
- Agent Lee capability, tool, permission, knowledge, proctor, health, evidence, degraded-mode, and repair standards exist.
- Manual page allocations total exactly 300 pages.
- Documentation clearly states that operational data isolation is not complete until persistence and authorization phases pass.
- Build, unit, integration, regression, security, architecture, runtime, governance, and receipt gates pass.
