<!--
LEEWAY ENTERPRISE FILE HEADER
File: _DIRECTORY.leeway.md
Path: src/LeeWay.TransitHub.Api/Tenancy/_DIRECTORY.leeway.md
Project: LeeWay Enterprise Transit Hub
Layer: Directory Governance
Purpose: Declare the authority and lifecycle of /src/LeeWay.TransitHub.Api/Tenancy.
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

# Directory Authority: /src/LeeWay.TransitHub.Api/Tenancy

| Authority field | Declaration |
|---|---|
| Purpose | Resolve tenant context at the HTTP boundary without embedding tenancy rules in the domain. |
| Allowed content | ASP.NET Core scoped context and middleware. |
| Disallowed content | Database filtering, authorization shortcuts, and hardcoded customer identities. |
| Upstream authority | Application tenancy contracts and HTTP requests. |
| Downstream consumers | Controllers, future authorization, and evidence. |
| Sovereign Cycle position | Perception -> Structure -> Execution -> Veritas |
| Owner | Leonard Lee / Leeway Industries |
| Human comprehension | Required |

## Mutation boundary

Only artifacts consistent with this declared purpose may be created here.

## Removal rule

Removal requires downstream migration, test evidence, and a Veritas receipt.
