<!--
LEEWAY ENTERPRISE FILE HEADER
File: MASTER-TRAINING-MANUAL.md
Path: docs/training-manual/MASTER-TRAINING-MANUAL.md
Project: LeeWay Enterprise Transit Hub
Layer: Training / Generated Master Manual
Purpose: Assemble governed commercial training chapters into one controlled draft manual.
Inputs: Governed chapter Markdown and manual manifest.
Outputs: Single master training-manual draft.
Mutation Scope: Generated documentation only.
Dependencies: Chapter sources and Build-LeeWayTrainingManual.ps1.
Tests: Chapter count, word count, page estimate, and governance verification.
Security Impact: Excludes docs/private-learning and tenant data.
Database Impact: No database access.
Sovereign Cycle: Structure -> Execution -> Veritas -> Echo -> Synthesis
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 6.0.0
-->
# LeeWay Enterprise Transit Hub — Master Training Manual

**Controlled target:** 300 pages
**Status:** Initial governed draft content; not the final formatted 300-page release.

## Included chapter sources

- `docs/training-manual/01-product-orientation/CHAPTER-01-PRODUCT-MISSION-AND-AUDIENCE.md`
- `docs/training-manual/01-product-orientation/CHAPTER-02-TRANSPORTATION-OPERATING-MODELS.md`
- `docs/training-manual/02-roles-and-workflows/CHAPTER-03-ROLES-RESPONSIBILITIES-AND-SEPARATION-OF-DUTIES.md`
- `docs/training-manual/02-roles-and-workflows/CHAPTER-04-END-TO-END-OPERATING-DAY.md`
- `docs/training-manual/02-roles-and-workflows/CHAPTER-25-AUTHENTICATION-IDENTITY-AND-CLAIMS.md`
- `docs/training-manual/02-roles-and-workflows/CHAPTER-26-ROLES-PERMISSIONS-AND-POLICIES.md`
- `docs/training-manual/03-tenant-administration/CHAPTER-05-TENANTS-ORGANIZATION-UNITS-AND-OWNERSHIP.md`
- `docs/training-manual/03-tenant-administration/CHAPTER-06-SAAS-DEPLOYMENT-PROFILES-AND-ENTITLEMENTS.md`
- `docs/training-manual/03-tenant-administration/CHAPTER-27-TENANT-AWARE-AUTHORIZATION-AND-FAIL-CLOSED-ACCESS.md`
- `docs/training-manual/03-tenant-administration/CHAPTER-29-SQL-SERVER-TENANT-PERSISTENCE.md`
- `docs/training-manual/03-tenant-administration/CHAPTER-35-TENANT-SCOPED-OPERATIONS-EVENTS.md`
- `docs/training-manual/04-fleet-operations/CHAPTER-07-VEHICLE-DOMAIN-AND-BUSINESS-INVARIANTS.md`
- `docs/training-manual/04-fleet-operations/CHAPTER-08-VEHICLE-REQUEST-PATH-LAB.md`
- `docs/training-manual/04-fleet-operations/CHAPTER-30-VEHICLE-AND-WORK-ORDER-PERSISTENCE.md`
- `docs/training-manual/05-dispatch-and-routing/CHAPTER-09-DISPATCH-ROUTES-TRIPS-AND-ASSIGNMENTS.md`
- `docs/training-manual/05-dispatch-and-routing/CHAPTER-10-EXCEPTION-AND-COMMUNICATION-WORKFLOWS.md`
- `docs/training-manual/05-dispatch-and-routing/CHAPTER-34-REALTIME-OPERATIONS-AND-SIGNALR.md`
- `docs/training-manual/06-maintenance-and-inspections/CHAPTER-11-WORK-ORDERS-MAINTENANCE-AND-INSPECTIONS.md`
- `docs/training-manual/06-maintenance-and-inspections/CHAPTER-12-MAINTENANCE-EVIDENCE-LAB.md`
- `docs/training-manual/07-safety-and-compliance/CHAPTER-13-SAFETY-TENANT-AND-AUDIT-BOUNDARIES.md`
- `docs/training-manual/07-safety-and-compliance/CHAPTER-14-INCIDENT-COMPLIANCE-AND-RECORD-RETENTION.md`
- `docs/training-manual/08-driver-voice-and-vision/CHAPTER-15-DRIVER-MOBILE-VOICE-AND-VISION-BOUNDARIES.md`
- `docs/training-manual/08-driver-voice-and-vision/CHAPTER-16-GOVERNED-PERCEPTION-AND-HUMAN-APPROVAL.md`
- `docs/training-manual/09-reporting-and-integrations/CHAPTER-17-REPORTING-DATA-EXCHANGE-AND-LINEAGE.md`
- `docs/training-manual/09-reporting-and-integrations/CHAPTER-18-INTEGRATION-CONTRACTS-AND-FAILURE-HANDLING.md`
- `docs/training-manual/10-agent-lee/CHAPTER-19-AGENT-LEE-AS-EXTERNAL-LEEWAY-EMPLOYEE.md`
- `docs/training-manual/10-agent-lee/CHAPTER-20-AGENT-LEE-TRAINER-PROCTOR-AND-REPAIR-ORCHESTRATOR.md`
- `docs/training-manual/10-agent-lee/CHAPTER-28-AGENT-LEE-SERVICE-IDENTITY-AND-CONTINUOUS-LEARNING.md`
- `docs/training-manual/10-agent-lee/CHAPTER-36-AGENT-LEE-REALTIME-OBSERVATION-BOUNDARIES.md`
- `docs/training-manual/11-technical-administration/CHAPTER-21-BUILD-TEST-EVIDENCE-AND-RELEASE-GATES.md`
- `docs/training-manual/11-technical-administration/CHAPTER-22-SECURITY-CONFIGURATION-AND-DEGRADED-MODE.md`
- `docs/training-manual/11-technical-administration/CHAPTER-31-DOCKER-SQL-SERVER-OPERATIONS-AND-BACKUP.md`
- `docs/training-manual/11-technical-administration/CHAPTER-33-CREDENTIAL-ROTATION-AND-SECRET-SAFE-AUTOMATION.md`
- `docs/training-manual/12-troubleshooting-reference/CHAPTER-23-TROUBLESHOOTING-WITH-EVIDENCE.md`
- `docs/training-manual/12-troubleshooting-reference/CHAPTER-24-GLOSSARY-INTERVIEW-AND-CUSTOMER-DEFENSE.md`
- `docs/training-manual/12-troubleshooting-reference/CHAPTER-32-DATABASE-ISOLATION-HEALTH-AND-RECOVERY.md`

---

# Chapter 01 — Product Mission, Audience, and Value

## Purpose

Explain why Transit Hub exists, who it serves, and how the interview, SaaS, and LeeWay ecosystem missions remain simultaneously true.

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

### 1. Interview-defensible engineering

Interview-defensible engineering is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Commercial B2B SaaS value

Commercial B2B SaaS value is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Transportation organization diversity

Transportation organization diversity is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. LeeWay ecosystem integration

LeeWay ecosystem integration is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Truthful product claims

Truthful product claims is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Review the product charter and identify each mission.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Map a small shuttle company, a school-bus operator, and a regional carrier to shared capabilities.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Separate capabilities that exist now from roadmap capabilities.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Explain why Agent Lee is an external employee rather than an embedded model.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Record the explanation in a learning receipt.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Review the product charter and identify each mission.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Map a small shuttle company, a school-bus operator, and a regional carrier to shared capabilities.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Separate capabilities that exist now from roadmap capabilities.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Explain why Agent Lee is an external employee rather than an embedded model.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Record the explanation in a learning receipt.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Create a one-page customer briefing for a ten-vehicle operator and a one-page enterprise briefing for a thousand-vehicle operator. Identify what stays the same and what changes.

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

A product description must never imply that deferred SQL Server, identity, telematics, voice, or vision capabilities are already production active.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain interview-defensible engineering in your own words and identify one Transit Hub artifact that represents it.
2. Explain commercial b2b saas value in your own words and identify one Transit Hub artifact that represents it.
3. Explain transportation organization diversity in your own words and identify one Transit Hub artifact that represents it.
4. Explain leeway ecosystem integration in your own words and identify one Transit Hub artifact that represents it.
5. Explain truthful product claims in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 02 — Transportation Operating Models

## Purpose

Teach how trucking, school transportation, transit, shuttle, paratransit, delivery, and service fleets share an operational core while retaining vertical-specific requirements.

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

### 1. Fleet

Fleet is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Route and trip

Route and trip is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Dispatch

Dispatch is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Maintenance

Maintenance is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Safety and compliance

Safety and compliance is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Choose a transportation vertical.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **List its vehicles, people, locations, schedules, and regulatory concerns.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Identify shared Transit Hub modules.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Identify vertical-specific modules.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Define data that must remain tenant-scoped.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Choose a transportation vertical.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **List its vehicles, people, locations, schedules, and regulatory concerns.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Identify shared Transit Hub modules.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Identify vertical-specific modules.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Define data that must remain tenant-scoped.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Model one operating day for a trucking carrier and one for a school-bus provider, then compare dispatch, maintenance, safety, and customer communication events.

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

Do not assume one workflow fits every transportation company; use configurable profiles and explicit entitlements.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain fleet in your own words and identify one Transit Hub artifact that represents it.
2. Explain route and trip in your own words and identify one Transit Hub artifact that represents it.
3. Explain dispatch in your own words and identify one Transit Hub artifact that represents it.
4. Explain maintenance in your own words and identify one Transit Hub artifact that represents it.
5. Explain safety and compliance in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 03 — Roles, Responsibilities, and Separation of Duties

## Purpose

Define the operational, administrative, technical, and LeeWay roles that use or govern the platform.

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

### 1. Tenant owner

Tenant owner is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Fleet manager

Fleet manager is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Dispatcher

Dispatcher is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Mechanic and safety manager

Mechanic and safety manager is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Platform and Agent Lee service identities

Platform and Agent Lee service identities is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Identify the user role.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Resolve the tenant.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Determine allowed capabilities.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Apply least privilege.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Record approval and audit evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Identify the user role.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Resolve the tenant.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Determine allowed capabilities.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Apply least privilege.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Record approval and audit evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Build a role-to-capability matrix for dispatcher, mechanic, driver, tenant owner, support engineer, and Agent Lee.

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

A role name alone is not authorization; the tenant, resource ownership, requested action, and approval policy must also be evaluated.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain tenant owner in your own words and identify one Transit Hub artifact that represents it.
2. Explain fleet manager in your own words and identify one Transit Hub artifact that represents it.
3. Explain dispatcher in your own words and identify one Transit Hub artifact that represents it.
4. Explain mechanic and safety manager in your own words and identify one Transit Hub artifact that represents it.
5. Explain platform and agent lee service identities in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 04 — An End-to-End Transportation Operating Day

## Purpose

Show how dispatch, vehicle status, maintenance, incidents, communication, and evidence interact during a normal day and during disruption.

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

### 1. Shift start

Shift start is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Vehicle readiness

Vehicle readiness is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Trip execution

Trip execution is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Exception handling

Exception handling is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Shift close and reporting

Shift close and reporting is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Review scheduled work.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Confirm vehicle and driver readiness.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Monitor active operations.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Escalate exceptions.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Close work with receipts and reports.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Review scheduled work.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Confirm vehicle and driver readiness.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Monitor active operations.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Escalate exceptions.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Close work with receipts and reports.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Walk through a vehicle defect discovered before departure. Trace the decision from driver report to dispatch reassignment and maintenance work order.

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

Safety-critical decisions require deterministic rules and human authority even when Agent Lee provides recommendations.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain shift start in your own words and identify one Transit Hub artifact that represents it.
2. Explain vehicle readiness in your own words and identify one Transit Hub artifact that represents it.
3. Explain trip execution in your own words and identify one Transit Hub artifact that represents it.
4. Explain exception handling in your own words and identify one Transit Hub artifact that represents it.
5. Explain shift close and reporting in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 25 — Authentication, Identity, and Claims

## Purpose

