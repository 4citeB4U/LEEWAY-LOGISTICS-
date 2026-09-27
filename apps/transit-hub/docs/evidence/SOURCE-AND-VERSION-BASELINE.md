<!--
LEEWAY ENTERPRISE FILE HEADER
File: SOURCE-AND-VERSION-BASELINE.md
Path: docs/evidence/SOURCE-AND-VERSION-BASELINE.md
Project: LeeWay Enterprise Transit Hub
Layer: Evidence / Baseline
Purpose: Declare the technology and provenance baseline used by this project.
Inputs: Official source records and host tool versions.
Outputs: Reviewable evidence baseline.
Mutation Scope: Documentation only.
Dependencies: GitHub, Microsoft PowerShell, Microsoft .NET, Docker, and Hugging Face sources.
Tests: Manual review and CI evidence.
Security Impact: No credentials.
Database Impact: No database mutation.
Sovereign Cycle: Origin -> Veritas -> Echo
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.2
-->

# Source and Version Baseline

- PowerShell target: 7.6.3 or newer.
- .NET SDK target: 10.0.302.
- Docker Desktop evidence baseline: 4.83.0; Docker is not mutated by the foundation.
- GitHub: CI workflow restores, builds, tests, and preserves evidence.
- Hugging Face: not applicable until a model is introduced; future model use must record exact repository and revision.

Official documentation supports platform behavior. Project-specific proof comes from restore, build, tests, runtime checks, hashes, and LeeWay receipts.
