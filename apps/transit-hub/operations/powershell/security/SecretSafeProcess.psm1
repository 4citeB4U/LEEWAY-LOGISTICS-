<#
LEEWAY ENTERPRISE FILE HEADER
File: SecretSafeProcess.psm1
Path: operations/powershell/security/SecretSafeProcess.psm1
Project: LeeWay Enterprise Transit Hub
Layer: Operations / Security Module
Purpose: Execute native commands while redacting explicitly supplied secret values from console, logs, and exceptions.
Inputs: Governed project state and explicit parameters.
Outputs: Evidence-bearing deterministic result.
Mutation Scope: Declared owned scope only.
Dependencies: PowerShell 7.6.3 and governed project tools.
Tests: Native parser, self-tests, and host execution.
Security Impact: Never writes unredacted secrets to output or evidence.
Database Impact: As declared by the operation.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 6.0.0
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Protect-LeeWaySensitiveText {
    [CmdletBinding()]
    param(
        [AllowNull()][string]$Text,
        [Parameter(Mandatory)][AllowEmptyCollection()][string[]]$SensitiveValues
    )
    $Result = if ($null -eq $Text) { '' } else { $Text }
    foreach ($Secret in @($SensitiveValues | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Select-Object -Unique)) {
        $Result = $Result.Replace($Secret, '[REDACTED]', [System.StringComparison]::Ordinal)
    }
    return $Result
}

function Invoke-LeeWaySecretSafeProcess {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$FilePath,
        [Parameter(Mandatory)][AllowEmptyCollection()][string[]]$ArgumentList,
        [Parameter(Mandatory)][string]$DisplayCommand,
        [Parameter(Mandatory)][string]$LogPath,
        [Parameter(Mandatory)][AllowEmptyCollection()][string[]]$SensitiveValues
    )
    Write-Host "RUN  | $DisplayCommand" -ForegroundColor DarkCyan
    $StartInfo = [System.Diagnostics.ProcessStartInfo]::new()
    $StartInfo.FileName = $FilePath
    $StartInfo.UseShellExecute = $false
    $StartInfo.RedirectStandardOutput = $true
    $StartInfo.RedirectStandardError = $true
    foreach ($Argument in $ArgumentList) { [void]$StartInfo.ArgumentList.Add($Argument) }
    $Process = [System.Diagnostics.Process]::new()
    $Process.StartInfo = $StartInfo
    try {
        if (-not $Process.Start()) { throw "Unable to start secret-safe process: $DisplayCommand" }
        $StandardOutput = $Process.StandardOutput.ReadToEnd()
        $StandardError = $Process.StandardError.ReadToEnd()
        $Process.WaitForExit()
        $Combined = Protect-LeeWaySensitiveText -Text (($StandardOutput,$StandardError -join [Environment]::NewLine).Trim()) -SensitiveValues $SensitiveValues
        $Combined | Set-Content -LiteralPath $LogPath -Encoding utf8
        if (-not [string]::IsNullOrWhiteSpace($Combined)) { Write-Host $Combined }
        if ($Process.ExitCode -ne 0) { throw "Secret-safe command failed with exit code $($Process.ExitCode): $DisplayCommand" }
        return $Process.ExitCode
    } finally { $Process.Dispose() }
}

Export-ModuleMember -Function Protect-LeeWaySensitiveText,Invoke-LeeWaySecretSafeProcess