This chapter teaches operators, administrators, developers, support specialists, and LeeWay agents how the Transit Hub establishes identity before it makes an authorization decision. Authentication answers **who or what is making the request**. Authorization answers **what that authenticated subject may do**. These are related but separate controls. A valid sign-in does not create unlimited authority, and an authorization policy cannot operate correctly when the identity is unknown or untrusted.

## Audience and prerequisites

The audience includes tenant owners, technical administrators, support staff, developers, security reviewers, and Agent Lee proctors. Learners should understand tenants, organization units, HTTP requests, and the Phase 02 tenant context. Before using this chapter in a production implementation, the organization must select and configure a trusted identity provider. The Phase 04 development header scheme is evidence instrumentation only. It exists to prove claim and policy behavior without pretending that a production login system already exists.

## Learning objectives

After completing this chapter, a learner should be able to:

1. Distinguish authentication from authorization.
2. Explain users, service identities, claims, roles, permissions, and capabilities.
3. Trace how an ASP.NET Core authentication scheme produces a `ClaimsPrincipal`.
4. Explain why development header authentication is disabled outside Development.
5. Identify the evidence still required before production identity can be claimed.

## Business context

Transportation companies have many types of actors. A driver may report a defect, a dispatcher may assign work, a mechanic may complete a repair, a safety manager may review an incident, a tenant owner may administer users, and Agent Lee may call an approved tool as a service identity. The system must know which actor is present and preserve that identity in evidence. Shared accounts and untraceable service credentials defeat auditability. The same person may also have different authority in different tenants, so identity must be combined with tenant membership and current context.

## Identity vocabulary

A **subject** is the user, service, device, or agent requesting access. An **identity provider** verifies the subject and issues trusted identity information. A **claim** is a name-value statement about the subject, such as a subject identifier, role, tenant identifier, or capability. A **role** groups organizational responsibility. A **permission** names an allowed class of operation. A **capability** identifies a specific external tool package or service boundary. A **ClaimsPrincipal** is the .NET representation of the current subject and its identities and claims.

The Transit Hub uses standard claim types for subject ID, user name, and roles. It also defines explicit custom claim types for tenant ID, tenant code, permission, and LeeWay capability. These claim names are constants in `TransitClaimTypes.cs` so endpoints and policies cannot drift through inconsistent spelling.

## Authentication request flow

The Phase 04 development flow is:

```text
HTTP request
  -> DevelopmentHeaderAuthenticationHandler
  -> validate required development identity headers
  -> normalize known roles
  -> derive permission claims from the governed role matrix
  -> construct ClaimsIdentity
  -> construct ClaimsPrincipal
  -> store principal on HttpContext.User
  -> tenant resolution
  -> authorization policies
  -> controller action
```

The handler returns one of three outcomes. **Success** means a valid development identity was constructed. **No result** means no identity was supplied or the scheme is disabled outside Development. **Failure** means headers were supplied but were incomplete, malformed, or contained an unknown role. These outcomes are intentionally distinct. Missing credentials should cause a protected endpoint to challenge with HTTP 401. Invalid credentials should also fail authentication. A valid identity that lacks permission should reach authorization and receive HTTP 403.

## Why the development scheme is not production identity

The header scheme trusts process-local development requests and therefore is unsuitable for a public network. A client capable of setting arbitrary headers could impersonate another subject. The handler reduces accidental misuse by refusing to run outside the Development environment, but that does not make it a secure production sign-in system. Production identity requires a trusted issuer, signed and validated tokens or secure server-managed sessions, key rotation, issuer and audience validation, expiration handling, account lifecycle, multifactor policy where required, revocation behavior, and operational monitoring.

The provider-neutral design allows a later OpenID Connect or OAuth 2.0 compatible identity provider to issue the same logical roles and custom claims. The controllers and policy names should not need to know whether the issuer is Microsoft Entra ID, another enterprise identity provider, or a customer-specific federated authority. The mapping layer must translate external group or scope information into the Transit Hub’s canonical claims and must be tested for each supported provider.

## User identities and service identities

A user identity represents a human operator. A service identity represents software acting within a controlled assignment. Agent Lee uses a service identity, not a hidden administrator account. The role `AgentService` identifies the class of subject, while the capability claim `leeway.enterprise-transit-hub` proves that the identity was granted this specific tool package. The service identity still needs a tenant claim that matches the current tenant context. It does not receive platform administration merely because Agent Lee is the orchestrator.

Service identities require separate credentials, separate rotation, narrower permissions, and detailed receipts. A service identity must never reuse a human user’s credentials. Human approval must be represented separately when an action requires it. The application should record both the requesting service identity and the authorizing human identity when they differ.

## Evidence and troubleshooting

When authentication fails, inspect the HTTP status, environment name, configured scheme, authentication logs, and supplied headers or token metadata. Do not log secrets, raw access tokens, passwords, or full confidential claims. Safe evidence includes the scheme name, subject identifier, tenant identifier, role names, policy name, result classification, correlation ID, and timestamp.

Common mistakes include confusing a role with a permission, treating tenant headers as authentication, trusting UI state, enabling development authentication in production, and assigning one powerful role to avoid designing policies. Each mistake creates either excessive authority or false confidence.

## Guided lab

1. Start the API in Development using the governed Phase 04 script.
2. Call `/api/security/whoami` without identity headers and observe HTTP 401.
3. Supply a valid user ID, name, role, identity tenant ID, and identity tenant code.
4. Confirm the response shows the canonical role and `DEVELOPMENT_ONLY_HEADER_AUTHENTICATION` evidence mode.
5. Change the role to an unknown value and verify authentication fails.
6. Explain why the same header technique must not be exposed as production sign-in.

## Knowledge check

Explain the difference between 401 and 403. Describe the minimum evidence required before replacing `productionIdentityBound = false` with a production-ready status. Identify which claims belong to the identity provider and which values are resolved by the application request boundary.

## Agent Lee proctor instructions

Agent Lee must require the learner to trace a request from the handler to `HttpContext.User`, then distinguish authentication evidence from authorization evidence. The learner does not pass by reciting definitions alone. The learner must identify the development-only boundary and must not claim that Phase 04 created a production identity provider.

---

# Chapter 26 — Roles, Permissions, and Policy-Based Authorization

## Purpose

This chapter explains how the Transit Hub converts organizational responsibility into testable authorization policies. Roles express who a subject is within the operating model. Permissions express classes of allowed operations. Policies combine authentication, claims, tenant requirements, and role rules into named decisions that endpoints can require.

## Learning objectives

A learner should be able to explain why role checks alone are insufficient, read the role-permission matrix, trace a named policy, distinguish declarative and imperative authorization, and identify the authorization decision that belongs at the HTTP boundary versus the resource boundary.

## Canonical roles

Phase 04 defines PlatformOwner, TenantOwner, TenantAdministrator, FleetManager, Dispatcher, SafetyManager, Mechanic, Driver, Viewer, and AgentService. The names are canonical and case-insensitive at ingestion. Unknown roles are rejected instead of silently accepted. This protects the application from misspelled or invented authority such as `SuperUnlimitedUser`.

The role catalog is intentionally small. A role should represent a stable job responsibility, not every button in the interface. A large fleet may eventually add custom role bundles, but custom bundles must still resolve to governed permissions. The platform must avoid role explosion, where dozens of nearly identical roles become impossible to review.

## Permission vocabulary

The initial permission vocabulary includes platform administration, tenant administration, fleet read, fleet manage, dispatch manage, maintenance manage, safety manage, training proctor, and agent tool execute. Permissions are lower-level than roles. For example, a FleetManager receives fleet read and fleet manage, while a Viewer receives only fleet read. AgentService receives fleet read, training proctor, and agent tool execute, but not platform administration.

The matrix in `TransitPermissions.cs` is a foundation for explanation and testing. In a production system, assignments may be stored in an identity or authorization service, but the canonical permission vocabulary remains part of the application contract. Any dynamic assignment system must preserve the same deny-by-default behavior and audit trail.

## Policy construction

`TransitSecurityServiceCollectionExtensions.cs` registers named policies. `TransitHub.Authenticated` requires a verified subject. `TransitHub.TenantMember` adds the tenant-access requirement. Fleet read and fleet manage policies require the corresponding permission claim and a matching tenant. Platform administration requires the PlatformOwner role and platform administration permission. Agent tool execution requires authentication, the AgentService role, the agent tool execute permission, the Transit Hub capability claim, and a matching tenant.

A named policy prevents controllers from rebuilding security logic differently. The endpoint declares the policy, while the composition root registers its meaning. Tests can inspect both the permission catalog and the live endpoint result.

## Authentication is not authority

A successful sign-in produces identity information. It does not answer every access question. A driver and fleet manager may both authenticate correctly, but only the fleet manager should pass `TransitHub.FleetManage`. A subject can also authenticate for one tenant and attempt to send a different tenant header. The tenant-access requirement blocks that cross-tenant request.

## Declarative authorization

Declarative authorization uses `[Authorize(Policy = ...)]` on a controller or action. This is appropriate when the decision can be made from the authenticated identity, claims, request tenant, and fixed policy. The Phase 04 evidence controller uses declarative policies for `whoami`, tenant member, fleet read, fleet manage, and agent tool endpoints.

Declarative checks happen before the action executes. This is valuable because denied requests never enter business logic. The controller remains thin and does not manually parse role strings.

## Resource-based authorization

Some decisions require the actual resource. For example, a dispatcher may be allowed to update trips only in an assigned region, a mechanic may close only work orders assigned to the mechanic’s depot, or a driver may read only the driver’s own inspection. The application must load the resource, then call `IAuthorizationService.AuthorizeAsync` with the resource and operation. Hiding an edit button or attaching only a broad role policy is not sufficient.

The future database phase must combine policy authorization with tenant-filtered repositories and resource ownership. Authorization at one layer does not eliminate the need for defense in depth.

## Default deny and least privilege

The Transit Hub follows default deny. A role receives only listed permissions. An unknown role is rejected. A missing claim does not imply a default tenant or permission. A missing capability denies Agent Lee tool execution. Platform administration is not inherited by AgentService. These rules make failure explicit and reduce accidental privilege.

Least privilege must be reviewed when job responsibilities change. Removing a user from a job must remove the corresponding role. Temporary elevated access requires an expiration and receipt. Support personnel should use controlled support access rather than permanent tenant-owner authority.

## UI behavior

The Web application may hide controls that the current subject cannot use, but UI visibility is not the security boundary. A user can call an API directly. The API must repeat the authorization check. The UI should treat policy results as presentation guidance and the API as final enforcement.

## Guided lab

1. Read `TransitRoles.cs`, `TransitPermissions.cs`, and `TransitPolicies.cs`.
2. Identify the permissions assigned to Viewer, FleetManager, TenantOwner, and AgentService.
3. Call the fleet-manage endpoint as FleetManager and confirm HTTP 200.
4. Call the same endpoint as Viewer and confirm HTTP 403.
5. Call the agent-tool endpoint as AgentService without the capability claim and confirm HTTP 403.
6. Add the exact capability claim and confirm HTTP 200.
7. Explain why the capability claim does not give platform administration.

## Troubleshooting

When a valid user receives 403, inspect the named policy, canonical role, derived permission claims, tenant match, and capability claim. Do not solve the problem by granting PlatformOwner. Determine the smallest missing authority. When a user receives 401, inspect authentication before authorization.

## Agent Lee proctor instructions

Ask the learner to map a real transportation job to roles and permissions, then challenge an overbroad assignment. Require the learner to explain declarative versus resource-based authorization and why UI hiding is not enforcement. Score the learner against evidence in the policy registration and runtime status codes.

---

# Chapter 05 — Tenants, Organization Units, and Data Ownership

## Purpose

Teach tenant identity as a business boundary and distinguish it from depots, divisions, garages, terminals, and other internal units.

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

### 1. Tenant

Tenant is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Organization unit

Organization unit is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Tenant-owned record

Tenant-owned record is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Tenant context

Tenant context is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Cross-tenant prohibition

