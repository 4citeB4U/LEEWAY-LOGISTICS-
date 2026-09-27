/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TransitHubProductProfileService.cs
 * Path: src/LeeWay.TransitHub.Application/Product/TransitHubProductProfileService.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Product Service
 * Purpose: Provide the deterministic product constitution to APIs, UI, training, and Agent Lee.
 * Inputs: No request data.
 * Outputs: Versioned product profile.
 * Mutation Scope: None.
 * Dependencies: TransitHubProductProfile.
 * Tests: ProductProfileTests and runtime endpoint checks.
 * Security Impact: Prevents misleading claims about embedded AI, production identity, completed training, or isolation.
 * Database Impact: No direct database access.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 4.0.0
 */

namespace LeeWay.TransitHub.Application.Product;

public sealed class TransitHubProductProfileService
{
    public TransitHubProductProfile GetProfile()
        => new(
            ProductName: "LeeWay Enterprise Transit Hub",
            ProductId: "leeway.enterprise-transit-hub",
            ProductMode: "INTERVIEW_DEFENSIBLE_AND_COMMERCIAL_B2B_SAAS",
            IsLeeWayProduct: true,
            AgentLeeEmbedded: false,
            AgentLeeIntegrationMode: "EXTERNAL_LEEWAY_ORCHESTRATOR",
            AgentLeeRole: "Assigned LeeWay employee, orchestrator, instructor, proctor, diagnostician, and approval-bound operator",
            CoreOperationsAvailableWithoutAgentLee: true,
            TrainingManualTargetPages: 300,
            TrainingManualStatus: "28_GOVERNED_CHAPTERS_DRAFT_IN_PROGRESS_NOT_FINAL_300_PAGE_RELEASE",
            CurrentManualChapterCount: 28,
            CurrentPrivateQuestionCount: 34,
            ContinuousLearningGateRequired: true,
            AuthenticationStatus: "DEVELOPMENT_EVIDENCE_SCHEME_ONLY_PRODUCTION_IDENTITY_UNBOUND",
            AuthorizationStatus: "ROLE_PERMISSION_POLICY_AND_TENANT_MATCH_FOUNDATION",
            TenantIsolationStatus: "REQUEST_AUTHORIZATION_FOUNDATION_ONLY_PERSISTENCE_ENFORCEMENT_DEFERRED",
            Purposes:
            [
                "Commercial transportation SaaS product",
                "Interview-defensible enterprise software portfolio",
                "Governed tool package for the LeeWay ecosystem"
            ],
            SupportedVerticals:
            [
                "Trucking and freight",
                "School transportation",
                "Passenger transit",
                "Shuttle and paratransit",
                "Delivery and service fleets"
            ],
            DeploymentProfiles:
            [
                "Shared SaaS",
                "Isolated data",
                "Dedicated enterprise"
            ]);
}
