<#
LEEWAY ENTERPRISE FILE HEADER
File: Build-LeeWayTrainingManual.ps1
Path: operations/powershell/Build-LeeWayTrainingManual.ps1
Project: LeeWay Enterprise Transit Hub
Layer: Operations / Documentation Build
Purpose: Assemble governed training chapters into the master manual and calculate evidence-bearing progress.
Inputs: Training chapter Markdown files and manual manifest.
Outputs: MASTER-TRAINING-MANUAL.md and manual-progress.json.
Mutation Scope: Generated documentation outputs only.
Dependencies: PowerShell 7 and governed training sources.
Tests: Chapter discovery, deterministic ordering, word count, page estimate, and output parse.
Security Impact: Reads documentation only and excludes private-learning material.
Database Impact: No database access.
Sovereign Cycle: Structure -> Execution -> Veritas -> Echo
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
$ManualRoot = Join-Path $Root 'docs\training-manual'
$ManifestPath = Join-Path $ManualRoot 'manual.manifest.json'
$OutputPath = Join-Path $ManualRoot 'MASTER-TRAINING-MANUAL.md'
$ProgressPath = Join-Path $ManualRoot 'manual-progress.json'

if (-not (Test-Path -LiteralPath $ManifestPath -PathType Leaf)) {
    throw "Manual manifest missing: $ManifestPath"
}

$Manifest = Get-Content -LiteralPath $ManifestPath -Raw | ConvertFrom-Json
$ChapterFiles = @(
    Get-ChildItem -LiteralPath $ManualRoot -Recurse -File -Filter 'CHAPTER-*.md' |
        Sort-Object FullName
)

if ($ChapterFiles.Count -lt 36) {
    throw "Expected at least 36 chapter sources, found $($ChapterFiles.Count)."
}

$Header = @'
<!--
LEEWAY ENTERPRISE FILE HEADER
File: MASTER-TRAINING-MANUAL.md
Path: docs/training-manual/MASTER-TRAINING-MANUAL.md
Project: LeeWay Enterprise Transit Hub
Layer: Training / Generated Master Manual
Purpose: Assemble governed commercial training chapters into one controlled draft manual.
Inputs: Governed chapter Markdown and manual manifest.
Outputs: Single master training-manual draft.
Mutation Scope: Generated documentation only.
Dependencies: Chapter sources and Build-LeeWayTrainingManual.ps1.
Tests: Chapter count, word count, page estimate, and governance verification.
Security Impact: Excludes docs/private-learning and tenant data.
Database Impact: No database access.
Sovereign Cycle: Structure -> Execution -> Veritas -> Echo -> Synthesis
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 6.0.0
-->
'@

$Builder = [System.Text.StringBuilder]::new()
[void]$Builder.AppendLine($Header)
[void]$Builder.AppendLine('# LeeWay Enterprise Transit Hub — Master Training Manual')
[void]$Builder.AppendLine('')
[void]$Builder.AppendLine("**Controlled target:** $($Manifest.targetPages) pages")
[void]$Builder.AppendLine('**Status:** Initial governed draft content; not the final formatted 300-page release.')
[void]$Builder.AppendLine('')
[void]$Builder.AppendLine('## Included chapter sources')
[void]$Builder.AppendLine('')

foreach ($File in $ChapterFiles) {
    $Relative = [System.IO.Path]::GetRelativePath($Root, $File.FullName).Replace('\','/')
    [void]$Builder.AppendLine(('- `{0}`' -f $Relative))
}

[void]$Builder.AppendLine('')
[void]$Builder.AppendLine('---')
[void]$Builder.AppendLine('')

foreach ($File in $ChapterFiles) {
    $Content = Get-Content -LiteralPath $File.FullName -Raw
    $WithoutHeader = [regex]::Replace($Content, '^\s*<!--[\s\S]*?-->\s*', '')
    [void]$Builder.AppendLine($WithoutHeader.Trim())
    [void]$Builder.AppendLine('')
    [void]$Builder.AppendLine('---')
    [void]$Builder.AppendLine('')
}

$ManualText = $Builder.ToString()
$WordPattern = '[\p{L}\p{N}]+'
$Words = [regex]::Matches($ManualText, $WordPattern)
$WordCount = $Words.Count
$WordsPerEstimatedPage = 350
$EstimatedPages = [int][Math]::Ceiling($WordCount / [double]$WordsPerEstimatedPage)
$CompletionPercent = [Math]::Round(($EstimatedPages / [double]$Manifest.targetPages) * 100, 2)

$ManualText | Set-Content -LiteralPath $OutputPath -Encoding utf8

$Progress = [ordered]@{
    _leewayHeader = [ordered]@{
        file = 'manual-progress.json'
        path = 'docs/training-manual/manual-progress.json'
        project = 'LeeWay Enterprise Transit Hub'
        layer = 'Training / Progress Evidence'
        purpose = 'Record measurable progress toward the controlled 300-page commercial manual.'
        inputs = 'Generated master manual and chapter sources.'
        outputs = 'Chapter count, word count, estimated pages, and completion classification.'
        mutationScope = 'Training progress metadata only.'
        dependencies = 'manual.manifest.json and MASTER-TRAINING-MANUAL.md.'
        tests = 'JSON parse, chapter count, word count, and page-estimate verification.'
        securityImpact = 'Excludes private-learning content.'
        databaseImpact = 'None.'
        sovereignCycle = @('Execution','Veritas','Echo','Synthesis')
        status = 'PASS'
        humanComprehension = 'REQUIRED'
        owner = 'Leonard Lee / Leeway Industries'
        version = '4.0.0'
    }
    generatedUtc = [DateTimeOffset]::UtcNow
    targetPages = [int]$Manifest.targetPages
    chapterCount = $ChapterFiles.Count
    wordCount = $WordCount
    wordsPerEstimatedPage = $WordsPerEstimatedPage
    estimatedDraftPages = $EstimatedPages
    estimatedCompletionPercent = $CompletionPercent
    formattedCommercialPagesVerified = 0
    completionStatus = 'INITIAL_DRAFT_IN_PROGRESS_NOT_FINAL_300_PAGE_RELEASE'
    privateLearningIncluded = $false
    truthStatement = 'Estimated pages are a planning metric. Final formatted page count, screenshots, labs, accessibility, and release review remain pending.'
}

$Progress | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $ProgressPath -Encoding utf8
$Parsed = Get-Content -LiteralPath $ProgressPath -Raw | ConvertFrom-Json
if ([int]$Parsed.chapterCount -ne $ChapterFiles.Count -or [int]$Parsed.wordCount -ne $WordCount) {
    throw 'Manual progress write verification failed.'
}

Write-Host "PASS | Built master manual from $($ChapterFiles.Count) chapters, $WordCount words, approximately $EstimatedPages draft pages." -ForegroundColor Green