Cross-tenant prohibition is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Resolve the tenant identity.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Resolve the organization unit when required.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Apply tenant ownership to the operation.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Reject incomplete or conflicting context.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Write auditable evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Resolve the tenant identity.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Resolve the organization unit when required.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Apply tenant ownership to the operation.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Reject incomplete or conflicting context.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Write auditable evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Using the existing tenant middleware, explain how valid headers create tenant context and why operational persistence must later enforce the same tenant identifier.

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

Headers establish request context but do not alone provide production-grade isolation; repositories, database constraints, authorization, and tests must enforce the boundary.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain tenant in your own words and identify one Transit Hub artifact that represents it.
2. Explain organization unit in your own words and identify one Transit Hub artifact that represents it.
3. Explain tenant-owned record in your own words and identify one Transit Hub artifact that represents it.
4. Explain tenant context in your own words and identify one Transit Hub artifact that represents it.
5. Explain cross-tenant prohibition in your own words and identify one Transit Hub artifact that represents it.

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

---

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

---

# Chapter 27 — Tenant-Aware Authorization and Fail-Closed Access

## Purpose

This chapter connects authenticated identity to the active SaaS tenant. Multitenancy is not secure merely because each record has a TenantId. The request must resolve one active tenant, the identity must be authorized for that tenant, and every data access path must enforce the same ownership boundary.

## Learning objectives

The learner should be able to trace tenant resolution and tenant authorization, explain why two tenant identifiers are compared in Phase 04, identify cross-tenant attack paths, distinguish request-level protection from database-level protection, and state what remains before production-grade isolation can be claimed.

## Two independent inputs

Phase 04 intentionally uses two tenant inputs in development evidence. `X-LeeWay-Tenant-Id` and `X-LeeWay-Tenant-Code` identify the tenant requested by the current operation. `X-LeeWay-Identity-Tenant-Id` and `X-LeeWay-Identity-Tenant-Code` represent tenant membership issued as identity claims. The tenant middleware resolves the request tenant. The authentication handler creates the identity claims. The tenant authorization handler compares them.

Using separate values allows a negative test. A valid identity for Tenant A can attempt to request Tenant B. Authentication succeeds because the subject is valid, but authorization returns 403 because the identity tenant does not match the requested tenant.

## Request flow

```text
Client request
  -> authentication handler creates ClaimsPrincipal
  -> tenant middleware validates request tenant headers
  -> scoped ITenantContext is resolved
  -> authorization middleware evaluates named policy
  -> TenantAccessAuthorizationHandler compares identity claims to ITenantContext
  -> policy succeeds or fails
  -> controller action executes only after success
```

The ordering matters. Authentication must occur before authorization so policies have a principal. Tenant resolution must occur before authorization so the custom requirement has a request tenant to compare. The composition root therefore calls `UseAuthentication`, then tenant middleware, then `UseAuthorization`.

## Fail-closed rules

The middleware rejects partial tenant headers. The authentication handler rejects partial identity headers. The authorization handler does not guess when context is unresolved. A mismatch does not fall back to a default tenant. These rules are fail closed: uncertainty results in denial rather than expanded access.

Default tenants are dangerous in SaaS applications. A background job, cached singleton, or missing header can accidentally use the wrong customer context. Tenant context is scoped to one request and cannot be resolved twice. Long-running workers will require an explicit tenant work item rather than relying on an ambient HTTP context.

## Tenant code and tenant ID

The GUID is the durable technical identifier. The tenant code is a readable operational identifier. Both are compared in the Phase 04 evidence path. The code is normalized to uppercase. A production identity mapping may use only the durable ID for authorization and treat the code as display metadata, but it must not accept conflicting values silently.

## Cross-tenant threats

Threats include changing a route or header tenant ID, guessing another tenant’s record ID, reusing cached data, missing query filters, background jobs with stale context, support accounts with excessive authority, Agent Lee tools that omit tenant scope, exports containing multiple tenants, and logs that expose customer data. Authorization policies address only part of this threat set.

## Defense in depth

Production tenant isolation requires multiple independent controls:

1. Trusted authentication and tenant membership claims.
2. Request-level tenant resolution and authorization.
3. Tenant-owned domain contracts.
4. Tenant-aware repositories.
5. Database query filters or dedicated database selection.
6. Database constraints and indexes that include tenant identity.
7. Resource-based authorization after loading records.
8. Cache keys that include tenant identity.
9. Tenant-scoped background jobs and message envelopes.
10. Security, integration, and penetration tests.
11. Audit receipts that record tenant, subject, action, and result.

Phase 04 implements items one only in development evidence form, item two as a runtime foundation, and the contract portion of item three from earlier phases. It does not claim production database isolation.

## Support and platform access

Platform operators may need to diagnose a customer issue. PlatformOwner is not a license to browse all tenant data without purpose. Support access should require a case, reason, time limit, customer policy, and receipt. Impersonation should be avoided or clearly marked. The subject performing the action and the tenant context must both remain visible in evidence.

## Agent Lee tenant scope

Agent Lee’s service identity must include AgentService, the Transit Hub capability, and tenant membership. Each tool call must specify the tenant and pass the same authorization path as a human request. Agent Lee must not infer tenant context from conversation alone when a tool mutation or private lookup is involved. The tool contract must carry a resolved tenant identifier and authorization evidence.

## Guided lab

1. Create two GUIDs representing Tenant A and Tenant B.
2. Authenticate the development identity for Tenant A.
3. Request Tenant A and call `/api/security/tenant-member`; expect HTTP 200.
4. Keep the identity tenant as A but request Tenant B; expect HTTP 403.
5. Remove one request tenant header; expect HTTP 400 from tenant resolution.
6. Remove identity headers; expect HTTP 401 from the protected endpoint.
7. Explain which component produced each status.

## Operational troubleshooting

A 400 indicates malformed request context. A 401 indicates missing or failed authentication. A 403 indicates a valid identity that did not satisfy the policy. A 404 may be used later to reduce resource enumeration, but the internal receipt should still record the actual authorization result. Logs must never reveal another tenant’s record content while reporting a denial.

## Agent Lee proctor instructions

Require a complete spoken trace of authentication, tenant resolution, policy evaluation, and controller execution. Present a mismatched-tenant scenario and ask the learner to predict the status code and evidence source. The learner must state that request-level authorization is necessary but not sufficient for production isolation.

---

# Chapter 29 — SQL Server tenant persistence

A tenant ID is carried from the HTTP boundary into the scoped context. EF Core adds a tenant predicate to mapped queries. When the connection opens, the interceptor sets SQL Server session context. RLS then filters rows and blocks writes whose `TenantId` differs. This is defense in depth, not a substitute for identity and authorization.

## Learning objectives

After this chapter, the learner can explain the component boundary, trace one request, identify tenant controls, distinguish source guidance from runtime proof, and locate the recovery evidence.

## Business context

Transportation organizations require durable vehicle and maintenance history. Lost or cross-customer records can disrupt dispatch, safety, billing, customer trust, and legal evidence. The database design therefore treats tenant identity, recoverability, and auditability as first-class operational concerns.

## Practice and assessment

Trace a vehicle creation from HTTP headers through middleware, `ITenantContext`, `VehicleService`, `IVehicleRepository`, `SqlServerVehicleRepository`, EF Core, the SQL connection interceptor, RLS, and the `fleet.Vehicles` row. Explain which control would still protect data if one earlier control were accidentally bypassed.

## Common mistakes

- Putting a password in `appsettings.json` or source control.
- Assuming an EF query filter is a complete authorization system.
- Using one-column primary keys that allow cross-tenant foreign-key mistakes.
- Running migrations with the application login.
- Deleting a Docker volume without a verified backup.
- Calling an estimated manual page count a final published page count.

## Agent Lee proctor instructions

Agent Lee must ask the learner to cite the exact source file, test, and evidence receipt. It must not reveal private answer rubrics to commercial learners and must not execute a database mutation without the required role, tenant, approval, and receipt.
## The complete tenant data path

A database row does not become tenant-safe merely because it contains a `TenantId` column. The tenant value must be resolved, validated, carried, enforced, and audited through the entire request. In the Transit Hub, the browser or approved service sends tenant headers. `TenantResolutionMiddleware` validates the pair and builds the scoped tenant context. Authentication establishes the caller, and authorization confirms that the caller is allowed to act for the resolved tenant. The application service then calls an abstraction such as `IVehicleRepository`. In SQL mode, dependency injection supplies the SQL Server adapter. The adapter uses a scoped `TransitHubDbContext`, and the context applies the active tenant to new entities and to query filters. Finally, the database connection interceptor writes the tenant identifier into SQL Server session context before commands execute.

This path must fail closed. A missing tenant cannot silently become a default tenant. A malformed tenant cannot be repaired by guessing. A caller whose identity belongs to a different tenant cannot rely on a valid role to cross the boundary. Each layer answers a different security question:

- Authentication asks who the caller is.
- Authorization asks whether the caller may perform the requested operation.
- Tenant context asks which customer boundary applies to this request.
- EF Core query filters constrain normal application queries.
- SQL Server row-level security constrains rows at the database engine.
- Receipts record what was attempted, what was allowed, and what evidence was produced.

## EF Core global query filters

The EF Core filter is part of the model configuration. For a tenant-owned entity, the filter compares the row tenant to the current scoped tenant. Application code can then write a normal query such as `context.Vehicles.ToListAsync()` and receive only rows for the active tenant. This reduces the risk that a developer forgets to add a tenant predicate to one query.

A query filter is still application-layer behavior. Code with special database authority can bypass it, raw SQL can bypass it, and an incorrectly configured context can use the wrong tenant. For that reason, the Transit Hub does not treat the filter as the only security boundary. Any deliberate filter bypass must be limited to a named administrative workflow, require explicit authorization, and generate a receipt. Normal fleet, maintenance, dispatch, and Agent Lee tools must never use a bypass merely for convenience.

## SQL Server row-level security

Row-level security operates inside SQL Server. The application places the active tenant ID into `SESSION_CONTEXT`. A schema-bound predicate function compares that session value with each row's `TenantId`. The security policy uses a filter predicate to hide rows that do not match. It also uses block predicates to reject inserts or updates that attempt to write a different tenant ID.

Read filtering and write blocking solve different problems. A filter predicate can prevent Tenant A from seeing Tenant B's vehicle. A block predicate can prevent Tenant A from inserting a work order that claims to belong to Tenant B. Both are required. Composite tenant keys and tenant-aware foreign keys add another control by preventing a work order in one tenant from referencing a vehicle in another tenant.

Connection pooling requires special attention. A physical SQL connection can be reused across requests. The session context must therefore be set for every opened connection, not only when the application first starts. Troubleshooting must verify the value on the exact connection used by the command. A stale or absent session value should result in no tenant rows or a denied write, never broad access.

## Shared and dedicated deployment profiles

Small and midsize customers may use a shared database with tenant discriminators, query filters, and RLS. A larger or regulated customer may receive a dedicated database while still using the same domain and repository contracts. The application layer should not need a different controller merely because the storage topology changes. Tenant routing and connection selection belong in infrastructure and control-plane configuration.

The shared model optimizes operational efficiency and cost. The dedicated model increases isolation and can simplify customer-specific backup, restore, retention, and performance guarantees. Neither model eliminates the need for identity, authorization, audit, encryption, monitoring, and tested recovery.

## Administrative verification checklist

Before declaring tenant persistence healthy, an administrator should confirm all of the following:

1. The request resolves exactly one valid tenant.
2. The authenticated identity is authorized for that tenant.
3. The scoped `ITenantContext` contains the expected tenant ID and code.
4. The EF Core model contains filters for every tenant-owned table.
5. The connection interceptor sets session context on every opened connection.
6. The RLS policy is enabled and bound to the expected tables.
7. Filter and block predicates are both present where required.
8. Composite keys and foreign keys include `TenantId`.
9. The application login cannot disable the policy or alter schema.
10. Cross-tenant automated tests run against a live SQL Server instance.
11. Logs and receipts contain identifiers but no passwords or connection strings.
12. A verified backup exists before destructive database work.

## Guided scenario

