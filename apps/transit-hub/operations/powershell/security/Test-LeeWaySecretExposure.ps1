<#
LEEWAY ENTERPRISE FILE HEADER
File: Test-LeeWaySecretExposure.ps1
Path: operations/powershell/security/Test-LeeWaySecretExposure.ps1
Project: LeeWay Enterprise Transit Hub
Layer: Operations / Security Verification
Purpose: Fail when governed source or evidence contains any explicitly supplied sensitive value.
Inputs: Project root, optional evidence root, and in-memory sensitive values.
Outputs: PASS or exact file and line-number evidence without printing the sensitive value.
Mutation Scope: Read-only.
Dependencies: PowerShell 7 and governed text files.
Tests: Phase 06 installer, Build-All, and architecture tests.
Security Impact: Never stores or prints supplied sensitive values.
Database Impact: None.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 6.0.0
#>

[CmdletBinding()]
param(
    [string]$Root = (Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSScriptRoot))),
    [AllowEmptyCollection()][string[]]$SensitiveValues = @()
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$Failures = [System.Collections.Generic.List[string]]::new()
$Excluded = @('bin','obj','artifacts','.git','.vs','node_modules')
$DistinctSensitiveValues = @($SensitiveValues | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Select-Object -Unique)
foreach ($File in Get-ChildItem -LiteralPath $Root -Recurse -File -Force | Where-Object { $_.Extension -in '.ps1','.psm1','.md','.txt','.log','.json','.yml','.yaml','.cs','.csproj','.sln' }) {
    $Relative = [System.IO.Path]::GetRelativePath($Root,$File.FullName)
    if (@($Relative -split '[\/]') | Where-Object { $_ -in $Excluded }) { continue }
    $LineNumber = 0
    foreach ($Line in Get-Content -LiteralPath $File.FullName) {
        $LineNumber++
        foreach ($SensitiveValue in $DistinctSensitiveValues) {
            if ($Line.Contains($SensitiveValue,[System.StringComparison]::Ordinal)) { $Failures.Add(('{0}:{1}' -f $Relative,$LineNumber)); break }
        }
    }
}
if ($Failures.Count -gt 0) { throw "Known sensitive values found at:`n$($Failures -join [Environment]::NewLine)" }
Write-Host 'PASS | Governed known-secret exposure scan found no supplied sensitive values.' -ForegroundColor Green
