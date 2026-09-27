/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: CustomerCase.cs
 * Path: src/LeeWay.TransitHub.Domain/Entities/CustomerCase.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Domain / Entity
 * Purpose: Represent a customer-service case that may synchronize with Dataverse.
 * Inputs: Reference number, subject, channel, and lifecycle commands.
 * Outputs: CustomerCase state.
 * Mutation Scope: Case status through methods only.
 * Dependencies: CaseStatus.
 * Tests: Service and integration tests.
 * Security Impact: Contains fictional training data only.
 * Database Impact: Maps to local case records and Dataverse mappings.
 * Sovereign Cycle: Origin -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Domain.Enums;

namespace LeeWay.TransitHub.Domain.Entities;

public sealed class CustomerCase
{
    public CustomerCase(Guid id, string referenceNumber, string subject, string channel)
    {
        if (id == Guid.Empty) throw new ArgumentException("Case ID cannot be empty.", nameof(id));
        Id = id;
        ReferenceNumber = Require(referenceNumber, nameof(referenceNumber));
        Subject = Require(subject, nameof(subject));
        Channel = Require(channel, nameof(channel));
        Status = CaseStatus.New;
        CreatedUtc = DateTimeOffset.UtcNow;
    }

    public Guid Id { get; }
    public string ReferenceNumber { get; }
    public string Subject { get; }
    public string Channel { get; }
    public CaseStatus Status { get; private set; }
    public DateTimeOffset CreatedUtc { get; }

    public void BeginInvestigation() => Status = CaseStatus.Investigating;
    public void Resolve() => Status = CaseStatus.Resolved;
    public void Close() => Status = CaseStatus.Closed;

    private static string Require(string value, string parameterName)
    {
        if (string.IsNullOrWhiteSpace(value)) throw new ArgumentException("A non-empty value is required.", parameterName);
        return value.Trim();
    }
}