Assume Tenant A and Tenant B each have a vehicle with the same human-readable fleet number. This is allowed because fleet numbers are unique within a tenant, not necessarily across the entire SaaS platform. A Fleet Manager from Tenant A requests the vehicle list. The authorization layer confirms Tenant A membership. The EF filter selects Tenant A rows. The SQL session context is Tenant A, so RLS independently filters the table. The response may contain Tenant A's vehicle but must never contain Tenant B's vehicle.

Now assume a faulty repository accidentally calls a query that ignores the EF filter. RLS should still prevent Tenant B's row from being returned. If a migration login performs the same query, it may have broader authority, which is why migration credentials are never used by the normal API. Defense in depth means one defect does not automatically become a customer data disclosure.

## Knowledge check

Explain why tenant identity, user identity, and authorization are three separate concepts. Then identify one failure that EF Core filters prevent, one failure that SQL Server RLS prevents, and one failure that only role or permission authorization can prevent. A complete answer must refer to the request pipeline, the database session, and the distinction between normal runtime authority and migration authority.

---

# Chapter 35 - Tenant-Scoped Operations Events
## Purpose and audience

This chapter teaches tenant administrators, support engineers, and developers how Phase 06 behaves, why each boundary exists, and how to verify the behavior without exposing credentials or crossing tenant boundaries. The material applies to the development product baseline and must not be represented as a production secret-vault or global realtime deployment.
## Business context

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant.

### Business context review 1

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Business context review 2

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Business context review 3

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Business context review 4

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Core vocabulary

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer.

### Core vocabulary review 1

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Core vocabulary review 2

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Core vocabulary review 3

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Core vocabulary review 4

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Architecture

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds.

### Architecture review 1

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Architecture review 2

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Architecture review 3

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Architecture review 4

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Procedure

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence.

### Procedure review 1

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Procedure review 2

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Procedure review 3

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Procedure review 4

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Security controls

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities.

### Security controls review 1

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Security controls review 2

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Security controls review 3

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Security controls review 4

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Troubleshooting

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction.

### Troubleshooting review 1

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Troubleshooting review 2

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Troubleshooting review 3

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Troubleshooting review 4

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Guided lab

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words.

### Guided lab review 1

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Guided lab review 2

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Guided lab review 3

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Guided lab review 4

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Common mistakes

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test.

### Common mistakes review 1

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Common mistakes review 2

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Common mistakes review 3

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Common mistakes review 4

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Agent Lee support

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations.

### Agent Lee support review 1

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Agent Lee support review 2

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Agent Lee support review 3

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Agent Lee support review 4

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Completion evidence

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt.

### Completion evidence review 1

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Completion evidence review 2

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Completion evidence review 3

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Completion evidence review 4

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Knowledge check

1. Which layer owns tenant identity?
2. Why does persistence occur before notification?
3. What proves that old credentials are invalid?
4. Why is a tenant SignalR group not a substitute for SQL RLS?
5. Which production capabilities remain deferred?

## Practical assessment

Complete the guided lab, submit source references, include runtime status codes, and explain the rollback boundary. The instructor scores technical accuracy, evidence, security awareness, and professional explanation.

---

# Chapter 07 — Vehicle Domain and Business Invariants

## Purpose

Teach how the Vehicle entity protects identity and operational state without depending on HTTP, SQL Server, or Agent Lee.

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

### 1. Entity

Entity is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Invariant

Invariant is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Immutable property

Immutable property is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Private setter

Private setter is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Named domain operation

Named domain operation is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Construct a valid vehicle.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Observe constructor validation.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Change state through a named method.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Explain why direct property mutation is blocked.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Connect tests to the protected rule.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Construct a valid vehicle.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Observe constructor validation.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Change state through a named method.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Explain why direct property mutation is blocked.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Connect tests to the protected rule.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Read Vehicle.cs and VehicleTests.cs. Explain why blank fleet numbers fail and why out-of-service state changes update both status and reason.

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

Domain validation reduces unsafe states but does not replace authorization, database constraints, or physical vehicle inspection.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain entity in your own words and identify one Transit Hub artifact that represents it.
2. Explain invariant in your own words and identify one Transit Hub artifact that represents it.
3. Explain immutable property in your own words and identify one Transit Hub artifact that represents it.
4. Explain private setter in your own words and identify one Transit Hub artifact that represents it.
5. Explain named domain operation in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 08 — Vehicle Request Path Lab

## Purpose

Trace GET /api/vehicles through routing, controller, service, repository interface, in-memory adapter, store, and JSON response.

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

### 1. Controller

Controller is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Application service

Application service is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Repository interface

Repository interface is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Infrastructure adapter

Infrastructure adapter is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Dependency injection

Dependency injection is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Send the request.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Identify the matching route.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Trace constructor-injected dependencies.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Locate the active repository binding.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Explain how the response is serialized.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Send the request.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Identify the matching route.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Trace constructor-injected dependencies.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Locate the active repository binding.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Explain how the response is serialized.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Draw the request path and then describe which files change when SQL Server replaces the in-memory repository.

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

Controllers must remain thin; placing database or tenant-isolation logic directly in controllers creates duplication and weakens testability.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain controller in your own words and identify one Transit Hub artifact that represents it.
2. Explain application service in your own words and identify one Transit Hub artifact that represents it.
3. Explain repository interface in your own words and identify one Transit Hub artifact that represents it.
4. Explain infrastructure adapter in your own words and identify one Transit Hub artifact that represents it.
5. Explain dependency injection in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 30 — Vehicle and work-order persistence

The application service still depends on `IVehicleRepository` and `IWorkOrderRepository`. In SQL mode, dependency injection replaces only those adapters. Vehicle and work-order tables use composite tenant keys, and work orders reference vehicles by both `TenantId` and `VehicleId`, preventing a tenant from linking a maintenance record to another tenant's vehicle.

## Learning objectives

After this chapter, the learner can explain the component boundary, trace one request, identify tenant controls, distinguish source guidance from runtime proof, and locate the recovery evidence.

## Business context

Transportation organizations require durable vehicle and maintenance history. Lost or cross-customer records can disrupt dispatch, safety, billing, customer trust, and legal evidence. The database design therefore treats tenant identity, recoverability, and auditability as first-class operational concerns.

## Practice and assessment

Trace a vehicle creation from HTTP headers through middleware, `ITenantContext`, `VehicleService`, `IVehicleRepository`, `SqlServerVehicleRepository`, EF Core, the SQL connection interceptor, RLS, and the `fleet.Vehicles` row. Explain which control would still protect data if one earlier control were accidentally bypassed.

## Common mistakes

- Putting a password in `appsettings.json` or source control.
- Assuming an EF query filter is a complete authorization system.
- Using one-column primary keys that allow cross-tenant foreign-key mistakes.
- Running migrations with the application login.
- Deleting a Docker volume without a verified backup.
- Calling an estimated manual page count a final published page count.

## Agent Lee proctor instructions

Agent Lee must ask the learner to cite the exact source file, test, and evidence receipt. It must not reveal private answer rubrics to commercial learners and must not execute a database mutation without the required role, tenant, approval, and receipt.
## Repository replacement without business-layer drift

The foundation first used an in-memory repository so the domain model, services, controllers, and tests could be proven without external database complexity. Phase 05 replaces the vehicle and work-order adapters in SQL mode. The application service still depends on interfaces. This is important because the business use case should not know whether data is stored in a dictionary, SQL Server, a dedicated customer database, or a future read replica.

Dependency injection chooses the adapter at startup based on governed configuration. In-memory mode remains useful for focused unit tests and demonstrations. SQL mode is required for durable operational evidence. The API controller remains thin: it validates transport concerns, delegates to the service, and returns an HTTP result. SQL text, connection strings, and EF-specific tracking rules do not belong in the controller.

## Vehicle persistence model

A vehicle row includes the tenant identifier, vehicle identifier, fleet number, manufacturer, model, model year, operating status, out-of-service reason, and audit timestamps. The database mapping should preserve the invariants already enforced by the domain entity. Database constraints are not a replacement for domain methods, but they protect the data if another approved writer reaches the table.

A useful uniqueness rule is `(TenantId, FleetNumber)`. Two different companies may both operate vehicle `BUS-101`, while one company should not accidentally register the same fleet number twice. The primary or alternate keys must support tenant-aware references. Audit columns should use UTC values so events from different terminals and time zones can be compared consistently.

The repository maps between the domain entity and the persistence representation. A mature design avoids leaking EF tracking proxies or database-only concerns into the domain. Reads should clearly state whether they are tracked. A query used only to display a list can normally be no-tracking. A workflow that changes state may load a tracked row, apply a domain operation, and save changes inside a controlled transaction.

## Work-order persistence model

A work order belongs to the same tenant as its vehicle. Its relationship therefore uses both `TenantId` and `VehicleId`. A single-column foreign key on `VehicleId` would allow a dangerous ambiguity if identifiers were ever imported, copied, or incorrectly supplied. The composite relationship makes tenant ownership part of relational integrity.

A work order typically records title, description, priority, status, vehicle, creation time, assignment information, completion data, and evidence references. Later phases may add parts, labor, inspections, attachments, vendors, purchase authorization, and warranty claims. Those additions must preserve the same tenant key and authorization model.

The create workflow should follow this order:

1. Resolve and authorize the tenant.
2. Validate the request contract.
3. Query the vehicle through the tenant-aware repository.
4. Reject the operation when the vehicle is not visible to that tenant.
5. Construct the work-order domain entity.
6. Persist it with the active tenant ID.
7. Commit the transaction.
8. Write a LeeWay receipt containing safe identifiers and outcome evidence.

The application must not reveal whether an inaccessible vehicle exists in another tenant. Returning a generic not-found or denied result avoids creating a cross-tenant enumeration channel.

## Transactions and consistency

A transaction defines which changes succeed or fail together. Creating a work order and updating a vehicle's maintenance state may eventually need one transaction. Writing an external notification or calling Dynamics 365 should not be hidden inside an unbounded database transaction. Instead, the system can persist an integration job or outbox record and let a worker perform the external action after the local transaction commits.

Optimistic concurrency will become important when dispatchers, mechanics, and background workers edit the same record. A row-version column can detect that a record changed after it was read. The application should return a clear conflict instead of silently overwriting another user's work. Conflict handling belongs in the service and user experience, with evidence sufficient to reconstruct what happened.

## Query design for fleet operations

Operational queries should be shaped around user tasks rather than exposing the entire table. Examples include vehicles due for service, open work orders by depot, out-of-service vehicles, and work orders assigned to a mechanic. Every query remains tenant-scoped. Pagination, stable ordering, and server-side filtering are required before large customers are onboarded.

Indexes should reflect measured access patterns. A possible starting point is an index on `(TenantId, Status)` for vehicle status boards and `(TenantId, WorkOrderStatus, CreatedUtc)` for maintenance queues. Indexes have write and storage costs, so they should be justified with query plans and production-like data rather than added indiscriminately.

## Failure behavior

Database failures must not create false success. If `SaveChangesAsync` fails, the API must not return a success receipt. A transient connection problem may be retried only where the operation is idempotent or protected against duplication. A timeout does not prove that SQL Server did nothing, so retries for create operations require an idempotency key or another duplication control.

Validation errors, authorization denials, concurrency conflicts, transient infrastructure failures, and unexpected defects should be classified differently. That distinction supports correct HTTP responses, operator alerts, customer communication, and Agent Lee troubleshooting.

## Guided lab

Create two tenant contexts and add one vehicle to each. Query each tenant and record the IDs returned. Attempt to create a work order in Tenant B that references Tenant A's vehicle. The expected result is denial, with no cross-tenant row written. Then query the database through the restricted application login and confirm that session context changes the visible rows.

The lab is complete only when the learner can identify the controller, service, repository interface, SQL adapter, DbContext mapping, RLS policy, automated test, and evidence receipt involved in the result.

## Interview defense

A professional explanation should emphasize that persistence was introduced without coupling business logic to EF Core. The repository abstraction allowed the storage adapter to change, composite tenant keys protected relationships, EF filters reduced accidental omissions, and RLS supplied database-level enforcement. It should also state what is still incomplete, including full-module persistence, production secrets, high availability, performance testing, and production disaster recovery.

---

# Chapter 09 — Dispatch, Routes, Trips, and Assignments

