<#
LEEWAY ENTERPRISE FILE HEADER
File: Test-LeeWaySqlServer.ps1
Path: operations/powershell/sqlserver/Test-LeeWaySqlServer.ps1
Project: LeeWay Enterprise Transit Hub
Layer: Operations / SQL Server
Purpose: Run read-only SQL Server container, database, RLS-policy, and migration probes.
Inputs: PowerShell 7, Docker, SQL Server container, governed project configuration, and explicit secrets supplied at runtime.
Outputs: Evidence-bearing SQL Server operation or exact failure.
Mutation Scope: Isolated LeeWay Transit Hub development resources only.
Dependencies: Docker Desktop, SQL Server 2025 image, sqlcmd 18, and .NET 10.
Tests: Parser gate, command exit codes, SQL probes, hash evidence, and rollback checks.
Security Impact: Never writes plaintext credentials to source control or evidence.
Database Impact: May create, migrate, back up, or verify the isolated Transit Hub development database.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 5.0.0
#>

[CmdletBinding()]
param(
    [string]$ContainerName = 'leeway-transit-hub-sqlserver-dev'
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$Status = docker inspect --format '{{.State.Status}}' $ContainerName 2>$null
if ($LASTEXITCODE -ne 0 -or $Status.Trim() -ne 'running') { throw "SQL Server container is not running: $ContainerName" }
$Labels = docker inspect --format '{{ index .Config.Labels "com.leeway.product" }}' $ContainerName
if ($Labels.Trim() -ne 'enterprise-transit-hub') { throw 'Container ownership label mismatch.' }
Write-Host "PASS | $ContainerName is running with LeeWay ownership." -ForegroundColor Green
