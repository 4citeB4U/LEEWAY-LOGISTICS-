<!--
LEEWAY ENTERPRISE FILE HEADER
File: LESSON-05-SQL-SERVER-TENANT-PERSISTENCE.md
Path: docs/learning/LESSON-05-SQL-SERVER-TENANT-PERSISTENCE.md
Project: LeeWay Enterprise Transit Hub
Layer: Learning / Technical Lesson
Purpose: Teach Leonard Lee to trace SQL persistence, migrations, RLS, connection session context, backup evidence, and hybrid adapter replacement.
Inputs: Governed source, runtime evidence, and approved product requirements.
Outputs: Versioned product, learning, or evidence artifact.
Mutation Scope: The owning artifact only.
Dependencies: Phase 04 FULL PASS and LeeWay governance.
Tests: Parse, source verification, continuous-learning gate, and phase runtime evidence.
Security Impact: Requires the learner to distinguish development secrets from production secret management.
Database Impact: Explains active SQL Server Phase 05 behavior.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 5.0.0
-->
# Lesson 05 — SQL Server tenant persistence

## Request path

```text
HTTP request
→ development authentication and tenant headers
→ TenantResolutionMiddleware
→ ITenantContext
→ VehicleService or WorkOrderService
→ repository interface
→ SQL Server repository
→ TransitHubDbContext global tenant filter
→ TenantSessionConnectionInterceptor
→ SQL Server SESSION_CONTEXT
→ row-level security filter/block predicate
→ fleet.Vehicles or maintenance.WorkOrders
```

## Files to inspect

1. `Directory.Packages.props`
2. `src/LeeWay.TransitHub.Infrastructure.SqlServer/LeeWay.TransitHub.Infrastructure.SqlServer.csproj`
3. `Persistence/TransitHubDbContext.cs`
4. `Persistence/TenantSessionConnectionInterceptor.cs`
5. `Repositories/SqlServerVehicleRepository.cs`
6. `Repositories/SqlServerWorkOrderRepository.cs`
7. `Migrations/202607250001_InitialTenantPersistence.cs`
8. `DependencyInjection/SqlServerServiceCollectionExtensions.cs`
9. `src/LeeWay.TransitHub.Api/Program.cs`
10. `tests/LeeWay.TransitHub.IntegrationTests/SqlServerDatabaseIntegrationTests.cs`
11. `database/sqlserver/backup/BACKUP-AND-RESTORE-RUNBOOK.md`

## Professional explanation

Phase 05 replaces the in-memory vehicle and work-order adapters with EF Core SQL Server adapters when SQL mode is selected. Tenant identity is enforced in application queries and again in SQL Server row-level security. The connection interceptor sets the active tenant in SQL session context for every pooled connection. Composite keys prevent cross-tenant foreign keys, a separate migration login applies schema changes, the app login receives only operational permissions, health checks prove connectivity, and backup verification proves recoverability at this phase's scope.

## Knowledge check

The private Lesson 05 workbook contains twelve questions and answer-space prompts. Do not read the instructor rubric before answering in your own words.
