<!--
LEEWAY ENTERPRISE FILE HEADER
File: AGENT-LEE-EMPLOYMENT-AND-BOUNDARY.md
Path: leeway/capabilities/enterprise-transit-hub/AGENT-LEE-EMPLOYMENT-AND-BOUNDARY.md
Project: LeeWay Enterprise Transit Hub
Layer: LeeWay / Agent Boundary
Purpose: Define Agent Lee as an external assigned employee and orchestrator.
Inputs: LeeWay Standards and product architecture.
Outputs: A binding integration boundary.
Mutation Scope: Documentation only.
Dependencies: Capability manifest and ADR-0003.
Tests: Architecture tests, dependency review, and capability validation.
Security Impact: Prevents embedded unrestricted agent authority.
Database Impact: All data access occurs through governed application contracts.
Sovereign Cycle: Origin -> Structure -> Veritas -> Synthesis
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 2.0.0
-->

# Agent Lee Employment and Application Boundary

Agent Lee Prime is an employee and orchestrator of the LeeWay ecosystem. LeeWay Enterprise Transit Hub is one of his assigned product tools.

Agent Lee is **not**:

- compiled into the Transit Hub Domain assembly;
- duplicated as a Transit Hub-specific hardcoded agent;
- granted unrestricted database, tenant, operating-system, or safety authority;
- required for core deterministic transportation workflows to operate.

Agent Lee connects through governed APIs, future MCP contracts, knowledge manifests, permissions, health checks, training contracts, and evidence schemas. Every tenant-sensitive tool resolves tenant context and authorization before accessing data.
