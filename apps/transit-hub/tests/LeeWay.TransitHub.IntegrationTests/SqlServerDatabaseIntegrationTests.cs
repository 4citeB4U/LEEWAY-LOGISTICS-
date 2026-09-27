/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: SqlServerDatabaseIntegrationTests.cs
 * Path: tests/LeeWay.TransitHub.IntegrationTests/SqlServerDatabaseIntegrationTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / SQL Integration
 * Purpose: Execute database-object and row-level-security checks against the isolated SQL Server development database when the phase requires live integration.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: Uses the least-privileged app connection and deletes its own test rows.
 * Database Impact: Reads and writes disposable evidence rows in LeeWayTransitHub.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using Microsoft.Data.SqlClient;

namespace LeeWay.TransitHub.IntegrationTests;

public sealed class SqlServerDatabaseIntegrationTests
{
    private static string? AppConnectionString => Environment.GetEnvironmentVariable("LEEWAY_SQLSERVER_APP_CONNECTION");
    private static string? MigrationConnectionString => Environment.GetEnvironmentVariable("LEEWAY_SQLSERVER_MIGRATION_CONNECTION");
    private static bool Required => string.Equals(Environment.GetEnvironmentVariable("LEEWAY_SQLSERVER_INTEGRATION_REQUIRED"), "1", StringComparison.Ordinal);

    [Fact]
    public async Task RequiredDatabaseObjectsExist()
    {
        if (!Required) return;
        Assert.False(string.IsNullOrWhiteSpace(MigrationConnectionString));
        await using SqlConnection connection = new(MigrationConnectionString);
        await connection.OpenAsync();
        await using SqlCommand command = connection.CreateCommand();
        command.CommandText = "SELECT IIF(OBJECT_ID(N'fleet.Vehicles') IS NOT NULL AND OBJECT_ID(N'maintenance.WorkOrders') IS NOT NULL AND OBJECT_ID(N'security.TenantSecurityPolicy') IS NOT NULL AND OBJECT_ID(N'operations.OperationsEvents') IS NOT NULL, 1, 0);";
        Assert.Equal(1, Convert.ToInt32(await command.ExecuteScalarAsync()));
    }

    [Fact]
    public async Task RowLevelSecuritySeparatesTenantRows()
    {
        if (!Required) return;
        Assert.False(string.IsNullOrWhiteSpace(AppConnectionString));
        Guid tenantA = Guid.NewGuid();
        Guid tenantB = Guid.NewGuid();
        Guid vehicleId = Guid.NewGuid();
        await using SqlConnection connection = new(AppConnectionString);
        await connection.OpenAsync();
        await SetTenant(connection, tenantA);
        await using (SqlCommand insert = connection.CreateCommand())
        {
            insert.CommandText = "INSERT INTO fleet.Vehicles (TenantId,Id,FleetNumber,Manufacturer,Model,ModelYear,Status,CreatedUtc) VALUES (@tenant,@id,@fleet,N'LeeWay',N'Integration',2026,1,SYSUTCDATETIME());";
            insert.Parameters.AddWithValue("@tenant", tenantA);
            insert.Parameters.AddWithValue("@id", vehicleId);
            insert.Parameters.AddWithValue("@fleet", $"TEST-{vehicleId:N}"[..20]);
            Assert.Equal(1, await insert.ExecuteNonQueryAsync());
        }
        await SetTenant(connection, tenantB);
        await using (SqlCommand hidden = connection.CreateCommand())
        {
            hidden.CommandText = "SELECT COUNT_BIG(*) FROM fleet.Vehicles WHERE Id=@id;";
            hidden.Parameters.AddWithValue("@id", vehicleId);
            Assert.Equal(0L, Convert.ToInt64(await hidden.ExecuteScalarAsync()));
        }
        await SetTenant(connection, tenantA);
        await using (SqlCommand cleanup = connection.CreateCommand())
        {
            cleanup.CommandText = "DELETE FROM fleet.Vehicles WHERE Id=@id;";
            cleanup.Parameters.AddWithValue("@id", vehicleId);
            Assert.Equal(1, await cleanup.ExecuteNonQueryAsync());
        }
    }

    private static async Task SetTenant(SqlConnection connection, Guid tenantId)
    {
        await using SqlCommand command = connection.CreateCommand();
        command.CommandText = "EXEC sys.sp_set_session_context @key=N'TenantId', @value=@tenantId;";
        command.Parameters.AddWithValue("@tenantId", tenantId);
        await command.ExecuteNonQueryAsync();
    }
}
