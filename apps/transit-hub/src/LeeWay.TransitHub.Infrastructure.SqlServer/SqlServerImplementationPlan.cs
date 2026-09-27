/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: SqlServerImplementationPlan.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/SqlServerImplementationPlan.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / SQL Server Plan
 * Purpose: Expose the governed SQL Server migration sequence without opening a connection.
 * Inputs: Version-controlled SQL script paths.
 * Outputs: Ordered migration plan.
 * Mutation Scope: Read-only.
 * Dependencies: database/sqlserver scripts.
 * Tests: Architecture and script-existence checks.
 * Security Impact: No credentials or connections.
 * Database Impact: Declares migration order only.
 * Sovereign Cycle: Structure -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

namespace LeeWay.TransitHub.Infrastructure.SqlServer;

public static class SqlServerImplementationPlan
{
    public static IReadOnlyCollection<string> RequiredScripts { get; } = new[]
    {
        "database/sqlserver/001-create-schema.sql",
        "database/sqlserver/002-create-tables.sql",
        "database/sqlserver/003-create-procedures.sql",
        "database/sqlserver/004-seed-training-data.sql",
        "database/sqlserver/005-verification.sql"
    };
}
