<!--
LEEWAY ENTERPRISE FILE HEADER
File: REQ-0005-SQL-SERVER-TENANT-PERSISTENCE-AND-LEARNING.md
Path: docs/requirements/REQ-0005-SQL-SERVER-TENANT-PERSISTENCE-AND-LEARNING.md
Project: LeeWay Enterprise Transit Hub
Layer: Requirements
Purpose: Define Phase 05 database, isolation, migration, backup, evidence, and continuous-learning acceptance criteria.
Inputs: Governed source, runtime evidence, and approved product requirements.
Outputs: Versioned product, learning, or evidence artifact.
Mutation Scope: The owning artifact only.
Dependencies: Phase 04 FULL PASS and LeeWay governance.
Tests: Parse, source verification, continuous-learning gate, and phase runtime evidence.
Security Impact: Requires no secrets in source and cross-tenant denial proof.
Database Impact: Requirements govern SQL Server activation.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 5.0.0
-->
# REQ-0005 — SQL Server tenant persistence and learning

Phase 05 passes only when the solution builds, all five test projects pass, a Microsoft SQL Server 2025 container is isolated and labeled, migrations apply, database health passes, tenant A cannot observe tenant B data, an invalid-tenant write is blocked, a full backup verifies, the manual and private learning materials update, and publication occurs atomically.

Production identity, production secrets, high availability, encryption-at-rest key management, all-module SQL persistence, and customer acceptance remain outside this phase.
