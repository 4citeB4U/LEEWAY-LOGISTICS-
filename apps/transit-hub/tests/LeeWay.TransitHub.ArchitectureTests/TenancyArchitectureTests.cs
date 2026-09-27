/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TenancyArchitectureTests.cs
 * Path: tests/LeeWay.TransitHub.ArchitectureTests/TenancyArchitectureTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Architecture
 * Purpose: Prove Domain tenancy remains independent from API, infrastructure, and agent runtime assemblies.
 * Inputs: Compiled Domain assembly references.
 * Outputs: Architecture pass or dependency failure.
 * Mutation Scope: None.
 * Dependencies: xUnit and Domain.
 * Tests: This file is part of the architecture suite.
 * Security Impact: Prevents embedded agent or outward infrastructure coupling.
 * Database Impact: Prevents direct database dependencies in Domain.
 * Sovereign Cycle: Execution -> Veritas -> Echo
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 2.0.0
 */

using System.Reflection;
using LeeWay.TransitHub.Domain.Tenancy;

namespace LeeWay.TransitHub.ArchitectureTests;

public sealed class TenancyArchitectureTests
{
    [Fact]
    public void DomainTenancy_DoesNotReferenceApiInfrastructureOrAgentRuntime()
    {
        Assembly domain = typeof(Tenant).Assembly;
        string[] references = domain.GetReferencedAssemblies().Select(reference => reference.Name ?? string.Empty).ToArray();

        Assert.DoesNotContain(references, name => name.Contains("Api", StringComparison.Ordinal));
        Assert.DoesNotContain(references, name => name.Contains("Infrastructure", StringComparison.Ordinal));
        Assert.DoesNotContain(references, name => name.Contains("Agent", StringComparison.Ordinal));
    }
}
