<!--
LEEWAY ENTERPRISE FILE HEADER
File: PRODUCT-CHARTER.md
Path: docs/product/PRODUCT-CHARTER.md
Project: LeeWay Enterprise Transit Hub
Layer: Product / Charter
Purpose: Define the permanent commercial, professional, and LeeWay purposes of the product.
Inputs: Business objectives, transportation customer needs, and LeeWay Standards.
Outputs: A binding commercial product constitution.
Mutation Scope: Product governance only.
Dependencies: Project manifest and architecture decisions.
Tests: Manual review, architecture tests, and release-gate validation.
Security Impact: Defines tenant isolation, least privilege, and AI boundaries.
Database Impact: Requires tenant-aware persistence in later phases.
Sovereign Cycle: Perception -> Origin -> Structure -> Synthesis
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 2.0.0
-->

# Commercial Product Charter

## Governing directive

LeeWay Enterprise Transit Hub is built simultaneously as an interview-defensible enterprise software project and as a commercial B2B SaaS platform for transportation organizations of different sizes and operating models. It is a LeeWay product and must operate as part of the LeeWay ecosystem.

## Product purposes

1. **Commercial operations:** deliver secure fleet, dispatch, maintenance, safety, training, reporting, and integration capabilities to transportation customers.
2. **Professional proof:** preserve architecture, code, tests, evidence, and learning material that Leonard Lee can explain and defend professionally.
3. **LeeWay tool package:** expose governed capabilities that Agent Lee Prime and the LeeWay agent fleet can discover and use without embedding Agent Lee inside the application.

## Customer scope

The product targets trucking and freight carriers, school transportation providers, municipal and private passenger transit, paratransit, shuttle operators, delivery fleets, service fleets, and mixed transportation enterprises.

## Product principles

- Multi-tenant by design, with shared, isolated-data, and dedicated-enterprise deployment profiles.
- Modular-monolith first, with boundaries that permit later service extraction.
- Core transportation workflows remain deterministic and available when AI services are degraded.
- Agent Lee is an external employee and orchestrator using governed APIs, MCP contracts, and capability manifests.
- Every feature requires code, tests, user documentation, Agent Lee knowledge updates, training material, and evidence.
- Tenant isolation, least privilege, human approval, and receipts govern every sensitive action.

## Current implementation status

This phase establishes product identity, tenant-domain foundations, HTTP tenant-context resolution, a deterministic product-profile endpoint, the Agent Lee capability package, and the controlled 300-page manual structure. Operational records are **not yet tenant-filtered in persistence**. SQL Server row isolation, identity, authorization, subscriptions, billing, and production deployment remain future governed phases.
