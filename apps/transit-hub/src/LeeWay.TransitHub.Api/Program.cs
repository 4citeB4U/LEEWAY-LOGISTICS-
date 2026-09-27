/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: Program.cs
 * Path: src/LeeWay.TransitHub.Api/Program.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Composition Root
 * Purpose: Select in-memory or SQL Server persistence, configure identity and tenant middleware, verify migration-model alignment, select the dedicated migration connection for governed migrations, register database health checks, and expose product evidence.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: Development header identity remains development-only; SQL secrets are read from configuration and never returned.
 * Database Impact: Runs EF Core migrations only when explicitly started with --migrate and a migration connection string.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.9
 */

using LeeWay.TransitHub.Api.Hubs;
using LeeWay.TransitHub.Api.Realtime;
using LeeWay.TransitHub.Api.Security;
using LeeWay.TransitHub.Api.Tenancy;
using LeeWay.TransitHub.Application.Abstractions;
using LeeWay.TransitHub.Application.Product;
using LeeWay.TransitHub.Application.Services;
using LeeWay.TransitHub.Application.Tenancy;
using LeeWay.TransitHub.Infrastructure.InMemory.DependencyInjection;
using LeeWay.TransitHub.Infrastructure.SqlServer.DependencyInjection;
using LeeWay.TransitHub.Infrastructure.SqlServer.Persistence;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
string dataMode = builder.Configuration["TransitHub:DataMode"]?.Trim() ?? "InMemory";
bool sqlServerMode = string.Equals(dataMode, "SqlServer", StringComparison.OrdinalIgnoreCase);
bool migrationMode = args.Any(argument => string.Equals(argument, "--migrate", StringComparison.OrdinalIgnoreCase));
bool migrationPrincipalProbeMode = args.Any(argument => string.Equals(argument, "--verify-migration-principal", StringComparison.OrdinalIgnoreCase));
bool useMigrationConnection = migrationMode || migrationPrincipalProbeMode;

builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddCors(options => options.AddPolicy("LocalWeb", policy => policy
    .WithOrigins("http://localhost:5081", "https://localhost:7081")
    .AllowAnyHeader()
    .AllowAnyMethod()));

builder.Services.AddLeeWayInMemoryInfrastructure();
if (sqlServerMode)
{
    builder.Services.AddLeeWaySqlServerInfrastructure(builder.Configuration, useMigrationConnection);
}
else
{
    builder.Services.AddHealthChecks();
}

builder.Services.AddScoped<HeaderTenantContext>();
builder.Services.AddScoped<ITenantContext>(services => services.GetRequiredService<HeaderTenantContext>());
builder.Services.AddTransitHubSecurityFoundation();
builder.Services.AddSingleton<TransitHubProductProfileService>();
builder.Services.AddScoped<VehicleService>();
builder.Services.AddScoped<WorkOrderService>();
builder.Services.AddScoped<IncidentService>();
builder.Services.AddScoped<CustomerCaseService>();
builder.Services.AddScoped<EmployeeFormService>();
builder.Services.AddScoped<InspectionService>();
builder.Services.AddScoped<DashboardService>();
builder.Services.AddScoped<OperationsEventService>();
builder.Services.AddSingleton<IOperationsNotifier, SignalROperationsNotifier>();

var app = builder.Build();

if (args.Any(argument => string.Equals(argument, "--verify-model-snapshot", StringComparison.OrdinalIgnoreCase)))
{
    if (!sqlServerMode)
    {
        throw new InvalidOperationException("Model-snapshot verification requires TransitHub:DataMode=SqlServer.");
    }

    await using AsyncServiceScope scope = app.Services.CreateAsyncScope();
    TransitHubDbContext database = scope.ServiceProvider.GetRequiredService<TransitHubDbContext>();
    if (database.Database.HasPendingModelChanges())
    {
        throw new InvalidOperationException("MODEL-SNAPSHOT-FAIL | TransitHubDbContext differs from the governed EF Core model snapshot.");
    }

    Console.WriteLine("MODEL-SNAPSHOT-PASS | TransitHubDbContext and the governed EF Core snapshot are aligned.");
    return;
}


