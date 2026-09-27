/*
  LEEWAY ENTERPRISE FILE HEADER
  File: 004-seed-training-data.sql
  Path: database/sqlserver/004-seed-training-data.sql
  Project: LeeWay Enterprise Transit Hub
  Layer: Database / SQL Server Seed
  Purpose: Insert deterministic fictional vehicle training data.
  Inputs: Empty or existing transit.Vehicle table.
  Outputs: Known training vehicle.
  Mutation Scope: Inserts one fictional row when absent.
  Dependencies: 002-create-tables.sql.
  Tests: 005-verification.sql.
  Security Impact: Fictional data only.
  Database Impact: Mutates SQL Server training database.
  Sovereign Cycle: Execution -> Veritas
  Status: ACTIVE / GOVERNED
  Human Comprehension: REQUIRED
  Owner: Leonard Lee / Leeway Industries
  Version: 1.0.0
*/

IF NOT EXISTS (SELECT 1 FROM transit.Vehicle WHERE FleetNumber = N'LW-1001')
BEGIN
    INSERT transit.Vehicle (VehicleId, FleetNumber, Manufacturer, Model, ModelYear, Status)
    VALUES ('3d4f9670-7987-4c6c-8ed5-bc83762f8b41', N'LW-1001', N'New Flyer', N'Xcelsior CHARGE NG', 2025, 1);
END;
GO
