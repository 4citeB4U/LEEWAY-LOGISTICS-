<!--
LEEWAY ENTERPRISE FILE HEADER
File: CHAPTER-29-SQL-SERVER-TENANT-PERSISTENCE.md
Path: docs/training-manual/03-tenant-administration/CHAPTER-29-SQL-SERVER-TENANT-PERSISTENCE.md
Project: LeeWay Enterprise Transit Hub
Layer: Training / Commercial Manual
Purpose: Explains shared-database tenant discriminators, EF Core global query filters, SQL Server RLS, and the dedicated-database path.
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
# Chapter 29 — SQL Server tenant persistence

A tenant ID is carried from the HTTP boundary into the scoped context. EF Core adds a tenant predicate to mapped queries. When the connection opens, the interceptor sets SQL Server session context. RLS then filters rows and blocks writes whose `TenantId` differs. This is defense in depth, not a substitute for identity and authorization.

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
## The complete tenant data path

A database row does not become tenant-safe merely because it contains a `TenantId` column. The tenant value must be resolved, validated, carried, enforced, and audited through the entire request. In the Transit Hub, the browser or approved service sends tenant headers. `TenantResolutionMiddleware` validates the pair and builds the scoped tenant context. Authentication establishes the caller, and authorization confirms that the caller is allowed to act for the resolved tenant. The application service then calls an abstraction such as `IVehicleRepository`. In SQL mode, dependency injection supplies the SQL Server adapter. The adapter uses a scoped `TransitHubDbContext`, and the context applies the active tenant to new entities and to query filters. Finally, the database connection interceptor writes the tenant identifier into SQL Server session context before commands execute.

This path must fail closed. A missing tenant cannot silently become a default tenant. A malformed tenant cannot be repaired by guessing. A caller whose identity belongs to a different tenant cannot rely on a valid role to cross the boundary. Each layer answers a different security question:

- Authentication asks who the caller is.
- Authorization asks whether the caller may perform the requested operation.
- Tenant context asks which customer boundary applies to this request.
- EF Core query filters constrain normal application queries.
- SQL Server row-level security constrains rows at the database engine.
- Receipts record what was attempted, what was allowed, and what evidence was produced.

## EF Core global query filters

The EF Core filter is part of the model configuration. For a tenant-owned entity, the filter compares the row tenant to the current scoped tenant. Application code can then write a normal query such as `context.Vehicles.ToListAsync()` and receive only rows for the active tenant. This reduces the risk that a developer forgets to add a tenant predicate to one query.

A query filter is still application-layer behavior. Code with special database authority can bypass it, raw SQL can bypass it, and an incorrectly configured context can use the wrong tenant. For that reason, the Transit Hub does not treat the filter as the only security boundary. Any deliberate filter bypass must be limited to a named administrative workflow, require explicit authorization, and generate a receipt. Normal fleet, maintenance, dispatch, and Agent Lee tools must never use a bypass merely for convenience.

## SQL Server row-level security

Row-level security operates inside SQL Server. The application places the active tenant ID into `SESSION_CONTEXT`. A schema-bound predicate function compares that session value with each row's `TenantId`. The security policy uses a filter predicate to hide rows that do not match. It also uses block predicates to reject inserts or updates that attempt to write a different tenant ID.

Read filtering and write blocking solve different problems. A filter predicate can prevent Tenant A from seeing Tenant B's vehicle. A block predicate can prevent Tenant A from inserting a work order that claims to belong to Tenant B. Both are required. Composite tenant keys and tenant-aware foreign keys add another control by preventing a work order in one tenant from referencing a vehicle in another tenant.

Connection pooling requires special attention. A physical SQL connection can be reused across requests. The session context must therefore be set for every opened connection, not only when the application first starts. Troubleshooting must verify the value on the exact connection used by the command. A stale or absent session value should result in no tenant rows or a denied write, never broad access.

## Shared and dedicated deployment profiles

Small and midsize customers may use a shared database with tenant discriminators, query filters, and RLS. A larger or regulated customer may receive a dedicated database while still using the same domain and repository contracts. The application layer should not need a different controller merely because the storage topology changes. Tenant routing and connection selection belong in infrastructure and control-plane configuration.

The shared model optimizes operational efficiency and cost. The dedicated model increases isolation and can simplify customer-specific backup, restore, retention, and performance guarantees. Neither model eliminates the need for identity, authorization, audit, encryption, monitoring, and tested recovery.

## Administrative verification checklist

Before declaring tenant persistence healthy, an administrator should confirm all of the following:

1. The request resolves exactly one valid tenant.
2. The authenticated identity is authorized for that tenant.
3. The scoped `ITenantContext` contains the expected tenant ID and code.
4. The EF Core model contains filters for every tenant-owned table.
5. The connection interceptor sets session context on every opened connection.
6. The RLS policy is enabled and bound to the expected tables.
7. Filter and block predicates are both present where required.
8. Composite keys and foreign keys include `TenantId`.
9. The application login cannot disable the policy or alter schema.
10. Cross-tenant automated tests run against a live SQL Server instance.
11. Logs and receipts contain identifiers but no passwords or connection strings.
12. A verified backup exists before destructive database work.

## Guided scenario

Assume Tenant A and Tenant B each have a vehicle with the same human-readable fleet number. This is allowed because fleet numbers are unique within a tenant, not necessarily across the entire SaaS platform. A Fleet Manager from Tenant A requests the vehicle list. The authorization layer confirms Tenant A membership. The EF filter selects Tenant A rows. The SQL session context is Tenant A, so RLS independently filters the table. The response may contain Tenant A's vehicle but must never contain Tenant B's vehicle.

Now assume a faulty repository accidentally calls a query that ignores the EF filter. RLS should still prevent Tenant B's row from being returned. If a migration login performs the same query, it may have broader authority, which is why migration credentials are never used by the normal API. Defense in depth means one defect does not automatically become a customer data disclosure.

## Knowledge check

Explain why tenant identity, user identity, and authorization are three separate concepts. Then identify one failure that EF Core filters prevent, one failure that SQL Server RLS prevents, and one failure that only role or permission authorization can prevent. A complete answer must refer to the request pipeline, the database session, and the distinction between normal runtime authority and migration authority.
