<!--
LEEWAY ENTERPRISE FILE HEADER
File: ADR-0008-SECRET-SAFE-AUTOMATION-AND-TENANT-REALTIME-EVENTS.md
Path: docs/architecture/ADR-0008-SECRET-SAFE-AUTOMATION-AND-TENANT-REALTIME-EVENTS.md
Project: LeeWay Enterprise Transit Hub
Layer: Architecture Decision Record
Purpose: Record the decision to rotate exposed development credentials, sanitize evidence, persist events before SignalR delivery, and use tenant groups.
Inputs: Governed Phase 06 implementation, tests, and evidence.
Outputs: Version-matched training, operating, or architecture guidance.
Mutation Scope: Documentation only.
Dependencies: Phase 05 host-runtime pass and Phase 06 source.
Tests: Documentation build, learning gate, JSON checks, and architecture tests.
Security Impact: Separates private learning from commercial material and prohibits secret disclosure.
Database Impact: Documents or governs only declared Phase 06 database behavior.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 6.0.0
-->

# ADR-0008: Secret-Safe Automation and Tenant Real-Time Events

## Decision

Rotate exposed SQL development credentials, keep replacements outside source, sanitize native-process output before evidence is written, persist operations events before notification, and use authenticated tenant-specific SignalR groups. The event table receives the same application filter and SQL RLS boundary as other tenant-owned data.

## Consequences

The system gains a durable realtime event foundation and a reusable secret-safe process standard. Credential rotation is intentionally not rolled back when later application verification fails because restoring an exposed credential would reintroduce the incident. Production vaulting, distributed backplanes, mobile push, and global scale remain separate decisions.