## Purpose

Establish the future dispatch model while clearly distinguishing designed concepts from implemented production functionality.

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

### 1. Route

Route is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Trip

Trip is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Stop

Stop is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Assignment

Assignment is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Dispatch exception

Dispatch exception is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Define the planned service.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Create route and trip concepts.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Assign vehicle and operator.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Monitor status.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Escalate exceptions and preserve history.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Define the planned service.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Create route and trip concepts.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Assign vehicle and operator.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Monitor status.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Escalate exceptions and preserve history.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Design a route interruption scenario and list the data, permissions, notifications, and receipts required to reassign service.

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

This chapter is design-level until route, trip, and assignment modules receive compiled code, tests, and runtime evidence.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain route in your own words and identify one Transit Hub artifact that represents it.
2. Explain trip in your own words and identify one Transit Hub artifact that represents it.
3. Explain stop in your own words and identify one Transit Hub artifact that represents it.
4. Explain assignment in your own words and identify one Transit Hub artifact that represents it.
5. Explain dispatch exception in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 10 — Exception and Communication Workflows

## Purpose

Explain how operational exceptions become structured incidents, decisions, notifications, and follow-up work instead of disappearing into chat or phone calls.

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

### 1. Exception

Exception is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Incident

Incident is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Escalation

Escalation is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Notification

Notification is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Decision receipt

Decision receipt is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Capture the event.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Classify severity.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Resolve tenant and affected resources.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Notify authorized roles.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Close with evidence and follow-up actions.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Capture the event.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Classify severity.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Resolve tenant and affected resources.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Notify authorized roles.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Close with evidence and follow-up actions.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Create an exception playbook for a late vehicle, a mechanical breakdown, and an unavailable driver.

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

Agent-generated messages must be reviewable and must not expose private passenger, student, driver, or customer information to unauthorized recipients.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain exception in your own words and identify one Transit Hub artifact that represents it.
2. Explain incident in your own words and identify one Transit Hub artifact that represents it.
3. Explain escalation in your own words and identify one Transit Hub artifact that represents it.
4. Explain notification in your own words and identify one Transit Hub artifact that represents it.
5. Explain decision receipt in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 34 - Real-Time Operations and SignalR
## Purpose and audience

This chapter teaches dispatchers, fleet managers, developers, and administrators how Phase 06 behaves, why each boundary exists, and how to verify the behavior without exposing credentials or crossing tenant boundaries. The material applies to the development product baseline and must not be represented as a production secret-vault or global realtime deployment.
## Business context

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant.

### Business context review 1

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Business context review 2

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Business context review 3

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Business context review 4

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Core vocabulary

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer.

### Core vocabulary review 1

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Core vocabulary review 2

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Core vocabulary review 3

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Core vocabulary review 4

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Architecture

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds.

### Architecture review 1

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Architecture review 2

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Architecture review 3

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Architecture review 4

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Procedure

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence.

### Procedure review 1

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Procedure review 2

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Procedure review 3

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Procedure review 4

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Security controls

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities.

### Security controls review 1

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Security controls review 2

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Security controls review 3

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Security controls review 4

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Troubleshooting

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction.

### Troubleshooting review 1

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Troubleshooting review 2

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Troubleshooting review 3

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Troubleshooting review 4

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Guided lab

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words.

### Guided lab review 1

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Guided lab review 2

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Guided lab review 3

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Guided lab review 4

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Common mistakes

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test.

### Common mistakes review 1

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Common mistakes review 2

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Common mistakes review 3

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Common mistakes review 4

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Agent Lee support

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations.

### Agent Lee support review 1

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Agent Lee support review 2

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Agent Lee support review 3

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Agent Lee support review 4

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Completion evidence

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt.

### Completion evidence review 1

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Completion evidence review 2

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Completion evidence review 3

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Completion evidence review 4

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Knowledge check

1. Which layer owns tenant identity?
2. Why does persistence occur before notification?
3. What proves that old credentials are invalid?
4. Why is a tenant SignalR group not a substitute for SQL RLS?
5. Which production capabilities remain deferred?

## Practical assessment

Complete the guided lab, submit source references, include runtime status codes, and explain the rollback boundary. The instructor scores technical accuracy, evidence, security awareness, and professional explanation.

## Runtime verification of event-query responses

Operations administrators may see a valid event list, a valid empty list, or a schema error. Automated verification must distinguish those outcomes. The LeeWay verifier checks the status code before parsing the body, preserves an empty array as zero items, and accepts only governed collection representations. Supported representations include a raw JSON array and approved envelopes such as `items`, `value`, `data`, `results`, `events`, or `$values`.

Each parsed event must be an object. Required properties are located case-insensitively because ASP.NET web JSON normally uses camel-case names while tooling may preserve another casing. A collection element that lacks the required `subject` property is rejected with its available keys. This provides a precise contract failure rather than a generic strict-mode property exception.

The runtime receipt stores status codes, parsed item counts, tenant match counts, and SHA-256 hashes of the response bodies. It does not retain the complete response bodies in the receipt. This balances reproducibility with evidence minimization.

### Operator interpretation

- HTTP 200 plus an empty array for Tenant B is a tenant-isolation pass when Tenant A's event is absent.
- HTTP 200 plus a malformed event object is a contract failure.
- HTTP 401 or 403 is an identity or authorization result, not an empty event list.
- A SignalR negotiate pass proves authorized negotiation, not full WebSocket message delivery.

---

# Chapter 11 — Work Orders, Maintenance, and Inspections

## Purpose

Teach the relationship among vehicle condition, inspection findings, maintenance decisions, work orders, parts, labor, and return-to-service approval.

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

### 1. Inspection

Inspection is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Defect

Defect is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Work order

Work order is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Maintenance status

Maintenance status is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Return to service

Return to service is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Capture inspection evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Classify the defect.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Create and prioritize work.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Perform and document repair.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Verify and authorize return to service.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Capture inspection evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Classify the defect.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Create and prioritize work.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Perform and document repair.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Verify and authorize return to service.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Trace a brake defect from inspection through work-order closure. Identify which steps Agent Lee may assist with and which require human authority.

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

AI vision may identify a possible condition but cannot independently certify a safety-critical repair or return a vehicle to service.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain inspection in your own words and identify one Transit Hub artifact that represents it.
2. Explain defect in your own words and identify one Transit Hub artifact that represents it.
3. Explain work order in your own words and identify one Transit Hub artifact that represents it.
4. Explain maintenance status in your own words and identify one Transit Hub artifact that represents it.
5. Explain return to service in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 12 — Maintenance Evidence Lab

## Purpose

Teach evidence quality for maintenance actions, including timestamps, identity, photos, notes, parts, tests, approvals, and receipts.

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

### 1. Evidence chain

Evidence chain is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Provenance

Provenance is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Inspection media

Inspection media is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Approval

Approval is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Audit receipt

Audit receipt is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Record who observed the issue.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Preserve original evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Separate observation from diagnosis.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Record work performed and verification.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Issue a receipt linked to the vehicle and work order.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Record who observed the issue.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Preserve original evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Separate observation from diagnosis.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Record work performed and verification.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Issue a receipt linked to the vehicle and work order.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Evaluate three maintenance notes: one vague, one complete, and one containing unsupported claims. Rewrite them into auditable records.

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

Never fabricate measurements, inspection results, photos, signatures, parts usage, or completion status.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain evidence chain in your own words and identify one Transit Hub artifact that represents it.
2. Explain provenance in your own words and identify one Transit Hub artifact that represents it.
3. Explain inspection media in your own words and identify one Transit Hub artifact that represents it.
4. Explain approval in your own words and identify one Transit Hub artifact that represents it.
5. Explain audit receipt in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 13 — Safety, Tenant, and Audit Boundaries

## Purpose

Explain how safety controls, tenant isolation, least privilege, and immutable evidence reinforce one another.

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

### 1. Safety-critical action

Safety-critical action is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Least privilege

Least privilege is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Tenant isolation

Tenant isolation is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Audit trail

Audit trail is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Human approval

Human approval is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Classify the action risk.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Verify identity and tenant.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Check permissions and resource ownership.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Require approval when policy says so.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Record outcome and evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Classify the action risk.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Verify identity and tenant.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Check permissions and resource ownership.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Require approval when policy says so.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Record outcome and evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Classify ten example actions into read-only, low-risk repair, approval-required mutation, safety-critical, and prohibited categories.

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

No AI, administrator, or support engineer receives universal access merely because the task is urgent.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain safety-critical action in your own words and identify one Transit Hub artifact that represents it.
2. Explain least privilege in your own words and identify one Transit Hub artifact that represents it.
3. Explain tenant isolation in your own words and identify one Transit Hub artifact that represents it.
4. Explain audit trail in your own words and identify one Transit Hub artifact that represents it.
5. Explain human approval in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 14 — Incident, Compliance, and Record Retention

## Purpose

Teach structured incident handling and the future need for configurable retention, legal hold, export, and deletion policies.

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

### 1. Incident record

Incident record is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Evidence preservation

Evidence preservation is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Retention policy

Retention policy is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Legal hold

Legal hold is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Corrective action

Corrective action is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Create the incident record.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Preserve source evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Restrict access.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Perform review and corrective actions.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Retain or dispose under policy.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Create the incident record.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Preserve source evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Restrict access.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Perform review and corrective actions.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Retain or dispose under policy.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Design an incident record for a passenger injury or cargo damage without including real personal data.

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

Retention requirements vary by customer, jurisdiction, contract, and record type; product defaults must not be represented as legal advice.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain incident record in your own words and identify one Transit Hub artifact that represents it.
2. Explain evidence preservation in your own words and identify one Transit Hub artifact that represents it.
3. Explain retention policy in your own words and identify one Transit Hub artifact that represents it.
4. Explain legal hold in your own words and identify one Transit Hub artifact that represents it.
5. Explain corrective action in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 15 — Driver, Mobile, Voice, and Vision Boundaries

## Purpose

Define how hands-free reporting, camera analysis, documents, and mobile workflows will enter the product through governed perception contracts.

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

### 1. Voice input

Voice input is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Vision observation

Vision observation is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Mobile workflow

Mobile workflow is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Confidence

Confidence is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Human confirmation

Human confirmation is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Capture the input.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Identify source and tenant.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Transform into structured observation.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Show confidence and evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Require confirmation before sensitive mutation.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Capture the input.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Identify source and tenant.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Transform into structured observation.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Show confidence and evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Require confirmation before sensitive mutation.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Design a driver voice report and a vehicle-damage photo review. Separate raw input, model interpretation, human confirmation, and operational action.

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

Voice and vision outputs are observations or recommendations until deterministic validation and authorized human confirmation convert them into official records.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain voice input in your own words and identify one Transit Hub artifact that represents it.
2. Explain vision observation in your own words and identify one Transit Hub artifact that represents it.
3. Explain mobile workflow in your own words and identify one Transit Hub artifact that represents it.
4. Explain confidence in your own words and identify one Transit Hub artifact that represents it.
5. Explain human confirmation in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 16 — Governed Perception and Human Approval

## Purpose

Connect cameras, documents, voice, sensors, and external intelligence to the LeeWay Sovereign Cycle.

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

### 1. Perception

Perception is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Origin and provenance

Origin and provenance is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Structured observation

Structured observation is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Veritas

Veritas is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Lee Prime final response

Lee Prime final response is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Capture input.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Record provenance.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Validate schema and tenant.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Evaluate with Veritas.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Present decision or request approval.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Capture input.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Record provenance.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Validate schema and tenant.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Evaluate with Veritas.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Present decision or request approval.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Map a dashboard warning-light image through Perception, Origin, Structure, Execution, Veritas, Echo, Synthesis, and Lee Prime.

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

The source media and the interpretation must remain distinguishable so reviewers can challenge or replace the interpretation.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain perception in your own words and identify one Transit Hub artifact that represents it.
2. Explain origin and provenance in your own words and identify one Transit Hub artifact that represents it.
3. Explain structured observation in your own words and identify one Transit Hub artifact that represents it.
4. Explain veritas in your own words and identify one Transit Hub artifact that represents it.
5. Explain lee prime final response in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 17 — Reporting, Data Exchange, and Lineage

