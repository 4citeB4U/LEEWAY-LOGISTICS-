/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: InMemoryRepositories.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.InMemory/Repositories/InMemoryRepositories.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / In-Memory Repositories
 * Purpose: Implement every application repository contract using process-local collections.
 * Inputs: Domain entities and identifiers.
 * Outputs: Collections, records, and receipt storage.
 * Mutation Scope: InMemoryTransitStore only.
 * Dependencies: Application abstractions and InMemoryTransitStore.
 * Tests: Integration and regression tests.
 * Security Impact: Fictional data only.
 * Database Impact: No database connection.
 * Sovereign Cycle: Structure -> Execution -> Veritas -> Echo
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Application.Abstractions;
using LeeWay.TransitHub.Domain.Entities;
using LeeWay.TransitHub.Governance.Receipts;
using LeeWay.TransitHub.Domain.Operations;
using LeeWay.TransitHub.Application.Tenancy;
using LeeWay.TransitHub.Infrastructure.InMemory.Storage;

namespace LeeWay.TransitHub.Infrastructure.InMemory.Repositories;

public sealed class InMemoryVehicleRepository(InMemoryTransitStore store) : IVehicleRepository
{
    public IReadOnlyCollection<Vehicle> GetAll() { lock (store.SyncRoot) return store.Vehicles.Values.ToArray(); }
    public Vehicle? GetById(Guid id) { lock (store.SyncRoot) return store.Vehicles.GetValueOrDefault(id); }
    public void Add(Vehicle vehicle) { ArgumentNullException.ThrowIfNull(vehicle); lock (store.SyncRoot) { if (!store.Vehicles.TryAdd(vehicle.Id, vehicle)) throw new InvalidOperationException("Vehicle already exists."); } }
}

public sealed class InMemoryWorkOrderRepository(InMemoryTransitStore store) : IWorkOrderRepository
{
    public IReadOnlyCollection<WorkOrder> GetAll() { lock (store.SyncRoot) return store.WorkOrders.Values.ToArray(); }
    public WorkOrder? GetById(Guid id) { lock (store.SyncRoot) return store.WorkOrders.GetValueOrDefault(id); }
    public void Add(WorkOrder workOrder) { ArgumentNullException.ThrowIfNull(workOrder); lock (store.SyncRoot) { if (!store.WorkOrders.TryAdd(workOrder.Id, workOrder)) throw new InvalidOperationException("Work order already exists."); } }
}

public sealed class InMemoryIncidentRepository(InMemoryTransitStore store) : IIncidentRepository
{
    public IReadOnlyCollection<ServiceIncident> GetAll() { lock (store.SyncRoot) return store.Incidents.ToArray(); }
    public void Add(ServiceIncident incident) { ArgumentNullException.ThrowIfNull(incident); lock (store.SyncRoot) store.Incidents.Add(incident); }
}

public sealed class InMemoryCustomerCaseRepository(InMemoryTransitStore store) : ICustomerCaseRepository
{
    public IReadOnlyCollection<CustomerCase> GetAll() { lock (store.SyncRoot) return store.CustomerCases.ToArray(); }
    public void Add(CustomerCase customerCase) { ArgumentNullException.ThrowIfNull(customerCase); lock (store.SyncRoot) store.CustomerCases.Add(customerCase); }
}

public sealed class InMemoryEmployeeFormRepository(InMemoryTransitStore store) : IEmployeeFormRepository
{
    public IReadOnlyCollection<EmployeeForm> GetAll() { lock (store.SyncRoot) return store.EmployeeForms.ToArray(); }
    public void Add(EmployeeForm form) { ArgumentNullException.ThrowIfNull(form); lock (store.SyncRoot) store.EmployeeForms.Add(form); }
}

public sealed class InMemoryInspectionRepository(InMemoryTransitStore store) : IInspectionRepository
{
    public IReadOnlyCollection<VehicleInspection> GetAll() { lock (store.SyncRoot) return store.Inspections.ToArray(); }
    public void Add(VehicleInspection inspection) { ArgumentNullException.ThrowIfNull(inspection); lock (store.SyncRoot) store.Inspections.Add(inspection); }
}


public sealed class InMemoryOperationsEventRepository(InMemoryTransitStore store, ITenantContext tenantContext) : IOperationsEventRepository
{
    public IReadOnlyCollection<OperationsEvent> GetRecent(int limit)
    {
        lock (store.SyncRoot)
        {
            return store.OperationsEvents.Values
                .Where(item => tenantContext.IsResolved && item.TenantId == tenantContext.TenantId)
                .OrderByDescending(item => item.OccurredUtc)
                .Take(limit)
                .ToArray();
        }
    }

    public OperationsEvent? GetById(Guid id)
    {
        lock (store.SyncRoot)
        {
            OperationsEvent? item = store.OperationsEvents.GetValueOrDefault(id);
            return item is not null && tenantContext.IsResolved && item.TenantId == tenantContext.TenantId ? item : null;
        }
    }

    public void Add(OperationsEvent operationsEvent)
    {
        ArgumentNullException.ThrowIfNull(operationsEvent);
        lock (store.SyncRoot)
        {
            if (!store.OperationsEvents.TryAdd(operationsEvent.Id, operationsEvent))
            {
                throw new InvalidOperationException("Operations event already exists.");
            }
        }
    }
}

public sealed class InMemoryReceiptWriter(InMemoryTransitStore store) : IReceiptWriter
{
    public void Write(LeeWayExecutionReceipt receipt) { ArgumentNullException.ThrowIfNull(receipt); lock (store.SyncRoot) store.Receipts.Add(receipt); }
    public IReadOnlyCollection<LeeWayExecutionReceipt> GetAll() { lock (store.SyncRoot) return store.Receipts.ToArray(); }
}
