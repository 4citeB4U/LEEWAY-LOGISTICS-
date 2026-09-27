<!--
LEEWAY ENTERPRISE FILE HEADER
File: FOUNDATION-DATA-DICTIONARY.md
Path: docs/data-dictionary/FOUNDATION-DATA-DICTIONARY.md
Project: LeeWay Enterprise Transit Hub
Layer: Data Dictionary
Purpose: Define the initial enterprise entities and keys.
Inputs: Domain entities and database scripts.
Outputs: Human-readable data definitions.
Mutation Scope: Documentation only.
Dependencies: Domain and database lanes.
Tests: Schema-to-entity review.
Security Impact: Contains no production data.
Database Impact: Documents SQL Server and Oracle mappings.
Sovereign Cycle: Structure -> Echo -> Synthesis
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.0
-->

# Foundation Data Dictionary

| Entity | Key | Purpose |
|---|---|---|
| Vehicle | `Id` | Transit asset identity and status |
| WorkOrder | `Id` | Maintenance request and lifecycle |
| ServiceIncident | `Id` | Operational disruption or safety record |
| VehicleInspection | `Id` | Vehicle inspection outcome |
| EmployeeForm | `Id` | Employee-submitted operational form |
| CustomerCase | `Id` | Customer-service case synchronized with Dataverse |
| LeeWayExecutionReceipt | `ReceiptId` | Auditable operation evidence |

SQL Server and Oracle scripts use corresponding identifiers and enforce required values.
