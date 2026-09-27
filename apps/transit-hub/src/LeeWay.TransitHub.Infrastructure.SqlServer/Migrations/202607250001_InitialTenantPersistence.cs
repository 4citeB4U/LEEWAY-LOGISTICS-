/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: 202607250001_InitialTenantPersistence.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/Migrations/202607250001_InitialTenantPersistence.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / EF Core Migration
 * Purpose: Create tenant-owned fleet and maintenance tables, indexes, foreign keys, and SQL Server row-level security filter and block predicates.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: Uses SESSION_CONTEXT TenantId for database-tier tenant isolation.
 * Database Impact: Creates schemas fleet, maintenance, security; tables Vehicles and WorkOrders; and TenantSecurityPolicy.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 5.0.0
 */

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeeWay.TransitHub.Infrastructure.SqlServer.Migrations;

public partial class InitialTenantPersistence : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.EnsureSchema(name: "fleet");
        migrationBuilder.EnsureSchema(name: "maintenance");
        migrationBuilder.EnsureSchema(name: "security");

        migrationBuilder.CreateTable(
            name: "Vehicles",
            schema: "fleet",
            columns: table => new
            {
                TenantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                FleetNumber = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                Manufacturer = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                Model = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                ModelYear = table.Column<int>(type: "int", nullable: false),
                Status = table.Column<int>(type: "int", nullable: false),
                OutOfServiceReason = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                CreatedUtc = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
            },
            constraints: table => table.PrimaryKey("PK_Vehicles", x => new { x.TenantId, x.Id }));

        migrationBuilder.CreateTable(
            name: "WorkOrders",
            schema: "maintenance",
            columns: table => new
            {
                TenantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                VehicleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                Description = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: false),
                Priority = table.Column<int>(type: "int", nullable: false),
                Status = table.Column<int>(type: "int", nullable: false),
                AssignedTechnician = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                CreatedUtc = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                CompletedUtc = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_WorkOrders", x => new { x.TenantId, x.Id });
                table.ForeignKey(
                    name: "FK_WorkOrders_Vehicles_TenantId_VehicleId",
                    columns: x => new { x.TenantId, x.VehicleId },
                    principalSchema: "fleet",
                    principalTable: "Vehicles",
                    principalColumns: new[] { "TenantId", "Id" },
                    onDelete: ReferentialAction.Restrict);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Vehicles_TenantId_FleetNumber",
            schema: "fleet",
            table: "Vehicles",
            columns: new[] { "TenantId", "FleetNumber" },
            unique: true);
        migrationBuilder.CreateIndex(
            name: "IX_WorkOrders_TenantId_VehicleId",
            schema: "maintenance",
            table: "WorkOrders",
            columns: new[] { "TenantId", "VehicleId" });

        migrationBuilder.Sql("""
            CREATE FUNCTION [security].[fn_tenantAccessPredicate](@TenantId uniqueidentifier)
            RETURNS TABLE
            WITH SCHEMABINDING
            AS
            RETURN SELECT 1 AS [AccessResult]
            WHERE @TenantId = TRY_CONVERT(uniqueidentifier, SESSION_CONTEXT(N'TenantId'));
            """);

        migrationBuilder.Sql("""
            CREATE SECURITY POLICY [security].[TenantSecurityPolicy]
              ADD FILTER PREDICATE [security].[fn_tenantAccessPredicate]([TenantId]) ON [fleet].[Vehicles],
              ADD BLOCK PREDICATE [security].[fn_tenantAccessPredicate]([TenantId]) ON [fleet].[Vehicles] AFTER INSERT,
              ADD BLOCK PREDICATE [security].[fn_tenantAccessPredicate]([TenantId]) ON [fleet].[Vehicles] AFTER UPDATE,
              ADD FILTER PREDICATE [security].[fn_tenantAccessPredicate]([TenantId]) ON [maintenance].[WorkOrders],
              ADD BLOCK PREDICATE [security].[fn_tenantAccessPredicate]([TenantId]) ON [maintenance].[WorkOrders] AFTER INSERT,
              ADD BLOCK PREDICATE [security].[fn_tenantAccessPredicate]([TenantId]) ON [maintenance].[WorkOrders] AFTER UPDATE
            WITH (STATE = ON, SCHEMABINDING = ON);
            """);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.Sql("DROP SECURITY POLICY IF EXISTS [security].[TenantSecurityPolicy];");
        migrationBuilder.Sql("DROP FUNCTION IF EXISTS [security].[fn_tenantAccessPredicate];");
        migrationBuilder.DropTable(name: "WorkOrders", schema: "maintenance");
        migrationBuilder.DropTable(name: "Vehicles", schema: "fleet");
    }
}
