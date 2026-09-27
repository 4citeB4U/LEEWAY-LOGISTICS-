# LeeWay Logistics — Agent Lee / Gemma 4 local runtime
# Governed local Ollama lane for the public Transit World UI.
[CmdletBinding()]
param(
    [string]$Model = 'gemma4:e4b',
    [string]$HostAddress = '127.0.0.1:11435',
    [string]$AllowedOrigin = 'https://4citeb4u.github.io',
    [switch]$InstallModel
)

$ErrorActionPreference = 'Stop'
$ollama = (Get-Command ollama -ErrorAction Stop).Source
$base = "http://$HostAddress"

$env:OLLAMA_HOST = $HostAddress
$env:OLLAMA_ORIGINS = $AllowedOrigin

function Test-Ollama {
    try {
        $null = Invoke-RestMethod -Uri "$base/api/version" -TimeoutSec 3
        return $true
    } catch {
        return $false
    }
}

if (-not (Test-Ollama)) {
    Start-Process -FilePath $ollama -ArgumentList 'serve' -WindowStyle Hidden
    foreach ($i in 1..20) {
        Start-Sleep -Milliseconds 500
        if (Test-Ollama) { break }
    }
}

if (-not (Test-Ollama)) {
    throw "LeeWay Ollama runtime did not become healthy at $base"
}

$tags = Invoke-RestMethod -Uri "$base/api/tags" -TimeoutSec 5
$hasModel = @($tags.models.name) -contains $Model

if (-not $hasModel -and $InstallModel) {
    $env:OLLAMA_HOST = $HostAddress
    & $ollama pull $Model
    if ($LASTEXITCODE -ne 0) {
        throw "Model pull failed with exit code $LASTEXITCODE"
    }
    $tags = Invoke-RestMethod -Uri "$base/api/tags" -TimeoutSec 5
    $hasModel = @($tags.models.name) -contains $Model
}

$cors = Invoke-WebRequest -UseBasicParsing -Uri "$base/api/tags" -Headers @{
    Origin = $AllowedOrigin
} -TimeoutSec 5

[ordered]@{
    status = if ($hasModel) { 'READY' } else { 'MODEL_MISSING' }
    endpoint = $base
    model = $Model
    modelInstalled = $hasModel
    allowedOrigin = $cors.Headers.'Access-Control-Allow-Origin'
    version = (Invoke-RestMethod -Uri "$base/api/version" -TimeoutSec 5).version
} | ConvertTo-Json -Depth 4
