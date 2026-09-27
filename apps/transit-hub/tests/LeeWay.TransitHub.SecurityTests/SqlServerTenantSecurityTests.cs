/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: SqlServerTenantSecurityTests.cs
 * Path: tests/LeeWay.TransitHub.SecurityTests/SqlServerTenantSecurityTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Security
 * Purpose: Verify the migration contains database-tier tenant filter and write-block controls and the connection interceptor sets TenantId session context.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: Protects defense-in-depth tenant isolation from accidental removal.
 * Database Impact: Static migration and source inspection only.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 5.0.0
 */

namespace LeeWay.TransitHub.SecurityTests;

public sealed class SqlServerTenantSecurityTests
{
    private static readonly string Root = FindRoot();

    [Fact]
    public void Migration_DefinesFilterPredicate()
    {
        string migration = MigrationText();
        Assert.Contains("ADD FILTER PREDICATE", migration, StringComparison.Ordinal);
        Assert.Contains("fn_tenantAccessPredicate", migration, StringComparison.Ordinal);
    }

    [Fact]
    public void Migration_DefinesWriteBlockPredicates()
    {
        string migration = MigrationText();
        Assert.Contains("ADD BLOCK PREDICATE", migration, StringComparison.Ordinal);
        Assert.Contains("AFTER INSERT", migration, StringComparison.Ordinal);
        Assert.Contains("AFTER UPDATE", migration, StringComparison.Ordinal);
    }

    [Fact]
    public void ConnectionInterceptor_SetsTenantSessionContext()
    {
        string source = File.ReadAllText(Path.Combine(Root, "src", "LeeWay.TransitHub.Infrastructure.SqlServer", "Persistence", "TenantSessionConnectionInterceptor.cs"));
        Assert.Contains("sp_set_session_context", source, StringComparison.Ordinal);
        Assert.Contains("TenantId", source, StringComparison.Ordinal);
    }

    private static string MigrationText() => File.ReadAllText(Path.Combine(Root, "src", "LeeWay.TransitHub.Infrastructure.SqlServer", "Migrations", "202607250001_InitialTenantPersistence.cs"));
    private static string FindRoot()
    {
        DirectoryInfo? directory = new(AppContext.BaseDirectory);
        while (directory is not null && !File.Exists(Path.Combine(directory.FullName, "LeeWay.EnterpriseTransitHub.sln"))) directory = directory.Parent;
        return directory?.FullName ?? throw new DirectoryNotFoundException("Solution root not found.");
    }
}
