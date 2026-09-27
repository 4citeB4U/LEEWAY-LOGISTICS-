<!--
LEEWAY ENTERPRISE FILE HEADER
File: ADR-0004-MODULAR-MONOLITH-FIRST.md
Path: docs/architecture/ADR-0004-MODULAR-MONOLITH-FIRST.md
Project: LeeWay Enterprise Transit Hub
Layer: Architecture / Decision Record
Purpose: Record the accepted decision: Modular Monolith First.
Inputs: Product requirements, LeeWay Standards, and architecture evidence.
Outputs: A durable architecture decision and consequences.
Mutation Scope: Documentation only.
Dependencies: Product charter and solution architecture.
Tests: Architecture tests, build, runtime verification, and manual review.
Security Impact: Defines security and agent boundaries.
Database Impact: Defines persistence and tenant-isolation direction.
Sovereign Cycle: Origin -> Structure -> Veritas -> Echo
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 2.0.0
-->

# Modular Monolith First

## Status

Accepted — Phase 02 foundation.

## Context

Premature microservices add deployment, networking, observability, data-consistency, and operational complexity.

## Decision

Continue with one deployable product containing strongly separated domain, application, infrastructure, API, web, worker, governance, training, and capability modules. Extract services only when scale, isolation, ownership, or reliability evidence justifies the cost.

## Consequences

Module boundaries, interfaces, architecture tests, and event contracts must preserve future extraction options.

## Veritas conditions

The decision remains valid only while automated tests, tenant-boundary checks, documentation, capability manifests, training material, and release receipts remain synchronized.