## Purpose

Teach how operational reports depend on trustworthy definitions, tenant scope, time boundaries, and data lineage.

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

### 1. Metric definition

Metric definition is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Data lineage

Data lineage is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Tenant scope

Tenant scope is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Time window

Time window is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Export control

Export control is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Define the question.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Select authoritative data.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Apply tenant and role filters.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Calculate reproducibly.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Label limitations and preserve evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Define the question.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Select authoritative data.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Apply tenant and role filters.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Calculate reproducibly.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Label limitations and preserve evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Define vehicle availability, overdue work orders, and incident rate. State the denominator, time window, exclusions, and tenant boundary for each.

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

A visually polished dashboard is not evidence unless the underlying definitions and source lineage are controlled.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain metric definition in your own words and identify one Transit Hub artifact that represents it.
2. Explain data lineage in your own words and identify one Transit Hub artifact that represents it.
3. Explain tenant scope in your own words and identify one Transit Hub artifact that represents it.
4. Explain time window in your own words and identify one Transit Hub artifact that represents it.
5. Explain export control in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 18 — Integration Contracts and Failure Handling

## Purpose

Explain contract-first integration with SQL Server, Oracle, Dataverse, telematics, notifications, and future customer systems.

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

### 1. Contract

Contract is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Idempotency

Idempotency is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Retry

Retry is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Dead-letter handling

Dead-letter handling is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Reconciliation

Reconciliation is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Define a versioned contract.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Validate incoming and outgoing data.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Apply tenant and authorization rules.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Handle retry safely.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Reconcile and receipt final state.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Define a versioned contract.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Validate incoming and outgoing data.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Apply tenant and authorization rules.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Handle retry safely.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Reconcile and receipt final state.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Design a Dynamics case import contract and identify fields needed for idempotency, tenant ownership, error handling, and audit.

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

Retries must not create duplicate work orders, notifications, payments, or customer cases.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain contract in your own words and identify one Transit Hub artifact that represents it.
2. Explain idempotency in your own words and identify one Transit Hub artifact that represents it.
3. Explain retry in your own words and identify one Transit Hub artifact that represents it.
4. Explain dead-letter handling in your own words and identify one Transit Hub artifact that represents it.
5. Explain reconciliation in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 19 — Agent Lee as an External LeeWay Employee

## Purpose

Teach the boundary between the Transit Hub business application and Agent Lee Prime operating from the LeeWay ecosystem.

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

### 1. External orchestrator

External orchestrator is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Capability package

Capability package is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Service identity

Service identity is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Least privilege

Least privilege is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Degraded mode

Degraded mode is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Resolve Agent Lee identity.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Resolve tenant and requesting user.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Select an approved capability.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Apply permissions and approval.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Execute, verify, and receipt the result.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Resolve Agent Lee identity.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Resolve tenant and requesting user.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Select an approved capability.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Apply permissions and approval.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Execute, verify, and receipt the result.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Explain why Transit Hub must remain usable when Agent Lee is unavailable and why no domain assembly should reference an Agent Lee runtime assembly.

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

Agent Lee is not a hidden superuser, not a replacement for human safety authority, and not embedded as a hardcoded model dependency.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain external orchestrator in your own words and identify one Transit Hub artifact that represents it.
2. Explain capability package in your own words and identify one Transit Hub artifact that represents it.
3. Explain service identity in your own words and identify one Transit Hub artifact that represents it.
4. Explain least privilege in your own words and identify one Transit Hub artifact that represents it.
5. Explain degraded mode in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 20 — Agent Lee as Trainer, Proctor, and Repair Orchestrator

## Purpose

Define how Agent Lee retrieves version-matched material, teaches at the learner level, scores answers, diagnoses failures, and runs approved repair playbooks.

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

### 1. Grounded retrieval

Grounded retrieval is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Learner level

Learner level is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Rubric

Rubric is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Diagnostic authority

Diagnostic authority is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Repair approval

Repair approval is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Resolve learner and visibility.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Retrieve approved sources.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Teach and demonstrate.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Assess against a rubric.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Write a training or repair receipt.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Resolve learner and visibility.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Retrieve approved sources.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Teach and demonstrate.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Assess against a rubric.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Write a training or repair receipt.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Run a mock session in which Agent Lee teaches dependency injection, asks a question, scores the response, and assigns a practical code-tracing task.

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

Agent Lee must cite approved product sources, distinguish fact from inference, and never expose private learning records to commercial users.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain grounded retrieval in your own words and identify one Transit Hub artifact that represents it.
2. Explain learner level in your own words and identify one Transit Hub artifact that represents it.
3. Explain rubric in your own words and identify one Transit Hub artifact that represents it.
4. Explain diagnostic authority in your own words and identify one Transit Hub artifact that represents it.
5. Explain repair approval in your own words and identify one Transit Hub artifact that represents it.

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

---

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

---

# Chapter 36 - Agent Lee Real-Time Observation Boundaries
## Purpose and audience

This chapter teaches LeeWay administrators, safety reviewers, and product owners how Phase 06 behaves, why each boundary exists, and how to verify the behavior without exposing credentials or crossing tenant boundaries. The material applies to the development product baseline and must not be represented as a production secret-vault or global realtime deployment.
## Business context

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant.

### Business context review 1

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Business context review 2

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Business context review 3

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Business context review 4

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Core vocabulary

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer.

### Core vocabulary review 1

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Core vocabulary review 2

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Core vocabulary review 3

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Core vocabulary review 4

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Architecture

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds.

### Architecture review 1

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Architecture review 2

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Architecture review 3

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Architecture review 4

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Procedure

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence.

### Procedure review 1

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Procedure review 2

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Procedure review 3

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Procedure review 4

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Security controls

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities.

### Security controls review 1

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Security controls review 2

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Security controls review 3

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Security controls review 4

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Troubleshooting

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction.

### Troubleshooting review 1

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Troubleshooting review 2

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Troubleshooting review 3

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Troubleshooting review 4

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Guided lab

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words.

### Guided lab review 1

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Guided lab review 2

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Guided lab review 3

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Guided lab review 4

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Common mistakes

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test.

### Common mistakes review 1

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Common mistakes review 2

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Common mistakes review 3

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Common mistakes review 4

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Agent Lee support

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations.

### Agent Lee support review 1

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Agent Lee support review 2

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Agent Lee support review 3

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Agent Lee support review 4

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Completion evidence

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt.

### Completion evidence review 1

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Completion evidence review 2

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Completion evidence review 3

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Completion evidence review 4

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Knowledge check

1. Which layer owns tenant identity?
2. Why does persistence occur before notification?
3. What proves that old credentials are invalid?
4. Why is a tenant SignalR group not a substitute for SQL RLS?
5. Which production capabilities remain deferred?

## Practical assessment

Complete the guided lab, submit source references, include runtime status codes, and explain the rollback boundary. The instructor scores technical accuracy, evidence, security awareness, and professional explanation.

---

# Chapter 21 — Build, Test, Evidence, and Release Gates

## Purpose

Teach the difference among restore, build, unit, integration, regression, security, architecture, runtime, governance, CI, and host evidence.

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

### 1. Restore

Restore is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Compilation

Compilation is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Automated tests

Automated tests is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Runtime verification

Runtime verification is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Receipt and registry

Receipt and registry is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Restore dependencies.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Compile with warnings treated seriously.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Run distinct test suites.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Verify runtime contracts.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Update registry and publish transactionally.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Restore dependencies.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Compile with warnings treated seriously.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Run distinct test suites.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Verify runtime contracts.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Update registry and publish transactionally.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Use the foundation and Phase 02 logs to classify what each PASS proves and what remains unproven.

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

A source citation or static scan never substitutes for compilation, runtime behavior, host integration, or customer acceptance evidence.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain restore in your own words and identify one Transit Hub artifact that represents it.
2. Explain compilation in your own words and identify one Transit Hub artifact that represents it.
3. Explain automated tests in your own words and identify one Transit Hub artifact that represents it.
4. Explain runtime verification in your own words and identify one Transit Hub artifact that represents it.
5. Explain receipt and registry in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 22 — Security, Configuration, and Degraded Mode

## Purpose

Explain secrets, environment-specific configuration, health checks, service degradation, backup, and rollback principles.

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

### 1. Secret boundary

Secret boundary is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Configuration source

Configuration source is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Health check

Health check is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Degraded mode

Degraded mode is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Rollback

Rollback is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Classify configuration.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Keep secrets outside source control.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Detect dependency health.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Preserve deterministic core operations.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Escalate and recover with evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Classify configuration.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Keep secrets outside source control.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Detect dependency health.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Preserve deterministic core operations.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Escalate and recover with evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Design a degraded-mode table for Agent Lee, voice, vision, SQL Server, notifications, and telemetry failures.

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

A degraded system must communicate unavailable capabilities clearly and must not silently weaken authorization, tenant, or safety controls.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain secret boundary in your own words and identify one Transit Hub artifact that represents it.
2. Explain configuration source in your own words and identify one Transit Hub artifact that represents it.
3. Explain health check in your own words and identify one Transit Hub artifact that represents it.
4. Explain degraded mode in your own words and identify one Transit Hub artifact that represents it.
5. Explain rollback in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 31 — Docker SQL Server operations and backup

The development container is product-labeled and uses a dedicated host port and named volume. The phase captures the pulled image digest, waits for SQL readiness, creates separate migration and application logins, applies migrations, verifies database health, creates a full backup, and runs `RESTORE VERIFYONLY`. Production architecture remains a separate decision.

## Learning objectives

After this chapter, the learner can explain the component boundary, trace one request, identify tenant controls, distinguish source guidance from runtime proof, and locate the recovery evidence.

## Business context

Transportation organizations require durable vehicle and maintenance history. Lost or cross-customer records can disrupt dispatch, safety, billing, customer trust, and legal evidence. The database design therefore treats tenant identity, recoverability, and auditability as first-class operational concerns.

## Practice and assessment

Trace a vehicle creation from HTTP headers through middleware, `ITenantContext`, `VehicleService`, `IVehicleRepository`, `SqlServerVehicleRepository`, EF Core, the SQL connection interceptor, RLS, and the `fleet.Vehicles` row. Explain which control would still protect data if one earlier control were accidentally bypassed.

## Common mistakes

- Putting a password in `appsettings.json` or source control.
- Assuming an EF query filter is a complete authorization system.
- Using one-column primary keys that allow cross-tenant foreign-key mistakes.
- Running migrations with the application login.
- Deleting a Docker volume without a verified backup.
- Calling an estimated manual page count a final published page count.

## Agent Lee proctor instructions

Agent Lee must ask the learner to cite the exact source file, test, and evidence receipt. It must not reveal private answer rubrics to commercial learners and must not execute a database mutation without the required role, tenant, approval, and receipt.
## Development resource ownership

The Phase 05 container and volume use fixed names and LeeWay labels. Fixed names make operations understandable, while labels prove which product and phase own the resources. The script must never delete a container or volume with the same name unless those ownership labels match. This prevents a cleanup routine from destroying an unrelated workload.

The SQL Server image tag is convenient for selection, but a tag can move. Runtime evidence therefore records the image ID and repository digest observed after the pull. The digest is the stronger identity for reproducing what was tested. A later production release should pin an approved digest and include vulnerability, license, and update review.

The named volume is mounted at SQL Server's data directory so database files survive container replacement. Persistence does not equal backup. A volume can be deleted, corrupted, encrypted by malware, or lost with its host. It also does not provide a historical restore point. The volume keeps active data; the backup supplies recoverable evidence at a known time.

## Readiness and health

A running container is not necessarily a ready database. SQL Server may still be starting, applying recovery, or rejecting logins. The phase waits by executing a real query through `sqlcmd`. It captures container logs when readiness fails. The application later exposes a separate database health endpoint that asks the configured DbContext whether it can connect.

These checks answer different questions:

