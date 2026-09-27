<!--
LEEWAY ENTERPRISE FILE HEADER
File: DEGRADED-MODE.md
Path: leeway/capabilities/enterprise-transit-hub/DEGRADED-MODE.md
Project: LeeWay Enterprise Transit Hub
Layer: LeeWay / Reliability
Purpose: Define behavior when Agent Lee or AI capabilities are unavailable.
Inputs: Health status and deterministic application capabilities.
Outputs: A safe degraded-mode contract.
Mutation Scope: Documentation only.
Dependencies: Capability manifest and operations architecture.
Tests: Failure-mode tests and manual recovery exercises.
Security Impact: Prevents AI outages from bypassing controls.
Database Impact: Core data remains accessible only through authorized application paths.
Sovereign Cycle: Perception -> Execution -> Veritas -> Echo
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 2.0.0
-->

# Governed Degraded Mode

When Agent Lee, LLMs, voice, vision, or LeeWay orchestration services are unavailable, core deterministic transportation operations remain available.

| Capability | Degraded state |
|---|---|
| Authentication and authorization | Required and available |
| Fleet, dispatch, maintenance, inspections, and incidents | Available through normal UI and APIs |
| Audit and safety controls | Available |
| Agent recommendations | Unavailable or explicitly degraded |
| Voice and vision | Degraded or unavailable |
| Autonomous tool orchestration | Disabled |
| Human manual operation | Available |

No degraded mode may bypass tenant isolation, authorization, approvals, validation, or receipts.
