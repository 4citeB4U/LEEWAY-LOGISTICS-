/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: SignalROperationsNotifier.cs
 * Path: src/LeeWay.TransitHub.Api/Realtime/SignalROperationsNotifier.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / Realtime Adapter
 * Purpose: Publish accepted operations events to only the matching tenant SignalR group.
 * Inputs: Persisted operations event.
 * Outputs: operationsEventPublished client message.
 * Mutation Scope: Realtime message delivery only.
 * Dependencies: IHubContext, OperationsHub, TenantOperationsGroup, and IOperationsNotifier.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Derives group exclusively from event TenantId and never broadcasts globally.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Api.Hubs;
using LeeWay.TransitHub.Application.Abstractions;
using LeeWay.TransitHub.Domain.Operations;
using Microsoft.AspNetCore.SignalR;

namespace LeeWay.TransitHub.Api.Realtime;

public sealed class SignalROperationsNotifier(IHubContext<OperationsHub> hubContext) : IOperationsNotifier
{
    public Task PublishAsync(OperationsEvent operationsEvent, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(operationsEvent);
        return hubContext.Clients
            .Group(TenantOperationsGroup.For(operationsEvent.TenantId))
            .SendAsync("operationsEventPublished", new
            {
                operationsEvent.Id,
                operationsEvent.Type,
                operationsEvent.Severity,
                operationsEvent.Subject,
                operationsEvent.PayloadJson,
                operationsEvent.CreatedBySubject,
                operationsEvent.OccurredUtc
            }, cancellationToken);
    }
}
