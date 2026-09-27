/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: ReceiptFactory.cs
 * Path: src/LeeWay.TransitHub.Governance/Receipts/ReceiptFactory.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Governance / Receipt Factory
 * Purpose: Create validated PASS receipts with factual evidence references.
 * Inputs: Operation, stage, and evidence.
 * Outputs: LeeWayExecutionReceipt.
 * Mutation Scope: Creates an immutable in-memory receipt.
 * Dependencies: LeeWayExecutionReceipt and SovereignStage.
 * Tests: Integration tests.
 * Security Impact: Rejects empty operation names and stores no secrets by design.
 * Database Impact: No direct database access.
 * Sovereign Cycle: Veritas -> Echo -> Synthesis
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Governance.Stages;

namespace LeeWay.TransitHub.Governance.Receipts;

public static class ReceiptFactory
{
    public static LeeWayExecutionReceipt Pass(string operation, SovereignStage stage, params string[] evidence)
    {
        if (string.IsNullOrWhiteSpace(operation)) throw new ArgumentException("Operation is required.", nameof(operation));
        return new LeeWayExecutionReceipt(Guid.NewGuid(), operation.Trim(), stage, true, evidence, DateTimeOffset.UtcNow);
    }
}
