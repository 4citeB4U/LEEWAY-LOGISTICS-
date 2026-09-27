<!--
LEEWAY ENTERPRISE FILE HEADER
File: CHAPTER-33-CREDENTIAL-ROTATION-AND-SECRET-SAFE-AUTOMATION.md
Path: docs/training-manual/11-technical-administration/CHAPTER-33-CREDENTIAL-ROTATION-AND-SECRET-SAFE-AUTOMATION.md
Project: LeeWay Enterprise Transit Hub
Layer: Commercial Training Manual
Purpose: Teach credential rotation and secret-safe automation for the version-matched commercial product.
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
Version: 6.0.12
-->

# Chapter 33 - Credential Rotation and Secret-Safe Automation
## Purpose and audience

This chapter teaches technical administrators, security reviewers, and support engineers how Phase 06 behaves, why each boundary exists, and how to verify the behavior without exposing credentials or crossing tenant boundaries. The material applies to the development product baseline and must not be represented as a production secret-vault or global realtime deployment.
## Business context

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant.

### Business context review 1

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Business context review 2

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Business context review 3

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Business context review 4

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Core vocabulary

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer.

### Core vocabulary review 1

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Core vocabulary review 2

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Core vocabulary review 3

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Core vocabulary review 4

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Architecture

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds.

### Architecture review 1

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Architecture review 2

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Architecture review 3

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Architecture review 4

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Procedure

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence.

### Procedure review 1

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Procedure review 2

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Procedure review 3

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Procedure review 4

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Security controls

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities.

### Security controls review 1

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Security controls review 2

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Security controls review 3

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Security controls review 4

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Troubleshooting

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction.

### Troubleshooting review 1

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Troubleshooting review 2

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Troubleshooting review 3

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Troubleshooting review 4

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Guided lab

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words.

### Guided lab review 1

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Guided lab review 2

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Guided lab review 3

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Guided lab review 4

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Common mistakes

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test.

### Common mistakes review 1

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Common mistakes review 2

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Common mistakes review 3

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Common mistakes review 4

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Agent Lee support

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations.

### Agent Lee support review 1

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Agent Lee support review 2

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Agent Lee support review 3

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Agent Lee support review 4

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Completion evidence

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt.

### Completion evidence review 1

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Completion evidence review 2

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Completion evidence review 3

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Completion evidence review 4

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Knowledge check

1. Which layer owns tenant identity?
2. Why does persistence occur before notification?
3. What proves that old credentials are invalid?
4. Why is a tenant SignalR group not a substitute for SQL RLS?
5. Which production capabilities remain deferred?

## Practical assessment

Complete the guided lab, submit source references, include runtime status codes, and explain the rollback boundary. The instructor scores technical accuracy, evidence, security awareness, and professional explanation.


## Pre-mutation migration-model validation

Before a release rotates credentials or changes the schema, operators must prove that the EF Core design-time model matches the governed model snapshot. The Transit Hub runs a no-mutation snapshot check after compilation. If pending model changes are detected, the release stops before credential or database mutation.

The check does not replace database validation. After alignment passes, the release still applies the migration, verifies SQL objects and row-level-security predicates, runs integration tests, and creates a verified backup.


## Dedicated migration identity verification

Temporary database authority is effective only when the migration process connects through the same principal that received the grant. Administrators must verify both role membership and connection selection. LeeWay Transit Hub now selects `TransitHubSqlServerMigration` only for the explicit `--migrate` execution mode and selects the restricted `TransitHubSqlServer` connection for ordinary application runtime. A successful role-membership query by itself is insufficient evidence; the migration execution, post-migration revocation, and runtime least-privilege probes must all pass.

Before temporary elevation, the release workflow performs a migration-principal runtime probe. The probe opens the actual EF Core connection and verifies `ORIGINAL_LOGIN()` against the expected dedicated migration principal. This prevents authority from being granted to one user while the migration executes as another.

## Database readiness after SQL Server container recreation

Technical administrators must distinguish engine readiness from application-database readiness. A container restart can complete far enough for an administrator to connect to `master` while an attached database is still in `RECOVERING`, `RECOVERY_PENDING`, or another state that prevents normal application access. Testing an application login immediately after the first successful administrator probe can therefore produce a false credential failure.

The governed startup sequence is:

1. Authenticate `sa` explicitly to `master`.
2. Query `sys.databases` until `LeeWayTransitHub` reports `ONLINE` and `MULTI_USER`.
3. Authenticate `transithub_app` explicitly to `LeeWayTransitHub`.
4. Authenticate `transithub_migrator` explicitly to `LeeWayTransitHub`.
5. Use bounded retries and preserve sanitized diagnostic evidence when the deadline is exceeded.

Do not lower the gate by connecting every principal only to `master`. The product must prove that each restricted principal can open the actual application database it is expected to use. Do not rely only on a login's default database because that hides which database the evidence probe intended to validate.

### Troubleshooting decision table

| Observation | Interpretation | Action |
|---|---|---|
| `sa` cannot connect to `master` | Engine or credential not ready | Continue bounded engine readiness polling |
| `sa` connects, database is not `ONLINE` | User database still recovering or unavailable | Continue database-state polling; do not rotate again |
| Database is `ONLINE`, application login fails | Real login mapping, permission, or password problem | Inspect sanitized SQL error evidence |
| Database is `ONLINE`, login succeeds after retry | Transient startup race resolved | Record readiness duration and continue |
| Deadline expires | Readiness contract failed | Stop, preserve evidence, and leave canonical publication unchanged |

## Backup execution authority after migration

Do not assume that the migration identity is also the backup identity. In the development release workflow, the migration identity is elevated only long enough to apply the governed EF migration. The release then removes `db_owner` and proves that the identity has no database `CONTROL` and no `BACKUP DATABASE` permission.

The transactional installer administrator creates the pre-migration and post-migration backups and also runs `RESTORE VERIFYONLY`. This is a bounded development workflow, not the final production backup architecture. Production environments should use a dedicated backup service identity, managed secret storage, encrypted backup destinations, retention policy, restore drills, and separation of duties.

### Required evidence

- Backup command executed by the declared backup authority.
- `WITH CHECKSUM` included in the backup operation.
- `RESTORE VERIFYONLY ... WITH CHECKSUM` completed successfully.
- Backup file copied into the phase evidence directory.
- SHA-256 recorded in the phase receipt.
- Migrator `db_owner`, database `CONTROL`, and `BACKUP DATABASE` permissions proven absent after migration.

