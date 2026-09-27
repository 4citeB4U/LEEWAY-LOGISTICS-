/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: DevelopmentHeaderAuthenticationHandler.cs
 * Path: src/LeeWay.TransitHub.Api/Security/DevelopmentHeaderAuthenticationHandler.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Development Authentication
 * Purpose: Create deterministic development-only identities from explicit headers so authorization policies can be proven before a production identity provider is selected.
 * Inputs: Development environment and LeeWay identity headers.
 * Outputs: Authentication ticket, no result, or deterministic authentication failure.
 * Mutation Scope: Current request identity only.
 * Dependencies: ASP.NET Core authentication, TransitRoles, TransitClaimTypes, and IWebHostEnvironment.
 * Tests: Runtime 401, 403, role, capability, and tenant-match checks.
 * Security Impact: Disabled outside Development; rejects missing, invalid, or unknown identity values; never represents production authentication.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 4.0.0
 */

using System.Security.Claims;
using System.Text.Encodings.Web;
using LeeWay.TransitHub.Application.Security;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace LeeWay.TransitHub.Api.Security;

public sealed class DevelopmentHeaderAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public const string SchemeName = "LeeWayDevelopmentHeaders";
    public const string UserIdHeader = "X-LeeWay-User-Id";
    public const string UserNameHeader = "X-LeeWay-User-Name";
    public const string RolesHeader = "X-LeeWay-Roles";
    public const string IdentityTenantIdHeader = "X-LeeWay-Identity-Tenant-Id";
    public const string IdentityTenantCodeHeader = "X-LeeWay-Identity-Tenant-Code";
    public const string CapabilitiesHeader = "X-LeeWay-Capabilities";

    private readonly IWebHostEnvironment _environment;

    public DevelopmentHeaderAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        IWebHostEnvironment environment)
        : base(options, logger, encoder)
    {
        _environment = environment ?? throw new ArgumentNullException(nameof(environment));
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!_environment.IsDevelopment())
        {
            return Task.FromResult(AuthenticateResult.NoResult());
        }

        string userIdText = Header(UserIdHeader);
        string userName = Header(UserNameHeader);
        string rolesText = Header(RolesHeader);
        string tenantIdText = Header(IdentityTenantIdHeader);
        string tenantCode = Header(IdentityTenantCodeHeader);
        string capabilitiesText = Header(CapabilitiesHeader);

        bool anyIdentityHeader =
            !string.IsNullOrWhiteSpace(userIdText) ||
            !string.IsNullOrWhiteSpace(userName) ||
            !string.IsNullOrWhiteSpace(rolesText) ||
            !string.IsNullOrWhiteSpace(tenantIdText) ||
            !string.IsNullOrWhiteSpace(tenantCode) ||
            !string.IsNullOrWhiteSpace(capabilitiesText);

        if (!anyIdentityHeader)
        {
            return Task.FromResult(AuthenticateResult.NoResult());
        }

        if (string.IsNullOrWhiteSpace(userIdText) ||
            string.IsNullOrWhiteSpace(userName) ||
            string.IsNullOrWhiteSpace(rolesText) ||
            string.IsNullOrWhiteSpace(tenantIdText) ||
            string.IsNullOrWhiteSpace(tenantCode))
        {
            return Task.FromResult(AuthenticateResult.Fail(
                "Development identity requires user ID, user name, roles, identity tenant ID, and identity tenant code headers."));
        }

        if (!Guid.TryParse(userIdText, out Guid userId) || userId == Guid.Empty)
        {
            return Task.FromResult(AuthenticateResult.Fail($"{UserIdHeader} must be a non-empty GUID."));
        }

        if (!Guid.TryParse(tenantIdText, out Guid tenantId) || tenantId == Guid.Empty)
        {
            return Task.FromResult(AuthenticateResult.Fail($"{IdentityTenantIdHeader} must be a non-empty GUID."));
        }

        string[] suppliedRoles = rolesText.Split(',', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries);
        if (suppliedRoles.Length == 0)
        {
            return Task.FromResult(AuthenticateResult.Fail("At least one role is required."));
        }

        List<string> roles = [];
        try
        {
            roles.AddRange(suppliedRoles.Select(TransitRoles.Normalize).Distinct(StringComparer.OrdinalIgnoreCase));
        }
        catch (ArgumentException exception)
        {
            return Task.FromResult(AuthenticateResult.Fail(exception.Message));
        }

        List<Claim> claims =
        [
            new(ClaimTypes.NameIdentifier, userId.ToString()),
            new(ClaimTypes.Name, userName.Trim()),
            new(TransitClaimTypes.TenantId, tenantId.ToString()),
            new(TransitClaimTypes.TenantCode, tenantCode.Trim().ToUpperInvariant())
        ];

        foreach (string role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
            foreach (string permission in TransitPermissions.GetForRole(role))
            {
                claims.Add(new Claim(TransitClaimTypes.Permission, permission));
            }
        }

        foreach (string capability in capabilitiesText.Split(',', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries))
        {
            claims.Add(new Claim(TransitClaimTypes.Capability, capability));
        }

        ClaimsIdentity identity = new(claims, SchemeName, ClaimTypes.Name, ClaimTypes.Role);
        AuthenticationTicket ticket = new(new ClaimsPrincipal(identity), SchemeName);
        return Task.FromResult(AuthenticateResult.Success(ticket));
    }

    private string Header(string name) => Request.Headers[name].FirstOrDefault() ?? string.Empty;
}
