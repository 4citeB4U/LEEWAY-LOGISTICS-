<#
LEEWAY ENTERPRISE FILE HEADER
File: Verify-ContinuousLearningGate.ps1
Path: operations/powershell/Verify-ContinuousLearningGate.ps1
Project: LeeWay Enterprise Transit Hub
Layer: Operations / Learning Governance
Purpose: Verify that the latest phase updated the technical lesson, private workbook, question bank, interview quizzes, answer keys, manual, Agent Lee index, and release metadata before publication.
Inputs: Expected phase identifier and governed learning artifacts.
Outputs: PASS or exact learning-gate failure list.
Mutation Scope: Read-only.
Dependencies: PowerShell 7, JSON manifests, manual progress, and project files.
Tests: Local phase scripts, Build-All.ps1, architecture tests, and GitHub Actions.
Security Impact: Prevents stale or missing training and enforces private-commercial separation.
Database Impact: None.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 5.0.6
#>


[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [ValidatePattern('^PHASE-[0-9]{2}$')]
    [string]$ExpectedPhase
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$Failures = [System.Collections.Generic.List[string]]::new()

function Read-JsonFile {
    param([Parameter(Mandatory)][string]$RelativePath)
    $Path = Join-Path $Root $RelativePath
    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        $Failures.Add("Missing required file: $RelativePath")
        return $null
    }

    try { return Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json }
    catch { $Failures.Add("Invalid JSON: $RelativePath | $($_.Exception.Message)"); return $null }
}

$Registry = Read-JsonFile -RelativePath 'docs/learning/learning-phase-registry.json'
$Bank = Read-JsonFile -RelativePath 'docs/private-learning/leonard-lee/question-bank.json'
$Progress = Read-JsonFile -RelativePath 'docs/training-manual/manual-progress.json'
$Manifest = Read-JsonFile -RelativePath 'docs/training-manual/manual.manifest.json'
$Knowledge = Read-JsonFile -RelativePath 'leeway/capabilities/enterprise-transit-hub/education/training-knowledge-index.json'
$PrivateProgress = Read-JsonFile -RelativePath 'docs/private-learning/leonard-lee/progress-tracker.json'
$Assessment = Read-JsonFile -RelativePath 'docs/private-learning/leonard-lee/interview-assessment/assessment-manifest.json'
$AnswerKey = Read-JsonFile -RelativePath 'docs/private-learning/leonard-lee/interview-assessment/instructor/answer-key.json'
$Proctor = Read-JsonFile -RelativePath 'leeway/capabilities/enterprise-transit-hub/education/interview-assessment-proctor.json'
$Latest = $null

if ($Registry) {
    $Latest = @($Registry.phases)[-1]
    if ([string]$Latest.id -ne $ExpectedPhase) { $Failures.Add("Latest learning phase is $($Latest.id), expected $ExpectedPhase.") }
    foreach ($Property in @('lesson','privateWorkbook','interviewQuiz','assessmentManifest','instructorAnswerKey')) {
        $Relative = [string]$Latest.$Property
        if ([string]::IsNullOrWhiteSpace($Relative) -or -not (Test-Path -LiteralPath (Join-Path $Root $Relative) -PathType Leaf)) {
            $Failures.Add("Latest phase missing $Property file: $Relative")
        }
    }

    if ([string]::IsNullOrWhiteSpace([string]$Latest.questionLesson)) {
        $Failures.Add('Latest phase must register a private question lesson.')
    }
    elseif ($Bank) {
        $LessonProperty = $Bank.lessonCounts.PSObject.Properties[[string]$Latest.questionLesson]
        $ActualQuestions = if ($LessonProperty) { [int]$LessonProperty.Value } else { 0 }
        if ($ActualQuestions -ne [int]$Latest.questionCount) {
            $Failures.Add("Question count mismatch for $($Latest.questionLesson): registry=$($Latest.questionCount) bank=$ActualQuestions")
        }
        if ([int]$Latest.questionCount -lt [int]$Registry.policy.minimumNewQuestionsForImplementationPhase) {
            $Failures.Add('Latest phase has fewer than the required new learning questions.')
        }
    }

    if ($Progress -and [int]$Progress.chapterCount -ne [int]$Latest.manualChapterCountAfterPhase) {
        $Failures.Add("Manual chapter count mismatch: registry=$($Latest.manualChapterCountAfterPhase) progress=$($Progress.chapterCount)")
    }
}

if ($Bank) {
    $Sum = 0
    foreach ($Property in $Bank.lessonCounts.PSObject.Properties) { $Sum += [int]$Property.Value }
    if ($Sum -ne [int]$Bank.totalQuestions) { $Failures.Add("Question bank total does not equal lesson-count sum.") }
    if ([bool]$Bank.commercialReleaseIncluded) { $Failures.Add('Private question bank cannot be included in commercial release.') }
}

if ($Manifest) {
    if ([int]$Manifest.targetPages -ne 300) { $Failures.Add('Manual target must remain 300 pages.') }
    if (-not [bool]$Manifest.releaseGate.lessonPlanUpdatedEveryPhase) { $Failures.Add('Manual release gate does not require lesson-plan updates.') }
    if (-not [bool]$Manifest.releaseGate.privateQuestionBankUpdatedEveryPhase) { $Failures.Add('Manual release gate does not require private question-bank updates.') }
    if (-not [bool]$Manifest.releaseGate.agentLeeKnowledgeUpdated) { $Failures.Add('Manual release gate does not require Agent Lee knowledge updates.') }
}

