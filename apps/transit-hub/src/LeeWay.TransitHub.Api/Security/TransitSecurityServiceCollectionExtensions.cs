/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TransitSecurityServiceCollectionExtensions.cs
 * Path: src/LeeWay.TransitHub.Api/Security/TransitSecurityServiceCollectionExtensions.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Security Composition
 * Purpose: Register development authentication, provider-neutral role policies, tenant matching, and Agent Lee service capability authorization.
 * Inputs: IServiceCollection and security contracts.
 * Outputs: Configured authentication scheme, policies, and handlers.
 * Mutation Scope: Service registration only.
 * Dependencies: ASP.NET Core authentication and authorization, TransitRoles, TransitPolicies, and TenantAccessRequirement.
 * Tests: Build, policy catalog tests, and secured endpoint runtime checks.
 * Security Impact: Uses least privilege and tenant matching; development scheme is explicitly not production identity.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Application.Security;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;

namespace LeeWay.TransitHub.Api.Security;

public static class TransitSecurityServiceCollectionExtensions
{
    public static IServiceCollection AddTransitHubSecurityFoundation(this IServiceCollection services)
    {
        ArgumentNullException.ThrowIfNull(services);

        services
            .AddAuthentication(DevelopmentHeaderAuthenticationHandler.SchemeName)
            .AddScheme<AuthenticationSchemeOptions, DevelopmentHeaderAuthenticationHandler>(
                DevelopmentHeaderAuthenticationHandler.SchemeName,
                _ => { });

        services
            .AddAuthorizationBuilder()
            .AddPolicy(TransitPolicies.Authenticated, policy => policy.RequireAuthenticatedUser())
            .AddPolicy(TransitPolicies.TenantMember, policy =>
            {
                policy.RequireAuthenticatedUser();
                policy.AddRequirements(new TenantAccessRequirement());
            })
            .AddPolicy(TransitPolicies.FleetRead, policy =>
            {
                policy.RequireAuthenticatedUser();
                policy.RequireClaim(TransitClaimTypes.Permission, TransitPermissions.FleetRead);
                policy.AddRequirements(new TenantAccessRequirement());
            })
            .AddPolicy(TransitPolicies.FleetManage, policy =>
            {
                policy.RequireAuthenticatedUser();
                policy.RequireClaim(TransitClaimTypes.Permission, TransitPermissions.FleetManage);
                policy.AddRequirements(new TenantAccessRequirement());
            })
            .AddPolicy(TransitPolicies.TenantAdministration, policy =>
            {
                policy.RequireAuthenticatedUser();
                policy.RequireClaim(TransitClaimTypes.Permission, TransitPermissions.TenantAdministration);
                policy.AddRequirements(new TenantAccessRequirement());
            })
            .AddPolicy(TransitPolicies.PlatformAdministration, policy =>
            {
                policy.RequireAuthenticatedUser();
                policy.RequireRole(TransitRoles.PlatformOwner);
                policy.RequireClaim(TransitClaimTypes.Permission, TransitPermissions.PlatformAdministration);
            })
            .AddPolicy(TransitPolicies.TrainingProctor, policy =>
            {
                policy.RequireAuthenticatedUser();
                policy.RequireClaim(TransitClaimTypes.Permission, TransitPermissions.TrainingProctor);
                policy.AddRequirements(new TenantAccessRequirement());
            })
            .AddPolicy(TransitPolicies.OperationsRead, policy =>
            {
                policy.RequireAuthenticatedUser();
                policy.RequireClaim(TransitClaimTypes.Permission, TransitPermissions.OperationsRead);
                policy.AddRequirements(new TenantAccessRequirement());
            })
            .AddPolicy(TransitPolicies.OperationsPublish, policy =>
            {
                policy.RequireAuthenticatedUser();
                policy.RequireClaim(TransitClaimTypes.Permission, TransitPermissions.OperationsPublish);
                policy.AddRequirements(new TenantAccessRequirement());
            })
            .AddPolicy(TransitPolicies.AgentToolExecute, policy =>
            {
                policy.RequireAuthenticatedUser();
                policy.RequireRole(TransitRoles.AgentService);
                policy.RequireClaim(TransitClaimTypes.Permission, TransitPermissions.AgentToolExecute);
                policy.RequireClaim(TransitClaimTypes.Capability, "leeway.enterprise-transit-hub");
                policy.AddRequirements(new TenantAccessRequirement());
            });

        services.AddScoped<IAuthorizationHandler, TenantAccessAuthorizationHandler>();
        return services;
    }
}
