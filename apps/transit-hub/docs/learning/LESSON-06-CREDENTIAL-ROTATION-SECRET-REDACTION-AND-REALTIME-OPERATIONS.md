<!--
LEEWAY ENTERPRISE FILE HEADER
File: LESSON-06-CREDENTIAL-ROTATION-SECRET-REDACTION-AND-REALTIME-OPERATIONS.md
Path: docs/learning/LESSON-06-CREDENTIAL-ROTATION-SECRET-REDACTION-AND-REALTIME-OPERATIONS.md
Project: LeeWay Enterprise Transit Hub
Layer: Learning / Technical Lesson
Purpose: Teach credential incident response, secret-safe automation, persisted operations events, SQL RLS, and SignalR tenant groups.
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

# Lesson 06 - Credential Rotation, Secret Redaction, and Real-Time Operations

## Learning objective

Explain why a credential shown in a transcript must be rotated, how Phase 06 prevents secret-bearing command lines from entering evidence, and how a tenant-owned operations event moves from an authorized HTTP request through SQL Server and SignalR to the correct tenant group.

## The security repair

Phase 05 proved SQL Server persistence but its original execution transcript displayed generated development passwords. The correct response is not to hide the transcript or assume a local password is harmless. The correct response is to rotate every exposed login, update the approved development secret store, prove the prior password no longer authenticates, prove the replacement password works, recreate container metadata so it no longer carries the old SA value, and scan all new evidence for the sensitive values. Credential rotation is a security mutation that remains valid even when a later application gate fails.

## The real-time request path

```text
POST /api/operations/events
-> development or future production authentication
-> tenant resolution
-> OperationsPublish authorization policy
-> OperationsEventsController
-> OperationsEventService
-> IOperationsEventRepository
-> SQL Server operations.OperationsEvents
-> SQL Server tenant RLS
-> IOperationsNotifier
-> SignalROperationsNotifier
-> tenant:{TenantId}:operations SignalR group
-> authorized tenant clients
```

The tenant identifier is not accepted from the request body. It comes from the already resolved request context. This prevents callers from choosing another organization's tenant ID. The SQL record repeats TenantId because application filtering and database RLS are separate defenses.

## SignalR boundary

SignalR gives the server a controlled way to push an accepted event to connected clients. It does not remove authentication, authorization, tenant resolution, persistence, or receipts. The hub requires the OperationsRead policy. During connection, it verifies the tenant context and joins only the deterministic tenant group. The notifier uses `Clients.Group(...)`; it never uses `Clients.All`.

## Secret-safe automation

A secret-safe process wrapper receives real arguments in memory but shows only a redacted display command. It captures stdout and stderr, replaces every supplied sensitive value with `[REDACTED]`, writes the sanitized text to evidence, and throws an exception that names the logical operation without reproducing secret arguments. This allows evidence to remain useful without becoming a second credential leak.

## What is and is not complete

Completed in this phase: development login rotation, rejection of old credentials, persisted tenant operations events, RLS, authenticated SignalR negotiation, tenant group isolation, tests, training updates, and backup verification. Not completed: production secret vault, production identity, distributed SignalR backplane, mobile push notifications, GPS ingestion, or customer acceptance.

## File review order

1. `src/LeeWay.TransitHub.Domain/Operations/OperationsEvent.cs`
2. `src/LeeWay.TransitHub.Application/Services/OperationsEventService.cs`
3. `src/LeeWay.TransitHub.Infrastructure.SqlServer/Persistence/TransitHubDbContext.cs`
4. `src/LeeWay.TransitHub.Infrastructure.SqlServer/Repositories/SqlServerOperationsEventRepository.cs`
5. `src/LeeWay.TransitHub.Api/Controllers/OperationsEventsController.cs`
6. `src/LeeWay.TransitHub.Api/Hubs/OperationsHub.cs`
7. `src/LeeWay.TransitHub.Api/Realtime/SignalROperationsNotifier.cs`
8. `operations/powershell/security/SecretSafeProcess.psm1`
9. `tests/LeeWay.TransitHub.IntegrationTests/OperationsEventSqlServerIntegrationTests.cs`

## Professional explanation

