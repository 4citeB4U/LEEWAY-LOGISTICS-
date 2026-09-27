<!--
LEEWAY ENTERPRISE FILE HEADER
File: FILE-DIRECTORY-EVIDENCE-AND-COMPREHENSION-POLICY.md
Path: governance/policies/FILE-DIRECTORY-EVIDENCE-AND-COMPREHENSION-POLICY.md
Project: LeeWay Enterprise Transit Hub
Layer: Governance / Policy
Purpose: Enforce file identity, directory authority, factual evidence, security, rollback, and comprehension.
Inputs: LeeWay Standards and project learning requirements.
Outputs: Binding project rules.
Mutation Scope: Policy only.
Dependencies: Header specification and project manifest.
Tests: Policy review and automated governance scan.
Security Impact: Prohibits credentials and blind acceptance.
Database Impact: Blocks database execution until separately approved.
Sovereign Cycle: Origin -> Structure -> Veritas
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.0
-->

# File, Directory, Evidence, and Comprehension Policy

1. Every source-controlled directory contains `_DIRECTORY.leeway.md`.
2. Every source-controlled file has inline authority, embedded metadata, or an approved sidecar.
3. An agent statement is never proof that work succeeded.
4. Builds, tests, runtime checks, hashes, and receipts provide evidence.
5. Passwords, tokens, production connection strings, and protected data are prohibited from Git.
6. Database, Docker, Oracle, Dynamics, and cloud mutations require separately approved phases.
7. Leonard Lee must understand each accepted component's purpose, data flow, mutation scope, dependencies, and tests.
8. Failed construction must not publish a partial final project.
9. Leonard Lee remains final acceptance authority.
