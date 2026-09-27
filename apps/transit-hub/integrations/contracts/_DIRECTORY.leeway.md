<!--
LEEWAY ENTERPRISE FILE HEADER
File: _DIRECTORY.leeway.md
Path: integrations/contracts/_DIRECTORY.leeway.md
Project: LeeWay Enterprise Transit Hub
Layer: Directory Governance
Purpose: Declare the authority, boundaries, and lifecycle of /integrations/contracts.
Inputs: Project architecture and parent authority.
Outputs: Human-readable directory contract.
Mutation Scope: Documentation only.
Dependencies: Integration requirements.
Tests: Directory manifest scan and architecture review.
Security Impact: Declares prohibited secrets and unauthorized content.
Database Impact: As declared by directory purpose.
Sovereign Cycle: Perception -> Structure -> Execution -> Veritas
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.0
-->

# Directory Authority: /integrations/contracts

| Authority field | Declaration |
|---|---|
| Purpose | External-system contracts and evidence. |
| Allowed content | Contracts, mappings, and approved integration metadata. |
| Disallowed content | Tokens and raw customer data. |
| Upstream authority | Integration requirements. |
| Downstream consumers | Integration adapters. |
| Sovereign Cycle | Perception -> Structure -> Execution -> Veritas |
| Owner | Leonard Lee / Leeway Industries |
| Human comprehension | Required |

## Mutation boundary

Only files and child directories consistent with this authority may be created here.

## Evidence requirement

A change must be supported by build, test, runtime, hash, or review evidence appropriate to the directory.

## Removal rule

Removal requires migration of downstream consumers and a Veritas receipt.