- Docker state asks whether the container process is running.
- SQL readiness asks whether the engine accepts an authenticated query.
- Migration verification asks whether the expected schema exists.
- Application health asks whether the runtime identity and connection string work.
- Tenant-isolation tests ask whether the database enforces the intended boundary.

A green process health endpoint must never be presented as proof of tenant isolation or backup recoverability.

## Separate administrative identities

The `sa` credential is used only to bootstrap the isolated development environment. A migration login receives development schema authority so migrations and controlled SQL scripts can create objects. The application login receives only the permissions needed for normal runtime operations. It must not be able to alter RLS policies, create logins, change schema, or restore databases.

This separation limits the damage from an application defect or compromised runtime credential. It also makes permission tests meaningful. If the API uses the migration login, a successful query proves little about least privilege. The application connection must be tested with the application login.

Development credentials are generated at runtime. They must not appear in the repository, manual, logs, command transcript, receipts, or GitHub Actions artifacts. .NET user secrets keep local development settings outside source control, but they are not a production vault. Production will require a managed secret store, rotation, access logging, and an incident procedure.

## Migration discipline

A migration is a governed database change, not merely a generated file. Before applying one, the operator should review the model change, generated SQL, data-loss risk, lock duration, rollback strategy, backup state, and compatibility with the currently deployed application. The migration identity should be distinct from the runtime identity.

For a commercial SaaS product, migrations must account for larger datasets and rolling deployments. A destructive rename may need an expand-and-contract sequence: add the new column, deploy compatible code, backfill data, switch reads and writes, then remove the old column in a later release. This prevents an application/database version mismatch from taking the service offline.

The Phase 05 migration is a development foundation. It proves that schema creation, RLS, repositories, and tests can execute together. It does not yet prove zero-downtime production migration behavior.

## Backup procedure

The phase creates a full database backup inside the container, requests checksum validation, and runs `RESTORE VERIFYONLY`. It copies the `.bak` file into the evidence directory and calculates SHA-256. The receipt records the relative backup path, digest, database name, image identity, and verification status without recording passwords.

`RESTORE VERIFYONLY` checks that SQL Server can read the backup set and that it is structurally complete enough for verification. It is stronger than checking that a file exists, but it is not the same as performing a full restore and validating application behavior. A production recovery program must regularly restore into an isolated environment, run integrity checks, start the application, and verify critical workflows.

The backup must be protected separately from the active volume. Production requirements will include encryption, retention classes, off-host storage, access controls, immutability where appropriate, geographic strategy, and documented recovery point and recovery time objectives.

## Recovery procedure

A controlled development recovery follows this sequence:

1. Stop application writes or isolate the target environment.
2. Identify the exact backup using its receipt and SHA-256.
3. Confirm the destination instance, database names, paths, and capacity.
4. Preserve the current failed state when forensic investigation is required.
5. Restore into a new database or isolated instance first.
6. Run database consistency checks.
7. Apply required logins and security policies through governed scripts.
8. Start the application with the restored connection.
9. Verify health, tenant isolation, vehicle reads, and work-order relationships.
10. Obtain human approval before replacing an active environment.
11. Record the recovery receipt and retain all logs.

Agent Lee may guide and diagnose this procedure. It must not perform a destructive restore over customer data without explicit authority, a confirmed backup, an approved change window, and rollback evidence.

## Operator command categories

Read-only commands include inspecting container state, logs, image identity, volume metadata, SQL version, migration history, policy state, and backup metadata. Controlled mutation commands include starting or stopping the owned development container, applying an approved migration, creating a backup, and restoring into an isolated target. Destructive commands include deleting a volume, dropping a database, disabling RLS, or overwriting an active database. Those destructive actions require the highest approval class and should not be part of routine troubleshooting.

## Guided operations lab

The learner should locate the container by label, record its image digest, inspect the named volume, execute a readiness query, verify the application login lacks schema authority, create a test backup, run verification, copy it to evidence, and calculate its hash. The learner must then explain why each result is a separate piece of evidence and why none alone proves complete production readiness.

## Production gap statement

This phase does not claim high availability, failover clustering, managed cloud database operation, encrypted production backup, point-in-time restore, geo-replication, automated retention, capacity testing, or customer-specific recovery objectives. Those capabilities require later architecture decisions and operational proof.

---

# Chapter 33 - Credential Rotation and Secret-Safe Automation
## Purpose and audience

This chapter teaches technical administrators, security reviewers, and support engineers how Phase 06 behaves, why each boundary exists, and how to verify the behavior without exposing credentials or crossing tenant boundaries. The material applies to the development product baseline and must not be represented as a production secret-vault or global realtime deployment.
## Business context

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant.

### Business context review 1

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Business context review 2

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Business context review 3

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Business context review 4

Transportation operations depend on timely facts, but speed cannot replace authorization. A delay, inspection warning, work-order change, or system alert must be accepted under one tenant, persisted as evidence, and delivered only to authorized people working for that tenant. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Core vocabulary

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer.

### Core vocabulary review 1

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Core vocabulary review 2

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Core vocabulary review 3

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Core vocabulary review 4

Credential rotation replaces an authentication secret. Redaction removes sensitive values from output. An operations event is an immutable tenant-owned fact. A SignalR hub manages realtime connections. A group is a server-managed set of connections. Row-Level Security is a database enforcement layer. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Architecture

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds.

### Architecture review 1

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Architecture review 2

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Architecture review 3

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Architecture review 4

The design separates domain validation, application coordination, persistence, and realtime transport. The application service depends on repository and notifier interfaces. SQL Server stores the event and enforces tenant context. The API adapter publishes only after persistence succeeds. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Procedure

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence.

### Procedure review 1

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Procedure review 2

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Procedure review 3

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Procedure review 4

Authenticate, resolve the tenant, authorize the operation, validate the event, persist it, write a receipt, publish to the tenant group, and verify the client sees only authorized data. For credential incidents, generate replacements, rotate logins, update the approved store, reject old credentials, and scan evidence. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Security controls

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities.

### Security controls review 1

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Security controls review 2

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Security controls review 3

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Security controls review 4

Never accept TenantId from the event body. Never broadcast with Clients.All. Never print process arguments that include passwords. Never treat .NET Secret Manager as a production vault. Never let Agent Lee bypass the same policies applied to human and service identities. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Troubleshooting

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction.

### Troubleshooting review 1

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Troubleshooting review 2

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Troubleshooting review 3

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Troubleshooting review 4

Separate connection failures from authorization failures and delivery failures. A database health pass proves connectivity, not SignalR delivery. A negotiate response proves the hub endpoint and policy path, not a complete distributed messaging path. Review server logs only after redaction. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Guided lab

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words.

### Guided lab review 1

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Guided lab review 2

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Guided lab review 3

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Guided lab review 4

Use fictional tenants. Publish one event for Tenant A, retrieve it as Tenant A, confirm Tenant B cannot see it, negotiate a SignalR connection with authorized headers, and capture only non-secret evidence. Then explain each layer in your own words. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Common mistakes

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test.

### Common mistakes review 1

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Common mistakes review 2

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Common mistakes review 3

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Common mistakes review 4

Common errors include logging connection strings, using a global broadcast, trusting a client-supplied tenant ID, publishing before persistence, skipping receipts, assuming local credentials are harmless, and claiming production readiness from a single-node development test. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Agent Lee support

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations.

### Agent Lee support review 1

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Agent Lee support review 2

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Agent Lee support review 3

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Agent Lee support review 4

Agent Lee may explain the workflow and observe authorized tenant events through governed capabilities. Agent Lee remains external to the application, receives no automatic publish permission, and must use a delegated tool path for mutations. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Completion evidence

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt.

### Completion evidence review 1

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Completion evidence review 2

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Completion evidence review 3

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

### Completion evidence review 4

Completion requires source review, automated tests, runtime tenant-isolation proof, credential-rotation evidence, secret-leak scan, backup verification, learning questions, answer keys, and a LeeWay receipt. The reviewer must identify the responsible file, the trust boundary, the expected failure status, and the evidence that distinguishes a source claim from a host-runtime pass. This repeated review is intentional because operational training must prepare the learner to perform the task, diagnose a failure, and explain the design during an interview or customer handoff.

## Knowledge check

1. Which layer owns tenant identity?
2. Why does persistence occur before notification?
3. What proves that old credentials are invalid?
4. Why is a tenant SignalR group not a substitute for SQL RLS?
5. Which production capabilities remain deferred?

## Practical assessment

Complete the guided lab, submit source references, include runtime status codes, and explain the rollback boundary. The instructor scores technical accuracy, evidence, security awareness, and professional explanation.


## Pre-mutation migration-model validation

Before a release rotates credentials or changes the schema, operators must prove that the EF Core design-time model matches the governed model snapshot. The Transit Hub runs a no-mutation snapshot check after compilation. If pending model changes are detected, the release stops before credential or database mutation.

The check does not replace database validation. After alignment passes, the release still applies the migration, verifies SQL objects and row-level-security predicates, runs integration tests, and creates a verified backup.


## Dedicated migration identity verification

Temporary database authority is effective only when the migration process connects through the same principal that received the grant. Administrators must verify both role membership and connection selection. LeeWay Transit Hub now selects `TransitHubSqlServerMigration` only for the explicit `--migrate` execution mode and selects the restricted `TransitHubSqlServer` connection for ordinary application runtime. A successful role-membership query by itself is insufficient evidence; the migration execution, post-migration revocation, and runtime least-privilege probes must all pass.

Before temporary elevation, the release workflow performs a migration-principal runtime probe. The probe opens the actual EF Core connection and verifies `ORIGINAL_LOGIN()` against the expected dedicated migration principal. This prevents authority from being granted to one user while the migration executes as another.

## Database readiness after SQL Server container recreation

Technical administrators must distinguish engine readiness from application-database readiness. A container restart can complete far enough for an administrator to connect to `master` while an attached database is still in `RECOVERING`, `RECOVERY_PENDING`, or another state that prevents normal application access. Testing an application login immediately after the first successful administrator probe can therefore produce a false credential failure.

The governed startup sequence is:

1. Authenticate `sa` explicitly to `master`.
2. Query `sys.databases` until `LeeWayTransitHub` reports `ONLINE` and `MULTI_USER`.
3. Authenticate `transithub_app` explicitly to `LeeWayTransitHub`.
4. Authenticate `transithub_migrator` explicitly to `LeeWayTransitHub`.
5. Use bounded retries and preserve sanitized diagnostic evidence when the deadline is exceeded.

Do not lower the gate by connecting every principal only to `master`. The product must prove that each restricted principal can open the actual application database it is expected to use. Do not rely only on a login's default database because that hides which database the evidence probe intended to validate.

### Troubleshooting decision table

| Observation | Interpretation | Action |
|---|---|---|
| `sa` cannot connect to `master` | Engine or credential not ready | Continue bounded engine readiness polling |
| `sa` connects, database is not `ONLINE` | User database still recovering or unavailable | Continue database-state polling; do not rotate again |
| Database is `ONLINE`, application login fails | Real login mapping, permission, or password problem | Inspect sanitized SQL error evidence |
| Database is `ONLINE`, login succeeds after retry | Transient startup race resolved | Record readiness duration and continue |
| Deadline expires | Readiness contract failed | Stop, preserve evidence, and leave canonical publication unchanged |

## Backup execution authority after migration

Do not assume that the migration identity is also the backup identity. In the development release workflow, the migration identity is elevated only long enough to apply the governed EF migration. The release then removes `db_owner` and proves that the identity has no database `CONTROL` and no `BACKUP DATABASE` permission.

The transactional installer administrator creates the pre-migration and post-migration backups and also runs `RESTORE VERIFYONLY`. This is a bounded development workflow, not the final production backup architecture. Production environments should use a dedicated backup service identity, managed secret storage, encrypted backup destinations, retention policy, restore drills, and separation of duties.

### Required evidence

- Backup command executed by the declared backup authority.
- `WITH CHECKSUM` included in the backup operation.
- `RESTORE VERIFYONLY ... WITH CHECKSUM` completed successfully.
- Backup file copied into the phase evidence directory.
- SHA-256 recorded in the phase receipt.
- Migrator `db_owner`, database `CONTROL`, and `BACKUP DATABASE` permissions proven absent after migration.