> Phase 06 treated exposed development credentials as a security incident and rotated the SQL application, migration, and administrator passwords without writing replacements to logs. It then added a tenant-scoped operations event stream. Events are validated in the domain, persisted through a repository, protected by EF query filters and SQL Server RLS, and published through SignalR only to the matching tenant group. The design keeps the real-time transport outside the domain and application core through an `IOperationsNotifier` port.


## EF Core model-snapshot gate

EF Core migrations require the current relational model and the governed model snapshot to agree before `MigrateAsync` changes the database. A migration file alone is not sufficient. The snapshot must preserve the same nullability, concurrency, value-generation, table, key, index, and relationship metadata as `TransitHubDbContext`. In Phase 06 the operations-event rowversion is non-nullable, so the snapshot explicitly includes `IsRequired()` together with concurrency and generated-value metadata.

The API provides a no-mutation `--verify-model-snapshot` mode. The installer runs it after compilation and before credential or schema mutation. A failed alignment check stops the phase before higher-risk work starts. The later migration, SQL object probes, integration tests, and backup gates separately prove that the live database was updated correctly.

### Interview explanation

> EF Core compares the design-time relational model with the migration snapshot. Starting with EF Core 9, `Migrate` and `MigrateAsync` fail when pending model changes exist. I added a pre-mutation alignment gate and corrected the rowversion nullability metadata so migration can proceed only when the context and snapshot agree.


## Repair lesson: migration authority must match the connection actually used

A database user can be a verified member of `db_owner` and an EF Core migration can still receive `CREATE TABLE permission denied` when the application constructs its `DbContext` with a different connection string. Phase 06 encountered exactly that boundary: the installer elevated `transithub_migrator`, while the SQL Server service registration still selected the restricted runtime connection named `TransitHubSqlServer`.

The governed repair introduces an explicit `migrationMode` in the API composition root. When `--migrate` is present, dependency injection selects `ConnectionStrings:TransitHubSqlServerMigration`. Normal API startup continues to select `ConnectionStrings:TransitHubSqlServer`. This establishes three separate proofs:

1. The intended database user has temporary migration authority.
2. The migration process actually connects as that intended user.
3. The temporary role is revoked after migration, while runtime returns to the restricted application login.

Interview explanation: role membership is attached to a database principal, not to an abstract operation. Granting a role to one user cannot authorize a connection made as another user. Therefore, migration connection selection is part of the security boundary and must be tested in architecture, runtime, and evidence gates.

The installer also invokes `--verify-migration-principal` before granting temporary elevation. That mode opens the EF Core `DbContext`, queries `ORIGINAL_LOGIN()`, compares it to the expected migration principal supplied through configuration, and fails before migration when the wrong connection is selected.

## Repair study - verify API response shape before reading properties

A runtime verifier is application code with its own contract. It must verify the HTTP status, preserve the raw JSON body, parse the root shape, and only then inspect required fields. Directly piping an unknown response into `Where-Object` and reading `$_.subject` assumes every pipeline item is a non-null event object. Under strict mode, an empty, wrapped, or unexpected response can terminate the verifier even when the API and database behavior are correct.

The repaired Phase 06 verifier uses this sequence:

```text
Invoke-WebRequest
-> require HTTP 200
-> read Response.Content
-> ConvertFrom-Json -AsHashtable -NoEnumerate
-> normalize raw arrays, empty arrays, singleton objects, and approved envelopes
-> locate subject case-insensitively
-> compare the tenant-specific result
-> record counts and response hashes without storing the full response body
```

This does not weaken the test. It separates transport validation from business assertions. A malformed item still fails with a message that lists the parsed keys. An empty Tenant B collection is treated as zero events rather than as an object that must contain `subject`.

### Interview explanation

> The operations API and all sixty-eight tests passed, but the runtime harness made an unsafe dynamic-property assumption. I repaired the harness to validate status codes, parse raw JSON deterministically, normalize collection shapes, and access required fields case-insensitively. I also added pre-mutation parser self-tests and evidence hashes. This allowed the verifier to distinguish an empty tenant result from a malformed response without weakening tenant-isolation proof.

### Source files to inspect

