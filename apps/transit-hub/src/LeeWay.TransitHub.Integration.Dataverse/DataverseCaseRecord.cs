/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: DataverseCaseRecord.cs
 * Path: src/LeeWay.TransitHub.Integration.Dataverse/DataverseCaseRecord.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Integration / Dataverse Model
 * Purpose: Represent the subset of Dataverse case information used by the Transit Hub.
 * Inputs: Dataverse JSON response.
 * Outputs: Typed DataverseCaseRecord.
 * Mutation Scope: Immutable.
 * Dependencies: System.Text.Json.
 * Tests: Security and integration tests.
 * Security Impact: Does not include personal customer details.
 * Database Impact: Maps to Dataverse case fields.
 * Sovereign Cycle: Perception -> Structure -> Synthesis
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

namespace LeeWay.TransitHub.Integration.Dataverse;

public sealed record DataverseCaseRecord(string TicketNumber, string Title, int StateCode);
