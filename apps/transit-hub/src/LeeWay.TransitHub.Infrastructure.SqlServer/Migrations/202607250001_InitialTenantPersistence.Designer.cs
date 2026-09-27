/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: 202607250001_InitialTenantPersistence.Designer.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/Migrations/202607250001_InitialTenantPersistence.Designer.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / EF Core Migration Metadata
 * Purpose: Associate the initial migration with TransitHubDbContext and the governed migration identifier.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: No runtime authorization behavior.
 * Database Impact: Migration discovery metadata only.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 5.0.0
 */

using LeeWay.TransitHub.Infrastructure.SqlServer.Persistence;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeeWay.TransitHub.Infrastructure.SqlServer.Migrations;

[DbContext(typeof(TransitHubDbContext))]
[Migration("202607250001_InitialTenantPersistence")]
partial class InitialTenantPersistence
{
}
