/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TenantSessionConnectionInterceptor.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/Persistence/TenantSessionConnectionInterceptor.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / SQL Security
 * Purpose: Set SQL Server SESSION_CONTEXT TenantId every time EF Core opens a pooled connection so database row-level security evaluates the current request tenant.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: Clears the tenant value for unresolved contexts and prevents pooled-connection tenant leakage.
 * Database Impact: Executes sys.sp_set_session_context on opened SQL connections.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 5.0.0
 */

using System.Data.Common;
using LeeWay.TransitHub.Application.Tenancy;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace LeeWay.TransitHub.Infrastructure.SqlServer.Persistence;

public sealed class TenantSessionConnectionInterceptor(ITenantContext tenantContext) : DbConnectionInterceptor
{
    public override void ConnectionOpened(DbConnection connection, ConnectionEndEventData eventData)
    {
        Apply(connection);
        base.ConnectionOpened(connection, eventData);
    }

    public override async Task ConnectionOpenedAsync(
        DbConnection connection,
        ConnectionEndEventData eventData,
        CancellationToken cancellationToken = default)
    {
        await ApplyAsync(connection, cancellationToken);
        await base.ConnectionOpenedAsync(connection, eventData, cancellationToken);
    }

    private void Apply(DbConnection connection)
    {
        using DbCommand command = CreateCommand(connection);
        command.ExecuteNonQuery();
    }

    private async Task ApplyAsync(DbConnection connection, CancellationToken cancellationToken)
    {
        await using DbCommand command = CreateCommand(connection);
        await command.ExecuteNonQueryAsync(cancellationToken);
    }

    private DbCommand CreateCommand(DbConnection connection)
    {
        DbCommand command = connection.CreateCommand();
        command.CommandText = "EXEC sys.sp_set_session_context @key=N'TenantId', @value=@tenantId;";
        DbParameter parameter = command.CreateParameter();
        parameter.ParameterName = "@tenantId";
        parameter.Value = tenantContext.IsResolved ? tenantContext.TenantId : DBNull.Value;
        command.Parameters.Add(parameter);
        return command;
    }
}
