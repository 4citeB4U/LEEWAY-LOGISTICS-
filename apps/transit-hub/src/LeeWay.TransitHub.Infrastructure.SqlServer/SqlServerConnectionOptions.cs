/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: SqlServerConnectionOptions.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/SqlServerConnectionOptions.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / SQL Server Configuration
 * Purpose: Validate the named SQL Server connection contract and prevent silent fallback to an unconfigured database.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: Never logs or returns the connection string.
 * Database Impact: Reads SQL Server connection configuration only.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 5.0.0
 */

namespace LeeWay.TransitHub.Infrastructure.SqlServer;

public sealed class SqlServerConnectionOptions
{
    public const string ConnectionStringName = "TransitHubSqlServer";
    public const string DataMode = "SqlServer";

    public static string Require(string? connectionString)
    {
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                $"ConnectionStrings:{ConnectionStringName} is required when TransitHub:DataMode={DataMode}.");
        }

        return connectionString.Trim();
    }
}
