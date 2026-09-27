<!--
LEEWAY ENTERPRISE FILE HEADER
File: _DIRECTORY.leeway.md
Path: docs/product/_DIRECTORY.leeway.md
Project: LeeWay Enterprise Transit Hub
Layer: Directory Governance
Purpose: Declare the authority and lifecycle of /docs/product.
Inputs: Project architecture and parent authority.
Outputs: A governed directory contract.
Mutation Scope: Documentation only.
Dependencies: Parent directory authority and project manifest.
Tests: Governance verification and architecture review.
Security Impact: Declares prohibited secrets and cross-tenant content.
Database Impact: None unless explicitly authorized by the directory purpose.
Sovereign Cycle: Origin -> Structure -> Synthesis
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 2.0.0
-->

# Directory Authority: /docs/product

| Authority field | Declaration |
|---|---|
| Purpose | Own the commercial product constitution, customer value, and SaaS capability definition. |
| Allowed content | Product charters, capability maps, market and customer definitions. |
| Disallowed content | Unverified marketing claims, secrets, and implementation code. |
| Upstream authority | Project and governance authorities. |
| Downstream consumers | Roadmap, architecture, training, sales, and implementation. |
| Sovereign Cycle position | Origin -> Structure -> Synthesis |
| Owner | Leonard Lee / Leeway Industries |
| Human comprehension | Required |

## Mutation boundary

Only artifacts consistent with this declared purpose may be created here.

## Removal rule

Removal requires downstream migration, test evidence, and a Veritas receipt.
