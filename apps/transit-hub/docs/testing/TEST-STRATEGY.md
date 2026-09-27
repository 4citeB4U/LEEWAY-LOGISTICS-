<!--
LEEWAY ENTERPRISE FILE HEADER
File: TEST-STRATEGY.md
Path: docs/testing/TEST-STRATEGY.md
Project: LeeWay Enterprise Transit Hub
Layer: Testing Documentation
Purpose: Define the project test layers and evidence requirements.
Inputs: Requirements and architecture.
Outputs: Test strategy.
Mutation Scope: Documentation only.
Dependencies: Test projects and governance policies.
Tests: Review against actual test projects.
Security Impact: Includes security validation.
Database Impact: Database tests are added when database execution begins.
Sovereign Cycle: Execution -> Veritas -> Echo
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.0
-->

# Test Strategy

- **Unit tests:** isolated domain rules.
- **Integration tests:** application services with real in-memory adapters.
- **Regression tests:** previously fixed behavior that must not return.
- **Security tests:** input, secret, and unsafe-default checks.
- **Architecture tests:** project dependency direction.
- **Manual runtime tests:** API and browser workflow demonstration.

A release receipt requires restore, build, automated tests, governance scan, and manual comprehension status.