---

# Chapter 23 — Troubleshooting with Evidence

## Purpose

Teach a repeatable diagnosis method that begins with observed symptoms and ends with verified repair or escalation.

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

### 1. Symptom

Symptom is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Scope

Scope is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Hypothesis

Hypothesis is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Non-mutating diagnostic

Non-mutating diagnostic is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Repair and rollback

Repair and rollback is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Capture the exact error.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Classify the failing layer.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Gather version and state evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Test the smallest safe hypothesis.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Repair, verify, receipt, or escalate.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Capture the exact error.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Classify the failing layer.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Gather version and state evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **Test the smallest safe hypothesis.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **Repair, verify, receipt, or escalate.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Use the earlier xUnit namespace failure and API log-lock failure as case studies. Identify cause, proof, rollback, repair, and prevention.

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

Do not change multiple layers at once or accept a green message that conflicts with process exit codes, compiler output, tests, or runtime evidence.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain symptom in your own words and identify one Transit Hub artifact that represents it.
2. Explain scope in your own words and identify one Transit Hub artifact that represents it.
3. Explain hypothesis in your own words and identify one Transit Hub artifact that represents it.
4. Explain non-mutating diagnostic in your own words and identify one Transit Hub artifact that represents it.
5. Explain repair and rollback in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 24 — Glossary, Interview Defense, and Customer Explanation

## Purpose

Provide a common language for developers, transportation users, customers, instructors, and interviewers.

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

### 1. Domain

Domain is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 2. Application service

Application service is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 3. Adapter

Adapter is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 4. Tenant

Tenant is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.
### 5. Capability and receipt

Capability and receipt is treated as a controlled concept in Transit Hub. Learners must connect the term to an actual business responsibility, a governed source file or contract, and evidence that proves the current implementation state.

## Governed workflow

1. **Define the term plainly.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Relate it to a Transit Hub file.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Explain the business value.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **State current evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **State what remains on the roadmap.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Explanation: how and why

The LeeWay approach is schema-first and receipt-required. Before an action is performed, the relevant identity, tenant, input, output, mutation scope, and evidence expectations are made explicit. Domain code protects business invariants. Application services coordinate use cases. Interfaces define replaceable boundaries. Infrastructure implements those boundaries. API and user interfaces translate external interaction into application requests. Agent Lee operates outside those layers through a capability package, which prevents one model or orchestration runtime from becoming hardcoded business logic.

This structure also makes education possible. A chapter can point to the exact domain type, service, controller, test, manifest, or receipt that demonstrates the concept. Agent Lee can retrieve the same approved source, adjust the explanation for a beginner or architect, ask a scored question, and preserve the learning result. The product and its education therefore evolve together.

## Guided procedure

1. **Define the term plainly.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
2. **Relate it to a Transit Hub file.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
3. **Explain the business value.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
4. **State current evidence.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.
5. **State what remains on the roadmap.** At this step, identify the responsible role, required inputs, expected output, tenant boundary, failure condition, and evidence that must be retained.

## Guided lab

Practice three explanations: a two-minute interviewer answer, a five-minute customer architecture overview, and a lesson suitable for a new family learner.

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

Professional explanations must be accurate, understandable, and explicit about deferred capabilities rather than overstating completion.

Never use real customer, student, passenger, driver, employee, shipment, medical, payment, or location data in an uncontrolled training exercise. Agent Lee must apply the learner's visibility and tenant boundaries before retrieving examples or prior answers.

## Knowledge check

1. Explain domain in your own words and identify one Transit Hub artifact that represents it.
2. Explain application service in your own words and identify one Transit Hub artifact that represents it.
3. Explain adapter in your own words and identify one Transit Hub artifact that represents it.
4. Explain tenant in your own words and identify one Transit Hub artifact that represents it.
5. Explain capability and receipt in your own words and identify one Transit Hub artifact that represents it.

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

---

# Chapter 32 — Database isolation, health, and recovery

A healthy process does not prove a healthy database. The database readiness endpoint uses EF Core `CanConnectAsync`. Cross-tenant behavior is verified separately. Troubleshooting begins with Docker ownership, container logs, engine version, database objects, session context, security policy state, application configuration, and the exact failed evidence gate.

## Learning objectives

After this chapter, the learner can explain the component boundary, trace one request, identify tenant controls, distinguish source guidance from runtime proof, and locate the recovery evidence.

## Business context

Transportation organizations require durable vehicle and maintenance history. Lost or cross-customer records can disrupt dispatch, safety, billing, customer trust, and legal evidence. The database design therefore treats tenant identity, recoverability, and auditability as first-class operational concerns.

## Practice and assessment

Trace a vehicle creation from HTTP headers through middleware, `ITenantContext`, `VehicleService`, `IVehicleRepository`, `SqlServerVehicleRepository`, EF Core, the SQL connection interceptor, RLS, and the `fleet.Vehicles` row. Explain which control would still protect data if one earlier control were accidentally bypassed.

## Common mistakes

- Putting a password in `appsettings.json` or source control.
- Assuming an EF query filter is a complete authorization system.
- Using one-column primary keys that allow cross-tenant foreign-key mistakes.
- Running migrations with the application login.
- Deleting a Docker volume without a verified backup.
- Calling an estimated manual page count a final published page count.

## Agent Lee proctor instructions

Agent Lee must ask the learner to cite the exact source file, test, and evidence receipt. It must not reveal private answer rubrics to commercial learners and must not execute a database mutation without the required role, tenant, approval, and receipt.
## Troubleshooting starts with classification

Do not begin by restarting or deleting resources. First classify the symptom. A connection refusal, login failure, migration mismatch, empty tenant result, forbidden cross-tenant request, slow query, failed backup, and corrupted database represent different failure classes. Each class has different evidence and repair authority.

The initial diagnostic record should include time, environment, tenant, caller identity, request or correlation ID, endpoint, expected result, actual result, recent deployment, database and container state, and the exact failed gate. Passwords, tokens, full connection strings, student data, passenger data, and customer secrets must be redacted.

## Layered health model

Use a layered model rather than one green or red light:

1. Host health: disk, memory, CPU, time, and network are adequate.
2. Docker health: the engine responds and the owned container exists.
3. Process health: SQL Server remains running and has not restarted unexpectedly.
4. Engine readiness: an authenticated `SELECT 1` succeeds.
5. Schema health: migration history and required objects match the release.
6. Security health: logins, grants, session context, and RLS policy are correct.
7. Application health: the restricted runtime connection succeeds.
8. Business health: tenant-specific vehicle and work-order workflows behave correctly.
9. Recovery health: a recent backup is verified and a restore drill is current.

The layer where evidence first fails usually identifies the correct repair lane.

## Connection troubleshooting

For a refused connection, confirm the container is running, host port mapping is correct, SQL Server finished startup, and no other service owns the port. Inspect container logs for licensing, password-policy, storage, and recovery messages. Confirm the client uses the correct host, port, encryption settings, database, and login.

For login failure, test with the intended identity. Do not switch the application to `sa` just to make the error disappear. Verify that the login exists, maps to the database user, is enabled, and has the expected permissions. A migration login working while the app login fails is valuable evidence that the engine is healthy but runtime provisioning is incomplete.

For pool-related tenant problems, capture the session-context value on the same connection used by the failing command. Confirm the connection interceptor runs whenever a connection opens and replaces any prior tenant value. The safe default for missing context is no rows or denied writes.

## Migration troubleshooting

When migration application fails, preserve the generated SQL and error output. Compare the model snapshot, migration history table, and actual schema. Determine whether the failure happened before or after a transactional boundary. Do not repeatedly rerun a partially applied non-idempotent script without understanding its state.

Common causes include insufficient migration permissions, existing objects, unsupported SQL syntax, locked tables, data that violates a new constraint, and application/database version mismatch. A repair may require a forward-only corrective migration rather than editing an already published migration.

## Row-level security troubleshooting

If a tenant sees no rows, verify tenant resolution, authorization, DbContext scope, session context, policy enabled state, and predicate logic. Empty results can be correct when the tenant has no data, so compare against a controlled test row.

If cross-tenant data appears, treat it as a security incident. Stop the affected data path, preserve logs, identify the scope, and verify whether the response actually crossed the tenant boundary. Inspect EF filters, any `IgnoreQueryFilters` use, raw SQL, session context, RLS policy binding, login privileges, and cached responses. Do not hide the symptom by deleting evidence.

Use a restricted application login during the test. A database owner can bypass or alter controls and therefore does not represent production runtime behavior. Verify both read filtering and write blocking. A test that only reads data cannot prove that cross-tenant inserts are rejected.

## Work-order relationship failures

A cross-tenant vehicle reference should be rejected before persistence and again by relational constraints or RLS. If the API returns success but no row is written, investigate transaction handling and response generation. If a row is written, preserve the IDs and inspect composite foreign keys, tenant values, repository lookup, and session context.

A same-tenant work order that fails may indicate a missing vehicle, wrong tenant code, stale context, invalid status, or migration mismatch. The error response should avoid exposing another tenant's identifiers.

## Backup troubleshooting

A backup command can fail because the path is unavailable, SQL Server lacks filesystem permission, storage is full, compression or checksum is unsupported, or the database is in an unsuitable state. Capture SQL output and container storage information. Do not delete the active volume to make space without an approved recovery plan.

A copied `.bak` file must retain the expected size and SHA-256. Verification failure means the backup cannot be accepted as recovery evidence. Even a successful `RESTORE VERIFYONLY` should be followed by scheduled restore drills. Recovery readiness is measured by successful restoration of service, not by the existence of backup files.

## Performance troubleshooting

Slow operations require query duration, execution plan, row counts, indexes, blocking, waits, resource utilization, and tenant distribution. Avoid guessing that every delay is a database problem. A slow external integration, oversized API response, synchronous logging, or exhausted application thread pool can produce similar symptoms.

Tenant-aware indexes normally begin with `TenantId` when queries are scoped by tenant, but exact column order depends on filters and sorting. Validate with representative data. One very large tenant may require a dedicated database or deployment stamp even when the shared model works for smaller customers.

## Agent Lee diagnostic boundaries

Agent Lee may collect read-only health data, correlate receipts, explain the failure class, and propose a ranked repair plan. It may execute an approved non-destructive probe through the capability package. It must not reveal connection secrets, bypass tenant authorization, disable RLS, use migration credentials for routine queries, delete volumes, drop databases, or restore over active customer data without explicit human authority.

A repair recommendation must include expected impact, permissions, commands or tool calls, success criteria, rollback, and evidence location. When evidence is insufficient, Agent Lee should say so and escalate rather than manufacture certainty.

## Incident playbook

For a suspected cross-tenant exposure:

1. Disable or isolate the affected endpoint without destroying data.
2. Preserve application, database, proxy, and receipt evidence.
3. Record the detected tenants, time range, and data classes.
4. Rotate compromised credentials when indicated.
5. Reproduce in an isolated environment using controlled records.
6. Identify the failed control layer.
7. Patch the defect and add a regression test.
8. Validate EF filtering, session context, RLS, authorization, and caching.
9. Conduct required legal, contractual, and customer notification review.
10. Restore service through an approved change with heightened monitoring.
11. Publish an internal post-incident report and update training.

## Recovery decision tree

Use restart only when the failure is transient and state is safe. Use migration repair when schema and release disagree. Use credential repair when the engine is healthy but the intended login cannot connect. Use restore when data is corrupted or a governed rollback requires a known recovery point. Use a new isolated database when forensic preservation or uncertainty makes in-place repair unsafe.

Every path ends with business verification: tenant-scoped reads, authorized writes, denied cross-tenant actions, health checks, receipts, and operator sign-off.

## Practical assessment

Given a scenario where Tenant A receives an empty vehicle list after a deployment, the learner must produce a diagnostic plan without making a mutation. The plan should inspect identity, request tenant headers, middleware resolution, authorization, current tenant context, connection string selection, migration state, session context, RLS policy, and controlled database rows. The learner must specify which evidence would distinguish a legitimate empty tenant from a configuration defect.

---


