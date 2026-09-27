/* LEEWAY ENTERPRISE FILE HEADER
File: 020-vehicle-and-work-order-procedures.sql
Path: database/sqlserver/procedures/020-vehicle-and-work-order-procedures.sql
Project: LeeWay Enterprise Transit Hub
Layer: Database / Stored Procedure Foundation
Purpose: Establish reviewed stored-procedure contracts for future high-value vehicle and work-order operations.
Inputs: Tenant session context and validated procedure parameters.
Outputs: Tenant-scoped rows or deterministic database errors.
Mutation Scope: Procedure definitions only in Phase 05; application use is deferred.
Dependencies: fleet.Vehicles, maintenance.WorkOrders, and RLS policy.
Tests: Static SQL review; execution activation deferred to a later governed phase.
Security Impact: Procedures depend on active RLS and never accept a tenant bypass flag.
Database Impact: Defines procedure source but Phase 05 does not install these procedures.
Sovereign Cycle: Structure -> Veritas
Status: PLANNED / GOVERNED SOURCE
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 5.0.0
*/
CREATE OR ALTER PROCEDURE fleet.usp_GetVehiclesDueForService
AS
BEGIN
  SET NOCOUNT ON;
  SELECT TenantId, Id, FleetNumber, Manufacturer, Model, ModelYear, Status, CreatedUtc
  FROM fleet.Vehicles
  WHERE Status IN (1, 3, 4)
  ORDER BY FleetNumber;
END;
GO
CREATE OR ALTER PROCEDURE maintenance.usp_CreateWorkOrder
  @Id uniqueidentifier,
  @VehicleId uniqueidentifier,
  @Title nvarchar(200),
  @Description nvarchar(4000),
  @Priority int
AS
BEGIN
  SET NOCOUNT ON;
  DECLARE @TenantId uniqueidentifier = TRY_CONVERT(uniqueidentifier, SESSION_CONTEXT(N'TenantId'));
  IF @TenantId IS NULL THROW 50001, 'Tenant session context is required.', 1;
  INSERT INTO maintenance.WorkOrders (TenantId, Id, VehicleId, Title, Description, Priority, Status, CreatedUtc)
  VALUES (@TenantId, @Id, @VehicleId, @Title, @Description, @Priority, 1, SYSUTCDATETIME());
END;
