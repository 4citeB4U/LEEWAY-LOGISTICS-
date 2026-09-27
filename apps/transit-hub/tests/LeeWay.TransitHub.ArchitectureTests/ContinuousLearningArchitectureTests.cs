/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: ContinuousLearningArchitectureTests.cs
 * Path: tests/LeeWay.TransitHub.ArchitectureTests/ContinuousLearningArchitectureTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Architecture
 * Purpose: Prove that the latest registered implementation phase updates the lesson, private workbook, question bank, manual, and Agent Lee knowledge surfaces without freezing the release gate to a prior phase.
 * Inputs: Learning registry, question bank, manual manifest, manual progress, and knowledge index.
 * Outputs: Architecture test pass or exact failure.
 * Mutation Scope: Read-only.
 * Dependencies: xUnit, System.Text.Json, and project documentation.
 * Tests: Four continuous-learning release-gate tests.
 * Security Impact: Prevents code-only phases that leave humans and Agent Lee unable to explain the change.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.1
 */

using System.Text.Json;

namespace LeeWay.TransitHub.ArchitectureTests;

public sealed class ContinuousLearningArchitectureTests
{
    [Fact]
    public void LatestPhase_RequiresEveryLearningSurface()
    {
        string root = FindRoot();
        using JsonDocument registry = ReadJson(Path.Combine(root, "docs", "learning", "learning-phase-registry.json"));
        using JsonDocument manifest = ReadJson(Path.Combine(root, "docs", "training-manual", "manual.manifest.json"));
        using JsonDocument progress = ReadJson(Path.Combine(root, "docs", "training-manual", "manual-progress.json"));
        using JsonDocument bank = ReadJson(Path.Combine(root, "docs", "private-learning", "leonard-lee", "question-bank.json"));
        JsonElement latest = registry.RootElement.GetProperty("phases").EnumerateArray().Last();

        string latestPhaseId = latest.GetProperty("id").GetString()!;
        string questionLesson = latest.GetProperty("questionLesson").GetString()!;
        int latestQuestionCount = latest.GetProperty("questionCount").GetInt32();
        int latestManualChapterCount = latest.GetProperty("manualChapterCountAfterPhase").GetInt32();

        Assert.StartsWith("PHASE-", latestPhaseId);
        Assert.StartsWith("ACTIVE_", latest.GetProperty("status").GetString()!);
        Assert.True(latestQuestionCount >= registry.RootElement.GetProperty("policy").GetProperty("minimumNewQuestionsForImplementationPhase").GetInt32());
        Assert.Equal(latestManualChapterCount, manifest.RootElement.GetProperty("initialChapterCount").GetInt32());
        Assert.Equal(latestManualChapterCount, progress.RootElement.GetProperty("chapterCount").GetInt32());
        Assert.Equal(latestQuestionCount, bank.RootElement.GetProperty("lessonCounts").GetProperty(questionLesson).GetInt32());
        Assert.True(File.Exists(Path.Combine(root, latest.GetProperty("lesson").GetString()!.Replace('/', Path.DirectorySeparatorChar))));
        Assert.True(File.Exists(Path.Combine(root, latest.GetProperty("privateWorkbook").GetString()!.Replace('/', Path.DirectorySeparatorChar))));
    }

    [Fact]
    public void QuestionBank_ContainsAllLatestPhaseQuestions()
    {
        string root = FindRoot();
        using JsonDocument registry = ReadJson(Path.Combine(root, "docs", "learning", "learning-phase-registry.json"));
        using JsonDocument bank = ReadJson(Path.Combine(root, "docs", "private-learning", "leonard-lee", "question-bank.json"));
        JsonElement latest = registry.RootElement.GetProperty("phases").EnumerateArray().Last();
        JsonElement lessonCounts = bank.RootElement.GetProperty("lessonCounts");

        string questionLesson = latest.GetProperty("questionLesson").GetString()!;
        int latestQuestionCount = latest.GetProperty("questionCount").GetInt32();
        int calculatedTotal = lessonCounts.EnumerateObject().Sum(property => property.Value.GetInt32());

        Assert.Equal(calculatedTotal, bank.RootElement.GetProperty("totalQuestions").GetInt32());
        Assert.Equal(latestQuestionCount, lessonCounts.GetProperty(questionLesson).GetInt32());
        Assert.True(latestQuestionCount >= 8);
    }

    [Fact]
    public void ManualManifest_RequiresContinuousLearningForEveryRelease()
    {
        string root = FindRoot();
        using JsonDocument registry = ReadJson(Path.Combine(root, "docs", "learning", "learning-phase-registry.json"));
        using JsonDocument manifest = ReadJson(Path.Combine(root, "docs", "training-manual", "manual.manifest.json"));
        using JsonDocument progress = ReadJson(Path.Combine(root, "docs", "training-manual", "manual-progress.json"));
        JsonElement latest = registry.RootElement.GetProperty("phases").EnumerateArray().Last();

        Assert.Equal(latest.GetProperty("manualChapterCountAfterPhase").GetInt32(), manifest.RootElement.GetProperty("initialChapterCount").GetInt32());
        Assert.Equal(manifest.RootElement.GetProperty("initialChapterCount").GetInt32(), progress.RootElement.GetProperty("chapterCount").GetInt32());
        Assert.True(manifest.RootElement.GetProperty("releaseGate").GetProperty("lessonPlanUpdatedEveryPhase").GetBoolean());
        Assert.True(manifest.RootElement.GetProperty("releaseGate").GetProperty("privateQuestionBankUpdatedEveryPhase").GetBoolean());
        Assert.True(manifest.RootElement.GetProperty("releaseGate").GetProperty("agentLeeKnowledgeUpdated").GetBoolean());
        Assert.True(manifest.RootElement.GetProperty("releaseGate").GetProperty("continuousLearningVerifierPass").GetBoolean());
    }

    [Fact]
    public void AgentLeeKnowledgeIndex_IncludesLatestPhaseTechnicalSources()
    {
        string root = FindRoot();
        using JsonDocument registry = ReadJson(Path.Combine(root, "docs", "learning", "learning-phase-registry.json"));
        using JsonDocument index = ReadJson(Path.Combine(root, "leeway", "capabilities", "enterprise-transit-hub", "education", "training-knowledge-index.json"));
        JsonElement latest = registry.RootElement.GetProperty("phases").EnumerateArray().Last();
        string latestLesson = latest.GetProperty("lesson").GetString()!;

        Assert.Equal(index.RootElement.GetProperty("_leewayHeader").GetProperty("version").GetString(), index.RootElement.GetProperty("productVersion").GetString());
        Assert.Contains(
            index.RootElement.GetProperty("technicalSources").EnumerateArray().Select(element => element.GetString()),
            value => value == latestLesson);
        Assert.Equal("leeway/capabilities/enterprise-transit-hub/database-capability.json", index.RootElement.GetProperty("databaseCapability").GetString());
    }

    private static JsonDocument ReadJson(string path)
    {
        Assert.True(File.Exists(path), $"Expected governed file was not found: {path}");
        return JsonDocument.Parse(File.ReadAllText(path));
    }

    private static string FindRoot()
    {
        DirectoryInfo? current = new(AppContext.BaseDirectory);
        while (current is not null)
        {
            if (File.Exists(Path.Combine(current.FullName, "LeeWay.EnterpriseTransitHub.sln")))
            {
                return current.FullName;
            }

            current = current.Parent;
        }

        throw new DirectoryNotFoundException("Unable to locate LeeWay Enterprise Transit Hub solution root.");
    }
}
