/*
  LEEWAY ENTERPRISE FILE HEADER
  File: 002-create-tables.sql
  Path: database/sqlserver/002-create-tables.sql
  Project: LeeWay Enterprise Transit Hub
  Layer: Database / SQL Server Tables
  Purpose: Create primary operational and audit tables.
  Inputs: transit and audit schemas.
  Outputs: Vehicle, WorkOrder, and ExecutionReceipt tables.
  Mutation Scope: Creates tables and constraints.
  Dependencies: 001-create-schema.sql.
  Tests: 005-verification.sql.
  Security Impact: No credentials or real data.
  Database Impact: Creates SQL Server tables.
  Sovereign Cycle: Structure -> Execution -> Veritas
  Status: ACTIVE / GOVERNED
  Human Comprehension: REQUIRED
  Owner: Leonard Lee / Leeway Industries
  Version: 1.0.0
*/

CREATE TABLE transit.Vehicle (
    VehicleId uniqueidentifier NOT NULL CONSTRAINT PK_Vehicle PRIMARY KEY,
    FleetNumber nvarchar(30) NOT NULL CONSTRAINT UQ_Vehicle_FleetNumber UNIQUE,
    Manufacturer nvarchar(80) NOT NULL,
    Model nvarchar(80) NOT NULL,
    ModelYear int NOT NULL,
    Status int NOT NULL,
    OutOfServiceReason nvarchar(500) NULL,
    CreatedUtc datetimeoffset NOT NULL CONSTRAINT DF_Vehicle_CreatedUtc DEFAULT sysdatetimeoffset(),
    CONSTRAINT CK_Vehicle_ModelYear CHECK (ModelYear BETWEEN 1980 AND 2100)
);

CREATE TABLE transit.WorkOrder (
    WorkOrderId uniqueidentifier NOT NULL CONSTRAINT PK_WorkOrder PRIMARY KEY,
    VehicleId uniqueidentifier NOT NULL,
    Title nvarchar(150) NOT NULL,
    Description nvarchar(2000) NOT NULL,
    Priority int NOT NULL,
    Status int NOT NULL,
    AssignedTechnician nvarchar(120) NULL,
    CreatedUtc datetimeoffset NOT NULL CONSTRAINT DF_WorkOrder_CreatedUtc DEFAULT sysdatetimeoffset(),
    CompletedUtc datetimeoffset NULL,
    CONSTRAINT FK_WorkOrder_Vehicle FOREIGN KEY (VehicleId) REFERENCES transit.Vehicle(VehicleId),
    CONSTRAINT CK_WorkOrder_Priority CHECK (Priority BETWEEN 1 AND 5)
);

CREATE TABLE audit.ExecutionReceipt (
    ReceiptId uniqueidentifier NOT NULL CONSTRAINT PK_ExecutionReceipt PRIMARY KEY,
    Operation nvarchar(250) NOT NULL,
    SovereignStage int NOT NULL,
    Passed bit NOT NULL,
    EvidenceJson nvarchar(max) NOT NULL,
    RecordedUtc datetimeoffset NOT NULL
);
GO
