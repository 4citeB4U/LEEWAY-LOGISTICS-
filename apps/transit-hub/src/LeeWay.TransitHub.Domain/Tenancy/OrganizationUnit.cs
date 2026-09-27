/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: OrganizationUnit.cs
 * Path: src/LeeWay.TransitHub.Domain/Tenancy/OrganizationUnit.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Tenancy Entity
 * Purpose: Represent a tenant-owned organizational hierarchy unit.
 * Inputs: Organization identity, tenant, parent, code, name, and type.
 * Outputs: Valid organization-unit state or validation exception.
 * Mutation Scope: Name and active state through methods.
 * Dependencies: ITenantOwned and OrganizationUnitType.
 * Tests: TenantTests and security tests.
 * Security Impact: Requires tenant ownership and rejects self-parenting.
 * Database Impact: Maps to future organization-unit persistence.
 * Sovereign Cycle: Origin -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 2.0.0
 */

namespace LeeWay.TransitHub.Domain.Tenancy;

public sealed class OrganizationUnit : ITenantOwned
{
    public OrganizationUnit(
        Guid id,
        Guid tenantId,
        Guid? parentUnitId,
        string code,
        string name,
        OrganizationUnitType unitType)
    {
        if (id == Guid.Empty) throw new ArgumentException("Organization-unit ID cannot be empty.", nameof(id));
        if (tenantId == Guid.Empty) throw new ArgumentException("Tenant ID cannot be empty.", nameof(tenantId));
        if (parentUnitId == id) throw new ArgumentException("An organization unit cannot be its own parent.", nameof(parentUnitId));

        Id = id;
        TenantId = tenantId;
        ParentUnitId = parentUnitId;
        Code = Require(code, nameof(code)).ToUpperInvariant();
        Name = Require(name, nameof(name));
        UnitType = unitType;
        IsActive = true;
        CreatedUtc = DateTimeOffset.UtcNow;
    }

    public Guid Id { get; }
    public Guid TenantId { get; }
    public Guid? ParentUnitId { get; }
    public string Code { get; }
    public string Name { get; private set; }
    public OrganizationUnitType UnitType { get; }
    public bool IsActive { get; private set; }
    public DateTimeOffset CreatedUtc { get; }

    public void Rename(string name) => Name = Require(name, nameof(name));
    public void Deactivate() => IsActive = false;
    public void Activate() => IsActive = true;

    private static string Require(string value, string parameterName)
    {
        if (string.IsNullOrWhiteSpace(value)) throw new ArgumentException("A non-empty value is required.", parameterName);
        return value.Trim();
    }
}
