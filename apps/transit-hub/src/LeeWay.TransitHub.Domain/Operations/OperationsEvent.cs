/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: OperationsEvent.cs
 * Path: src/LeeWay.TransitHub.Domain/Operations/OperationsEvent.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Operations
 * Purpose: Represent one immutable, tenant-owned transportation operations event with validated structured JSON payload.
 * Inputs: Tenant, event identity, controlled type and severity, subject, JSON payload, actor, and timestamp.
 * Outputs: Validated append-only operations event entity.
 * Mutation Scope: Construction only; events are immutable after creation.
 * Dependencies: System.Text.Json, ITenantOwned, and operations enums.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Requires explicit tenant ownership and rejects invalid payloads.
 * Database Impact: Mapped to operations.OperationsEvents in SQL Server.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using System.Text.Json;
using LeeWay.TransitHub.Domain.Tenancy;

namespace LeeWay.TransitHub.Domain.Operations;

public sealed class OperationsEvent : ITenantOwned
{
    public Guid TenantId { get; }
    public Guid Id { get; }
    public OperationsEventType Type { get; }
    public OperationsEventSeverity Severity { get; }
    public string Subject { get; }
    public string PayloadJson { get; }
    public string CreatedBySubject { get; }
    public DateTimeOffset OccurredUtc { get; }

    public OperationsEvent(
        Guid tenantId,
        Guid id,
        OperationsEventType type,
        OperationsEventSeverity severity,
        string subject,
        string payloadJson,
        string createdBySubject,
        DateTimeOffset occurredUtc)
    {
        if (tenantId == Guid.Empty) throw new ArgumentException("Tenant ID cannot be empty.", nameof(tenantId));
        if (id == Guid.Empty) throw new ArgumentException("Event ID cannot be empty.", nameof(id));
        if (!Enum.IsDefined(type)) throw new ArgumentOutOfRangeException(nameof(type));
        if (!Enum.IsDefined(severity)) throw new ArgumentOutOfRangeException(nameof(severity));
        TenantId = tenantId;
        Id = id;
        Type = type;
        Severity = severity;
        Subject = Require(subject, nameof(subject), 200);
        PayloadJson = RequireValidJson(payloadJson);
        CreatedBySubject = Require(createdBySubject, nameof(createdBySubject), 200);
        OccurredUtc = occurredUtc == default ? DateTimeOffset.UtcNow : occurredUtc.ToUniversalTime();
    }

    private static string Require(string value, string parameterName, int maximumLength)
    {
        if (string.IsNullOrWhiteSpace(value)) throw new ArgumentException("Value is required.", parameterName);
        string normalized = value.Trim();
        if (normalized.Length > maximumLength) throw new ArgumentOutOfRangeException(parameterName, $"Value cannot exceed {maximumLength} characters.");
        return normalized;
    }

    private static string RequireValidJson(string value)
    {
        if (string.IsNullOrWhiteSpace(value)) throw new ArgumentException("Payload JSON is required.", nameof(value));
        using JsonDocument document = JsonDocument.Parse(value);
        return document.RootElement.GetRawText();
    }
}
