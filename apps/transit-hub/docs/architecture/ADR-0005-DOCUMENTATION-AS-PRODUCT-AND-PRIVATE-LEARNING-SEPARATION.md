<!--
LEEWAY ENTERPRISE FILE HEADER
File: ADR-0005-DOCUMENTATION-AS-PRODUCT-AND-PRIVATE-LEARNING-SEPARATION.md
Path: docs/architecture/ADR-0005-DOCUMENTATION-AS-PRODUCT-AND-PRIVATE-LEARNING-SEPARATION.md
Project: LeeWay Enterprise Transit Hub
Layer: Architecture Decision Record
Purpose: Define documentation as a product surface and separate private learning from commercial releases.
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

# ADR-0005 — Documentation as Product and Private-Learning Separation

## Decision

Training documentation is a versioned product surface. The commercial manual, instructor material, learner workbooks, Agent Lee knowledge package, and assessments evolve with the application. Leonard Lee personal study records and family-teaching material remain in a separate private-learning authority and are excluded from commercial documentation output.

## Reasons

- Customers require role-based training and support.
- Agent Lee requires approved, version-matched sources and rubrics.
- Interview preparation requires deeper source and evidence tracing than a normal customer manual.
- Family teaching requires private exercises and progress without leaking into customer releases.
- Documentation must be testable, searchable, and reproducible.

## Consequences

Every feature phase updates code, tests, commercial documentation, Agent Lee knowledge indexes, and applicable learning questions. The final 300-page PDF is not claimed complete until formatted-page, screenshot, lab, assessment, accessibility, and release review gates pass.
