<!--
LEEWAY ENTERPRISE FILE HEADER
File: PHASE-04-IDENTITY-AUTHORIZATION-AND-LEARNING-SOURCE-EVIDENCE.md
Path: docs/evidence/PHASE-04-IDENTITY-AUTHORIZATION-AND-LEARNING-SOURCE-EVIDENCE.md
Project: LeeWay Enterprise Transit Hub
Layer: Evidence / Source Baseline
Purpose: Record authoritative external and LeeWay sources used to design Phase 04 without representing sources as runtime proof.
Inputs: Official Microsoft ASP.NET Core documentation, LeeWay Standards repository, and host execution evidence.
Outputs: Source-grounding record and evidence classification.
Mutation Scope: Documentation only.
Dependencies: Phase 04 requirements, ADR, and host receipt.
Tests: Citation review, host build, tests, runtime checks, and governance receipt.
Security Impact: Separates design authority from actual runtime proof.
Database Impact: None.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 4.0.0
-->

# Phase 04 Source and Evidence Baseline

## Source-grounded design authority

Source review date: 2026-07-25.

- ASP.NET Core authentication overview: `https://learn.microsoft.com/en-us/aspnet/core/security/authentication/?view=aspnetcore-10.0`
  - Authentication establishes identity through configured schemes and handlers.
  - `UseAuthentication` must run before middleware that depends on an authenticated user.
- ASP.NET Core authorization introduction: `https://learn.microsoft.com/en-us/aspnet/core/security/authorization/introduction?view=aspnetcore-10.0`
  - Authentication and authorization are separate responsibilities.
- ASP.NET Core role authorization: `https://learn.microsoft.com/en-us/aspnet/core/security/authorization/roles?view=aspnetcore-10.0`
  - Roles can participate in declarative authorization policies.
- ASP.NET Core resource-based authorization: `https://learn.microsoft.com/en-us/aspnet/core/security/authorization/resource-based?view=aspnetcore-10.0`
  - Authorization may require both the authenticated identity and the specific resource or operation context.
- LeeWay Standards repository: `https://github.com/4citeB4U/LeeWay-Standards`
  - Observed governing commit: `a615df3e3a465af83eb9d18e732f8644405b282f`
  - Governing requirements used here: Agent Lee Prime orchestration, Schema-First, Local-First, Receipt-Required, Veritas Gate, and No Blind Edits.

## Evidence classification

Official documentation supports the design. It does not prove the Transit Hub implementation works. Proof requires the Phase 04 PowerShell parser, payload hashes, .NET restore and build, automated tests, live 401/403/200 endpoint checks, manual generation, continuous-learning gate, governance scan, receipt, and atomic publication.
