<!--
LEEWAY ENTERPRISE FILE HEADER
File: _DIRECTORY.leeway.md
Path: _DIRECTORY.leeway.md
Project: LeeWay Enterprise Transit Hub
Layer: Directory Governance
Purpose: Declare the authority, boundaries, and lifecycle of /.
Inputs: Project architecture and parent authority.
Outputs: Human-readable directory contract.
Mutation Scope: Documentation only.
Dependencies: Leeway Industries and LeeWay Standards.
Tests: Directory manifest scan and architecture review.
Security Impact: Declares prohibited secrets and unauthorized content.
Database Impact: As declared by directory purpose.
Sovereign Cycle: Origin -> Structure -> Execution -> Veritas -> Echo
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.0
-->

# Directory Authority: /

| Authority field | Declaration |
|---|---|
| Purpose | Canonical project root. |
| Allowed content | Governed project artifacts. |
| Disallowed content | Unrelated files, secrets, and unregistered executables. |
| Upstream authority | Leeway Industries and LeeWay Standards. |
| Downstream consumers | Every project artifact. |
| Sovereign Cycle | Origin -> Structure -> Execution -> Veritas -> Echo |
| Owner | Leonard Lee / Leeway Industries |
| Human comprehension | Required |

## Mutation boundary

Only files and child directories consistent with this authority may be created here.

## Evidence requirement

A change must be supported by build, test, runtime, hash, or review evidence appropriate to the directory.

## Removal rule

Removal requires migration of downstream consumers and a Veritas receipt.
