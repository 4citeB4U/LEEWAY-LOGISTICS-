/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: OperationsEventType.cs
 * Path: src/LeeWay.TransitHub.Domain/Operations/OperationsEventType.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Operations
 * Purpose: Define the controlled vocabulary for real-time transportation operations events.
 * Inputs: Governed request data and existing application contracts.
 * Outputs: Deterministic application behavior and evidence.
 * Mutation Scope: Owned project state only.
 * Dependencies: .NET 10 and LeeWay governed contracts.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Tenant and least-privilege boundaries apply.
 * Database Impact: Persisted as an integer by SQL Server infrastructure.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

namespace LeeWay.TransitHub.Domain.Operations;

public enum OperationsEventType
{
    Vehicle = 1,
    WorkOrder = 2,
    Dispatch = 3,
    Safety = 4,
    ServiceAlert = 5,
    System = 6,
    AgentLee = 7
}
