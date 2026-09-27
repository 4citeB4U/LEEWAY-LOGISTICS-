<!--
LEEWAY ENTERPRISE FILE HEADER
File: _DIRECTORY.leeway.md
Path: docs/roadmap/_DIRECTORY.leeway.md
Project: LeeWay Enterprise Transit Hub
Layer: Directory Governance
Purpose: Declare the authority and lifecycle of /docs/roadmap.
Inputs: Project architecture and parent authority.
Outputs: A governed directory contract.
Mutation Scope: Documentation only.
Dependencies: Parent directory authority and project manifest.
Tests: Governance verification and architecture review.
Security Impact: Declares prohibited secrets and cross-tenant content.
Database Impact: None unless explicitly authorized by the directory purpose.
Sovereign Cycle: Structure -> Execution -> Veritas -> Echo
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 2.0.0
-->

# Directory Authority: /docs/roadmap

| Authority field | Declaration |
|---|---|
| Purpose | Own the sequenced commercial, technical, training, and LeeWay integration roadmap. |
| Allowed content | Roadmaps, phase gates, dependencies, and release criteria. |
| Disallowed content | Unsupported delivery dates and unverifiable completion claims. |
| Upstream authority | Product charter and architecture decisions. |
| Downstream consumers | Engineering, training, operations, and release governance. |
| Sovereign Cycle position | Structure -> Execution -> Veritas -> Echo |
| Owner | Leonard Lee / Leeway Industries |
| Human comprehension | Required |

## Mutation boundary

Only artifacts consistent with this declared purpose may be created here.

## Removal rule

Removal requires downstream migration, test evidence, and a Veritas receipt.
