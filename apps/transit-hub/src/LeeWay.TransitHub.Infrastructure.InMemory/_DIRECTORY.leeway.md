<!--
LEEWAY ENTERPRISE FILE HEADER
File: _DIRECTORY.leeway.md
Path: src/LeeWay.TransitHub.Infrastructure.InMemory/_DIRECTORY.leeway.md
Project: LeeWay Enterprise Transit Hub
Layer: Directory Governance
Purpose: Declare the authority, boundaries, and lifecycle of /src/LeeWay.TransitHub.Infrastructure.InMemory.
Inputs: Project architecture and parent authority.
Outputs: Human-readable directory contract.
Mutation Scope: Documentation only.
Dependencies: Requirements and architecture.
Tests: Directory manifest scan and architecture review.
Security Impact: Declares prohibited secrets and unauthorized content.
Database Impact: As declared by directory purpose.
Sovereign Cycle: Structure -> Execution
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.0
-->

# Directory Authority: /src/LeeWay.TransitHub.Infrastructure.InMemory

| Authority field | Declaration |
|---|---|
| Purpose | Production .NET source. |
| Allowed content | Governed .NET projects and source. |
| Disallowed content | Build output and secrets. |
| Upstream authority | Requirements and architecture. |
| Downstream consumers | Tests and executables. |
| Sovereign Cycle | Structure -> Execution |
| Owner | Leonard Lee / Leeway Industries |
| Human comprehension | Required |

## Mutation boundary

Only files and child directories consistent with this authority may be created here.

## Evidence requirement

A change must be supported by build, test, runtime, hash, or review evidence appropriate to the directory.

## Removal rule

Removal requires migration of downstream consumers and a Veritas receipt.
