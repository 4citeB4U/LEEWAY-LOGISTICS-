/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: Tenant.cs
 * Path: src/LeeWay.TransitHub.Domain/Tenancy/Tenant.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Tenancy Entity
 * Purpose: Represent a SaaS customer and protect tenant lifecycle rules.
 * Inputs: Tenant identity, code, name, and deployment profile.
 * Outputs: Valid tenant state or validation exception.
 * Mutation Scope: Tenant name, deployment profile, status, and suspension reason through methods.
 * Dependencies: Tenant enums.
 * Tests: TenantTests and security tests.
 * Security Impact: Rejects unsafe identifiers and invalid lifecycle changes.
 * Database Impact: Maps to future tenant control-plane persistence.
 * Sovereign Cycle: Origin -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 2.0.0
 */

namespace LeeWay.TransitHub.Domain.Tenancy;

public sealed class Tenant
{
    public Tenant(Guid id, string code, string name, SaaSDeploymentProfile deploymentProfile)
    {
        if (id == Guid.Empty) throw new ArgumentException("Tenant ID cannot be empty.", nameof(id));

        Id = id;
        Code = NormalizeCode(code);
        Name = Require(name, nameof(name));
        DeploymentProfile = deploymentProfile;
        Status = TenantStatus.Provisioning;
        CreatedUtc = DateTimeOffset.UtcNow;
    }

    public Guid Id { get; }
    public string Code { get; private set; }
    public string Name { get; private set; }
    public SaaSDeploymentProfile DeploymentProfile { get; private set; }
    public TenantStatus Status { get; private set; }
    public string? SuspensionReason { get; private set; }
    public DateTimeOffset CreatedUtc { get; }

    public void Activate()
    {
        if (Status == TenantStatus.Closed) throw new InvalidOperationException("A closed tenant cannot be activated.");
        Status = TenantStatus.Active;
        SuspensionReason = null;
    }

    public void Suspend(string reason)
    {
        if (Status == TenantStatus.Closed) throw new InvalidOperationException("A closed tenant cannot be suspended.");
        SuspensionReason = Require(reason, nameof(reason));
        Status = TenantStatus.Suspended;
    }

    public void Rename(string name) => Name = Require(name, nameof(name));

    public void ChangeDeploymentProfile(SaaSDeploymentProfile deploymentProfile)
        => DeploymentProfile = deploymentProfile;

    public void Close()
    {
        Status = TenantStatus.Closed;
        SuspensionReason = null;
    }

    private static string NormalizeCode(string value)
    {
        string normalized = Require(value, nameof(value)).ToUpperInvariant();
        if (normalized.Length > 40) throw new ArgumentOutOfRangeException(nameof(value), "Tenant code cannot exceed 40 characters.");

        foreach (char character in normalized)
        {
            if (!char.IsLetterOrDigit(character) && character != '-' && character != '_')
            {
                throw new ArgumentException("Tenant code may contain only letters, digits, hyphens, and underscores.", nameof(value));
            }
        }

        return normalized;
    }

    private static string Require(string value, string parameterName)
    {
        if (string.IsNullOrWhiteSpace(value)) throw new ArgumentException("A non-empty value is required.", parameterName);
        return value.Trim();
    }
}
