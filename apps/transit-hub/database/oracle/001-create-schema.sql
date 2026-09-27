/*
  LEEWAY ENTERPRISE FILE HEADER
  File: 001-create-schema.sql
  Path: database/oracle/001-create-schema.sql
  Project: LeeWay Enterprise Transit Hub
  Layer: Database / Oracle Schema
  Purpose: Confirm the governed Oracle training schema context.
  Inputs: Authenticated Oracle training session.
  Outputs: Current schema name.
  Mutation Scope: Read-only in this script.
  Dependencies: Oracle Database Free training environment.
  Tests: 005-verification.sql.
  Security Impact: No credentials stored.
  Database Impact: Reads Oracle session context.
  Sovereign Cycle: Origin -> Structure -> Veritas
  Status: ACTIVE / GOVERNED
  Human Comprehension: REQUIRED
  Owner: Leonard Lee / Leeway Industries
  Version: 1.0.0
*/

-- Run under a separately approved Oracle training user.
-- Schema creation and grants remain deployment-environment responsibilities.
SELECT USER AS current_schema FROM dual;
