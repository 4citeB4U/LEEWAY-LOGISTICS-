<!--
LEEWAY ENTERPRISE FILE HEADER
File: CHAPTER-32-DATABASE-ISOLATION-HEALTH-AND-RECOVERY.md
Path: docs/training-manual/12-troubleshooting-reference/CHAPTER-32-DATABASE-ISOLATION-HEALTH-AND-RECOVERY.md
Project: LeeWay Enterprise Transit Hub
Layer: Training / Commercial Manual
Purpose: Provides diagnostic paths for connectivity, migration, RLS, pooling, tenant context, and backup failures.
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
# Chapter 32 — Database isolation, health, and recovery

A healthy process does not prove a healthy database. The database readiness endpoint uses EF Core `CanConnectAsync`. Cross-tenant behavior is verified separately. Troubleshooting begins with Docker ownership, container logs, engine version, database objects, session context, security policy state, application configuration, and the exact failed evidence gate.

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
## Troubleshooting starts with classification

Do not begin by restarting or deleting resources. First classify the symptom. A connection refusal, login failure, migration mismatch, empty tenant result, forbidden cross-tenant request, slow query, failed backup, and corrupted database represent different failure classes. Each class has different evidence and repair authority.

The initial diagnostic record should include time, environment, tenant, caller identity, request or correlation ID, endpoint, expected result, actual result, recent deployment, database and container state, and the exact failed gate. Passwords, tokens, full connection strings, student data, passenger data, and customer secrets must be redacted.

## Layered health model

Use a layered model rather than one green or red light:

1. Host health: disk, memory, CPU, time, and network are adequate.
2. Docker health: the engine responds and the owned container exists.
3. Process health: SQL Server remains running and has not restarted unexpectedly.
4. Engine readiness: an authenticated `SELECT 1` succeeds.
5. Schema health: migration history and required objects match the release.
6. Security health: logins, grants, session context, and RLS policy are correct.
7. Application health: the restricted runtime connection succeeds.
8. Business health: tenant-specific vehicle and work-order workflows behave correctly.
9. Recovery health: a recent backup is verified and a restore drill is current.

The layer where evidence first fails usually identifies the correct repair lane.

## Connection troubleshooting

For a refused connection, confirm the container is running, host port mapping is correct, SQL Server finished startup, and no other service owns the port. Inspect container logs for licensing, password-policy, storage, and recovery messages. Confirm the client uses the correct host, port, encryption settings, database, and login.

For login failure, test with the intended identity. Do not switch the application to `sa` just to make the error disappear. Verify that the login exists, maps to the database user, is enabled, and has the expected permissions. A migration login working while the app login fails is valuable evidence that the engine is healthy but runtime provisioning is incomplete.

For pool-related tenant problems, capture the session-context value on the same connection used by the failing command. Confirm the connection interceptor runs whenever a connection opens and replaces any prior tenant value. The safe default for missing context is no rows or denied writes.

## Migration troubleshooting

When migration application fails, preserve the generated SQL and error output. Compare the model snapshot, migration history table, and actual schema. Determine whether the failure happened before or after a transactional boundary. Do not repeatedly rerun a partially applied non-idempotent script without understanding its state.

Common causes include insufficient migration permissions, existing objects, unsupported SQL syntax, locked tables, data that violates a new constraint, and application/database version mismatch. A repair may require a forward-only corrective migration rather than editing an already published migration.

## Row-level security troubleshooting

If a tenant sees no rows, verify tenant resolution, authorization, DbContext scope, session context, policy enabled state, and predicate logic. Empty results can be correct when the tenant has no data, so compare against a controlled test row.

If cross-tenant data appears, treat it as a security incident. Stop the affected data path, preserve logs, identify the scope, and verify whether the response actually crossed the tenant boundary. Inspect EF filters, any `IgnoreQueryFilters` use, raw SQL, session context, RLS policy binding, login privileges, and cached responses. Do not hide the symptom by deleting evidence.

Use a restricted application login during the test. A database owner can bypass or alter controls and therefore does not represent production runtime behavior. Verify both read filtering and write blocking. A test that only reads data cannot prove that cross-tenant inserts are rejected.

## Work-order relationship failures

A cross-tenant vehicle reference should be rejected before persistence and again by relational constraints or RLS. If the API returns success but no row is written, investigate transaction handling and response generation. If a row is written, preserve the IDs and inspect composite foreign keys, tenant values, repository lookup, and session context.

A same-tenant work order that fails may indicate a missing vehicle, wrong tenant code, stale context, invalid status, or migration mismatch. The error response should avoid exposing another tenant's identifiers.

## Backup troubleshooting

A backup command can fail because the path is unavailable, SQL Server lacks filesystem permission, storage is full, compression or checksum is unsupported, or the database is in an unsuitable state. Capture SQL output and container storage information. Do not delete the active volume to make space without an approved recovery plan.

A copied `.bak` file must retain the expected size and SHA-256. Verification failure means the backup cannot be accepted as recovery evidence. Even a successful `RESTORE VERIFYONLY` should be followed by scheduled restore drills. Recovery readiness is measured by successful restoration of service, not by the existence of backup files.

## Performance troubleshooting

Slow operations require query duration, execution plan, row counts, indexes, blocking, waits, resource utilization, and tenant distribution. Avoid guessing that every delay is a database problem. A slow external integration, oversized API response, synchronous logging, or exhausted application thread pool can produce similar symptoms.

Tenant-aware indexes normally begin with `TenantId` when queries are scoped by tenant, but exact column order depends on filters and sorting. Validate with representative data. One very large tenant may require a dedicated database or deployment stamp even when the shared model works for smaller customers.

## Agent Lee diagnostic boundaries

Agent Lee may collect read-only health data, correlate receipts, explain the failure class, and propose a ranked repair plan. It may execute an approved non-destructive probe through the capability package. It must not reveal connection secrets, bypass tenant authorization, disable RLS, use migration credentials for routine queries, delete volumes, drop databases, or restore over active customer data without explicit human authority.

A repair recommendation must include expected impact, permissions, commands or tool calls, success criteria, rollback, and evidence location. When evidence is insufficient, Agent Lee should say so and escalate rather than manufacture certainty.

## Incident playbook

For a suspected cross-tenant exposure:

1. Disable or isolate the affected endpoint without destroying data.
2. Preserve application, database, proxy, and receipt evidence.
3. Record the detected tenants, time range, and data classes.
4. Rotate compromised credentials when indicated.
5. Reproduce in an isolated environment using controlled records.
6. Identify the failed control layer.
7. Patch the defect and add a regression test.
8. Validate EF filtering, session context, RLS, authorization, and caching.
9. Conduct required legal, contractual, and customer notification review.
10. Restore service through an approved change with heightened monitoring.
11. Publish an internal post-incident report and update training.

## Recovery decision tree

Use restart only when the failure is transient and state is safe. Use migration repair when schema and release disagree. Use credential repair when the engine is healthy but the intended login cannot connect. Use restore when data is corrupted or a governed rollback requires a known recovery point. Use a new isolated database when forensic preservation or uncertainty makes in-place repair unsafe.

Every path ends with business verification: tenant-scoped reads, authorized writes, denied cross-tenant actions, health checks, receipts, and operator sign-off.

## Practical assessment

Given a scenario where Tenant A receives an empty vehicle list after a deployment, the learner must produce a diagnostic plan without making a mutation. The plan should inspect identity, request tenant headers, middleware resolution, authorization, current tenant context, connection string selection, migration state, session context, RLS policy, and controlled database rows. The learner must specify which evidence would distinguish a legitimate empty tenant from a configuration defect.
