/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: SqlServerPersistenceArchitectureTests.cs
 * Path: tests/LeeWay.TransitHub.ArchitectureTests/SqlServerPersistenceArchitectureTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Architecture
 * Purpose: Protect the EF Core infrastructure boundary and prohibit EF Core dependencies in the domain project.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: Prevents persistence framework leakage into domain rules.
 * Database Impact: Reads project files only.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 5.0.0
 */

namespace LeeWay.TransitHub.ArchitectureTests;

public sealed class SqlServerPersistenceArchitectureTests
{
    private static readonly string Root = FindRoot();

    [Fact]
    public void SqlServerProject_ReferencesGovernedEfCorePackages()
    {
        string project = File.ReadAllText(Path.Combine(Root, "src", "LeeWay.TransitHub.Infrastructure.SqlServer", "LeeWay.TransitHub.Infrastructure.SqlServer.csproj"));
        Assert.Contains("Microsoft.EntityFrameworkCore.SqlServer", project, StringComparison.Ordinal);
        Assert.Contains("Microsoft.Extensions.Diagnostics.HealthChecks.EntityFrameworkCore", project, StringComparison.Ordinal);
    }

    [Fact]
    public void DomainProject_DoesNotReferenceEntityFrameworkCore()
    {
        string project = File.ReadAllText(Path.Combine(Root, "src", "LeeWay.TransitHub.Domain", "LeeWay.TransitHub.Domain.csproj"));
        Assert.DoesNotContain("EntityFrameworkCore", project, StringComparison.OrdinalIgnoreCase);
    }

    private static string FindRoot()
    {
        DirectoryInfo? directory = new(AppContext.BaseDirectory);
        while (directory is not null && !File.Exists(Path.Combine(directory.FullName, "LeeWay.EnterpriseTransitHub.sln"))) directory = directory.Parent;
        return directory?.FullName ?? throw new DirectoryNotFoundException("Solution root not found.");
    }
}
