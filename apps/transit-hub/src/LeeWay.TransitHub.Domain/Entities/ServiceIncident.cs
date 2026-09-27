/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: ServiceIncident.cs
 * Path: src/LeeWay.TransitHub.Domain/Entities/ServiceIncident.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Entity
 * Purpose: Represent an operational service incident.
 * Inputs: Route, summary, severity, and close command.
 * Outputs: Incident state.
 * Mutation Scope: Close timestamp only.
 * Dependencies: IncidentSeverity.
 * Tests: Integration and regression tests.
 * Security Impact: Rejects blank incident data.
 * Database Impact: Maps to ServiceIncident records.
 * Sovereign Cycle: Origin -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Domain.Enums;

namespace LeeWay.TransitHub.Domain.Entities;

public sealed class ServiceIncident
{
    public ServiceIncident(Guid id, string route, string summary, IncidentSeverity severity)
    {
        if (id == Guid.Empty) throw new ArgumentException("Incident ID cannot be empty.", nameof(id));
        Id = id;
        Route = Require(route, nameof(route));
        Summary = Require(summary, nameof(summary));
        Severity = severity;
        ReportedUtc = DateTimeOffset.UtcNow;
    }

    public Guid Id { get; }
    public string Route { get; }
    public string Summary { get; }
    public IncidentSeverity Severity { get; }
    public DateTimeOffset ReportedUtc { get; }
    public DateTimeOffset? ClosedUtc { get; private set; }
    public bool IsClosed => ClosedUtc.HasValue;

    public void Close() => ClosedUtc ??= DateTimeOffset.UtcNow;

    private static string Require(string value, string parameterName)
    {
        if (string.IsNullOrWhiteSpace(value)) throw new ArgumentException("A non-empty value is required.", parameterName);
        return value.Trim();
    }
}
