<!--
LEEWAY ENTERPRISE FILE HEADER
File: _DIRECTORY.leeway.md
Path: src/LeeWay.TransitHub.Application/Tenancy/_DIRECTORY.leeway.md
Project: LeeWay Enterprise Transit Hub
Layer: Directory Governance
Purpose: Declare the authority and lifecycle of /src/LeeWay.TransitHub.Application/Tenancy.
Inputs: Project architecture and parent authority.
Outputs: A governed directory contract.
Mutation Scope: Documentation only.
Dependencies: Parent directory authority and project manifest.
Tests: Governance verification and architecture review.
Security Impact: Declares prohibited secrets and cross-tenant content.
Database Impact: None unless explicitly authorized by the directory purpose.
Sovereign Cycle: Perception -> Structure -> Execution -> Veritas
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 2.0.0
-->

# Directory Authority: /src/LeeWay.TransitHub.Application/Tenancy

| Authority field | Declaration |
|---|---|
| Purpose | Own tenant-context and feature-entitlement contracts used by application use cases. |
| Allowed content | C# interfaces, records, and application-level tenancy models. |
| Disallowed content | HTTP-specific resolution, database-specific filters, and hardcoded tenant values. |
| Upstream authority | Domain tenancy rules. |
| Downstream consumers | API, infrastructure, workers, tests, and Agent Lee tool contracts. |
| Sovereign Cycle position | Perception -> Structure -> Execution -> Veritas |
| Owner | Leonard Lee / Leeway Industries |
| Human comprehension | Required |

## Mutation boundary

Only artifacts consistent with this declared purpose may be created here.

## Removal rule

Removal requires downstream migration, test evidence, and a Veritas receipt.
