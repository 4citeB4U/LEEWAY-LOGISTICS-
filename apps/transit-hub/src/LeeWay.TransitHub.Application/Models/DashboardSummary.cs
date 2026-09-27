/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: DashboardSummary.cs
 * Path: src/LeeWay.TransitHub.Application/Models/DashboardSummary.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Model
 * Purpose: Return aggregated operational dashboard counts.
 * Inputs: Repository counts.
 * Outputs: DashboardSummary.
 * Mutation Scope: Immutable.
 * Dependencies: Application services.
 * Tests: Integration tests.
 * Security Impact: Contains aggregate counts only.
 * Database Impact: Later produced from SQL Server queries.
 * Sovereign Cycle: Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

namespace LeeWay.TransitHub.Application.Models;

public sealed record DashboardSummary(
    int VehicleCount,
    int OutOfServiceVehicleCount,
    int OpenWorkOrderCount,
    int IncidentCount,
    int CustomerCaseCount,
    int PendingEmployeeFormCount,
    int InspectionCount);
