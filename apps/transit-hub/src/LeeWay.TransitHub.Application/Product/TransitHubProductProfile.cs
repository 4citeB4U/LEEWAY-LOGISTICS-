/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TransitHubProductProfile.cs
 * Path: src/LeeWay.TransitHub.Application/Product/TransitHubProductProfile.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Product Model
 * Purpose: Describe commercial, training, tenancy, identity, authorization, continuous-learning, and LeeWay product truth.
 * Inputs: Deterministic product metadata.
 * Outputs: Immutable product profile.
 * Mutation Scope: None.
 * Dependencies: No external dependencies.
 * Tests: ProductProfileTests and runtime endpoint checks.
 * Security Impact: Discloses current security and isolation status without unsupported production claims.
 * Database Impact: Discloses persistence status without mutating data.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 4.0.0
 */

namespace LeeWay.TransitHub.Application.Product;

public sealed record TransitHubProductProfile(
    string ProductName,
    string ProductId,
    string ProductMode,
    bool IsLeeWayProduct,
    bool AgentLeeEmbedded,
    string AgentLeeIntegrationMode,
    string AgentLeeRole,
    bool CoreOperationsAvailableWithoutAgentLee,
    int TrainingManualTargetPages,
    string TrainingManualStatus,
    int CurrentManualChapterCount,
    int CurrentPrivateQuestionCount,
    bool ContinuousLearningGateRequired,
    string AuthenticationStatus,
    string AuthorizationStatus,
    string TenantIsolationStatus,
    IReadOnlyCollection<string> Purposes,
    IReadOnlyCollection<string> SupportedVerticals,
    IReadOnlyCollection<string> DeploymentProfiles);
