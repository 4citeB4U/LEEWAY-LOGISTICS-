<!--
LEEWAY ENTERPRISE FILE HEADER
File: DEVELOPMENT-RUNBOOK.md
Path: docs/operations/DEVELOPMENT-RUNBOOK.md
Project: LeeWay Enterprise Transit Hub
Layer: Operations Documentation
Purpose: Provide build and local execution commands.
Inputs: Project executables and operations scripts.
Outputs: Repeatable local run procedure.
Mutation Scope: Documentation only.
Dependencies: .NET 10 SDK.
Tests: Command execution.
Security Impact: Local development only.
Database Impact: Runs in-memory infrastructure by default.
Sovereign Cycle: Execution -> Veritas -> Echo
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.0
-->

# Development Runbook

## Build

```powershell
.\operations\powershell\Build-All.ps1
```

## Run API

```powershell
dotnet run --project .\src\LeeWay.TransitHub.Api\LeeWay.TransitHub.Api.csproj
```

## Run Web

```powershell
dotnet run --project .\src\LeeWay.TransitHub.Web\LeeWay.TransitHub.Web.csproj
```

## Run Worker

```powershell
dotnet run --project .\src\LeeWay.TransitHub.Worker\LeeWay.TransitHub.Worker.csproj
```

The API defaults to `http://localhost:5080`. The browser dashboard defaults to `http://localhost:5081`.
