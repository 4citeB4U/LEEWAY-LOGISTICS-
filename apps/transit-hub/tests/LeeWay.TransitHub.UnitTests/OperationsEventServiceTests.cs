/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: OperationsEventServiceTests.cs
 * Path: tests/LeeWay.TransitHub.UnitTests/OperationsEventServiceTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Unit
 * Purpose: Verify service tenant enforcement, persistence, notification, and limit validation.
 * Inputs: Governed request data and existing application contracts.
 * Outputs: Deterministic application behavior and evidence.
 * Mutation Scope: Owned project state only.
 * Dependencies: .NET 10 and LeeWay governed contracts.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Tenant and least-privilege boundaries apply.
 * Database Impact: Uses in-process fakes only.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Application.Abstractions;
using LeeWay.TransitHub.Application.Models;
using LeeWay.TransitHub.Application.Services;
using LeeWay.TransitHub.Application.Tenancy;
using LeeWay.TransitHub.Domain.Operations;
using LeeWay.TransitHub.Governance.Receipts;

namespace LeeWay.TransitHub.UnitTests;

public sealed class OperationsEventServiceTests
{
    [Fact]
    public async Task Publish_PersistsAndNotifiesMatchingTenant()
    {
        Guid tenant = Guid.NewGuid();
        FakeRepository repository = new();
        FakeNotifier notifier = new();
        OperationsEventService service = new(repository, notifier, new FakeReceiptWriter(), new FixedTenantContext(tenant));
        OperationsEvent item = await service.PublishAsync(new(OperationsEventType.Dispatch, OperationsEventSeverity.Warning, "Delay", "{\"minutes\":5}"), "subject");
        Assert.Equal(tenant, item.TenantId);
        Assert.Same(item, repository.Item);
        Assert.Same(item, notifier.Item);
    }

    [Fact]
    public async Task Publish_RejectsUnresolvedTenant()
    {
        OperationsEventService service = new(new FakeRepository(), new FakeNotifier(), new FakeReceiptWriter(), new FixedTenantContext(Guid.Empty, false));
        await Assert.ThrowsAsync<InvalidOperationException>(() => service.PublishAsync(new(OperationsEventType.System, OperationsEventSeverity.Information, "x", "{}"), "subject"));
    }

    [Fact]
    public void GetRecent_RejectsUnboundedLimit()
    {
        OperationsEventService service = new(new FakeRepository(), new FakeNotifier(), new FakeReceiptWriter(), new FixedTenantContext(Guid.NewGuid()));
        Assert.Throws<ArgumentOutOfRangeException>(() => service.GetRecent(501));
    }

    private sealed class FixedTenantContext(Guid id, bool resolved = true) : ITenantContext
    {
        public bool IsResolved { get; } = resolved;
        public Guid TenantId { get; } = id;
        public string TenantCode => "TEST";
        public TenantContextSnapshot Snapshot() => new(IsResolved, TenantId, TenantCode);
    }
    private sealed class FakeRepository : IOperationsEventRepository
    {
        public OperationsEvent? Item { get; private set; }
        public void Add(OperationsEvent operationsEvent) => Item = operationsEvent;
        public OperationsEvent? GetById(Guid id) => Item?.Id == id ? Item : null;
        public IReadOnlyCollection<OperationsEvent> GetRecent(int limit) => Item is null ? [] : [Item];
    }
    private sealed class FakeNotifier : IOperationsNotifier
    {
        public OperationsEvent? Item { get; private set; }
        public Task PublishAsync(OperationsEvent operationsEvent, CancellationToken cancellationToken = default) { Item = operationsEvent; return Task.CompletedTask; }
    }
    private sealed class FakeReceiptWriter : IReceiptWriter
    {
        public void Write(LeeWayExecutionReceipt receipt) { }
        public IReadOnlyCollection<LeeWayExecutionReceipt> GetAll() => [];
    }
}
