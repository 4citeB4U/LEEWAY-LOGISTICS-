<!--
LEEWAY ENTERPRISE FILE HEADER
File: CHAPTER-30-VEHICLE-AND-WORK-ORDER-PERSISTENCE.md
Path: docs/training-manual/04-fleet-operations/CHAPTER-30-VEHICLE-AND-WORK-ORDER-PERSISTENCE.md
Project: LeeWay Enterprise Transit Hub
Layer: Training / Commercial Manual
Purpose: Traces the repository replacement and hybrid persistence boundary.
Inputs: Governed source, runtime evidence, and approved product requirements.
Outputs: Versioned product, learning, or evidence artifact.
Mutation Scope: The owning artifact only.
Dependencies: Phase 04 FULL PASS and LeeWay governance.
Tests: Parse, source verification, continuous-learning gate, and phase runtime evidence.
Security Impact: Commercial training excludes passwords and private learner answers.
Database Impact: Teaches Phase 05 SQL Server behavior.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 5.0.0
-->
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
