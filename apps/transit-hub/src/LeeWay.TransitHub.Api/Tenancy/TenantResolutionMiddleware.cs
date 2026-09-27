/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TenantResolutionMiddleware.cs
 * Path: src/LeeWay.TransitHub.Api/Tenancy/TenantResolutionMiddleware.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Tenancy Middleware
 * Purpose: Resolve optional development tenant headers at the HTTP boundary.
 * Inputs: HTTP tenant ID and tenant code headers.
 * Outputs: Scoped tenant context or deterministic 400 response.
 * Mutation Scope: Current request context only.
 * Dependencies: HeaderTenantContext and ASP.NET Core.
 * Tests: Runtime checks for absent, valid, partial, and invalid headers.
 * Security Impact: Validates boundary data but does not replace authentication or authorization.
 * Database Impact: No direct database access.
 * Sovereign Cycle: Perception -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 2.0.0
 */

namespace LeeWay.TransitHub.Api.Tenancy;

public sealed class TenantResolutionMiddleware
{
    public const string TenantIdHeader = "X-LeeWay-Tenant-Id";
    public const string TenantCodeHeader = "X-LeeWay-Tenant-Code";

    private readonly RequestDelegate _next;

    public TenantResolutionMiddleware(RequestDelegate next)
    {
        _next = next ?? throw new ArgumentNullException(nameof(next));
    }

    public async Task InvokeAsync(HttpContext context, HeaderTenantContext tenantContext)
    {
        string tenantIdText = context.Request.Headers[TenantIdHeader].FirstOrDefault() ?? string.Empty;
        string tenantCode = context.Request.Headers[TenantCodeHeader].FirstOrDefault() ?? string.Empty;

        if (string.IsNullOrWhiteSpace(tenantIdText) && string.IsNullOrWhiteSpace(tenantCode))
        {
            await _next(context);
            return;
        }

        if (string.IsNullOrWhiteSpace(tenantIdText) || string.IsNullOrWhiteSpace(tenantCode))
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(new
            {
                error = "Both tenant headers are required when tenant context is supplied.",
                requiredHeaders = new[] { TenantIdHeader, TenantCodeHeader }
            });
            return;
        }

        if (!Guid.TryParse(tenantIdText, out Guid tenantId) || tenantId == Guid.Empty)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(new { error = $"{TenantIdHeader} must be a non-empty GUID." });
            return;
        }

        tenantContext.Resolve(tenantId, tenantCode);
        await _next(context);
    }
}
