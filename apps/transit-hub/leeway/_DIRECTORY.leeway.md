<!--
LEEWAY ENTERPRISE FILE HEADER
File: _DIRECTORY.leeway.md
Path: leeway/_DIRECTORY.leeway.md
Project: LeeWay Enterprise Transit Hub
Layer: Directory Governance
Purpose: Declare the authority and lifecycle of /leeway.
Inputs: Project architecture and parent authority.
Outputs: A governed directory contract.
Mutation Scope: Documentation only.
Dependencies: Parent directory authority and project manifest.
Tests: Governance verification and architecture review.
Security Impact: Declares prohibited secrets and cross-tenant content.
Database Impact: None unless explicitly authorized by the directory purpose.
Sovereign Cycle: Origin -> Structure -> Execution -> Veritas
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 2.0.0
-->

# Directory Authority: /leeway

| Authority field | Declaration |
|---|---|
| Purpose | Own Transit Hub integration contracts for the external LeeWay ecosystem. |
| Allowed content | Capability packages, contracts, permissions, knowledge manifests, and compatibility declarations. |
| Disallowed content | Embedded Agent Lee runtime code, model weights, secrets, and unrestricted host authority. |
| Upstream authority | LeeWay Standards and project governance. |
| Downstream consumers | Agent Lee Prime, LeeWay agent fleet, and Transit Hub APIs. |
| Sovereign Cycle position | Origin -> Structure -> Execution -> Veritas |
| Owner | Leonard Lee / Leeway Industries |
| Human comprehension | Required |

## Mutation boundary

Only artifacts consistent with this declared purpose may be created here.

## Removal rule

Removal requires downstream migration, test evidence, and a Veritas receipt.
