# LeeWay Logistics — World Provider Runtime
# Serves the public/live provider routes used by the GitHub Pages Transit World UI.
[CmdletBinding()]
param(
    [string]$Root = (Join-Path $PSScriptRoot '..\apps\transit-world'),
    [int]$Port = 4176,
    [switch]$Foreground
)

$ErrorActionPreference = 'Stop'
$Root = [IO.Path]::GetFullPath($Root)

if (-not (Test-Path (Join-Path $Root 'package.json'))) {
    throw "Transit World root not found: $Root"
}

$existing = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue |
    Select-Object -First 1

if ($existing) {
    $version = $null
    try {
        $version = Invoke-RestMethod -Uri "http://127.0.0.1:$Port/api/cctv/sources" -TimeoutSec 5
    } catch {}
    [ordered]@{
        status = 'ALREADY_RUNNING'
        port = $Port
        pid = $existing.OwningProcess
        cctvProviderReachable = [bool]$version
    } | ConvertTo-Json -Depth 4
    return
}

$vite = Join-Path $Root 'node_modules\vite\bin\vite.js'
if (-not (Test-Path $vite)) {
    throw "Transit World dependencies are not installed. Run npm ci in $Root"
}

$env:HOST = '127.0.0.1'
$env:PORT = [string]$Port
$env:VITE_BASE_PATH = ''
$env:CCTV_FORCE_AUSTIN = '1'
$env:CCTV_ILLINOIS_ENABLED = '1'
$env:CCTV_MAX_SOURCES = '5000'

$arguments = @(
    $vite,
    '--config', (Join-Path $Root 'server\standalone\vite.config.js'),
    '--host', '127.0.0.1',
    '--port', [string]$Port,
    '--strictPort'
)

if ($Foreground) {
    Push-Location $Root
    try {
        & node @arguments
    } finally {
        Pop-Location
    }
    return
}

$process = Start-Process -FilePath 'node.exe' -ArgumentList $arguments -WorkingDirectory $Root -PassThru -WindowStyle Hidden

$healthy = $false
foreach ($i in 1..30) {
    Start-Sleep -Milliseconds 500
    try {
        $response = Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:$Port/api/cctv/sources" -TimeoutSec 3
        if ($response.StatusCode -eq 200) {
            $healthy = $true
            break
        }
    } catch {}
}

if (-not $healthy) {
    try { Stop-Process -Id $process.Id -Force } catch {}
    throw "LeeWay World Provider runtime did not become healthy on port $Port"
}

$cors = Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:$Port/api/cctv/sources" -Headers @{
    Origin = 'https://4citeb4u.github.io'
} -TimeoutSec 5

[ordered]@{
    status = 'READY'
    port = $Port
    pid = $process.Id
    cctvProviderReachable = $true
    allowedOrigin = $cors.Headers.'Access-Control-Allow-Origin'
    pagesApiOrigin = "http://127.0.0.1:$Port"
} | ConvertTo-Json -Depth 4
