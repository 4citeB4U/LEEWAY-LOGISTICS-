<!--
LEEWAY ENTERPRISE FILE HEADER
File: _DIRECTORY.leeway.md
Path: src/LeeWay.TransitHub.Application/Product/_DIRECTORY.leeway.md
Project: LeeWay Enterprise Transit Hub
Layer: Directory Governance
Purpose: Declare the authority and lifecycle of /src/LeeWay.TransitHub.Application/Product.
Inputs: Project architecture and parent authority.
Outputs: A governed directory contract.
Mutation Scope: Documentation only.
Dependencies: Parent directory authority and project manifest.
Tests: Governance verification and architecture review.
Security Impact: Declares prohibited secrets and cross-tenant content.
Database Impact: None unless explicitly authorized by the directory purpose.
Sovereign Cycle: Origin -> Structure -> Execution -> Synthesis
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 2.0.0
-->

# Directory Authority: /src/LeeWay.TransitHub.Application/Product

| Authority field | Declaration |
|---|---|
| Purpose | Expose the commercial, training, and LeeWay product profile as deterministic application data. |
| Allowed content | C# product profile records and services. |
| Disallowed content | Marketing-only claims and external agent runtime code. |
| Upstream authority | Product charter and architecture decisions. |
| Downstream consumers | API, user interfaces, training, and capability manifests. |
| Sovereign Cycle position | Origin -> Structure -> Execution -> Synthesis |
| Owner | Leonard Lee / Leeway Industries |
| Human comprehension | Required |

## Mutation boundary

Only artifacts consistent with this declared purpose may be created here.

## Removal rule

Removal requires downstream migration, test evidence, and a Veritas receipt.
