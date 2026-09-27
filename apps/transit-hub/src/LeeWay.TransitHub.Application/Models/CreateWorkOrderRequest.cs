/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: CreateWorkOrderRequest.cs
 * Path: src/LeeWay.TransitHub.Application/Models/CreateWorkOrderRequest.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Model
 * Purpose: Carry validated work-order creation input across the application boundary.
 * Inputs: Vehicle ID, title, description, and priority.
 * Outputs: Immutable request record.
 * Mutation Scope: Immutable.
 * Dependencies: None.
 * Tests: Service and controller tests.
 * Security Impact: Contains no secrets.
 * Database Impact: Maps to work-order creation parameters.
 * Sovereign Cycle: Perception -> Structure -> Execution
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

namespace LeeWay.TransitHub.Application.Models;

public sealed record CreateWorkOrderRequest(Guid VehicleId, string Title, string Description, int Priority);
