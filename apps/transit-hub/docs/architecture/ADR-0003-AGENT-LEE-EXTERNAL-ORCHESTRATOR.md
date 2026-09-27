<!--
LEEWAY ENTERPRISE FILE HEADER
File: ADR-0003-AGENT-LEE-EXTERNAL-ORCHESTRATOR.md
Path: docs/architecture/ADR-0003-AGENT-LEE-EXTERNAL-ORCHESTRATOR.md
Project: LeeWay Enterprise Transit Hub
Layer: Architecture / Decision Record
Purpose: Record the accepted decision: Agent Lee as External LeeWay Orchestrator.
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

# Agent Lee as External LeeWay Orchestrator

## Status

Accepted — Phase 02 foundation.

## Context

The orchestrator, model, tool catalog, knowledge sources, and business application must remain independently replaceable and governable.

## Decision

Agent Lee is not embedded, duplicated, or hardcoded inside Transit Hub. Transit Hub exposes governed tools, APIs, knowledge, health, training, and repair contracts. Agent Lee operates from the LeeWay ecosystem as an assigned employee and orchestrator.

## Consequences

Core workflows remain usable when Agent Lee is unavailable. Tool calls require tenant context, least privilege, approval classification, validation, and receipts.

## Veritas conditions

The decision remains valid only while automated tests, tenant-boundary checks, documentation, capability manifests, training material, and release receipts remain synchronized.
