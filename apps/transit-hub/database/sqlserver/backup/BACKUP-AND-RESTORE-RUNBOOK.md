<!--
LEEWAY ENTERPRISE FILE HEADER
File: BACKUP-AND-RESTORE-RUNBOOK.md
Path: database/sqlserver/backup/BACKUP-AND-RESTORE-RUNBOOK.md
Project: LeeWay Enterprise Transit Hub
Layer: Database / Recovery
Purpose: Define development backup, verification, restore-test, retention, and evidence rules.
Inputs: Governed source, runtime evidence, and approved product requirements.
Outputs: Versioned product, learning, or evidence artifact.
Mutation Scope: The owning artifact only.
Dependencies: Phase 04 FULL PASS and LeeWay governance.
Tests: Parse, source verification, continuous-learning gate, and phase runtime evidence.
Security Impact: Backup files may contain tenant data and must never enter source control.
Database Impact: Backs up LeeWayTransitHub to a container-visible .bak file.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 5.0.0
-->
# SQL Server backup and restore runbook

Phase 05 creates a full development backup after migration and runtime tests. The installer verifies the backup through `RESTORE VERIFYONLY` and records only metadata and SHA-256 evidence outside source control. Production recovery will require encrypted backup storage, retention policies, restore drills, recovery objectives, and tenant/legal review.

## Required evidence

1. Database name and SQL Server engine version.
2. Backup start and finish timestamps.
3. Backup file size and SHA-256.
4. `RESTORE VERIFYONLY` success.
5. Container image digest and persistent-volume name.
6. No plaintext passwords in logs or receipts.
