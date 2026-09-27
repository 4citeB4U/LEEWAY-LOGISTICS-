/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: IOperationsNotifier.cs
 * Path: src/LeeWay.TransitHub.Application/Abstractions/IOperationsNotifier.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Abstraction
 * Purpose: Define the outbound notification port used after an operations event is durably accepted.
 * Inputs: Governed request data and existing application contracts.
 * Outputs: Transport-neutral asynchronous notification contract.
 * Mutation Scope: Owned project state only.
 * Dependencies: .NET 10 and LeeWay governed contracts.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Tenant and least-privilege boundaries apply.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Domain.Operations;

namespace LeeWay.TransitHub.Application.Abstractions;

public interface IOperationsNotifier
{
    Task PublishAsync(OperationsEvent operationsEvent, CancellationToken cancellationToken = default);
}
