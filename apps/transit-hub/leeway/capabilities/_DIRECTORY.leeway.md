<!--
LEEWAY ENTERPRISE FILE HEADER
File: _DIRECTORY.leeway.md
Path: leeway/capabilities/_DIRECTORY.leeway.md
Project: LeeWay Enterprise Transit Hub
Layer: Directory Governance
Purpose: Declare the authority and lifecycle of /leeway/capabilities.
Inputs: Project architecture and parent authority.
Outputs: A governed directory contract.
Mutation Scope: Documentation only.
Dependencies: Parent directory authority and project manifest.
Tests: Governance verification and architecture review.
Security Impact: Declares prohibited secrets and cross-tenant content.
Database Impact: None unless explicitly authorized by the directory purpose.
Sovereign Cycle: Structure -> Execution -> Veritas
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 2.0.0
-->

# Directory Authority: /leeway/capabilities

| Authority field | Declaration |
|---|---|
| Purpose | Contain product capability packages discoverable by the LeeWay ecosystem. |
| Allowed content | Versioned capability packages and compatibility metadata. |
| Disallowed content | Application business data and hardcoded agent identities. |
| Upstream authority | LeeWay integration authority. |
| Downstream consumers | Agent catalogs, Nexus routing, Shield, and Agent Lee Prime. |
| Sovereign Cycle position | Structure -> Execution -> Veritas |
| Owner | Leonard Lee / Leeway Industries |
| Human comprehension | Required |

## Mutation boundary

Only artifacts consistent with this declared purpose may be created here.

## Removal rule

Removal requires downstream migration, test evidence, and a Veritas receipt.
