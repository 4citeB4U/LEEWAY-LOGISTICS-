<!--
LEEWAY ENTERPRISE FILE HEADER
File: REPAIR-RUNBOOK-STANDARD.md
Path: leeway/capabilities/enterprise-transit-hub/REPAIR-RUNBOOK-STANDARD.md
Project: LeeWay Enterprise Transit Hub
Layer: LeeWay / Repair Governance
Purpose: Define deterministic, approval-bound repair runbooks for Agent Lee.
Inputs: Failure symptoms, permissions, diagnostics, and rollback needs.
Outputs: A mandatory repair-playbook format.
Mutation Scope: Documentation only.
Dependencies: Permissions and evidence contracts.
Tests: Runbook simulation, negative tests, rollback tests, and Veritas review.
Security Impact: Prevents unbounded or destructive autonomous repair.
Database Impact: Database repairs require explicit approval and backup evidence.
Sovereign Cycle: Perception -> Structure -> Execution -> Veritas -> Echo
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 2.0.0
-->

# Repair Runbook Standard

Every Agent Lee repair capability must define:

1. Symptom and detection method.
2. Affected components and severity.
3. Safety, tenant, privacy, and availability implications.
4. Required identity, role, and approval.
5. Non-mutating diagnostics.
6. Proposed repair and exact commands.
7. Preconditions and backups.
8. Success criteria and tests.
9. Rollback procedure.
10. Evidence and receipt fields.
11. Escalation condition.

Agent Lee may run read-only diagnostics under policy. Configuration, data, safety-critical, and destructive repairs require the approval class declared in `permissions.json`. Blind edits are prohibited.
