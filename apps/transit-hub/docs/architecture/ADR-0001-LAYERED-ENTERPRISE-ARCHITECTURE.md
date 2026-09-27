<!--
LEEWAY ENTERPRISE FILE HEADER
File: ADR-0001-LAYERED-ENTERPRISE-ARCHITECTURE.md
Path: docs/architecture/ADR-0001-LAYERED-ENTERPRISE-ARCHITECTURE.md
Project: LeeWay Enterprise Transit Hub
Layer: Architecture Decision Record
Purpose: Record the project dependency direction and replaceable infrastructure decision.
Inputs: Enterprise maintainability, testing, and learning requirements.
Outputs: Binding architecture decision.
Mutation Scope: Documentation only.
Dependencies: Project manifest.
Tests: Architecture tests and project-reference review.
Security Impact: Reduces hidden access and narrows mutation authority.
Database Impact: Allows database adapters without contaminating Domain.
Sovereign Cycle: Origin -> Structure -> Veritas
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.0
-->

# ADR-0001: Layered Enterprise Architecture

## Status

Accepted.

## Decision

The application separates Domain, Application, Governance, Infrastructure, Integration, API, Web, Worker, and Test responsibilities.

## Dependency direction

- Domain depends on no project layer.
- Governance depends on no business layer.
- Application depends on Domain and Governance.
- Infrastructure implements Application contracts.
- API, Web, and Worker compose the executable system.
- Tests may depend on the layers they verify.

## Consequences

SQL Server can replace in-memory repositories without rewriting domain entities or controllers. Oracle and Dataverse remain isolated behind integration boundaries.
