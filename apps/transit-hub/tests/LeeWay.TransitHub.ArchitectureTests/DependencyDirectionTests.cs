/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: DependencyDirectionTests.cs
 * Path: tests/LeeWay.TransitHub.ArchitectureTests/DependencyDirectionTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Architecture
 * Purpose: Prove the Domain project does not depend outward.
 * Inputs: Compiled Domain assembly references.
 * Outputs: Architecture pass or failure.
 * Mutation Scope: None.
 * Dependencies: xUnit and Domain.
 * Tests: This file is the architecture suite.
 * Security Impact: Supports boundary integrity.
 * Database Impact: Prevents direct database dependencies in Domain.
 * Sovereign Cycle: Execution -> Veritas -> Echo
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using System.Reflection;
using LeeWay.TransitHub.Domain.Entities;

namespace LeeWay.TransitHub.ArchitectureTests;

public sealed class DependencyDirectionTests
{
    [Fact]
    public void Domain_DoesNotReferenceApplicationOrInfrastructure()
    {
        Assembly domain = typeof(Vehicle).Assembly;
        string[] references = domain.GetReferencedAssemblies().Select(x => x.Name ?? string.Empty).ToArray();
        Assert.DoesNotContain(references, x => x.Contains("Application", StringComparison.Ordinal));
        Assert.DoesNotContain(references, x => x.Contains("Infrastructure", StringComparison.Ordinal));
        Assert.DoesNotContain(references, x => x.Contains("Api", StringComparison.Ordinal));
    }
}
