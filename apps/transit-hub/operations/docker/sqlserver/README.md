<!--
LEEWAY ENTERPRISE FILE HEADER
File: README.md
Path: operations/docker/sqlserver/README.md
Project: LeeWay Enterprise Transit Hub
Layer: Operations / Docker
Purpose: Explain the isolated SQL Server 2025 development service, ownership labels, port, volume, and secret boundaries.
Inputs: Governed source, runtime evidence, and approved product requirements.
Outputs: Versioned product, learning, or evidence artifact.
Mutation Scope: The owning artifact only.
Dependencies: Phase 04 FULL PASS and LeeWay governance.
Tests: Parse, source verification, continuous-learning gate, and phase runtime evidence.
Security Impact: Forbids committed passwords and production reuse.
Database Impact: Describes containerized SQL Server development only.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 5.0.0
-->
# Transit Hub SQL Server development service

Phase 05 uses one isolated container named `leeway-transit-hub-sqlserver-dev`, host port `15433`, and named volume `leeway_transit_hub_sqlserver_data_v1`. The phase installer creates and validates the service transactionally. This Compose file is a human-readable operational equivalent and does not contain a password.

Production deployment is not defined by this file. Production requires a managed secret store, backup retention, high availability, monitoring, encryption review, licensed edition selection, and customer-specific isolation decisions.
