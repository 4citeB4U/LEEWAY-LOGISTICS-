<!--
LEEWAY ENTERPRISE FILE HEADER
File: PHASE-05-SOURCE-AUTHORITY.md
Path: docs/evidence/PHASE-05-SOURCE-AUTHORITY.md
Project: LeeWay Enterprise Transit Hub
Layer: Evidence / Source Authority
Purpose: Record official source authorities separately from host runtime proof.
Inputs: Governed source, runtime evidence, and approved product requirements.
Outputs: Versioned product, learning, or evidence artifact.
Mutation Scope: The owning artifact only.
Dependencies: Phase 04 FULL PASS and LeeWay governance.
Tests: Parse, source verification, continuous-learning gate, and phase runtime evidence.
Security Impact: Contains no credentials.
Database Impact: Cites SQL Server, EF Core, health checks, and Secret Manager guidance.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 5.0.6
-->
# Phase 05 source authority

- Microsoft SQL Server 2025 Linux container quickstart: `https://learn.microsoft.com/sql/linux/install-upgrade/quickstart-install-docker?view=sql-server-ver17`
- SQL Server row-level security: `https://learn.microsoft.com/sql/relational-databases/security/row-level-security?view=sql-server-ver17`
- EF Core global query filters: `https://learn.microsoft.com/ef/core/querying/filters`
- ASP.NET Core health checks: `https://learn.microsoft.com/aspnet/core/host-and-deploy/health-checks?view=aspnetcore-10.0`
- ASP.NET Core Secret Manager: `https://learn.microsoft.com/aspnet/core/security/app-secrets?view=aspnetcore-10.0`
- Microsoft SQL Server container registry: `mcr.microsoft.com/mssql/server:2025-latest`
- EF Core packages: version `10.0.10`, observed 2026-07-25.

These sources explain supported mechanisms. They do not prove that this repository built or that the host database worked. Host logs, tests, SQL probes, backup verification, hashes, and receipts provide runtime proof.


## Interview assessment source authority

See `PHASE-05-INTERVIEW-ASSESSMENT-SOURCE-AUTHORITY.md` for role-based quiz, answer-key, scoring, remediation, and training-record grounding.
