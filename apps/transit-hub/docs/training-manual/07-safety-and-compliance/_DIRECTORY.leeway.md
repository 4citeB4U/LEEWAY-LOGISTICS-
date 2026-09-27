<!--
LEEWAY ENTERPRISE FILE HEADER
File: _DIRECTORY.leeway.md
Path: docs/training-manual/07-safety-and-compliance/_DIRECTORY.leeway.md
Project: LeeWay Enterprise Transit Hub
Layer: Directory Governance
Purpose: Declare the authority and lifecycle of /docs/training-manual/07-safety-and-compliance.
Inputs: Project architecture and parent authority.
Outputs: A governed directory contract.
Mutation Scope: Documentation only.
Dependencies: Parent directory authority and project manifest.
Tests: Governance verification and architecture review.
Security Impact: Declares prohibited secrets and cross-tenant content.
Database Impact: None unless explicitly authorized by the directory purpose.
Sovereign Cycle: Perception -> Structure -> Veritas -> Echo -> Synthesis
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 2.0.0
-->

# Directory Authority: /docs/training-manual/07-safety-and-compliance

| Authority field | Declaration |
|---|---|
| Purpose | Own Part 07 of the controlled training manual: Safety, Compliance, Incidents, and Evidence. |
| Allowed content | Versioned chapter source, labs, assessments, and answer keys. |
| Disallowed content | Stale screenshots, unsupported claims, secrets, and tenant data. |
| Upstream authority | Training-manual authority and current implementation. |
| Downstream consumers | Learners, Agent Lee proctor, instructors, and support. |
| Sovereign Cycle position | Perception -> Structure -> Veritas -> Echo -> Synthesis |
| Owner | Leonard Lee / Leeway Industries |
| Human comprehension | Required |

## Mutation boundary

Only artifacts consistent with this declared purpose may be created here.

## Removal rule

Removal requires downstream migration, test evidence, and a Veritas receipt.
