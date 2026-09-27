/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: TrainingDocumentationArchitectureTests.cs
 * Path: tests/LeeWay.TransitHub.ArchitectureTests/TrainingDocumentationArchitectureTests.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Tests / Architecture
 * Purpose: Verify the controlled manual target, generated draft progress, private question archive, and commercial release separation without hard-coding a prior phase's counts.
 * Inputs: Project documentation, learning registry, and JSON manifests.
 * Outputs: Architecture test pass or exact failure.
 * Mutation Scope: Read-only.
 * Dependencies: xUnit, System.Text.Json, and project files.
 * Tests: Three tests in this file.
 * Security Impact: Prevents private learning from being classified as commercial training.
 * Database Impact: No database access.
 * Sovereign Cycle: Execution -> Veritas -> Echo
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 5.0.1
 */

using System.Text.Json;

namespace LeeWay.TransitHub.ArchitectureTests;

public sealed class TrainingDocumentationArchitectureTests
{
    [Fact]
    public void Manual_RemainsThreeHundredPageTargetWithoutFalseCompletionClaim()
    {
        string root = FindRoot();
        using JsonDocument manifest = ReadJson(Path.Combine(root, "docs", "training-manual", "manual.manifest.json"));
        using JsonDocument progress = ReadJson(Path.Combine(root, "docs", "training-manual", "manual-progress.json"));

        int declaredChapterCount = manifest.RootElement.GetProperty("initialChapterCount").GetInt32();
        int generatedChapterCount = progress.RootElement.GetProperty("chapterCount").GetInt32();

        Assert.Equal(300, manifest.RootElement.GetProperty("targetPages").GetInt32());
        Assert.Equal(declaredChapterCount, generatedChapterCount);
        Assert.True(generatedChapterCount >= 32);
        Assert.True(progress.RootElement.GetProperty("wordCount").GetInt32() >= 43000);
        Assert.True(progress.RootElement.GetProperty("estimatedDraftPages").GetInt32() >= 123);
        Assert.Equal(0, progress.RootElement.GetProperty("formattedCommercialPagesVerified").GetInt32());
        Assert.Contains("NOT_FINAL_300_PAGE_RELEASE", progress.RootElement.GetProperty("completionStatus").GetString());
    }

    [Fact]
    public void PrivateQuestionBank_PreservesAllFormalQuestionsThroughLatestLesson()
    {
        string root = FindRoot();
        using JsonDocument bank = ReadJson(Path.Combine(root, "docs", "private-learning", "leonard-lee", "question-bank.json"));

        JsonElement lessonCounts = bank.RootElement.GetProperty("lessonCounts");
        int declaredTotal = bank.RootElement.GetProperty("totalQuestions").GetInt32();
        int calculatedTotal = lessonCounts.EnumerateObject().Sum(property => property.Value.GetInt32());

        Assert.Equal(calculatedTotal, declaredTotal);
        Assert.True(declaredTotal >= 46);
        Assert.Equal(10, lessonCounts.GetProperty("LESSON-01").GetInt32());
        Assert.Equal(12, lessonCounts.GetProperty("LESSON-02").GetInt32());
        Assert.Equal(12, lessonCounts.GetProperty("LESSON-04").GetInt32());
        Assert.Equal(12, lessonCounts.GetProperty("LESSON-05").GetInt32());
        Assert.False(bank.RootElement.GetProperty("commercialReleaseIncluded").GetBoolean());
    }

    [Fact]
    public void AgentLeeEducationIndex_SeparatesCommercialAndPrivateSources()
    {
        string root = FindRoot();
        using JsonDocument index = ReadJson(Path.Combine(root, "leeway", "capabilities", "enterprise-transit-hub", "education", "training-knowledge-index.json"));

        Assert.Equal("docs/private-learning/", index.RootElement.GetProperty("commercialReleaseExcludesPrefix").GetString());
        Assert.Equal("OWNER_OR_EXPLICIT_FAMILY_DELEGATE_ONLY", index.RootElement.GetProperty("privateAccessRule").GetString());
        Assert.True(index.RootElement.GetProperty("commercialSources").GetArrayLength() >= 8);
        Assert.True(index.RootElement.GetProperty("privateSources").GetArrayLength() >= 5);
        Assert.All(
            index.RootElement.GetProperty("commercialSources").EnumerateArray(),
            element => Assert.False(
                (element.GetString() ?? string.Empty).StartsWith("docs/private-learning/", StringComparison.OrdinalIgnoreCase)));
    }

    private static JsonDocument ReadJson(string path)
    {
        Assert.True(File.Exists(path), $"Expected documentation file was not found: {path}");
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
