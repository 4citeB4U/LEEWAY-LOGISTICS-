<!--
LEEWAY ENTERPRISE FILE HEADER
File: CHAPTER-28-AGENT-LEE-SERVICE-IDENTITY-AND-CONTINUOUS-LEARNING.md
Path: docs/training-manual/10-agent-lee/CHAPTER-28-AGENT-LEE-SERVICE-IDENTITY-AND-CONTINUOUS-LEARNING.md
Project: LeeWay Enterprise Transit Hub
Layer: Training Manual / Governed Chapter
Purpose: Teach Chapter 28 — Agent Lee Service Identity and Continuous Learning with role-specific procedures, evidence, exercises, and Agent Lee proctor guidance.
Inputs: Current Phase 04 implementation, official ASP.NET Core security guidance, LeeWay policies, and transportation workflows.
Outputs: Commercial training chapter source included in the generated master manual.
Mutation Scope: Documentation only.
Dependencies: Phase 04 security contracts, learning gate, and manual builder.
Tests: Manual build, chapter count, architecture tests, and human review.
Security Impact: Teaches fail-closed identity, tenant, permission, privacy, and service-account boundaries.
Database Impact: Documents future persistence enforcement; no database mutation.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 4.0.0
-->

# Chapter 28 — Agent Lee Service Identity and Continuous Learning

## Purpose

This chapter defines Agent Lee as an external LeeWay employee using the Transit Hub through a governed service identity and capability package. It also establishes continuous learning as a release requirement. Every implementation phase must update the commercial manual, technical lesson, Leonard Lee private workbook and question bank, Agent Lee knowledge index, tests, and evidence receipt.

## Agent Lee is not embedded

Agent Lee belongs to the LeeWay ecosystem. The Transit Hub is one assigned enterprise tool. The application must not compile a specific LLM, personality, or hidden administrator bypass into the business layer. Agent Lee authenticates as a service identity, presents the `AgentService` role, presents the `leeway.enterprise-transit-hub` capability, resolves a tenant, and passes the same policy system used by other subjects.

This architecture preserves replaceability and degraded operation. If Agent Lee, an LLM, voice, or vision service is unavailable, deterministic transportation workflows remain available. The application can deny agent-tool endpoints while drivers, dispatchers, mechanics, and administrators continue through ordinary interfaces.

## Service identity requirements

A production Agent Lee service identity requires a trusted issuer, unique subject identifier, scoped credential, rotation, tenant assignment, capability grants, permission claims, expiration behavior, revocation, monitoring, and evidence. The identity must not share a user password. Each environment needs separate credentials. Development evidence headers are not a production credential.

The Phase 04 agent-tool policy requires five conditions:

1. The subject is authenticated.
2. The role includes AgentService.
3. The permission includes `agent.tool.execute`.
4. The capability includes `leeway.enterprise-transit-hub`.
5. The identity tenant matches the resolved request tenant.

Failure of any condition denies the tool call. AgentService does not receive platform administration.

## Human approval remains separate

Authentication proves which service is calling. Authorization proves whether the service may request the operation. Neither proves that a human approved a high-risk mutation. Approval is a separate business artifact containing the approver, scope, expiration, reason, requested action, and receipt. Agent Lee may prepare or execute an approved action according to policy, but the service identity must not manufacture human approval.

## Continuous learning release gate

Software, documentation, and agent knowledge must change together. A feature is incomplete when the code works but users cannot operate it, Leonard cannot defend it in an interview, his sons cannot learn it safely, support cannot troubleshoot it, or Agent Lee retrieves stale instructions.

The Phase 04 gate requires every future phase to update:

- A numbered technical lesson in `docs/learning`.
- A private Leonard Lee workbook.
- The private question bank and master question archive.
- The private progress tracker.
- At least one relevant commercial training chapter or an explicit justified no-content-change record.
- The generated master manual and progress evidence.
- Agent Lee’s training knowledge index.
- Instructor rubrics and family teaching material when the topic is teachable.
- Automated architecture tests.
- A phase receipt with learning status.

`learning-phase-registry.json` is the machine-readable authority. `Verify-ContinuousLearningGate.ps1` checks the latest phase and prevents a PASS when required learning surfaces are missing or counts disagree.

## Agent Lee as proctor

Agent Lee must resolve learner identity and visibility before retrieval. Commercial learners receive commercial material. Leonard receives owner-private workbooks and rubrics according to policy. Family delegates receive only explicitly delegated learning material. Agent Lee must cite the current product version, ask the learner to answer in the learner’s own words, require a source-file or request-path trace, score against the rubric, remediate gaps, and write a training receipt.

Proctoring is not answer dumping. Instructor-only rubrics should not be exposed before an assessment unless the learning mode explicitly permits coaching. Agent Lee must distinguish teaching, guided practice, assessment, and troubleshooting.

## Repair and self-healing knowledge

A service identity does not grant unrestricted repair. Agent Lee may inspect health and read approved evidence under policy. Reversible repairs may be permitted by risk class. Configuration, database, customer-data, safety-critical, and destructive changes require higher authority. Every repair playbook must define diagnostics, permissions, approval, commands, success criteria, rollback, and evidence.

Continuous learning also supports repair. When a new failure mode is discovered, the phase or repair release must update the troubleshooting chapter, runbook, Agent Lee index, test, and question bank when human understanding changes. A fix without updated knowledge leaves the system likely to repeat the same mistake.

## Guided lab

1. Call the agent-tool endpoint as AgentService with the correct tenant but no capability; expect HTTP 403.
2. Add `leeway.enterprise-transit-hub`; expect HTTP 200.
3. Change the identity tenant while keeping the requested tenant; expect HTTP 403.
4. Read `learning-phase-registry.json` and identify every Phase 04 learning surface.
5. Run `Verify-ContinuousLearningGate.ps1 -ExpectedPhase PHASE-04`.
6. Explain why the gate belongs in local builds and GitHub Actions.

## Family teaching approach

When teaching younger or new learners, use a transportation analogy. Authentication is the employee badge. A role is the job title. A permission is the key that opens one type of room. Tenant context is the transportation company shown on the work order. Agent Lee is a trained employee carrying a service badge and a tool assignment. A badge from Company A must not open Company B’s records.

The learner should draw the flow, predict 400, 401, and 403 outcomes, and inspect the actual policy code. No real customer data or credentials belong in the exercise.

## Knowledge check

Explain why AgentService plus the correct capability still cannot cross tenants. Explain the difference between an application capability and a human approval. List the learning artifacts that must change in the next phase. State what happens to the core application when Agent Lee is unavailable.

## Agent Lee proctor instructions

Require evidence from `TransitSecurityServiceCollectionExtensions.cs`, the capability manifest, the permissions contract, the learning registry, and the Phase 04 runtime receipt. The learner must avoid claiming production identity, final database isolation, or autonomous repair authority that has not been implemented.
