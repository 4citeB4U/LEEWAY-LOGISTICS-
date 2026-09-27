/*
  LEEWAY ENTERPRISE FILE HEADER
  File: 005-verification.sql
  Path: database/oracle/005-verification.sql
  Project: LeeWay Enterprise Transit Hub
  Layer: Database / Oracle Verification
  Purpose: Verify required Oracle tables and package are valid.
  Inputs: Deployed Oracle training schema.
  Outputs: Object inventory and known vehicle status.
  Mutation Scope: Read-only.
  Dependencies: 001 through 004 scripts.
  Tests: This file is the verification script.
  Security Impact: No secret access.
  Database Impact: Reads Oracle metadata and training records.
  Sovereign Cycle: Execution -> Veritas -> Echo
  Status: ACTIVE / GOVERNED
  Human Comprehension: REQUIRED
  Owner: Leonard Lee / Leeway Industries
  Version: 1.0.0
*/

SELECT table_name FROM user_tables WHERE table_name IN ('LEEWAY_VEHICLE', 'LEEWAY_PARTS_INVENTORY');
SELECT object_name, status FROM user_objects WHERE object_name = 'LEEWAY_FLEET_SYNC_PKG';
SELECT leeway_fleet_sync_pkg.get_vehicle_status('LW-1001') AS vehicle_status FROM dual;
