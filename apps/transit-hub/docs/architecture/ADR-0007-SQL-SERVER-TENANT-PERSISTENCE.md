<!--
LEEWAY ENTERPRISE FILE HEADER
File: ADR-0007-SQL-SERVER-TENANT-PERSISTENCE.md
Path: docs/architecture/ADR-0007-SQL-SERVER-TENANT-PERSISTENCE.md
Project: LeeWay Enterprise Transit Hub
Layer: Architecture Decision Record
Purpose: Record the hybrid Phase 05 persistence decision: EF Core global filters plus SQL Server row-level security, isolated Docker development infrastructure, and future database-per-tenant option.
Inputs: Governed source, runtime evidence, and approved product requirements.
Outputs: Versioned product, learning, or evidence artifact.
Mutation Scope: The owning artifact only.
Dependencies: Phase 04 FULL PASS and LeeWay governance.
Tests: Parse, source verification, continuous-learning gate, and phase runtime evidence.
Security Impact: Requires defense in depth and fail-closed tenant context.
Database Impact: Defines SQL Server persistence architecture.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 5.0.0
-->
# ADR-0007 — SQL Server tenant persistence

## Decision

Phase 05 activates SQL Server 2025 for vehicles and work orders while the remaining modules stay in the proven in-memory adapter. The API selects persistence through `TransitHub:DataMode`. EF Core global query filters automatically include the active tenant in normal queries, and SQL Server row-level security independently filters reads and blocks writes based on `SESSION_CONTEXT(N'TenantId')`.

## Why two controls

Application filters reduce accidental omissions in repository code. Database RLS protects the rows even when another database client reaches the same tables. Neither control grants access by itself: the request must still authenticate, authorize, resolve a tenant, and use a least-privileged database login.

## Deployment evolution

Shared-database tenants use the discriminator and RLS pattern. Larger regulated tenants may later receive a dedicated database or deployment stamp without changing the application contracts.
