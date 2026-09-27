/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: CreateOperationsEventRequest.cs
 * Path: src/LeeWay.TransitHub.Application/Models/CreateOperationsEventRequest.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Model
 * Purpose: Carry schema-first input for publishing an operations event.
 * Inputs: Governed request data and existing application contracts.
 * Outputs: Deterministic application behavior and evidence.
 * Mutation Scope: Owned project state only.
 * Dependencies: .NET 10 and LeeWay governed contracts.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Tenant and least-privilege boundaries apply.
 * Database Impact: No direct database access.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Domain.Operations;

namespace LeeWay.TransitHub.Application.Models;

public sealed record CreateOperationsEventRequest(
    OperationsEventType Type,
    OperationsEventSeverity Severity,
    string Subject,
    string PayloadJson,
    DateTimeOffset? OccurredUtc = null);
