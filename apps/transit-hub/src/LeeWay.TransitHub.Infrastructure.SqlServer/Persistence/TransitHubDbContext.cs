/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TransitHubDbContext.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/Persistence/TransitHubDbContext.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / EF Core DbContext
 * Purpose: Map tenant-owned vehicle and work-order records, apply automatic tenant query filters, constraints, indexes, and relationships.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: Unresolved tenant contexts filter to Guid.Empty; repositories reject mutation without a resolved tenant.
 * Database Impact: Owns fleet.Vehicles and maintenance.WorkOrders mappings.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

using LeeWay.TransitHub.Application.Tenancy;
using Microsoft.EntityFrameworkCore;

namespace LeeWay.TransitHub.Infrastructure.SqlServer.Persistence;

public sealed class TransitHubDbContext(
    DbContextOptions<TransitHubDbContext> options,
    ITenantContext tenantContext) : DbContext(options)
{
    private readonly Guid _tenantId = tenantContext.IsResolved ? tenantContext.TenantId : Guid.Empty;

    public DbSet<VehicleRecord> Vehicles => Set<VehicleRecord>();
    public DbSet<WorkOrderRecord> WorkOrders => Set<WorkOrderRecord>();
    public DbSet<OperationsEventRecord> OperationsEvents => Set<OperationsEventRecord>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("dbo");

        modelBuilder.Entity<VehicleRecord>(entity =>
        {
            entity.ToTable("Vehicles", "fleet");
            entity.HasKey(record => new { record.TenantId, record.Id });
            entity.Property(record => record.FleetNumber).HasMaxLength(40).IsRequired();
            entity.Property(record => record.Manufacturer).HasMaxLength(100).IsRequired();
            entity.Property(record => record.Model).HasMaxLength(100).IsRequired();
            entity.Property(record => record.Status).HasConversion<int>();
            entity.Property(record => record.OutOfServiceReason).HasMaxLength(500);
            entity.HasIndex(record => new { record.TenantId, record.FleetNumber }).IsUnique();
            entity.HasQueryFilter("TenantFilter", record => record.TenantId == _tenantId);
        });

        modelBuilder.Entity<OperationsEventRecord>(entity =>
        {
            entity.ToTable("OperationsEvents", "operations");
            entity.HasKey(record => new { record.TenantId, record.Id });
            entity.Property(record => record.Type).HasConversion<int>();
            entity.Property(record => record.Severity).HasConversion<int>();
            entity.Property(record => record.Subject).HasMaxLength(200).IsRequired();
            entity.Property(record => record.PayloadJson).HasColumnType("nvarchar(max)").IsRequired();
            entity.Property(record => record.CreatedBySubject).HasMaxLength(200).IsRequired();
            entity.Property(record => record.RowVersion).IsRowVersion();
            entity.HasIndex(record => new { record.TenantId, record.OccurredUtc });
            entity.HasQueryFilter("TenantFilter", record => record.TenantId == _tenantId);
        });

        modelBuilder.Entity<WorkOrderRecord>(entity =>
        {
            entity.ToTable("WorkOrders", "maintenance");
            entity.HasKey(record => new { record.TenantId, record.Id });
            entity.Property(record => record.Title).HasMaxLength(200).IsRequired();
            entity.Property(record => record.Description).HasMaxLength(4000).IsRequired();
            entity.Property(record => record.Status).HasConversion<int>();
            entity.Property(record => record.AssignedTechnician).HasMaxLength(200);
            entity.HasIndex(record => new { record.TenantId, record.VehicleId });
            entity.HasQueryFilter("TenantFilter", record => record.TenantId == _tenantId);
            entity.HasOne<VehicleRecord>()
                .WithMany()
                .HasForeignKey(record => new { record.TenantId, record.VehicleId })
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
