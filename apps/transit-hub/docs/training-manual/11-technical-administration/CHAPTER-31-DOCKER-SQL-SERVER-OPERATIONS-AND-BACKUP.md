<!--
LEEWAY ENTERPRISE FILE HEADER
File: CHAPTER-31-DOCKER-SQL-SERVER-OPERATIONS-AND-BACKUP.md
Path: docs/training-manual/11-technical-administration/CHAPTER-31-DOCKER-SQL-SERVER-OPERATIONS-AND-BACKUP.md
Project: LeeWay Enterprise Transit Hub
Layer: Training / Commercial Manual
Purpose: Teaches the isolated container, persistent volume, image digest, readiness, credentials, migration login, app login, backup, and rollback process.
Inputs: Governed source, runtime evidence, and approved product requirements.
Outputs: Versioned product, learning, or evidence artifact.
Mutation Scope: The owning artifact only.
Dependencies: Phase 04 FULL PASS and LeeWay governance.
Tests: Parse, source verification, continuous-learning gate, and phase runtime evidence.
Security Impact: Commercial training excludes passwords and private learner answers.
Database Impact: Teaches Phase 05 SQL Server behavior.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 5.0.0
-->
# Chapter 31 — Docker SQL Server operations and backup

The development container is product-labeled and uses a dedicated host port and named volume. The phase captures the pulled image digest, waits for SQL readiness, creates separate migration and application logins, applies migrations, verifies database health, creates a full backup, and runs `RESTORE VERIFYONLY`. Production architecture remains a separate decision.

## Learning objectives

After this chapter, the learner can explain the component boundary, trace one request, identify tenant controls, distinguish source guidance from runtime proof, and locate the recovery evidence.

## Business context

Transportation organizations require durable vehicle and maintenance history. Lost or cross-customer records can disrupt dispatch, safety, billing, customer trust, and legal evidence. The database design therefore treats tenant identity, recoverability, and auditability as first-class operational concerns.

## Practice and assessment

Trace a vehicle creation from HTTP headers through middleware, `ITenantContext`, `VehicleService`, `IVehicleRepository`, `SqlServerVehicleRepository`, EF Core, the SQL connection interceptor, RLS, and the `fleet.Vehicles` row. Explain which control would still protect data if one earlier control were accidentally bypassed.

## Common mistakes

- Putting a password in `appsettings.json` or source control.
- Assuming an EF query filter is a complete authorization system.
- Using one-column primary keys that allow cross-tenant foreign-key mistakes.
- Running migrations with the application login.
- Deleting a Docker volume without a verified backup.
- Calling an estimated manual page count a final published page count.

## Agent Lee proctor instructions

Agent Lee must ask the learner to cite the exact source file, test, and evidence receipt. It must not reveal private answer rubrics to commercial learners and must not execute a database mutation without the required role, tenant, approval, and receipt.
## Development resource ownership

The Phase 05 container and volume use fixed names and LeeWay labels. Fixed names make operations understandable, while labels prove which product and phase own the resources. The script must never delete a container or volume with the same name unless those ownership labels match. This prevents a cleanup routine from destroying an unrelated workload.

The SQL Server image tag is convenient for selection, but a tag can move. Runtime evidence therefore records the image ID and repository digest observed after the pull. The digest is the stronger identity for reproducing what was tested. A later production release should pin an approved digest and include vulnerability, license, and update review.

The named volume is mounted at SQL Server's data directory so database files survive container replacement. Persistence does not equal backup. A volume can be deleted, corrupted, encrypted by malware, or lost with its host. It also does not provide a historical restore point. The volume keeps active data; the backup supplies recoverable evidence at a known time.

## Readiness and health

A running container is not necessarily a ready database. SQL Server may still be starting, applying recovery, or rejecting logins. The phase waits by executing a real query through `sqlcmd`. It captures container logs when readiness fails. The application later exposes a separate database health endpoint that asks the configured DbContext whether it can connect.

These checks answer different questions:

- Docker state asks whether the container process is running.
- SQL readiness asks whether the engine accepts an authenticated query.
- Migration verification asks whether the expected schema exists.
- Application health asks whether the runtime identity and connection string work.
- Tenant-isolation tests ask whether the database enforces the intended boundary.

