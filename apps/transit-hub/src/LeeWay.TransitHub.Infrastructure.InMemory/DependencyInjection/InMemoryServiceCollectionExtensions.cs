/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: InMemoryServiceCollectionExtensions.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.InMemory/DependencyInjection/InMemoryServiceCollectionExtensions.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / Dependency Injection
 * Purpose: Register all in-memory infrastructure implementations.
 * Inputs: IServiceCollection.
 * Outputs: Configured service registrations.
 * Mutation Scope: Dependency-injection container only.
 * Dependencies: Application contracts and in-memory implementations.
 * Tests: API startup and integration tests.
 * Security Impact: Registers no secrets or external connections.
 * Database Impact: Selects no-database training mode.
 * Sovereign Cycle: Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Application.Abstractions;
using LeeWay.TransitHub.Infrastructure.InMemory.Repositories;
using LeeWay.TransitHub.Infrastructure.InMemory.Storage;
using Microsoft.Extensions.DependencyInjection;

namespace LeeWay.TransitHub.Infrastructure.InMemory.DependencyInjection;

public static class InMemoryServiceCollectionExtensions
{
    public static IServiceCollection AddLeeWayInMemoryInfrastructure(this IServiceCollection services)
    {
        services.AddSingleton<InMemoryTransitStore>();
        services.AddSingleton<IVehicleRepository, InMemoryVehicleRepository>();
        services.AddSingleton<IWorkOrderRepository, InMemoryWorkOrderRepository>();
        services.AddSingleton<IIncidentRepository, InMemoryIncidentRepository>();
        services.AddSingleton<ICustomerCaseRepository, InMemoryCustomerCaseRepository>();
        services.AddSingleton<IEmployeeFormRepository, InMemoryEmployeeFormRepository>();
        services.AddSingleton<IInspectionRepository, InMemoryInspectionRepository>();
        services.AddSingleton<IReceiptWriter, InMemoryReceiptWriter>();
        services.AddScoped<IOperationsEventRepository, InMemoryOperationsEventRepository>();
        return services;
    }
}
