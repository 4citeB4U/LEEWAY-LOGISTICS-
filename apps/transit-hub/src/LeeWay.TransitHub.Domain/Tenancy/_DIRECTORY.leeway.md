<!--
LEEWAY ENTERPRISE FILE HEADER
File: _DIRECTORY.leeway.md
Path: src/LeeWay.TransitHub.Domain/Tenancy/_DIRECTORY.leeway.md
Project: LeeWay Enterprise Transit Hub
Layer: Directory Governance
Purpose: Declare the authority and lifecycle of /src/LeeWay.TransitHub.Domain/Tenancy.
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

# Directory Authority: /src/LeeWay.TransitHub.Domain/Tenancy

| Authority field | Declaration |
|---|---|
| Purpose | Own framework-independent tenant, organization-unit, deployment-profile, and tenant-ownership rules. |
| Allowed content | C# tenancy entities, enums, and domain contracts. |
| Disallowed content | HTTP headers, database code, agent runtime code, and vendor SDKs. |
| Upstream authority | Commercial SaaS requirements. |
| Downstream consumers | Application, infrastructure, API, tests, and training. |
| Sovereign Cycle position | Origin -> Structure -> Execution -> Veritas |
| Owner | Leonard Lee / Leeway Industries |
| Human comprehension | Required |

## Mutation boundary

Only artifacts consistent with this declared purpose may be created here.

## Removal rule

Removal requires downstream migration, test evidence, and a Veritas receipt.
