/*
  LEEWAY ENTERPRISE FILE HEADER
  File: 003-create-package.sql
  Path: database/oracle/003-create-package.sql
  Project: LeeWay Enterprise Transit Hub
  Layer: Database / Oracle PL/SQL Package
  Purpose: Create the legacy fleet synchronization PL/SQL package.
  Inputs: Fleet number and part number.
  Outputs: Status and availability values.
  Mutation Scope: Read-only package functions.
  Dependencies: 002-create-tables.sql.
  Tests: 005-verification.sql.
  Security Impact: Uses typed parameters.
  Database Impact: Creates Oracle package and body.
  Sovereign Cycle: Structure -> Execution -> Veritas
  Status: ACTIVE / GOVERNED
  Human Comprehension: REQUIRED
  Owner: Leonard Lee / Leeway Industries
  Version: 1.0.0
*/

CREATE OR REPLACE PACKAGE leeway_fleet_sync_pkg AS
    FUNCTION get_vehicle_status(p_fleet_number IN VARCHAR2) RETURN NUMBER;
    FUNCTION get_part_availability(p_part_number IN VARCHAR2) RETURN NUMBER;
END leeway_fleet_sync_pkg;
/

CREATE OR REPLACE PACKAGE BODY leeway_fleet_sync_pkg AS
    FUNCTION get_vehicle_status(p_fleet_number IN VARCHAR2) RETURN NUMBER IS
        v_status leeway_vehicle.status_code%TYPE;
    BEGIN
        SELECT status_code INTO v_status FROM leeway_vehicle WHERE fleet_number = p_fleet_number;
        RETURN v_status;
    END;

    FUNCTION get_part_availability(p_part_number IN VARCHAR2) RETURN NUMBER IS
        v_quantity leeway_parts_inventory.quantity_on_hand%TYPE;
    BEGIN
        SELECT quantity_on_hand INTO v_quantity FROM leeway_parts_inventory WHERE part_number = p_part_number;
        RETURN v_quantity;
    END;
END leeway_fleet_sync_pkg;
/
