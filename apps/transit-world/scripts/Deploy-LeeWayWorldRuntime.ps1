<#
REGION: LeeWay Logistics / World Runtime
TAG: LEEWAY.LOGISTICS.WORLD.RUNTIME.VERCEL_DEPLOY
5WH:
WHAT = Creates/updates the LeeWay World Runtime Vercel project and triggers production deploy.
WHY = Keeps deployment credentials in ignored .env.local and out of GitHub Pages/source.
WHO = LeeWay Industries under Creator authority.
WHERE = apps/transit-world/scripts/Deploy-LeeWayWorldRuntime.ps1
WHEN = After operator fills .env.local and explicitly passes -Deploy.
HOW = Vercel REST API with GitHub main as source; dry-run is default.
LICENSE = MIT, matching this repository.
#>
[CmdletBinding()]
param(
    [switch]$Deploy,
    [string]$EnvFile = (Join-Path (Split-Path $PSScriptRoot -Parent) '.env.local')
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Read-DotEnv([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path)) {
        throw "Private env file not found: $Path"
    }
    $map = [ordered]@{}
    foreach ($line in Get-Content -LiteralPath $Path) {
        $text = [string]$line
        if ([string]::IsNullOrWhiteSpace($text) -or $text.TrimStart().StartsWith('#')) { continue }
        $eq = $text.IndexOf('=')
        if ($eq -lt 1) { continue }
        $key = $text.Substring(0, $eq).Trim()
        $value = $text.Substring($eq + 1).Trim()
        if ($key -match '^[A-Z][A-Z0-9_]*$') { $map[$key] = $value }
    }
    return $map
}

function Get-EnvValue($Map, [string]$Key) {
    if ($Map.Contains($Key)) { return [string]$Map[$Key] }
    return ''
}

function Get-PropertyValue($Object, [string]$Name) {
    if ($null -eq $Object) { return '' }
    $property = $Object.PSObject.Properties[$Name]
    if ($null -eq $property) { return '' }
    return [string]$property.Value
}

function New-VercelUri([string]$Path, [hashtable]$Query) {
    $builder = [System.UriBuilder]::new("https://api.vercel.com$Path")
    $pairs = @()
    foreach ($key in $Query.Keys) {
        $value = [string]$Query[$key]
        if (-not [string]::IsNullOrWhiteSpace($value)) {
            $pairs += ('{0}={1}' -f [uri]::EscapeDataString($key), [uri]::EscapeDataString($value))
        }
    }
    $builder.Query = ($pairs -join '&')
    return $builder.Uri.AbsoluteUri
}
function Invoke-VercelJson(
    [string]$Method,
    [string]$Path,
    [hashtable]$Query,
    $Body = $null,
    [switch]$AllowNotFound
) {
    $uri = New-VercelUri $Path $Query
    $headers = @{
        Authorization = "Bearer $script:Token"
        Accept = 'application/json'
    }
    try {
        $params = @{
            Uri = $uri
            Method = $Method
            Headers = $headers
        }
        if ($null -ne $Body) {
            $params.ContentType = 'application/json'
            $params.Body = ($Body | ConvertTo-Json -Depth 12 -Compress)
        }
        return Invoke-RestMethod @params
    }
    catch {
        $status = [int]$_.Exception.Response.StatusCode
        if ($AllowNotFound -and $status -eq 404) { return $null }
        throw
    }
}

$envMap = Read-DotEnv $EnvFile
$projectName = Get-EnvValue $envMap 'VERCEL_PROJECT_NAME'
if ([string]::IsNullOrWhiteSpace($projectName)) { $projectName = 'leeway-world-runtime' }
$githubRepoId = 1204608230
$expectedOrg = '4citeB4U'
$expectedRepo = 'LEEWAY-LOGISTICS-'
$expectedRoot = 'apps/transit-world'
$teamId = Get-EnvValue $envMap 'VERCEL_TEAM_ID'
$teamSlug = Get-EnvValue $envMap 'VERCEL_TEAM_SLUG'
$script:Token = Get-EnvValue $envMap 'VERCEL_TOKEN'

$serverKeys = @(
    'OPENSKY_AUTH_MODE',
    'OPENSKY_CLIENT_ID',
    'OPENSKY_CLIENT_SECRET',
    'OPENSKY_USERNAME',
    'OPENSKY_PASSWORD',
    'LL2_API_TOKEN',
    'WISCONSIN_511_API_KEY',
    'CCTV_WISCONSIN_511_KEY',
    'ONTARIO_511_API_KEY',
    'CCTV_ONTARIO_511_KEY',
    'GOOGLE_MAPS_SERVER_API_KEY',
    'FIRMS_MAP_KEY',
    'TOMTOM_API_KEY',
    'AISSTREAM_API_KEY',
    'OPENAI_API_KEY',
    'LEEWAY_ALLOWED_ORIGINS'
)

