/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: Phase06RealtimeArchitectureTests.cs
 * Path: tests/LeeWay.TransitHub.ArchitectureTests/Phase06RealtimeArchitectureTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Architecture
 * Purpose: Prove Phase 06 realtime, redaction, tenant-group, dedicated migration-connection, model-snapshot, and learning surfaces remain present and correctly separated.
 * Inputs: Governed request data and existing application contracts.
 * Outputs: Deterministic application behavior and evidence.
 * Mutation Scope: Owned project state only.
 * Dependencies: .NET 10 and LeeWay governed contracts.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Tenant and least-privilege boundaries apply.
 * Database Impact: Inspects source and governed metadata only.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.9
 */

using System.Text.Json;

namespace LeeWay.TransitHub.ArchitectureTests;

public sealed class Phase06RealtimeArchitectureTests
{
    [Fact]
    public void Program_RegistersSignalRAndTenantOperationsHub()
    {
        string text = File.ReadAllText(Path.Combine(FindRoot(), "src", "LeeWay.TransitHub.Api", "Program.cs"));
        Assert.Contains("AddSignalR()", text, StringComparison.Ordinal);
        Assert.Contains("MapHub<OperationsHub>(\"/hubs/operations\")", text, StringComparison.Ordinal);
    }

    [Fact]
    public void Notifier_UsesTenantGroupAndNeverAllClients()
    {
        string text = File.ReadAllText(Path.Combine(FindRoot(), "src", "LeeWay.TransitHub.Api", "Realtime", "SignalROperationsNotifier.cs"));
        Assert.Contains("Clients", text, StringComparison.Ordinal);
        Assert.Contains(".Group(TenantOperationsGroup.For", text, StringComparison.Ordinal);
        Assert.DoesNotContain("Clients.All", text, StringComparison.Ordinal);
    }

    [Fact]
    public void SecretSafeModule_RedactsBeforeWritingLog()
    {
        string text = File.ReadAllText(Path.Combine(FindRoot(), "operations", "powershell", "security", "SecretSafeProcess.psm1"));
        Assert.Contains("Protect-LeeWaySensitiveText", text, StringComparison.Ordinal);
        Assert.Contains("[REDACTED]", text, StringComparison.Ordinal);
        Assert.DoesNotContain("Write-Host $ArgumentList", text, StringComparison.Ordinal);
    }

    [Fact]
    public void MigrationSnapshot_RequiresRowVersionAndProgramProvidesPendingModelGate()
    {
        string root = FindRoot();
        string snapshot = File.ReadAllText(Path.Combine(root, "src", "LeeWay.TransitHub.Infrastructure.SqlServer", "Migrations", "TransitHubDbContextModelSnapshot.cs"));
        string program = File.ReadAllText(Path.Combine(root, "src", "LeeWay.TransitHub.Api", "Program.cs"));

        Assert.Contains("Property<byte[]>(\"RowVersion\").IsRequired().IsConcurrencyToken()", snapshot, StringComparison.Ordinal);
        Assert.Contains("--verify-model-snapshot", program, StringComparison.Ordinal);
        Assert.Contains("HasPendingModelChanges()", program, StringComparison.Ordinal);
    }


    [Fact]
    public void MigrationMode_UsesDedicatedMigrationConnectionInsteadOfRuntimeApplicationConnection()
    {
        string root = FindRoot();
        string program = File.ReadAllText(Path.Combine(root, "src", "LeeWay.TransitHub.Api", "Program.cs"));
        string registration = File.ReadAllText(Path.Combine(root, "src", "LeeWay.TransitHub.Infrastructure.SqlServer", "DependencyInjection", "SqlServerServiceCollectionExtensions.cs"));

        Assert.Contains("bool migrationMode", program, StringComparison.Ordinal);
        Assert.Contains("--verify-migration-principal", program, StringComparison.Ordinal);
        Assert.Contains("bool useMigrationConnection = migrationMode || migrationPrincipalProbeMode", program, StringComparison.Ordinal);
        Assert.Contains("AddLeeWaySqlServerInfrastructure(builder.Configuration, useMigrationConnection)", program, StringComparison.Ordinal);
        Assert.Contains("MIGRATION-PRINCIPAL-PASS", program, StringComparison.Ordinal);
        Assert.Contains("TransitHubSqlServerMigration", registration, StringComparison.Ordinal);
        Assert.Contains("bool useMigrationConnection = false", registration, StringComparison.Ordinal);
    }

    [Fact]
    public void LatestLearningPhase_IsPhaseSixWithAssessmentCoverage()
    {
        string root = FindRoot();
        using JsonDocument registry = JsonDocument.Parse(File.ReadAllText(Path.Combine(root, "docs", "learning", "learning-phase-registry.json")));
        JsonElement latest = registry.RootElement.GetProperty("phases").EnumerateArray().Last();
        Assert.Equal("PHASE-06", latest.GetProperty("id").GetString());
        Assert.Equal(12, latest.GetProperty("questionCount").GetInt32());
        Assert.True(File.Exists(Path.Combine(root, latest.GetProperty("interviewQuiz").GetString()!.Replace('/', Path.DirectorySeparatorChar))));
    }

    private static string FindRoot()
    {
        DirectoryInfo? current = new(AppContext.BaseDirectory);
        while (current is not null)
        {
            if (File.Exists(Path.Combine(current.FullName, "LeeWay.EnterpriseTransitHub.sln"))) return current.FullName;
            current = current.Parent;
        }
        throw new DirectoryNotFoundException("Unable to locate solution root.");
    }
}