A green process health endpoint must never be presented as proof of tenant isolation or backup recoverability.

## Separate administrative identities

The `sa` credential is used only to bootstrap the isolated development environment. A migration login receives development schema authority so migrations and controlled SQL scripts can create objects. The application login receives only the permissions needed for normal runtime operations. It must not be able to alter RLS policies, create logins, change schema, or restore databases.

This separation limits the damage from an application defect or compromised runtime credential. It also makes permission tests meaningful. If the API uses the migration login, a successful query proves little about least privilege. The application connection must be tested with the application login.

Development credentials are generated at runtime. They must not appear in the repository, manual, logs, command transcript, receipts, or GitHub Actions artifacts. .NET user secrets keep local development settings outside source control, but they are not a production vault. Production will require a managed secret store, rotation, access logging, and an incident procedure.

## Migration discipline

A migration is a governed database change, not merely a generated file. Before applying one, the operator should review the model change, generated SQL, data-loss risk, lock duration, rollback strategy, backup state, and compatibility with the currently deployed application. The migration identity should be distinct from the runtime identity.

For a commercial SaaS product, migrations must account for larger datasets and rolling deployments. A destructive rename may need an expand-and-contract sequence: add the new column, deploy compatible code, backfill data, switch reads and writes, then remove the old column in a later release. This prevents an application/database version mismatch from taking the service offline.

The Phase 05 migration is a development foundation. It proves that schema creation, RLS, repositories, and tests can execute together. It does not yet prove zero-downtime production migration behavior.

## Backup procedure

The phase creates a full database backup inside the container, requests checksum validation, and runs `RESTORE VERIFYONLY`. It copies the `.bak` file into the evidence directory and calculates SHA-256. The receipt records the relative backup path, digest, database name, image identity, and verification status without recording passwords.

`RESTORE VERIFYONLY` checks that SQL Server can read the backup set and that it is structurally complete enough for verification. It is stronger than checking that a file exists, but it is not the same as performing a full restore and validating application behavior. A production recovery program must regularly restore into an isolated environment, run integrity checks, start the application, and verify critical workflows.

The backup must be protected separately from the active volume. Production requirements will include encryption, retention classes, off-host storage, access controls, immutability where appropriate, geographic strategy, and documented recovery point and recovery time objectives.

## Recovery procedure

A controlled development recovery follows this sequence:

1. Stop application writes or isolate the target environment.
2. Identify the exact backup using its receipt and SHA-256.
3. Confirm the destination instance, database names, paths, and capacity.
4. Preserve the current failed state when forensic investigation is required.
5. Restore into a new database or isolated instance first.
6. Run database consistency checks.
7. Apply required logins and security policies through governed scripts.
8. Start the application with the restored connection.
9. Verify health, tenant isolation, vehicle reads, and work-order relationships.
10. Obtain human approval before replacing an active environment.
11. Record the recovery receipt and retain all logs.

Agent Lee may guide and diagnose this procedure. It must not perform a destructive restore over customer data without explicit authority, a confirmed backup, an approved change window, and rollback evidence.

## Operator command categories

Read-only commands include inspecting container state, logs, image identity, volume metadata, SQL version, migration history, policy state, and backup metadata. Controlled mutation commands include starting or stopping the owned development container, applying an approved migration, creating a backup, and restoring into an isolated target. Destructive commands include deleting a volume, dropping a database, disabling RLS, or overwriting an active database. Those destructive actions require the highest approval class and should not be part of routine troubleshooting.

## Guided operations lab

The learner should locate the container by label, record its image digest, inspect the named volume, execute a readiness query, verify the application login lacks schema authority, create a test backup, run verification, copy it to evidence, and calculate its hash. The learner must then explain why each result is a separate piece of evidence and why none alone proves complete production readiness.

## Production gap statement

This phase does not claim high availability, failover clustering, managed cloud database operation, encrypted production backup, point-in-time restore, geo-replication, automated retention, capacity testing, or customer-specific recovery objectives. Those capabilities require later architecture decisions and operational proof.