if (migrationPrincipalProbeMode)
{
    if (!sqlServerMode)
    {
        throw new InvalidOperationException("Migration-principal verification requires TransitHub:DataMode=SqlServer.");
    }

    string expectedPrincipal = builder.Configuration["TransitHub:SqlServer:ExpectedMigrationPrincipal"]?.Trim()
        ?? throw new InvalidOperationException("Expected migration principal is required for verification.");
    await using AsyncServiceScope scope = app.Services.CreateAsyncScope();
    TransitHubDbContext database = scope.ServiceProvider.GetRequiredService<TransitHubDbContext>();
    await database.Database.OpenConnectionAsync();
    try
    {
        await using var command = database.Database.GetDbConnection().CreateCommand();
        command.CommandText = "SELECT ORIGINAL_LOGIN();";
        string actualPrincipal = Convert.ToString(await command.ExecuteScalarAsync())?.Trim() ?? string.Empty;
        if (!string.Equals(actualPrincipal, expectedPrincipal, StringComparison.Ordinal))
        {
            throw new InvalidOperationException("MIGRATION-PRINCIPAL-FAIL | The DbContext did not use the expected dedicated migration principal.");
        }
    }
    finally
    {
        await database.Database.CloseConnectionAsync();
    }

    Console.WriteLine("MIGRATION-PRINCIPAL-PASS | The DbContext used the expected dedicated migration principal.");
    return;
}

if (migrationMode)
{
    if (!sqlServerMode)
    {
        throw new InvalidOperationException("Migration mode requires TransitHub:DataMode=SqlServer.");
    }

    await using AsyncServiceScope scope = app.Services.CreateAsyncScope();
    TransitHubDbContext database = scope.ServiceProvider.GetRequiredService<TransitHubDbContext>();
    await database.Database.MigrateAsync();
    Console.WriteLine("MIGRATION-PASS | LeeWayTransitHub schema is current.");
    return;
}

app.UseCors("LocalWeb");
app.UseAuthentication();
app.UseMiddleware<TenantResolutionMiddleware>();
app.UseAuthorization();
app.MapControllers();
app.MapHub<OperationsHub>("/hubs/operations");
app.MapHealthChecks("/health/database", new HealthCheckOptions
{
    Predicate = registration => registration.Tags.Contains("database")
});
app.MapGet("/", () => Results.Ok(new
{
    system = "LeeWay Enterprise Transit Hub",
    status = "RUNNING",
    productMode = "INTERVIEW_DEFENSIBLE_AND_COMMERCIAL_B2B_SAAS",
    dataMode = sqlServerMode ? "SQL_SERVER_TENANT_PERSISTENCE" : "IN_MEMORY_TRAINING",
    tenantIsolation = sqlServerMode
        ? "EF_GLOBAL_FILTER_PLUS_SQL_SERVER_ROW_LEVEL_SECURITY"
        : "AUTHORIZATION_FOUNDATION_PERSISTENCE_ENFORCEMENT_DEFERRED",
    authentication = "DEVELOPMENT_EVIDENCE_SCHEME_ONLY_PRODUCTION_IDENTITY_UNBOUND",
    authorization = "ROLE_PERMISSION_POLICY_AND_TENANT_MATCH_FOUNDATION",
    agentLeeIntegrationMode = "EXTERNAL_LEEWAY_ORCHESTRATOR",
    agentLeeEmbedded = false,
    trainingManualTargetPages = 300,
    continuousLearningGate = "REQUIRED_EVERY_PHASE",
    databaseMigrations = sqlServerMode ? "EF_CORE_10_GOVERNED" : "NOT_ACTIVE",
    realtimeOperations = "SIGNALR_TENANT_GROUPS_AND_PERSISTED_OPERATIONS_EVENTS",
    secretAutomation = "REDACTED_PROCESS_ARGUMENTS_AND_ROTATED_DEVELOPMENT_CREDENTIALS",
    sovereignCycle = new[] { "Perception", "Origin", "Structure", "Execution", "Veritas", "Echo", "Synthesis", "Lee Prime" }
}));

app.Run();

public partial class Program
{
}
