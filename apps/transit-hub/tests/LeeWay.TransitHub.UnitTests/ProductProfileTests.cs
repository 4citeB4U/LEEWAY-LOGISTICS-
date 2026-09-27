/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: ProductProfileTests.cs
 * Path: tests/LeeWay.TransitHub.UnitTests/ProductProfileTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Unit
 * Purpose: Prove commercial, training, and Agent Lee product identity remains accurate.
 * Inputs: Product profile service.
 * Outputs: Pass or product-contract failure.
 * Mutation Scope: None.
 * Dependencies: xUnit and Application product profile.
 * Tests: This file is part of the unit suite.
 * Security Impact: Prevents misleading embedded-agent and isolation claims.
 * Database Impact: No database access.
 * Sovereign Cycle: Execution -> Veritas -> Echo
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 4.0.0
 */

using LeeWay.TransitHub.Application.Product;

namespace LeeWay.TransitHub.UnitTests;

public sealed class ProductProfileTests
{
    [Fact]
    public void Profile_DeclaresCommercialTrainingAndLeeWayPurpose()
    {
        TransitHubProductProfile profile = new TransitHubProductProfileService().GetProfile();

        Assert.True(profile.IsLeeWayProduct);
        Assert.False(profile.AgentLeeEmbedded);
        Assert.Equal("EXTERNAL_LEEWAY_ORCHESTRATOR", profile.AgentLeeIntegrationMode);
        Assert.True(profile.CoreOperationsAvailableWithoutAgentLee);
        Assert.Equal(300, profile.TrainingManualTargetPages);
        Assert.Equal(28, profile.CurrentManualChapterCount);
        Assert.Equal(34, profile.CurrentPrivateQuestionCount);
        Assert.True(profile.ContinuousLearningGateRequired);
        Assert.Contains("PRODUCTION_IDENTITY_UNBOUND", profile.AuthenticationStatus);
        Assert.Equal(3, profile.Purposes.Count);
        Assert.Contains("Trucking and freight", profile.SupportedVerticals);
    }
}