$configured = @($serverKeys | Where-Object {
    $envMap.Contains($_) -and -not [string]::IsNullOrWhiteSpace([string]$envMap[$_])
})
Write-Host 'LeeWay World Runtime deployment preflight'
Write-Host ('  Env file: {0}' -f $EnvFile)
Write-Host ('  Project: {0}' -f $projectName)
Write-Host ('  Git source: 4citeB4U/LEEWAY-LOGISTICS- @ main')
Write-Host ('  Root: apps/transit-world')
Write-Host ('  Configured server variables: {0}' -f $configured.Count)
Write-Host ('  Token present: {0}' -f (-not [string]::IsNullOrWhiteSpace($script:Token)))
Write-Host ('  Mode: {0}' -f $(if ($Deploy) { 'DEPLOY' } else { 'DRY-RUN' }))

if (-not $Deploy) {
    Write-Host 'DRY-RUN PASS: no Vercel mutation performed.'
    exit 0
}

if ([string]::IsNullOrWhiteSpace($script:Token)) {
    throw 'VERCEL_TOKEN is required in .env.local for -Deploy.'
}
if ([string]::IsNullOrWhiteSpace($teamId) -and [string]::IsNullOrWhiteSpace($teamSlug)) {
    throw 'Set VERCEL_TEAM_ID or VERCEL_TEAM_SLUG in .env.local before -Deploy.'
}

$query = @{}
if ($teamId) { $query.teamId = $teamId }
if ($teamSlug) { $query.slug = $teamSlug }

$project = Invoke-VercelJson GET "/v9/projects/$projectName" $query $null -AllowNotFound
if ($null -eq $project) {
    Write-Host 'Creating dedicated LeeWay World Runtime project...'
    $createBody = @{
        name = $projectName
        framework = 'vite'
        rootDirectory = 'apps/transit-world'
        installCommand = 'npm ci'
        gitRepository = @{
            type = 'github'
            repo = '4citeB4U/LEEWAY-LOGISTICS-'
        }
    }
    $project = Invoke-VercelJson POST '/v11/projects' $query $createBody
} else {
    Write-Host 'Validating existing dedicated LeeWay World Runtime project.'
    $linkProperty = $project.PSObject.Properties['link']
    $link = if ($null -ne $linkProperty) { $linkProperty.Value } else { $null }
    $linkType = Get-PropertyValue $link 'type'
    $linkOrg = Get-PropertyValue $link 'org'
    $linkRepo = Get-PropertyValue $link 'repo'
    if (
        $linkType -ne 'github' -or
        $linkOrg -ne $expectedOrg -or
        $linkRepo -ne $expectedRepo
    ) {
        throw "Existing Vercel project '$projectName' is linked to a different repository. Refusing to repurpose it."
    }
    $project = Invoke-VercelJson PATCH "/v9/projects/$($project.id)" $query @{
        rootDirectory = $expectedRoot
        framework = 'vite'
        installCommand = 'npm ci'
    }
}
if (-not $project.id) { throw 'Vercel project ID was not returned.' }

$envRows = @()
foreach ($key in $configured) {
    $type = if ($key -eq 'LEEWAY_ALLOWED_ORIGINS' -or $key -eq 'OPENSKY_AUTH_MODE') { 'plain' } else { 'encrypted' }
    $envRows += @{
        key = $key
        value = [string]$envMap[$key]
        type = $type
        target = @('production')
        comment = 'Managed from LeeWay Logistics private .env.local; production only'
    }
}
if ($envRows.Count -gt 0) {
    Write-Host ('Upserting {0} server environment variables...' -f $envRows.Count)
    $envQuery = @{} + $query
    $envQuery.upsert = 'true'
    [void](Invoke-VercelJson POST "/v10/projects/$($project.id)/env" $envQuery $envRows)
}

Write-Host 'Triggering production deployment from GitHub main...'
$deployBody = @{
    name = $projectName
    project = [string]$project.id
    target = 'production'
    gitSource = @{
        type = 'github'
        repoId = $githubRepoId
        ref = 'main'
    }
}
$deployment = Invoke-VercelJson POST '/v13/deployments' $query $deployBody
if (-not $deployment.id) { throw 'Vercel deployment ID was not returned.' }

Write-Host 'DEPLOYMENT CREATED'
Write-Host ('  Project: {0}' -f $projectName)
Write-Host ('  Deployment ID: {0}' -f $deployment.id)
if ($deployment.url) { Write-Host ('  URL: https://{0}' -f $deployment.url) }
if ($deployment.status) { Write-Host ('  Status: {0}' -f $deployment.status) }
Write-Host 'No secret values were printed.'
