/*
  LEEWAY ENTERPRISE FILE HEADER
  File: 003-create-procedures.sql
  Path: database/sqlserver/003-create-procedures.sql
  Project: LeeWay Enterprise Transit Hub
  Layer: Database / SQL Server Procedures
  Purpose: Create governed work-order and receipt procedures.
  Inputs: Validated procedure parameters.
  Outputs: Inserted operational and audit records.
  Mutation Scope: Inserts SQL Server records.
  Dependencies: 002-create-tables.sql.
  Tests: 005-verification.sql.
  Security Impact: Parameterization reduces injection risk.
  Database Impact: Creates T-SQL procedures.
  Sovereign Cycle: Structure -> Execution -> Veritas -> Echo
  Status: ACTIVE / GOVERNED
  Human Comprehension: REQUIRED
  Owner: Leonard Lee / Leeway Industries
  Version: 1.0.0
*/

CREATE OR ALTER PROCEDURE transit.usp_CreateWorkOrder
    @WorkOrderId uniqueidentifier,
    @VehicleId uniqueidentifier,
    @Title nvarchar(150),
    @Description nvarchar(2000),
    @Priority int
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
    IF @Priority NOT BETWEEN 1 AND 5 THROW 51000, 'Priority must be between 1 and 5.', 1;
    INSERT transit.WorkOrder (WorkOrderId, VehicleId, Title, Description, Priority, Status)
    VALUES (@WorkOrderId, @VehicleId, @Title, @Description, @Priority, 1);
END;
GO

CREATE OR ALTER PROCEDURE audit.usp_WriteExecutionReceipt
    @ReceiptId uniqueidentifier,
    @Operation nvarchar(250),
    @SovereignStage int,
    @Passed bit,
    @EvidenceJson nvarchar(max),
    @RecordedUtc datetimeoffset
AS
BEGIN
    SET NOCOUNT ON;
    INSERT audit.ExecutionReceipt (ReceiptId, Operation, SovereignStage, Passed, EvidenceJson, RecordedUtc)
    VALUES (@ReceiptId, @Operation, @SovereignStage, @Passed, @EvidenceJson, @RecordedUtc);
END;
GO
