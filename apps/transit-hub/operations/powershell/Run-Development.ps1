<#
LEEWAY ENTERPRISE FILE HEADER
File: Run-Development.ps1
Path: operations/powershell/Run-Development.ps1
Project: LeeWay Enterprise Transit Hub
Layer: Operations / Development Runtime
Purpose: Start the API and browser dashboard in separate local terminals.
Inputs: Compiled API and Web projects.
Outputs: Two local development processes.
Mutation Scope: Starts local processes only.
Dependencies: PowerShell 7 and .NET 10 SDK.
Tests: Manual health and browser checks.
Security Impact: Local-only endpoints.
Database Impact: Uses in-memory training mode.
Sovereign Cycle: Execution -> Veritas -> Echo
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.0
#>

[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$api = Join-Path $Root 'src\LeeWay.TransitHub.Api\LeeWay.TransitHub.Api.csproj'
$web = Join-Path $Root 'src\LeeWay.TransitHub.Web\LeeWay.TransitHub.Web.csproj'
Start-Process pwsh -ArgumentList '-NoExit','-Command',"Set-Location '$Root'; dotnet run --project '$api'"
Start-Sleep -Seconds 2
Start-Process pwsh -ArgumentList '-NoExit','-Command',"Set-Location '$Root'; dotnet run --project '$web'"
Write-Host 'PASS | API and Web launch commands started in separate PowerShell windows.' -ForegroundColor Green
