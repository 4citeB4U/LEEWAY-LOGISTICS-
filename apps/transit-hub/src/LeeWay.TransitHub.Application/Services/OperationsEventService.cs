/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: OperationsEventService.cs
 * Path: src/LeeWay.TransitHub.Application/Services/OperationsEventService.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Service
 * Purpose: Coordinate tenant resolution, event validation, persistence, notification, and LeeWay receipt creation.
 * Inputs: Tenant context, schema-first event request, authenticated subject, repository, notifier, and receipt writer.
 * Outputs: Persisted operations event and tenant-scoped real-time notification.
 * Mutation Scope: Adds one immutable event and one receipt.
 * Dependencies: ITenantContext, IOperationsEventRepository, IOperationsNotifier, IReceiptWriter, and domain event.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Fails closed without resolved tenant context and never accepts tenant ID from the request body.
 * Database Impact: Repository implementation determines storage.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Application.Abstractions;
using LeeWay.TransitHub.Application.Models;
using LeeWay.TransitHub.Application.Tenancy;
using LeeWay.TransitHub.Domain.Operations;
using LeeWay.TransitHub.Governance.Receipts;
using LeeWay.TransitHub.Governance.Stages;

namespace LeeWay.TransitHub.Application.Services;

public sealed class OperationsEventService(
    IOperationsEventRepository repository,
    IOperationsNotifier notifier,
    IReceiptWriter receipts,
    ITenantContext tenantContext)
{
    public IReadOnlyCollection<OperationsEvent> GetRecent(int limit = 100)
    {
        RequireTenant();
        if (limit is < 1 or > 500) throw new ArgumentOutOfRangeException(nameof(limit), "Limit must be between 1 and 500.");
        return repository.GetRecent(limit);
    }

    public OperationsEvent? GetById(Guid id)
    {
        RequireTenant();
        if (id == Guid.Empty) throw new ArgumentException("Event ID cannot be empty.", nameof(id));
        return repository.GetById(id);
    }

    public async Task<OperationsEvent> PublishAsync(
        CreateOperationsEventRequest request,
        string createdBySubject,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(request);
        RequireTenant();
        OperationsEvent operationsEvent = new(
            tenantContext.TenantId,
            Guid.NewGuid(),
            request.Type,
            request.Severity,
            request.Subject,
            request.PayloadJson,
            createdBySubject,
            request.OccurredUtc ?? DateTimeOffset.UtcNow);
        repository.Add(operationsEvent);
        receipts.Write(ReceiptFactory.Pass(
            $"Publish operations event {operationsEvent.Id}",
            SovereignStage.Veritas,
            operationsEvent.TenantId.ToString()));
        await notifier.PublishAsync(operationsEvent, cancellationToken);
        return operationsEvent;
    }

    private void RequireTenant()
    {
        if (!tenantContext.IsResolved || tenantContext.TenantId == Guid.Empty)
        {
            throw new InvalidOperationException("A resolved tenant context is required for operations events.");
        }
    }
}
