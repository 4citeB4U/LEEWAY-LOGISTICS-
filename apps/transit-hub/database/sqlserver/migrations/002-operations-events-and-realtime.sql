/*
LEEWAY ENTERPRISE FILE HEADER
File: 002-operations-events-and-realtime.sql
Path: database/sqlserver/migrations/002-operations-events-and-realtime.sql
Project: LeeWay Enterprise Transit Hub
Layer: Database / SQL Reference
Purpose: Document the Phase 06 operations event schema and RLS changes.
Inputs: Governed Phase 06 schema and security policy.
Outputs: Reference T-SQL aligned with EF migration 202607260001_OperationsEventsAndRealtime.
Mutation Scope: Reference only; installer executes the EF migration.
Dependencies: SQL Server 2025 and Phase 05 tenant predicate function.
Tests: SQL integration, RLS verification, backup, and runtime evidence.
Security Impact: Tenant filter and write-block predicates are required.
Database Impact: Adds operations schema and OperationsEvents table.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 6.0.0
*/

-- Reference-only T-SQL aligned with EF migration 202607260001_OperationsEventsAndRealtime.
IF SCHEMA_ID(N'operations') IS NULL EXEC(N'CREATE SCHEMA [operations];');
GO
CREATE TABLE [operations].[OperationsEvents] (
    [TenantId] uniqueidentifier NOT NULL,
    [Id] uniqueidentifier NOT NULL,
    [Type] int NOT NULL,
    [Severity] int NOT NULL,
    [Subject] nvarchar(200) NOT NULL,
    [PayloadJson] nvarchar(max) NOT NULL,
    [CreatedBySubject] nvarchar(200) NOT NULL,
    [OccurredUtc] datetimeoffset NOT NULL,
    [RowVersion] rowversion NOT NULL,
    CONSTRAINT [PK_OperationsEvents] PRIMARY KEY ([TenantId],[Id])
);
GO
CREATE INDEX [IX_OperationsEvents_TenantId_OccurredUtc]
ON [operations].[OperationsEvents] ([TenantId],[OccurredUtc]);
GO
ALTER SECURITY POLICY [security].[TenantSecurityPolicy]
  ADD FILTER PREDICATE [security].[fn_tenantAccessPredicate]([TenantId]) ON [operations].[OperationsEvents],
  ADD BLOCK PREDICATE [security].[fn_tenantAccessPredicate]([TenantId]) ON [operations].[OperationsEvents] AFTER INSERT,
  ADD BLOCK PREDICATE [security].[fn_tenantAccessPredicate]([TenantId]) ON [operations].[OperationsEvents] AFTER UPDATE;
GO
