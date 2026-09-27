/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: LeeWayExecutionReceipt.cs
 * Path: src/LeeWay.TransitHub.Governance/Receipts/LeeWayExecutionReceipt.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Governance / Receipt
 * Purpose: Represent immutable factual execution evidence.
 * Inputs: Operation, stage, result, evidence, and timestamp.
 * Outputs: LeeWayExecutionReceipt.
 * Mutation Scope: Immutable after construction.
 * Dependencies: SovereignStage.
 * Tests: Application and integration tests.
 * Security Impact: Evidence must exclude secrets.
 * Database Impact: Maps to future audit receipt storage.
 * Sovereign Cycle: Veritas -> Echo -> Synthesis
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Governance.Stages;

namespace LeeWay.TransitHub.Governance.Receipts;

public sealed record LeeWayExecutionReceipt(
    Guid ReceiptId,
    string Operation,
    SovereignStage Stage,
    bool Passed,
    IReadOnlyCollection<string> Evidence,
    DateTimeOffset RecordedUtc);
