<#
LEEWAY ENTERPRISE FILE HEADER
File: Update-LeeWayRegistry.ps1
Path: operations/powershell/Update-LeeWayRegistry.ps1
Project: LeeWay Enterprise Transit Hub
Layer: Operations / Registry
Purpose: Regenerate the SHA-256 governed file registry.
Inputs: Current project files.
Outputs: governance/registries/file-registry.json.
Mutation Scope: Registry file only.
Dependencies: PowerShell 7.
Tests: JSON parse and governance scan.
Security Impact: Hashes files without exposing secrets.
Database Impact: No database access.
Sovereign Cycle: Structure -> Veritas -> Echo
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
$RegistryPath = Join-Path (Join-Path (Join-Path $Root 'governance') 'registries') 'file-registry.json'
$Excluded = '(^|[\\/])(bin|obj|\.git|_evidence|TestResults)([\\/]|$)'
$Files = @(
    Get-ChildItem -LiteralPath $Root -Recurse -File -Force |
        Where-Object {
            $_.FullName -notmatch $Excluded -and
            $_.FullName -ne $RegistryPath
        } |
        Sort-Object FullName
)
$Entries = foreach ($File in $Files) {
    [ordered]@{
        path = [System.IO.Path]::GetRelativePath($Root, $File.FullName).Replace('\','/')
        sha256 = (Get-FileHash -LiteralPath $File.FullName -Algorithm SHA256).Hash
        sizeBytes = $File.Length
    }
}
$Registry = [ordered]@{
    _leewayHeader = [ordered]@{
        file = 'file-registry.json'
        path = 'governance/registries/file-registry.json'
        project = 'LeeWay Enterprise Transit Hub'
        layer = 'Governance / Registry'
        purpose = 'Record governed file identity, size, and SHA-256 integrity.'
        inputs = 'Project file scan and SHA-256.'
        outputs = 'Auditable file registry.'
        mutationScope = 'Registry output only.'
        dependencies = 'Project tree and header policy.'
        tests = 'Governance verification and hash generation.'
        securityImpact = 'Provides integrity evidence.'
        databaseImpact = 'None.'
        sovereignCycle = @('Structure','Veritas','Echo')
        status = 'PASS'
        humanComprehension = 'REQUIRED'
        owner = 'Leonard Lee / Leeway Industries'
        version = '1.0.2'
    }
    generatedUtc = [DateTimeOffset]::UtcNow
    fileCount = $Entries.Count
    files = @($Entries)
}
$Registry | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $RegistryPath -Encoding utf8
$Parsed = Get-Content -LiteralPath $RegistryPath -Raw | ConvertFrom-Json
if ([int]$Parsed.fileCount -ne $Entries.Count) {
    throw 'Registry write verification failed.'
}
Write-Host "PASS | Registry updated with $($Entries.Count) files." -ForegroundColor Green
