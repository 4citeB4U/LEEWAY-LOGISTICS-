/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: IOperationsEventRepository.cs
 * Path: src/LeeWay.TransitHub.Application/Abstractions/IOperationsEventRepository.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Abstraction
 * Purpose: Define tenant-scoped append and query operations for the real-time event stream.
 * Inputs: Governed request data and existing application contracts.
 * Outputs: Repository contract independent of in-memory or SQL Server storage.
 * Mutation Scope: Owned project state only.
 * Dependencies: .NET 10 and LeeWay governed contracts.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Tenant and least-privilege boundaries apply.
 * Database Impact: Implemented by in-memory and SQL Server adapters.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Domain.Operations;

namespace LeeWay.TransitHub.Application.Abstractions;

public interface IOperationsEventRepository
{
    IReadOnlyCollection<OperationsEvent> GetRecent(int limit);
    OperationsEvent? GetById(Guid id);
    void Add(OperationsEvent operationsEvent);
}
