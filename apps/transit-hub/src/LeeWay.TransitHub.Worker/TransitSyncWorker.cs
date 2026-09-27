/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TransitSyncWorker.cs
 * Path: src/LeeWay.TransitHub.Worker/TransitSyncWorker.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Worker / Background Service
 * Purpose: Provide a safe background-service foundation for future synchronization.
 * Inputs: Cancellation token and system clock.
 * Outputs: Structured heartbeat log.
 * Mutation Scope: Process log only.
 * Dependencies: Microsoft.Extensions.Hosting.
 * Tests: Build and manual run.
 * Security Impact: No external access or secrets.
 * Database Impact: No database connection.
 * Sovereign Cycle: Execution -> Veritas -> Echo
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

namespace LeeWay.TransitHub.Worker;

public sealed class TransitSyncWorker(ILogger<TransitSyncWorker> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            logger.LogInformation("LeeWay Transit synchronization heartbeat at {UtcNow}", DateTimeOffset.UtcNow);
            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }
    }
}
