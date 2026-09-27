<!--
LEEWAY ENTERPRISE FILE HEADER
File: SYSTEM-CONTEXT.md
Path: docs/architecture/SYSTEM-CONTEXT.md
Project: LeeWay Enterprise Transit Hub
Layer: Architecture Documentation
Purpose: Explain the system actors and major boundaries.
Inputs: Business roles and architecture.
Outputs: System context description.
Mutation Scope: Documentation only.
Dependencies: ADR-0001.
Tests: Architecture review.
Security Impact: Identifies trust boundaries.
Database Impact: Identifies persistence boundaries.
Sovereign Cycle: Perception -> Origin -> Structure
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.0
-->

# System Context

The Transit Hub serves dispatchers, maintenance staff, supervisors, customer-service representatives, administrators, auditors, and developers.

## System boundaries

- **Web:** browser operations dashboard.
- **API:** governed HTTP boundary.
- **Application:** use-case orchestration.
- **Domain:** transit business rules.
- **Infrastructure:** persistence adapters.
- **Integration:** Dataverse and Oracle boundaries.
- **Worker:** scheduled synchronization and health activity.
- **Governance:** receipts, stages, policy, and evidence.
