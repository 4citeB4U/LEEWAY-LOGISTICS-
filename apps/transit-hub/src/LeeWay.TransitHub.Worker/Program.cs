/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: Program.cs
 * Path: src/LeeWay.TransitHub.Worker/Program.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Worker / Composition Root
 * Purpose: Configure and run the background worker process.
 * Inputs: Host configuration.
 * Outputs: Running worker service.
 * Mutation Scope: Worker process lifecycle only.
 * Dependencies: TransitSyncWorker.
 * Tests: Build and manual worker run.
 * Security Impact: No external credentials configured.
 * Database Impact: No database connection in foundation mode.
 * Sovereign Cycle: Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using LeeWay.TransitHub.Worker;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<TransitSyncWorker>();
var host = builder.Build();
host.Run();
