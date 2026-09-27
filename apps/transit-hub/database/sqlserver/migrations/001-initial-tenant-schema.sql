/* LEEWAY ENTERPRISE FILE HEADER
File: 001-initial-tenant-schema.sql
Path: database/sqlserver/migrations/001-initial-tenant-schema.sql
Project: LeeWay Enterprise Transit Hub
Layer: Database / T-SQL Reference
Purpose: Provide a reviewed T-SQL reference for the EF Core initial tenant migration.
Inputs: Empty LeeWayTransitHub database.
Outputs: Fleet and maintenance schemas and tenant-owned tables.
Mutation Scope: LeeWayTransitHub development database only.
Dependencies: SQL Server 2025.
Tests: EF migration, object probes, indexes, foreign keys, and RLS tests.
Security Impact: TenantId participates in every primary and foreign key.
Database Impact: Creates fleet.Vehicles and maintenance.WorkOrders.
Sovereign Cycle: Structure -> Execution -> Veritas
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 5.0.0
*/
-- The executable authority is the EF Core migration under src/LeeWay.TransitHub.Infrastructure.SqlServer/Migrations.
-- This file is the manually reviewable T-SQL companion and must remain semantically aligned.
CREATE SCHEMA fleet;
CREATE SCHEMA maintenance;
GO
CREATE TABLE fleet.Vehicles (
  TenantId uniqueidentifier NOT NULL,
  Id uniqueidentifier NOT NULL,
  FleetNumber nvarchar(40) NOT NULL,
  Manufacturer nvarchar(100) NOT NULL,
  Model nvarchar(100) NOT NULL,
  ModelYear int NOT NULL,
  Status int NOT NULL,
  OutOfServiceReason nvarchar(500) NULL,
  CreatedUtc datetimeoffset NOT NULL,
  CONSTRAINT PK_Vehicles PRIMARY KEY (TenantId, Id),
  CONSTRAINT UQ_Vehicles_Tenant_Fleet UNIQUE (TenantId, FleetNumber)
);
CREATE TABLE maintenance.WorkOrders (
  TenantId uniqueidentifier NOT NULL,
  Id uniqueidentifier NOT NULL,
  VehicleId uniqueidentifier NOT NULL,
  Title nvarchar(200) NOT NULL,
  Description nvarchar(4000) NOT NULL,
  Priority int NOT NULL,
  Status int NOT NULL,
  AssignedTechnician nvarchar(200) NULL,
  CreatedUtc datetimeoffset NOT NULL,
  CompletedUtc datetimeoffset NULL,
  CONSTRAINT PK_WorkOrders PRIMARY KEY (TenantId, Id),
  CONSTRAINT FK_WorkOrders_Vehicles FOREIGN KEY (TenantId, VehicleId) REFERENCES fleet.Vehicles(TenantId, Id)
);
