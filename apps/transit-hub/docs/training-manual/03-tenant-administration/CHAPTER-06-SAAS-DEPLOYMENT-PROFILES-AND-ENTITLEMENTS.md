<!--
LEEWAY ENTERPRISE FILE HEADER
File: CHAPTER-06-SAAS-DEPLOYMENT-PROFILES-AND-ENTITLEMENTS.md
Path: docs/training-manual/03-tenant-administration/CHAPTER-06-SAAS-DEPLOYMENT-PROFILES-AND-ENTITLEMENTS.md
Project: LeeWay Enterprise Transit Hub
Layer: Training Manual / Part 06
Purpose: Explain shared SaaS, isolated-data, and dedicated-enterprise delivery profiles and how feature entitlements differ from authorization.
Inputs: Current product implementation, approved architecture, and verified release evidence.
Outputs: Governed documentation and learning content.
Mutation Scope: Documentation and learning metadata only.
Dependencies: LeeWay Standards, product source, tests, and current release evidence.
Tests: Content review, manifest validation, link/path validation, and build verification.
Security Impact: Contains no tenant data or credentials; security and tenant warnings are explicit.
Database Impact: Documents database behavior without performing database mutation.
Sovereign Cycle: Perception -> Origin -> Structure -> Veritas -> Echo -> Synthesis
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 3.0.0
-->

# Chapter 06 — SaaS Deployment Profiles and Entitlements

## Purpose

Explain shared SaaS, isolated-data, and dedicated-enterprise delivery profiles and how feature entitlements differ from authorization.

## Audience

Transportation users, tenant administrators, technical staff, instructors, Agent Lee proctor mode, Leonard Lee, and explicitly invited family learners use this chapter at different depths.

## Prerequisites

- Read the product charter and current release status.
- Understand that the current implementation is a verified foundation, not a finished commercial deployment.
- Use only fictional or approved training data.
- Keep the active tenant, role, and release version visible while learning.

## Learning objectives

After completing this chapter, the learner can:

- explain the chapter purpose in plain language;
- connect business responsibilities to the correct architectural layer;
- trace at least one request, workflow, or evidence path;
- identify tenant, security, and approval boundaries;
- distinguish current implementation from deferred roadmap work;
- answer the knowledge check and complete the guided lab.

## Business context

Transportation operations combine people, vehicles, schedules, locations, maintenance, safety, communication, and evidence. A software product is useful only when it supports those responsibilities without obscuring ownership or creating unsafe shortcuts. Transit Hub therefore separates business rules, application coordination, infrastructure adapters, customer tenancy, LeeWay orchestration, and training evidence. This separation allows a small operator to use a focused configuration while a larger organization can add stronger isolation, integrations, and dedicated deployment profiles.

The same design also supports professional explanation. A learner must be able to state what the system does, why each layer exists, what evidence proves it, and which capabilities remain incomplete. That discipline protects customer trust and prevents Agent Lee or a human presenter from turning a future roadmap item into an unsupported current claim.

## Key vocabulary and concepts

### 1. Shared SaaS

Shared SaaS is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Isolated data

Isolated data is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Dedicated enterprise

Dedicated enterprise is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Feature entitlement

Feature entitlement is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Subscription control plane

Subscription control plane is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Classify customer requirements.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Select an isolation profile.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Assign subscription entitlements.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Apply operational authorization separately.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Review cost, scale, resilience, and compliance.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Classify customer requirements.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Select an isolation profile.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Assign subscription entitlements.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Apply operational authorization separately.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Review cost, scale, resilience, and compliance.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Compare architecture choices for a five-vehicle private shuttle, a 300-bus school district, and a nationwide carrier.

### Lab evidence

Record the source files reviewed, commands executed, outputs observed, mistakes corrected, and your final explanation. Do not mark the lab complete until the explanation can be delivered without reading the source verbatim.

## Common mistakes

- Treating a roadmap capability as if it is already production active.
- Describing a technology without explaining the business responsibility it supports.
- Ignoring tenant ownership, authorization, or evidence because the demonstration uses fictional data.
- Accepting an Agent Lee answer without checking its cited source and product version.
- Confusing a successful build with complete product, security, or customer acceptance evidence.

## Troubleshooting method

1. Reproduce the exact symptom and preserve the original message.
2. Identify whether the issue belongs to domain, application, API, infrastructure, integration, training, or LeeWay orchestration.
3. Inspect the governing file, test, receipt, and version evidence before editing.
4. Apply the smallest reversible change in staging.
5. Re-run build, tests, runtime checks, governance, and learning material validation.

## Security, privacy, tenant, and safety warning

An entitlement indicates that a tenant purchased or enabled a capability; it does not automatically authorize every user to perform every action.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain shared saas in your own words and identify one Transit Hub artifact that represents it.
2. Explain isolated data in your own words and identify one Transit Hub artifact that represents it.
3. Explain dedicated enterprise in your own words and identify one Transit Hub artifact that represents it.
4. Explain feature entitlement in your own words and identify one Transit Hub artifact that represents it.
5. Explain subscription control plane in your own words and identify one Transit Hub artifact that represents it.

## Practical assessment

Produce a diagram or narrated trace that connects the business need, architectural components, tenant boundary, test evidence, and current release status. The assessment passes when the explanation is accurate, complete, and does not overstate unfinished capability.

## Agent Lee proctor instructions

1. Resolve learner identity, visibility, requested depth, and product version.
2. Retrieve this chapter and the referenced implementation artifacts.
3. Explain one concept at a time and ask the learner to restate it.
4. Score answers against the approved rubric, not fluency alone.
5. Assign the guided lab and require evidence.
6. Provide corrections with citations.
7. Write a training receipt only after the learner demonstrates comprehension.

## Completion evidence

- Chapter knowledge-check answers
- Guided-lab artifact
- Source files reviewed
- Product version
- Score and rubric
- Instructor or Agent Lee identity
- Receipt identifier

## Sources and version references

- LeeWay Standards repository: https://github.com/4citeB4U/LeeWay-Standards
- ASP.NET Core documentation and learning paths: https://learn.microsoft.com/aspnet/core/ and https://learn.microsoft.com/training/paths/aspnet-core-fundamentals/
- Diátaxis documentation framework: https://diataxis.fr/start-here/
- Advanced Distributed Learning xAPI service definitions: https://www.adlnet.gov/guides/tla/service-definitions/
- DocFX documentation generation: https://dotnet.github.io/docfx/

## Chapter status

`INITIAL_DRAFT_CONTENT / REVIEW_AND_SCREENSHOT_EXPANSION_REQUIRED / VERSION 3.0.0`
