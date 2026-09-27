/*
  LEEWAY ENTERPRISE FILE HEADER
  File: 005-verification.sql
  Path: database/sqlserver/005-verification.sql
  Project: LeeWay Enterprise Transit Hub
  Layer: Database / SQL Server Verification
  Purpose: Verify required SQL Server objects exist.
  Inputs: Deployed training database.
  Outputs: PASS result or SQL exception.
  Mutation Scope: Read-only.
  Dependencies: 001 through 004 scripts.
  Tests: This file is the verification script.
  Security Impact: No secret access.
  Database Impact: Reads SQL Server metadata.
  Sovereign Cycle: Execution -> Veritas -> Echo
  Status: ACTIVE / GOVERNED
  Human Comprehension: REQUIRED
  Owner: Leonard Lee / Leeway Industries
  Version: 1.0.0
*/

IF OBJECT_ID(N'transit.Vehicle', N'U') IS NULL THROW 51001, 'Vehicle table missing.', 1;
IF OBJECT_ID(N'transit.WorkOrder', N'U') IS NULL THROW 51002, 'WorkOrder table missing.', 1;
IF OBJECT_ID(N'audit.ExecutionReceipt', N'U') IS NULL THROW 51003, 'ExecutionReceipt table missing.', 1;
IF OBJECT_ID(N'transit.usp_CreateWorkOrder', N'P') IS NULL THROW 51004, 'CreateWorkOrder procedure missing.', 1;
SELECT 'PASS' AS VerificationStatus;
GO
