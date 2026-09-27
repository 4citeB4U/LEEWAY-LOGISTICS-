/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: OperationsEventRecord.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/Persistence/OperationsEventRecord.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / SQL Persistence Record
 * Purpose: Represent the EF Core storage shape for tenant-owned operations events.
 * Inputs: Governed request data and existing application contracts.
 * Outputs: Deterministic application behavior and evidence.
 * Mutation Scope: Owned project state only.
 * Dependencies: .NET 10 and LeeWay governed contracts.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Tenant and least-privilege boundaries apply.
 * Database Impact: Maps to operations.OperationsEvents and includes SQL Server rowversion metadata.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Domain.Operations;

namespace LeeWay.TransitHub.Infrastructure.SqlServer.Persistence;

public sealed class OperationsEventRecord
{
    public Guid TenantId { get; set; }
    public Guid Id { get; set; }
    public OperationsEventType Type { get; set; }
    public OperationsEventSeverity Severity { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string PayloadJson { get; set; } = string.Empty;
    public string CreatedBySubject { get; set; } = string.Empty;
    public DateTimeOffset OccurredUtc { get; set; }
    public byte[] RowVersion { get; set; } = [];
}
