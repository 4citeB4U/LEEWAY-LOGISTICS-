<!--
LEEWAY ENTERPRISE FILE HEADER
File: SECRET-ROTATION-AND-REDACTION-RUNBOOK.md
Path: operations/powershell/security/SECRET-ROTATION-AND-REDACTION-RUNBOOK.md
Project: LeeWay Enterprise Transit Hub
Layer: Operations / Security Runbook
Purpose: Define credential rotation, evidence redaction, validation, and incident-response steps.
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

# Secret Rotation and Redaction Runbook

## Purpose

This runbook is used when a development credential may have appeared in a terminal transcript, evidence log, screen recording, chat, or ticket. The response is to rotate the credential, update the approved development secret store, verify the old credential is rejected, verify the new credential works, and prove that no new evidence contains the secret.

## Rules

1. Never print a password in a command display.
2. Never place a password in a repository file, receipt, test result, or training manual.
3. Treat a credential as exposed when it appears in any uncontrolled output, even if the database is local.
4. Preserve the fact of rotation, the principal name, the time, and pass/fail evidence; do not preserve the password or a reversible derivative.
5. Production deployments require a managed secret vault and workload identity rather than .NET Secret Manager.

## Verification

A complete rotation proves that the new credential authenticates, the old credential fails, the application reconnects, the database health endpoint passes, and evidence scanning finds no sensitive value.
