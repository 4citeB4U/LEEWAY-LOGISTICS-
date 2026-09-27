<#
LEEWAY ENTERPRISE FILE HEADER
File: Build-All.ps1
Path: operations/powershell/Build-All.ps1
Project: LeeWay Enterprise Transit Hub
Layer: Operations / Build
Purpose: Rebuild training evidence, verify continuous learning, restore, build, test, and governance-scan the complete solution.
Inputs: Solution and .NET SDK.
Outputs: Build, test, and governance evidence.
Mutation Scope: Build output and test results only.
Dependencies: .NET 10 SDK and Verify-LeeWayGovernance.ps1.
Tests: This script executes the tests.
Security Impact: Does not elevate or use secrets.
Database Impact: Does not execute database scripts.
Sovereign Cycle: Execution -> Veritas -> Echo
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 6.0.0
#>

[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$Solution = Join-Path $Root 'LeeWay.EnterpriseTransitHub.sln'

if (-not (Test-Path -LiteralPath $Solution)) { throw "Solution not found: $Solution" }
& (Join-Path $PSScriptRoot 'Build-LeeWayTrainingManual.ps1')
& (Join-Path $PSScriptRoot 'Verify-ContinuousLearningGate.ps1') -ExpectedPhase 'PHASE-06'
& dotnet restore $Solution
if ($LASTEXITCODE -ne 0) { throw "dotnet restore failed with exit code $LASTEXITCODE" }
& dotnet build $Solution -c Debug --no-restore
if ($LASTEXITCODE -ne 0) { throw "dotnet build failed with exit code $LASTEXITCODE" }
& dotnet test $Solution -c Debug --no-build
if ($LASTEXITCODE -ne 0) { throw "dotnet test failed with exit code $LASTEXITCODE" }
& (Join-Path $PSScriptRoot 'Verify-LeeWayGovernance.ps1')
