/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: Program.cs
 * Path: src/LeeWay.TransitHub.Web/Program.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Web / Composition Root
 * Purpose: Host the browser dashboard static assets.
 * Inputs: Web host configuration and static files.
 * Outputs: Running browser dashboard.
 * Mutation Scope: HTTP process configuration only.
 * Dependencies: ASP.NET Core static-file middleware.
 * Tests: Build and manual browser check.
 * Security Impact: Contains no server-side secrets.
 * Database Impact: Calls API only.
 * Sovereign Cycle: Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");
app.Run();
