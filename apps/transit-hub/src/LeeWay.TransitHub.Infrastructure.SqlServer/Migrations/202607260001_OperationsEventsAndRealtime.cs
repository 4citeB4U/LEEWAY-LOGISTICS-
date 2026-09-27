/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: 202607260001_OperationsEventsAndRealtime.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/Migrations/202607260001_OperationsEventsAndRealtime.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / EF Core Migration
 * Purpose: Create tenant-owned operations events, rowversion metadata, index, and SQL Server RLS predicates.
 * Inputs: Phase 05 schema and EF Core migration authority.
 * Outputs: operations schema, OperationsEvents table, and active RLS predicates.
 * Mutation Scope: Adds one table and policy predicates; reversible by migration down.
 * Dependencies: EF Core 10 and SQL Server 2025.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Database filter and block predicates enforce active tenant session context.
 * Database Impact: Adds operations.OperationsEvents and updates security.TenantSecurityPolicy.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Infrastructure.SqlServer.Persistence;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeeWay.TransitHub.Infrastructure.SqlServer.Migrations;

[DbContext(typeof(TransitHubDbContext))]
[Migration("202607260001_OperationsEventsAndRealtime")]
public sealed class OperationsEventsAndRealtime : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.EnsureSchema(name: "operations");
        migrationBuilder.CreateTable(
            name: "OperationsEvents",
            schema: "operations",
            columns: table => new
            {
                TenantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Type = table.Column<int>(type: "int", nullable: false),
                Severity = table.Column<int>(type: "int", nullable: false),
                Subject = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                PayloadJson = table.Column<string>(type: "nvarchar(max)", nullable: false),
                CreatedBySubject = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                OccurredUtc = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_OperationsEvents", item => new { item.TenantId, item.Id });
            });
        migrationBuilder.CreateIndex(
            name: "IX_OperationsEvents_TenantId_OccurredUtc",
            schema: "operations",
            table: "OperationsEvents",
            columns: new[] { "TenantId", "OccurredUtc" });
        migrationBuilder.Sql(
            """
            ALTER SECURITY POLICY [security].[TenantSecurityPolicy]
              ADD FILTER PREDICATE [security].[fn_tenantAccessPredicate]([TenantId]) ON [operations].[OperationsEvents],
              ADD BLOCK PREDICATE [security].[fn_tenantAccessPredicate]([TenantId]) ON [operations].[OperationsEvents] AFTER INSERT,
              ADD BLOCK PREDICATE [security].[fn_tenantAccessPredicate]([TenantId]) ON [operations].[OperationsEvents] AFTER UPDATE;
            """);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.Sql(
            """
            ALTER SECURITY POLICY [security].[TenantSecurityPolicy]
              DROP FILTER PREDICATE ON [operations].[OperationsEvents],
              DROP BLOCK PREDICATE ON [operations].[OperationsEvents],
              DROP BLOCK PREDICATE ON [operations].[OperationsEvents];
            """);
        migrationBuilder.DropTable(name: "OperationsEvents", schema: "operations");
    }
}
