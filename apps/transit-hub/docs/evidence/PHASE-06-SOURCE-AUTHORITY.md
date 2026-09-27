<!--
LEEWAY ENTERPRISE FILE HEADER
File: PHASE-06-SOURCE-AUTHORITY.md
Path: docs/evidence/PHASE-06-SOURCE-AUTHORITY.md
Project: LeeWay Enterprise Transit Hub
Layer: Evidence / Source Authority
Purpose: Record official source grounding separately from host-runtime proof.
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
Version: 6.0.13
-->

# Phase 06 Source Authority

- Microsoft SQL Server `ALTER LOGIN` governs development login password changes.
- Microsoft .NET data-redaction guidance establishes that sensitive data must not be written to logs in plaintext.
- ASP.NET Core SignalR provides server-to-client realtime messaging, connection management, tenant-capable groups, and transport fallback.
- SQL Server Row-Level Security remains the database enforcement layer for tenant-owned event rows.
- Host runtime, test, backup, credential rejection, and publication evidence are produced by the Phase 06 installer and are not inferred from documentation.


## Migration connection-selection authority

Phase 06 requires the API composition root to select `ConnectionStrings:TransitHubSqlServerMigration` when and only when it is invoked with `--migrate`. Runtime API execution remains bound to `ConnectionStrings:TransitHubSqlServer`. Architecture tests and the installer extraction gate verify this separation before database mutation.

## Runtime verifier repair authority

Phase 06 gate 11 must not read dynamic JSON properties before validating response status and collection shape. The governed installer now parses raw response content as hash tables, preserves empty arrays, unwraps only approved collection envelopes, performs case-insensitive required-property lookup, and records response hashes and counts. This repair changes the evidence harness and learning material; it does not change the operations-event API implementation or weaken tenant-isolation requirements.

## SQL restart-readiness authority

Microsoft SQL Server documents database state through `sys.databases.state_desc` and identifies `ONLINE` as the state in which a database is available for access. Microsoft error 4064 also documents that a login can fail when its default database is unavailable even though the SQL Server instance itself is reachable. Phase 06 therefore treats engine readiness, user-database readiness, and restricted-principal readiness as separate evidence gates.

## Backup authority and verification source grounding

SQL Server documents that `BACKUP DATABASE` permission is available to `sysadmin`, `db_owner`, and `db_backupoperator` by default. Phase 06 does not retain `db_owner` on the migration principal merely to make a backup succeed. The development installer uses its existing administrator authority to create the pre-migration and post-migration backups and to run `RESTORE VERIFYONLY`. The runtime evidence must separately prove that the migrator is no longer a member of `db_owner`, lacks database `CONTROL`, and lacks `BACKUP DATABASE` after migration.

