<#
LEEWAY ENTERPRISE FILE HEADER
File: Verify-LeeWayGovernance.ps1
Path: operations/powershell/Verify-LeeWayGovernance.ps1
Project: LeeWay Enterprise Transit Hub
Layer: Operations / Governance Verification
Purpose: Verify every source-controlled directory and file has LeeWay authority.
Inputs: Project tree and authority policy.
Outputs: PASS or exact missing-authority list.
Mutation Scope: Read-only.
Dependencies: PowerShell 7 and project headers.
Tests: Executed by Build-All.ps1 and deployment gate.
Security Impact: Reads text metadata only.
Database Impact: No database access.
Sovereign Cycle: Execution -> Veritas -> Echo
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.2
#>

[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$excluded = '(^|[\\/])(bin|obj|\.git|_evidence|TestResults)([\\/]|$)'
$missing = [System.Collections.Generic.List[string]]::new()

$directories = Get-ChildItem -LiteralPath $Root -Recurse -Directory -Force | Where-Object { $_.FullName -notmatch $excluded }
if (-not (Test-Path -LiteralPath (Join-Path $Root '_DIRECTORY.leeway.md'))) { $missing.Add('_DIRECTORY.leeway.md') }
foreach ($directory in $directories) {
    if (-not (Test-Path -LiteralPath (Join-Path $directory.FullName '_DIRECTORY.leeway.md'))) {
        $missing.Add([System.IO.Path]::GetRelativePath($Root, $directory.FullName) + '\_DIRECTORY.leeway.md')
    }
}

$files = Get-ChildItem -LiteralPath $Root -Recurse -File -Force | Where-Object { $_.FullName -notmatch $excluded -and $_.Name -ne 'file-registry.json' }
foreach ($file in $files) {
    $relative = [System.IO.Path]::GetRelativePath($Root, $file.FullName)
    $content = Get-Content -LiteralPath $file.FullName -Raw -ErrorAction SilentlyContinue
    $authorized = $false
    if ($file.Extension -eq '.json') { $authorized = [string]$content -match '"_leewayHeader"' }
    elseif ($file.Extension -eq '.sln') { $authorized = Test-Path -LiteralPath ($file.FullName + '.leeway.yaml') }
    else { $authorized = [string]$content -match 'LEEWAY ENTERPRISE FILE HEADER' }
    if (-not $authorized) { $missing.Add($relative) }
}

if ($missing.Count -gt 0) { throw "LeeWay governance verification failed:`n$($missing -join [Environment]::NewLine)" }
Write-Host "PASS | LeeWay governance verified for $($directories.Count + 1) directories and $($files.Count) files." -ForegroundColor Green