1. The Phase 06 transactional installer, functions `ConvertFrom-LeeWayJsonCollection` and `Get-LeeWayJsonStringProperty`.
2. `src/LeeWay.TransitHub.Api/Controllers/OperationsEventsController.cs`.
3. `src/LeeWay.TransitHub.Application/Services/OperationsEventService.cs`.
4. `src/LeeWay.TransitHub.Infrastructure.SqlServer/Repositories/SqlServerOperationsEventRepository.cs`.
5. The Phase 06 runtime evidence receipt after a successful host run.

### Unscored study prompts

- Why is an HTTP 200 check separate from validating the JSON body?
- Why does an empty array prove something different from a missing `subject` field?
- Why should response hashes be recorded instead of copying full payloads into evidence?
- Why is strict mode useful even though it exposed this verifier defect?

## Repair checkpoint - SQL instance readiness versus user-database readiness

A SQL Server container can accept an administrator connection to `master` before an attached user database has completed recovery and reached `ONLINE` state. That means a successful `sa` probe proves the database engine is listening, but it does not yet prove that `LeeWayTransitHub` is available to logins whose default or requested database is `LeeWayTransitHub`.

The Phase 06 installer now separates three checks:

```text
SQL engine readiness
-> sa authenticates explicitly to master

User-database readiness
-> sys.databases reports LeeWayTransitHub as ONLINE and MULTI_USER

Application-principal readiness
-> transithub_app and transithub_migrator authenticate explicitly to LeeWayTransitHub with bounded retries
```

This distinction explains the gate 7 failure where the new application credential initially failed immediately after container recreation but succeeded during failure recovery a few seconds later. The password rotation was valid; the verifier raced the database recovery process.

### Interview explanation

> I separated instance readiness from database readiness. After a container restart, `sa` can connect to `master` while the application database is still recovering. The repaired gate queries `sys.databases` until the tenant database is `ONLINE` and `MULTI_USER`, then retries the restricted application and migration logins against that exact database. This prevents a transient startup condition from being misclassified as a credential-rotation failure.

### Knowledge check

1. What does a successful `sa` connection to `master` prove?
2. What does it not prove about `LeeWayTransitHub`?
3. Which catalog view exposes `state_desc` and `user_access_desc`?
4. Why should application-login verification specify the database explicitly?
5. Why are retries bounded instead of infinite?

## Repair checkpoint - migration authority is not backup authority

The Phase 06 migration principal receives temporary schema authority only for the migration window. After the migration, the installer removes `db_owner` and proves that the migrator has neither `db_owner` membership nor database `CONTROL`. That de-elevation is correct, but it also means the migrator must not be assumed to retain `BACKUP DATABASE` permission.

The governed backup sequence now uses the transactional installer administrator for both backup creation and `RESTORE VERIFYONLY`:

```text
Pre-migration backup
-> installer administrator creates backup with CHECKSUM
-> installer administrator runs RESTORE VERIFYONLY

Migration window
-> migrator receives temporary db_owner
-> EF migration runs through the dedicated migration connection
-> db_owner is removed immediately
-> migrator BACKUP DATABASE permission is proven absent

Post-migration backup
-> installer administrator creates backup with CHECKSUM
-> installer administrator runs RESTORE VERIFYONLY
```

This keeps responsibilities explicit. The migrator performs schema changes only during the bounded elevation window. The application principal performs ordinary runtime data operations. The transactional installer administrator performs recovery-critical backup and verification steps. A future production deployment should replace this development administrator workflow with a dedicated backup service identity and managed secret vault.

### Interview explanation

> I separated migration authority from backup authority. The migrator was correctly de-elevated after the EF migration, so using it for the final backup failed. I changed the release workflow so the transactional installer administrator creates and verifies both backups, while a post-migration permission probe proves that the migrator no longer has `db_owner`, database `CONTROL`, or `BACKUP DATABASE`. This preserves least privilege without weakening recovery evidence.

### Knowledge check

1. Why did the pre-migration backup succeed while the post-migration backup failed?
2. Which SQL Server roles normally provide `BACKUP DATABASE` permission?
3. Why should temporary `db_owner` membership not be retained just to support backups?
4. Which principal creates the Phase 06 development backups after this repair?
5. What production identity should eventually replace installer-level administrator backup authority?