if ($Knowledge -and $Latest) {
    $LatestLesson = [string]$Latest.lesson
    if ($LatestLesson -notin @($Knowledge.technicalSources)) {
        $Failures.Add("Agent Lee knowledge index is missing the latest lesson: $LatestLesson")
    }
}

if ($PrivateProgress -and $Latest) {
    $ExpectedLesson = [string]$Latest.questionLesson
    $TrackedLessons = @($PrivateProgress.lessons | ForEach-Object { [string]$_.lesson })
    if ([string]::IsNullOrWhiteSpace($ExpectedLesson) -or $ExpectedLesson -notin $TrackedLessons) {
        $Failures.Add("Private progress tracker does not reference the latest lesson: $ExpectedLesson")
    }
}


if ($Assessment -and $AnswerKey -and $Bank) {
    if ([bool]$Assessment.commercialReleaseIncluded) { $Failures.Add('Private interview assessment cannot be included in commercial release.') }
    if ([bool]$AnswerKey.commercialReleaseIncluded) { $Failures.Add('Private instructor answer key cannot be included in commercial release.') }
    if ([int]$Assessment.totalQuestionMappings -ne [int]$Bank.totalQuestions) { $Failures.Add('Assessment mapping count does not equal private question count.') }
    if ([int]$AnswerKey.totalAnswers -ne [int]$Bank.totalQuestions) { $Failures.Add('Answer-key count does not equal private question count.') }

    $BankIds = @($Bank.questions | ForEach-Object { [string]$_.id } | Sort-Object -Unique)
    $AssessmentIds = @($Assessment.questionMappings | ForEach-Object { [string]$_.questionId } | Sort-Object -Unique)
    $AnswerIds = @($AnswerKey.answers | ForEach-Object { [string]$_.questionId } | Sort-Object -Unique)
    if (($BankIds -join '|') -ne ($AssessmentIds -join '|')) { $Failures.Add('Assessment question IDs do not exactly match the private question bank.') }
    if (($BankIds -join '|') -ne ($AnswerIds -join '|')) { $Failures.Add('Answer-key question IDs do not exactly match the private question bank.') }

    foreach ($Mapping in @($Assessment.questionMappings)) {
        foreach ($Property in @('quizPath','answerKeyId')) {
            if ([string]::IsNullOrWhiteSpace([string]$Mapping.$Property)) { $Failures.Add("Assessment mapping $($Mapping.questionId) is missing $Property.") }
        }
        $QuizPath = [string]$Mapping.quizPath
        if (-not (Test-Path -LiteralPath (Join-Path $Root $QuizPath) -PathType Leaf)) { $Failures.Add("Assessment quiz file is missing: $QuizPath") }
    }
}

if ($Manifest) {
    if (-not [bool]$Manifest.releaseGate.privateInterviewAssessmentUpdatedEveryPhase) { $Failures.Add('Manual release gate does not require private interview-assessment updates.') }
    if (-not [bool]$Manifest.releaseGate.privateAnswerKeysExcludedFromCommercialPackages) { $Failures.Add('Manual release gate does not exclude private answer keys from commercial packages.') }
}

if ($Knowledge) {
    foreach ($PrivateSource in @($Knowledge.privateSources)) {
        if ([string]$PrivateSource -in @($Knowledge.commercialSources)) { $Failures.Add("Private learning source is exposed as commercial: $PrivateSource") }
    }
}

if ($Proctor) {
    if ([string]$Proctor.defaultDecision -ne 'DENY') { $Failures.Add('Interview proctor default decision must be DENY.') }
    if ([bool]$Proctor.assessmentMode.retrieveAnswerKeyBeforeSubmission) { $Failures.Add('Interview proctor must not retrieve answer keys before submission.') }
    if (-not [bool]$Proctor.assessmentMode.scoreAfterSubmission) { $Failures.Add('Interview proctor must score only after submission.') }
}

foreach ($RequiredOutput in @(
    'docs/training-manual/MASTER-TRAINING-MANUAL.md',
    'docs/training-manual/manual-progress.json',
    'docs/private-learning/leonard-lee/MASTER-QUESTION-BANK.md',
    'leeway/capabilities/enterprise-transit-hub/education/training-knowledge-index.json',
    'docs/private-learning/leonard-lee/interview-assessment/assessment-manifest.json',
    'docs/private-learning/leonard-lee/interview-assessment/instructor/answer-key.json',
    'leeway/capabilities/enterprise-transit-hub/education/interview-assessment-proctor.json'
)) {
    if (-not (Test-Path -LiteralPath (Join-Path $Root $RequiredOutput) -PathType Leaf)) {
        $Failures.Add("Continuous learning output is missing: $RequiredOutput")
    }
}

if ($Failures.Count -gt 0) {
    throw "Continuous learning gate failed:`n$($Failures -join [Environment]::NewLine)"
}

Write-Host "PASS | Continuous learning gate verified for $ExpectedPhase." -ForegroundColor Green
