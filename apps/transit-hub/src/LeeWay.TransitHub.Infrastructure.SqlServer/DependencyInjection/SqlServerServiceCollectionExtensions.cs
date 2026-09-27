/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: SqlServerServiceCollectionExtensions.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/DependencyInjection/SqlServerServiceCollectionExtensions.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / Dependency Injection
 * Purpose: Register EF Core SQL Server services, select the normal application or dedicated migration connection by execution mode, replace governed repository adapters, enable retry, and add a tagged DbContext health check.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: Requires explicit application and migration connection strings; migration mode never falls back to the restricted runtime identity.
 * Database Impact: Selects SQL Server for vehicle and work-order persistence when configured.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.9
 */

using LeeWay.TransitHub.Application.Abstractions;
using LeeWay.TransitHub.Infrastructure.SqlServer.Persistence;
using LeeWay.TransitHub.Infrastructure.SqlServer.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace LeeWay.TransitHub.Infrastructure.SqlServer.DependencyInjection;

public static class SqlServerServiceCollectionExtensions
{
    public static IServiceCollection AddLeeWaySqlServerInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration,
        bool useMigrationConnection = false)
    {
        string connectionStringName = useMigrationConnection
            ? "TransitHubSqlServerMigration"
            : SqlServerConnectionOptions.ConnectionStringName;
        string connectionString = SqlServerConnectionOptions.Require(
            configuration.GetConnectionString(connectionStringName));

        services.AddScoped<TenantSessionConnectionInterceptor>();
        services.AddDbContext<TransitHubDbContext>((provider, options) =>
        {
            options.UseSqlServer(connectionString, sql => sql.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(5),
                errorNumbersToAdd: null));
            options.AddInterceptors(provider.GetRequiredService<TenantSessionConnectionInterceptor>());
        });

        services.RemoveAll<IVehicleRepository>();
        services.RemoveAll<IWorkOrderRepository>();
        services.RemoveAll<IOperationsEventRepository>();
        services.AddScoped<IVehicleRepository, SqlServerVehicleRepository>();
        services.AddScoped<IWorkOrderRepository, SqlServerWorkOrderRepository>();
        services.AddScoped<IOperationsEventRepository, SqlServerOperationsEventRepository>();
        services.AddHealthChecks().AddDbContextCheck<TransitHubDbContext>(
            name: "TransitHubSqlServer",
            tags: new[] { "database", "sqlserver", "readiness" });
        return services;
    }
}
