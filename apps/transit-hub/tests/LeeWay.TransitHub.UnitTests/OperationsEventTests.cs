/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: OperationsEventTests.cs
 * Path: tests/LeeWay.TransitHub.UnitTests/OperationsEventTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Unit
 * Purpose: Verify operations event invariants and secret redaction behavior.
 * Inputs: Governed request data and existing application contracts.
 * Outputs: Deterministic application behavior and evidence.
 * Mutation Scope: Owned project state only.
 * Dependencies: .NET 10 and LeeWay governed contracts.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Tenant and least-privilege boundaries apply.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Application.Security;
using LeeWay.TransitHub.Domain.Operations;

namespace LeeWay.TransitHub.UnitTests;

public sealed class OperationsEventTests
{
    [Fact]
    public void Constructor_AcceptsValidTenantOwnedJsonEvent()
    {
        OperationsEvent item = Create();
        Assert.NotEqual(Guid.Empty, item.TenantId);
        Assert.Equal("Vehicle delayed", item.Subject);
        Assert.Equal("{\"route\":\"R1\"}", item.PayloadJson);
    }

    [Fact]
    public void Constructor_RejectsEmptyTenant() =>
        Assert.Throws<ArgumentException>(() => new OperationsEvent(Guid.Empty, Guid.NewGuid(), OperationsEventType.Dispatch, OperationsEventSeverity.Warning, "x", "{}", "actor", DateTimeOffset.UtcNow));

    [Fact]
    public void Constructor_RejectsInvalidJson() =>
        Assert.ThrowsAny<Exception>(() => new OperationsEvent(Guid.NewGuid(), Guid.NewGuid(), OperationsEventType.Dispatch, OperationsEventSeverity.Warning, "x", "not-json", "actor", DateTimeOffset.UtcNow));

    [Fact]
    public void SecretRedactor_RemovesAllKnownValues()
    {
        string redacted = SecretRedactor.Redact("Password=alpha and token beta", new[] { "alpha", "beta" });
        Assert.DoesNotContain("alpha", redacted, StringComparison.Ordinal);
        Assert.DoesNotContain("beta", redacted, StringComparison.Ordinal);
        Assert.Equal(2, redacted.Split(SecretRedactor.Marker, StringSplitOptions.None).Length - 1);
    }

    private static OperationsEvent Create() => new(
        Guid.NewGuid(), Guid.NewGuid(), OperationsEventType.Dispatch, OperationsEventSeverity.Advisory,
        "Vehicle delayed", "{\"route\":\"R1\"}", "unit-test", DateTimeOffset.UtcNow);
}
