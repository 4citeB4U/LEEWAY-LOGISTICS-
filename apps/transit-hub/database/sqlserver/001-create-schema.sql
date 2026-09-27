/*
  LEEWAY ENTERPRISE FILE HEADER
  File: 001-create-schema.sql
  Path: database/sqlserver/001-create-schema.sql
  Project: LeeWay Enterprise Transit Hub
  Layer: Database / SQL Server Schema
  Purpose: Create governed SQL Server schemas.
  Inputs: SQL Server database with DDL permission.
  Outputs: transit and audit schemas.
  Mutation Scope: Creates schemas only.
  Dependencies: SQL Server.
  Tests: 005-verification.sql.
  Security Impact: Requires least-privilege deployment account.
  Database Impact: Creates SQL Server schemas.
  Sovereign Cycle: Structure -> Execution -> Veritas
  Status: ACTIVE / GOVERNED
  Human Comprehension: REQUIRED
  Owner: Leonard Lee / Leeway Industries
  Version: 1.0.0
*/

IF SCHEMA_ID(N'transit') IS NULL EXEC(N'CREATE SCHEMA transit AUTHORIZATION dbo;');
IF SCHEMA_ID(N'audit') IS NULL EXEC(N'CREATE SCHEMA audit AUTHORIZATION dbo;');
GO
