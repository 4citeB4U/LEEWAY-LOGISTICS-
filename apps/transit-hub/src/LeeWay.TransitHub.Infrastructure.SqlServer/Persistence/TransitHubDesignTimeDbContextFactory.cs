/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TransitHubDesignTimeDbContextFactory.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/Persistence/TransitHubDesignTimeDbContextFactory.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / EF Core Design-Time
 * Purpose: Create the DbContext for migration tooling using an explicit environment connection string.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: Fails closed when the migration connection is absent.
 * Database Impact: Reads LEEWAY_TRANSIT_HUB_MIGRATION_CONNECTION for design-time migrations.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 5.0.0
 */

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace LeeWay.TransitHub.Infrastructure.SqlServer.Persistence;

public sealed class TransitHubDesignTimeDbContextFactory : IDesignTimeDbContextFactory<TransitHubDbContext>
{
    public TransitHubDbContext CreateDbContext(string[] args)
    {
        string connectionString = SqlServerConnectionOptions.Require(
            Environment.GetEnvironmentVariable("LEEWAY_TRANSIT_HUB_MIGRATION_CONNECTION"));
        DbContextOptionsBuilder<TransitHubDbContext> options = new();
        options.UseSqlServer(connectionString, sql => sql.EnableRetryOnFailure());
        return new TransitHubDbContext(options.Options, new DesignTimeTenantContext());
    }
}
