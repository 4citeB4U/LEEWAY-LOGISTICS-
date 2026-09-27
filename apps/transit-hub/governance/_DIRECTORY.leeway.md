<!--
LEEWAY ENTERPRISE FILE HEADER
File: _DIRECTORY.leeway.md
Path: governance/_DIRECTORY.leeway.md
Project: LeeWay Enterprise Transit Hub
Layer: Directory Governance
Purpose: Declare the authority, boundaries, and lifecycle of /governance.
Inputs: Project architecture and parent authority.
Outputs: Human-readable directory contract.
Mutation Scope: Documentation only.
Dependencies: LeeWay Standards.
Tests: Directory manifest scan and architecture review.
Security Impact: Declares prohibited secrets and unauthorized content.
Database Impact: As declared by directory purpose.
Sovereign Cycle: Origin -> Structure -> Veritas -> Echo
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.0
-->

# Directory Authority: /governance

| Authority field | Declaration |
|---|---|
| Purpose | LeeWay policies, headers, registries, and receipts. |
| Allowed content | Governance documents and evidence. |
| Disallowed content | Business logic. |
| Upstream authority | LeeWay Standards. |
| Downstream consumers | All layers. |
| Sovereign Cycle | Origin -> Structure -> Veritas -> Echo |
| Owner | Leonard Lee / Leeway Industries |
| Human comprehension | Required |

## Mutation boundary

Only files and child directories consistent with this authority may be created here.

## Evidence requirement

A change must be supported by build, test, runtime, hash, or review evidence appropriate to the directory.

## Removal rule

Removal requires migration of downstream consumers and a Veritas receipt.
