<!--
LEEWAY ENTERPRISE FILE HEADER
File: _DIRECTORY.leeway.md
Path: tests/LeeWay.TransitHub.ArchitectureTests/_DIRECTORY.leeway.md
Project: LeeWay Enterprise Transit Hub
Layer: Directory Governance
Purpose: Declare the authority, boundaries, and lifecycle of /tests/LeeWay.TransitHub.ArchitectureTests.
Inputs: Project architecture and parent authority.
Outputs: Human-readable directory contract.
Mutation Scope: Documentation only.
Dependencies: Requirements and source.
Tests: Directory manifest scan and architecture review.
Security Impact: Declares prohibited secrets and unauthorized content.
Database Impact: As declared by directory purpose.
Sovereign Cycle: Execution -> Veritas -> Echo
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.0
-->

# Directory Authority: /tests/LeeWay.TransitHub.ArchitectureTests

| Authority field | Declaration |
|---|---|
| Purpose | Automated verification. |
| Allowed content | Unit, integration, regression, security, and architecture tests. |
| Disallowed content | Production credentials and uncontrolled state. |
| Upstream authority | Requirements and source. |
| Downstream consumers | Veritas and release decisions. |
| Sovereign Cycle | Execution -> Veritas -> Echo |
| Owner | Leonard Lee / Leeway Industries |
| Human comprehension | Required |

## Mutation boundary

Only files and child directories consistent with this authority may be created here.

## Evidence requirement

A change must be supported by build, test, runtime, hash, or review evidence appropriate to the directory.

## Removal rule

Removal requires migration of downstream consumers and a Veritas receipt.
