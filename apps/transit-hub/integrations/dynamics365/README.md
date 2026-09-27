<!--
LEEWAY ENTERPRISE FILE HEADER
File: README.md
Path: integrations/dynamics365/README.md
Project: LeeWay Enterprise Transit Hub
Layer: Integration / Dynamics 365 Documentation
Purpose: Explain the Dynamics 365 integration boundary and prohibited content.
Inputs: Integration architecture and security policy.
Outputs: Operator guidance.
Mutation Scope: Documentation only.
Dependencies: Dataverse integration project.
Tests: Manual review.
Security Impact: Explicitly prohibits tenant secrets and customer data.
Database Impact: No direct local database impact.
Sovereign Cycle: Origin -> Structure -> Veritas
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.0
-->

# Dynamics 365 and Dataverse Lane

This directory stores mappings, exported solution metadata, screenshots, and evidence. It must never contain tenant secrets, access tokens, or raw customer information.

The foundation includes a typed Dataverse client but does not contact a tenant until a separately approved connected phase.
