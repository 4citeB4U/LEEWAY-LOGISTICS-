<!--
LEEWAY ENTERPRISE FILE HEADER
File: README.md
Path: README.md
Project: LeeWay Enterprise Transit Hub
Layer: Project Root Documentation
Purpose: Orient developers, reviewers, interviewers, and operators.
Inputs: Project architecture and verified implementation scope.
Outputs: Project overview and starting instructions.
Mutation Scope: Documentation only.
Dependencies: Project manifest and source projects.
Tests: Manual review and command verification.
Security Impact: No secrets permitted.
Database Impact: Describes database lanes without storing credentials.
Sovereign Cycle: Perception -> Origin -> Synthesis
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 2.0.0
-->

# LeeWay Enterprise Transit Hub

A governed enterprise transit-operations application and learning system built with C#, .NET 10, ASP.NET Core, a browser dashboard, worker services, SQL Server scripts, Oracle PL/SQL scripts, Dataverse integration contracts, automated tests, and LeeWay Standards.

## What is included

- Multi-project Visual Studio solution architecture
- Domain entities for vehicles, work orders, incidents, inspections, employee forms, and customer cases
- Application services and replaceable repository contracts
- In-memory training infrastructure that runs before databases are installed
- SQL Server and Oracle implementation lanes with executable schema scripts
- Dynamics 365/Dataverse integration client and mapping contract
- ASP.NET Core API
- Browser-based operations dashboard
- Background worker foundation
- Unit, integration, regression, security, and architecture test projects
- LeeWay file headers, directory authorities, policies, registries, and receipts
- Human-comprehension lessons

## Canonical root

`D:\Leeway-Ecosystem v2.1.4\LeeWay-Enterprise-Transit-Hub`

## First execution

Use the deployment block supplied with the project package. It creates the `.sln`, restores packages, builds all projects, runs all tests, scans LeeWay governance, and publishes the project only after every gate passes.

## First learning path

`HTTP request -> Controller -> Application service -> Repository contract -> In-memory repository -> Domain entity -> JSON response`


## Commercial SaaS and LeeWay direction

LeeWay Enterprise Transit Hub is now governed as both an interview-defensible enterprise software project and a commercial B2B SaaS platform for transportation organizations. It supports trucking, school transportation, passenger transit, shuttle and paratransit, and delivery or service fleets through shared, isolated-data, and dedicated-enterprise deployment profiles.

Agent Lee is an external LeeWay employee and orchestrator. He is not embedded or hardcoded inside the application. The governed capability package is located at `leeway/capabilities/enterprise-transit-hub`.

The training system is located at `docs/training-manual`. Its manifest controls an exact 300-page commercial manual target. The structure exists in Phase 02; the final 300-page content remains a versioned release deliverable and is not falsely claimed as complete.

## Phase 02 learning path

Read `docs/learning/LESSON-02-SAAS-TENANCY-TRAINING-AND-AGENT-BOUNDARIES.md`.

## Phase 04 — Identity, authorization, and continuous learning

Phase 04 adds provider-neutral roles, permissions, claims, named policies, tenant-match authorization, a Development-only evidence authentication scheme, Agent Lee service identity requirements, four manual chapters, Lesson 04, twelve private questions, and a release-blocking continuous-learning gate. Production identity and database tenant isolation remain pending.
