<!--
LEEWAY ENTERPRISE FILE HEADER
File: TITLE-PAGE-AND-HOW-TO-USE-THIS-MANUAL.md
Path: docs/training-manual/00-front-matter/TITLE-PAGE-AND-HOW-TO-USE-THIS-MANUAL.md
Project: LeeWay Enterprise Transit Hub
Layer: Training Manual / Front Matter
Purpose: Define the manual identity, reading routes, truthfulness rules, and documentation modes.
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

# LeeWay Enterprise Transit Hub Training Manual

**Commercial training-manual target:** 300 controlled pages  
**Current state:** initial draft content in progress  
**Product identity:** interview-defensible enterprise project, commercial B2B transportation SaaS, and governed LeeWay ecosystem product

## How to use this manual

This manual has four learning modes:

1. **Tutorials** guide a learner through a complete experience.
2. **How-to guidance** helps a trained user accomplish a defined task.
3. **Reference material** describes fields, roles, endpoints, contracts, and evidence.
4. **Explanation** teaches why the product is designed this way.

The structure follows the Diátaxis distinction among tutorials, how-to guides, reference, and explanation. The manual also contains labs, assessments, answer rubrics, and Agent Lee proctor instructions.

## Truthfulness rule

A chapter may explain future architecture, but it must label future work clearly. The presence of a chapter does not prove that a production feature exists. Build, test, runtime, security, database, customer, and deployment evidence determine implementation status.

## Reading routes

- **New transportation user:** Parts 1, 2, 4, 5, 6, and 7.
- **Tenant administrator:** Parts 1, 2, 3, 7, 9, and 11.
- **Developer or interviewer:** Parts 1, 3, 4, 9, 10, 11, and 12.
- **Agent Lee operator:** Parts 3, 7, 8, 9, 10, 11, and 12.
- **Leonard Lee private learning:** use the separate `docs/private-learning/leonard-lee` archive, which is excluded from commercial documentation output.

## Release outputs

The source of truth is governed Markdown. Future release pipelines may generate searchable HTML and a versioned PDF. DocFX is the planned .NET documentation generator because it can combine Markdown, .NET metadata, and REST/API content into HTML and PDF outputs.
