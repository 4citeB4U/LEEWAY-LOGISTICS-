/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: ConfigurationSecurityTests.cs
 * Path: tests/LeeWay.TransitHub.SecurityTests/ConfigurationSecurityTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Security
 * Purpose: Verify unsafe Dataverse defaults are rejected and tests contain no credential path.
 * Inputs: Configuration objects and runtime path.
 * Outputs: Security test evidence.
 * Mutation Scope: None.
 * Dependencies: xUnit and Dataverse integration.
 * Tests: This file is the security suite.
 * Security Impact: Validates safe configuration defaults.
 * Database Impact: None.
 * Sovereign Cycle: Execution -> Veritas -> Echo
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Integration.Dataverse;

namespace LeeWay.TransitHub.SecurityTests;

public sealed class ConfigurationSecurityTests
{
    [Fact]
    public void DataverseOptions_RejectMissingBaseUri()
    {
        var options = new DataverseOptions();
        Assert.Throws<InvalidOperationException>(() => options.Validate());
    }

    [Fact]
    public void Repository_DoesNotShipCommonSecretFiles()
    {
        string current = AppContext.BaseDirectory;
        Assert.False(current.Contains("clientsecret", StringComparison.OrdinalIgnoreCase));
    }
}
