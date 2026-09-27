/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: OperationsEventSqlServerIntegrationTests.cs
 * Path: tests/LeeWay.TransitHub.IntegrationTests/OperationsEventSqlServerIntegrationTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / SQL Integration
 * Purpose: Verify Phase 06 database objects and direct row-level isolation for operations events.
 * Inputs: Phase 06 SQL app and migration connection environment variables.
 * Outputs: Object existence and tenant separation evidence.
 * Mutation Scope: Disposable operations event rows only.
 * Dependencies: Microsoft.Data.SqlClient and live LeeWayTransitHub database.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Uses restricted app login for insert/read and migration login only for cleanup.
 * Database Impact: Reads and writes disposable operations.OperationsEvents rows.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using Microsoft.Data.SqlClient;

namespace LeeWay.TransitHub.IntegrationTests;

public sealed class OperationsEventSqlServerIntegrationTests
{
    private static string? AppConnection => Environment.GetEnvironmentVariable("LEEWAY_SQLSERVER_APP_CONNECTION");
    private static string? MigrationConnection => Environment.GetEnvironmentVariable("LEEWAY_SQLSERVER_MIGRATION_CONNECTION");
    private static bool Required => string.Equals(Environment.GetEnvironmentVariable("LEEWAY_SQLSERVER_INTEGRATION_REQUIRED"), "1", StringComparison.Ordinal);

    [Fact]
    public async Task OperationsEventTableAndRlsPredicatesExist()
    {
        if (!Required) return;
        await using SqlConnection connection = new(MigrationConnection);
        await connection.OpenAsync();
        await using SqlCommand command = connection.CreateCommand();
        command.CommandText = "SELECT IIF(OBJECT_ID(N'operations.OperationsEvents') IS NOT NULL AND EXISTS (SELECT 1 FROM sys.security_predicates WHERE target_object_id=OBJECT_ID(N'operations.OperationsEvents')),1,0);";
        Assert.Equal(1, Convert.ToInt32(await command.ExecuteScalarAsync()));
    }

    [Fact]
    public async Task OperationsEventsAreHiddenAcrossTenantSessionContexts()
    {
        if (!Required) return;
        Guid tenantA = Guid.NewGuid();
        Guid tenantB = Guid.NewGuid();
        Guid id = Guid.NewGuid();
        await using SqlConnection app = new(AppConnection);
        await app.OpenAsync();
        await SetTenant(app, tenantA);
        await using (SqlCommand insert = app.CreateCommand())
        {
            insert.CommandText = "INSERT INTO operations.OperationsEvents (TenantId,Id,Type,Severity,Subject,PayloadJson,CreatedBySubject,OccurredUtc) VALUES (@tenant,@id,3,2,N'Test',N'{}',N'integration',SYSUTCDATETIME());";
            insert.Parameters.AddWithValue("@tenant", tenantA);
            insert.Parameters.AddWithValue("@id", id);
            Assert.Equal(1, await insert.ExecuteNonQueryAsync());
        }
        await SetTenant(app, tenantB);
        await using (SqlCommand hidden = app.CreateCommand())
        {
            hidden.CommandText = "SELECT COUNT_BIG(*) FROM operations.OperationsEvents WHERE Id=@id;";
            hidden.Parameters.AddWithValue("@id", id);
            Assert.Equal(0L, Convert.ToInt64(await hidden.ExecuteScalarAsync()));
        }
        await using SqlConnection migration = new(MigrationConnection);
        await migration.OpenAsync();
        await SetTenant(migration, tenantA);
        await using SqlCommand cleanup = migration.CreateCommand();
        cleanup.CommandText = "DELETE FROM operations.OperationsEvents WHERE TenantId=@tenant AND Id=@id;";
        cleanup.Parameters.AddWithValue("@tenant", tenantA);
        cleanup.Parameters.AddWithValue("@id", id);
        Assert.Equal(1, await cleanup.ExecuteNonQueryAsync());
    }

    private static async Task SetTenant(SqlConnection connection, Guid tenantId)
    {
        await using SqlCommand command = connection.CreateCommand();
        command.CommandText = "EXEC sys.sp_set_session_context @key=N'TenantId', @value=@tenant;";
        command.Parameters.AddWithValue("@tenant", tenantId);
        await command.ExecuteNonQueryAsync();
    }
}
