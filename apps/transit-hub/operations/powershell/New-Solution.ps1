<#
LEEWAY ENTERPRISE FILE HEADER
File: New-Solution.ps1
Path: operations/powershell/New-Solution.ps1
Project: LeeWay Enterprise Transit Hub
Layer: Operations / Solution
Purpose: Create the Visual Studio solution, add all projects, and govern the native solution file.
Inputs: All .csproj files and .NET 10 SDK.
Outputs: LeeWay.EnterpriseTransitHub.sln and sidecar.
Mutation Scope: Solution and sidecar only.
Dependencies: .NET 10 SDK.
Tests: dotnet sln list and build.
Security Impact: No credentials.
Database Impact: No database execution.
Sovereign Cycle: Structure -> Execution -> Veritas
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
$Solution = Join-Path $Root 'LeeWay.EnterpriseTransitHub.sln'
if (Test-Path -LiteralPath $Solution) { Remove-Item -LiteralPath $Solution -Force }
Push-Location $Root
try {
    & dotnet new sln --format sln -n LeeWay.EnterpriseTransitHub
    if ($LASTEXITCODE -ne 0) { throw 'Solution creation failed.' }
    $projects = @(Get-ChildItem -LiteralPath $Root -Recurse -Filter '*.csproj' -File | Sort-Object FullName)
    $projectPaths = @($projects | Select-Object -ExpandProperty FullName)
    & dotnet sln $Solution add $projectPaths
    if ($LASTEXITCODE -ne 0) { throw 'Failed to add one or more projects to the solution.' }
} finally { Pop-Location }
$sidecar = $Solution + '.leeway.yaml'
@(
    '# LEEWAY ENTERPRISE FILE HEADER',
    '# File: LeeWay.EnterpriseTransitHub.sln.leeway.yaml',
    '# Path: LeeWay.EnterpriseTransitHub.sln.leeway.yaml',
    '# Project: LeeWay Enterprise Transit Hub',
    '# Layer: External File Governance',
    '# Purpose: Govern the native Visual Studio solution file.',
    '# Inputs: Solution project inventory.',
    '# Outputs: Sidecar authority for the solution.',
    '# Mutation Scope: Metadata only.',
    '# Dependencies: LeeWay.EnterpriseTransitHub.sln.',
    '# Tests: dotnet sln list and dotnet build.',
    '# Security Impact: None.',
    '# Database Impact: None.',
    '# Sovereign Cycle: Structure -> Execution -> Veritas',
    '# Status: ACTIVE / GOVERNED',
    '# Human Comprehension: REQUIRED',
    '# Owner: Leonard Lee / Leeway Industries',
    '# Version: 1.0.0',
    '',
    "target_file: 'LeeWay.EnterpriseTransitHub.sln'",
    "header_mode: 'EXTERNAL_SIDECAR'"
) | Set-Content -LiteralPath $sidecar -Encoding utf8
Write-Host "PASS | Created solution with $($projects.Count) projects." -ForegroundColor Green
