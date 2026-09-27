/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: SqlServerOptionsTests.cs
 * Path: tests/LeeWay.TransitHub.UnitTests/SqlServerOptionsTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Unit
 * Purpose: Verify SQL Server connection options fail closed and normalize a supplied value.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: Prevents silent use of a missing connection string.
 * Database Impact: No database connection.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 5.0.0
 */

using LeeWay.TransitHub.Infrastructure.SqlServer;

namespace LeeWay.TransitHub.UnitTests;

public sealed class SqlServerOptionsTests
{
    [Fact]
    public void Require_RejectsMissingConnectionString() =>
        Assert.Throws<InvalidOperationException>(() => SqlServerConnectionOptions.Require(" "));

    [Fact]
    public void Require_TrimsConfiguredConnectionString() =>
        Assert.Equal("Server=localhost;Database=LeeWayTransitHub", SqlServerConnectionOptions.Require(" Server=localhost;Database=LeeWayTransitHub "));
}
