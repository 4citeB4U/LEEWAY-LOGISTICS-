/*
  LEEWAY ENTERPRISE FILE HEADER
  File: 004-seed-training-data.sql
  Path: database/oracle/004-seed-training-data.sql
  Project: LeeWay Enterprise Transit Hub
  Layer: Database / Oracle Seed
  Purpose: Insert deterministic fictional Oracle training records.
  Inputs: Deployed Oracle training tables.
  Outputs: Known vehicle and part records.
  Mutation Scope: Inserts fictional training data when absent.
  Dependencies: 002-create-tables.sql.
  Tests: 005-verification.sql.
  Security Impact: Fictional data only.
  Database Impact: Mutates Oracle training schema.
  Sovereign Cycle: Execution -> Veritas
  Status: ACTIVE / GOVERNED
  Human Comprehension: REQUIRED
  Owner: Leonard Lee / Leeway Industries
  Version: 1.0.0
*/

MERGE INTO leeway_vehicle target
USING (SELECT 'LW-1001' fleet_number FROM dual) source
ON (target.fleet_number = source.fleet_number)
WHEN NOT MATCHED THEN
    INSERT (vehicle_id, fleet_number, manufacturer, model_name, model_year, status_code)
    VALUES (SYS_GUID(), 'LW-1001', 'New Flyer', 'Xcelsior CHARGE NG', 2025, 1);

MERGE INTO leeway_parts_inventory target
USING (SELECT 'BRAKE-PAD-001' part_number FROM dual) source
ON (target.part_number = source.part_number)
WHEN NOT MATCHED THEN
    INSERT (part_number, description, quantity_on_hand)
    VALUES ('BRAKE-PAD-001', 'Training brake pad set', 20);
COMMIT;
