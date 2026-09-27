/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: OperationsEventSeverity.cs
 * Path: src/LeeWay.TransitHub.Domain/Operations/OperationsEventSeverity.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Operations
 * Purpose: Define the controlled severity vocabulary for operations events.
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

public enum OperationsEventSeverity
{
    Information = 1,
    Advisory = 2,
    Warning = 3,
    Critical = 4
}
