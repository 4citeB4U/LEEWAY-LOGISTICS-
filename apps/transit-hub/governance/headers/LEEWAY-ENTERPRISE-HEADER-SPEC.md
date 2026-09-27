<!--
LEEWAY ENTERPRISE FILE HEADER
File: LEEWAY-ENTERPRISE-HEADER-SPEC.md
Path: governance/headers/LEEWAY-ENTERPRISE-HEADER-SPEC.md
Project: LeeWay Enterprise Transit Hub
Layer: Governance / Headers
Purpose: Define mandatory file identity and legal LeeWay authority modes.
Inputs: LeeWay Standards and enterprise audit requirements.
Outputs: Canonical file-header contract.
Mutation Scope: Governance specification only.
Dependencies: .leeway/project.manifest.json.
Tests: Governance scanner and manual review.
Security Impact: Forces each file to disclose security impact.
Database Impact: Forces each file to disclose database impact.
Sovereign Cycle: Origin -> Structure -> Veritas
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.0
-->

# LeeWay Enterprise Header Specification

Every source-controlled file must state:

1. What it is.
2. Where it belongs.
3. Why it exists.
4. What enters it.
5. What leaves it.
6. What it may change.
7. What it depends on.
8. What tests prove it works.
9. Its security impact.
10. Its database impact.
11. Its Sovereign Cycle position.

## Authority modes

- **INLINE** for C#, XML, Markdown, PowerShell, SQL, HTML, CSS, JavaScript, YAML, and similar formats.
- **EMBEDDED_METADATA** for JSON through `_leewayHeader`.
- **EXTERNAL_SIDECAR** for `.sln` and other native formats that cannot safely accept comments.

A file without one accepted authority mode cannot receive a Veritas PASS.
