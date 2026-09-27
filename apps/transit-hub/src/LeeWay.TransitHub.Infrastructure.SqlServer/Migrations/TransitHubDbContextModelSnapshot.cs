/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TransitHubDbContextModelSnapshot.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.SqlServer/Migrations/TransitHubDbContextModelSnapshot.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / EF Core Snapshot
 * Purpose: Record the EF Core 10 model associated with the Phase 06 operations-event migration.
 * Inputs: Governed configuration, tenant context, domain entities, and persistence contracts.
 * Outputs: Deterministic SQL Server behavior or verification evidence.
 * Mutation Scope: SQL Server infrastructure and explicitly owned data only.
 * Dependencies: .NET 10, EF Core 10, SQL Server 2025, and LeeWay application contracts.
 * Tests: Build, unit, architecture, security, SQL integration, API runtime, and backup verification.
 * Security Impact: Includes tenant keys and filters in the model metadata.
 * Database Impact: Describes fleet.Vehicles, maintenance.WorkOrders, and operations.OperationsEvents.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.7
 */

using System;
using LeeWay.TransitHub.Infrastructure.SqlServer.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace LeeWay.TransitHub.Infrastructure.SqlServer.Migrations;

[DbContext(typeof(TransitHubDbContext))]
partial class TransitHubDbContextModelSnapshot : ModelSnapshot
{
    protected override void BuildModel(ModelBuilder modelBuilder)
    {
        modelBuilder.HasAnnotation("ProductVersion", "10.0.10");
        modelBuilder.HasDefaultSchema("dbo");


        modelBuilder.Entity("LeeWay.TransitHub.Infrastructure.SqlServer.Persistence.OperationsEventRecord", entity =>
        {
            entity.Property<Guid>("TenantId").HasColumnType("uniqueidentifier");
            entity.Property<Guid>("Id").HasColumnType("uniqueidentifier");
            entity.Property<string>("CreatedBySubject").IsRequired().HasMaxLength(200).HasColumnType("nvarchar(200)");
            entity.Property<DateTimeOffset>("OccurredUtc").HasColumnType("datetimeoffset");
            entity.Property<string>("PayloadJson").IsRequired().HasColumnType("nvarchar(max)");
            entity.Property<byte[]>("RowVersion").IsRequired().IsConcurrencyToken().ValueGeneratedOnAddOrUpdate().HasColumnType("rowversion");
            entity.Property<int>("Severity").HasColumnType("int");
            entity.Property<string>("Subject").IsRequired().HasMaxLength(200).HasColumnType("nvarchar(200)");
            entity.Property<int>("Type").HasColumnType("int");
            entity.HasKey("TenantId", "Id");
            entity.HasIndex("TenantId", "OccurredUtc");
            entity.ToTable("OperationsEvents", "operations");
        });

        modelBuilder.Entity("LeeWay.TransitHub.Infrastructure.SqlServer.Persistence.VehicleRecord", entity =>
        {
            entity.Property<Guid>("TenantId").HasColumnType("uniqueidentifier");
            entity.Property<Guid>("Id").HasColumnType("uniqueidentifier");
            entity.Property<DateTimeOffset>("CreatedUtc").HasColumnType("datetimeoffset");
            entity.Property<string>("FleetNumber").IsRequired().HasMaxLength(40).HasColumnType("nvarchar(40)");
            entity.Property<string>("Manufacturer").IsRequired().HasMaxLength(100).HasColumnType("nvarchar(100)");
            entity.Property<string>("Model").IsRequired().HasMaxLength(100).HasColumnType("nvarchar(100)");
            entity.Property<int>("ModelYear").HasColumnType("int");
            entity.Property<string>("OutOfServiceReason").HasMaxLength(500).HasColumnType("nvarchar(500)");
            entity.Property<int>("Status").HasColumnType("int");
            entity.HasKey("TenantId", "Id");
            entity.HasIndex("TenantId", "FleetNumber").IsUnique();
            entity.ToTable("Vehicles", "fleet");
        });

        modelBuilder.Entity("LeeWay.TransitHub.Infrastructure.SqlServer.Persistence.WorkOrderRecord", entity =>
        {
            entity.Property<Guid>("TenantId").HasColumnType("uniqueidentifier");
            entity.Property<Guid>("Id").HasColumnType("uniqueidentifier");
            entity.Property<string>("AssignedTechnician").HasMaxLength(200).HasColumnType("nvarchar(200)");
            entity.Property<DateTimeOffset?>("CompletedUtc").HasColumnType("datetimeoffset");
            entity.Property<DateTimeOffset>("CreatedUtc").HasColumnType("datetimeoffset");
            entity.Property<string>("Description").IsRequired().HasMaxLength(4000).HasColumnType("nvarchar(4000)");
            entity.Property<int>("Priority").HasColumnType("int");
            entity.Property<int>("Status").HasColumnType("int");
            entity.Property<string>("Title").IsRequired().HasMaxLength(200).HasColumnType("nvarchar(200)");
            entity.Property<Guid>("VehicleId").HasColumnType("uniqueidentifier");
            entity.HasKey("TenantId", "Id");
            entity.HasIndex("TenantId", "VehicleId");
            entity.ToTable("WorkOrders", "maintenance");
            entity.HasOne("LeeWay.TransitHub.Infrastructure.SqlServer.Persistence.VehicleRecord", null)
                .WithMany()
                .HasForeignKey("TenantId", "VehicleId")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        });
    }
}
