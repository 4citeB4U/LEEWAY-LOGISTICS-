/* LEEWAY ENTERPRISE FILE HEADER
File: 010-tenant-row-level-security.sql
Path: database/sqlserver/security/010-tenant-row-level-security.sql
Project: LeeWay Enterprise Transit Hub
Layer: Database / Security
Purpose: Document the SQL Server row-level-security policy applied by the EF migration.
Inputs: TenantId session context and tenant-owned tables.
Outputs: Filter and write-block predicates.
Mutation Scope: security schema and security policy only.
Dependencies: SQL Server SESSION_CONTEXT and fleet/maintenance tables.
Tests: Cross-tenant read denial and invalid-tenant write denial.
Security Impact: Database-tier defense in depth for shared-database tenancy.
Database Impact: Creates security.fn_tenantAccessPredicate and security.TenantSecurityPolicy.
Sovereign Cycle: Structure -> Execution -> Veritas
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 5.0.0
*/
CREATE SCHEMA security;
GO
CREATE FUNCTION security.fn_tenantAccessPredicate(@TenantId uniqueidentifier)
RETURNS TABLE WITH SCHEMABINDING AS
RETURN SELECT 1 AS AccessResult
WHERE @TenantId = TRY_CONVERT(uniqueidentifier, SESSION_CONTEXT(N'TenantId'));
GO
CREATE SECURITY POLICY security.TenantSecurityPolicy
ADD FILTER PREDICATE security.fn_tenantAccessPredicate(TenantId) ON fleet.Vehicles,
ADD BLOCK PREDICATE security.fn_tenantAccessPredicate(TenantId) ON fleet.Vehicles AFTER INSERT,
ADD BLOCK PREDICATE security.fn_tenantAccessPredicate(TenantId) ON fleet.Vehicles AFTER UPDATE,
ADD FILTER PREDICATE security.fn_tenantAccessPredicate(TenantId) ON maintenance.WorkOrders,
ADD BLOCK PREDICATE security.fn_tenantAccessPredicate(TenantId) ON maintenance.WorkOrders AFTER INSERT,
ADD BLOCK PREDICATE security.fn_tenantAccessPredicate(TenantId) ON maintenance.WorkOrders AFTER UPDATE
WITH (STATE = ON, SCHEMABINDING = ON);
