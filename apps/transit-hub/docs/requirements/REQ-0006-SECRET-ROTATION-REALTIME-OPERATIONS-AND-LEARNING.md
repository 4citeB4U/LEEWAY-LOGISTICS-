<!--
LEEWAY ENTERPRISE FILE HEADER
File: REQ-0006-SECRET-ROTATION-REALTIME-OPERATIONS-AND-LEARNING.md
Path: docs/requirements/REQ-0006-SECRET-ROTATION-REALTIME-OPERATIONS-AND-LEARNING.md
Project: LeeWay Enterprise Transit Hub
Layer: Requirements
Purpose: Define Phase 06 functional, security, evidence, learning, and rollback requirements.
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

# Phase 06 Requirements

- Rotate `sa`, `transithub_migrator`, and `transithub_app` development passwords.
- Never display old or new password values.
- Prove new credentials succeed and prior credentials fail.
- Persist tenant-owned operations events with EF Core and SQL Server RLS.
- Require explicit read and publish permissions.
- Map an authenticated SignalR hub at `/hubs/operations`.
- Join only the active tenant group and never broadcast globally.
- Update Lesson 06, four manual chapters, twelve questions, quizzes, answers, rubrics, Agent Lee knowledge, tests, and receipt.
- Preserve Phase 05 through staging rollback and pre-migration database backup.
