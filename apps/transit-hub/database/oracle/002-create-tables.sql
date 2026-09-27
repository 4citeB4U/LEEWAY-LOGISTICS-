/*
  LEEWAY ENTERPRISE FILE HEADER
  File: 002-create-tables.sql
  Path: database/oracle/002-create-tables.sql
  Project: LeeWay Enterprise Transit Hub
  Layer: Database / Oracle Tables
  Purpose: Create Oracle legacy-fleet and parts tables.
  Inputs: Approved Oracle training schema.
  Outputs: Vehicle and inventory tables.
  Mutation Scope: Creates Oracle tables.
  Dependencies: 001-create-schema.sql.
  Tests: 005-verification.sql.
  Security Impact: No credentials or real data.
  Database Impact: Creates Oracle tables.
  Sovereign Cycle: Structure -> Execution -> Veritas
  Status: ACTIVE / GOVERNED
  Human Comprehension: REQUIRED
  Owner: Leonard Lee / Leeway Industries
  Version: 1.0.0
*/

CREATE TABLE leeway_vehicle (
    vehicle_id RAW(16) PRIMARY KEY,
    fleet_number VARCHAR2(30) NOT NULL UNIQUE,
    manufacturer VARCHAR2(80) NOT NULL,
    model_name VARCHAR2(80) NOT NULL,
    model_year NUMBER(4) NOT NULL,
    status_code NUMBER(2) NOT NULL,
    created_utc TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
);

CREATE TABLE leeway_parts_inventory (
    part_number VARCHAR2(40) PRIMARY KEY,
    description VARCHAR2(200) NOT NULL,
    quantity_on_hand NUMBER(10) DEFAULT 0 NOT NULL
);
