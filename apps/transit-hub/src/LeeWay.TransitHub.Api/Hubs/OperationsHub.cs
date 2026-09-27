/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: OperationsHub.cs
 * Path: src/LeeWay.TransitHub.Api/Hubs/OperationsHub.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: API / SignalR Hub
 * Purpose: Authorize a real-time connection and join it only to the resolved tenant operations group.
 * Inputs: Authenticated connection and resolved tenant context.
 * Outputs: Tenant-scoped SignalR group membership.
 * Mutation Scope: Connection group membership only.
 * Dependencies: SignalR, ITenantContext, TransitPolicies, and TenantOperationsGroup.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Requires operations.read policy and resolved tenant context before group membership.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Application.Security;
using LeeWay.TransitHub.Application.Tenancy;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace LeeWay.TransitHub.Api.Hubs;

[Authorize(Policy = TransitPolicies.OperationsRead)]
public sealed class OperationsHub(ITenantContext tenantContext) : Hub
{
    public override async Task OnConnectedAsync()
    {
        if (!tenantContext.IsResolved || tenantContext.TenantId == Guid.Empty)
        {
            throw new HubException("A resolved tenant context is required for real-time operations.");
        }
        await Groups.AddToGroupAsync(
            Context.ConnectionId,
            TenantOperationsGroup.For(tenantContext.TenantId),
            Context.ConnectionAborted);
        await base.OnConnectedAsync();
    }
}
