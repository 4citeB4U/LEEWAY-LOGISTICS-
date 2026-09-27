<!--
LEEWAY ENTERPRISE FILE HEADER
File: ADR-0002-MULTITENANT-SAAS-ARCHITECTURE.md
Path: docs/architecture/ADR-0002-MULTITENANT-SAAS-ARCHITECTURE.md
Project: LeeWay Enterprise Transit Hub
Layer: Architecture / Decision Record
Purpose: Record the accepted decision: Multitenant SaaS Architecture.
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

# Multitenant SaaS Architecture

## Status

Accepted — Phase 02 foundation.

## Context

A SaaS customer is a tenant. Tenant isolation cannot be retrofitted safely after unrestricted persistence exists.

## Decision

Adopt tenant as a first-class domain concept. Support shared, isolated-data, and dedicated-enterprise deployment profiles. Resolve tenant context at boundaries and require tenant ownership for operational records before production persistence.

## Consequences

Current phase adds tenant entities, context contracts, header-based development resolution, tests, and documentation. Authentication, authorization, database filters, and production tenant provisioning remain separately gated.

## Veritas conditions

The decision remains valid only while automated tests, tenant-boundary checks, documentation, capability manifests, training material, and release receipts remain synchronized.
