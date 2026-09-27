/*
LEEWAY ENTERPRISE FILE HEADER
File: InterviewAssessmentArchitectureTests.cs
Path: tests/LeeWay.TransitHub.ArchitectureTests/InterviewAssessmentArchitectureTests.cs
Project: LeeWay Enterprise Transit Hub
Layer: Tests / Architecture
Purpose: Prove one-to-one private question, quiz, answer-key, learner/instructor separation, and Agent Lee proctor coverage.
Inputs: Governed lesson questions, implementation evidence, source files, tests, and current phase receipts.
Outputs: Interview-learning, assessment, grading, or instructor evidence.
Mutation Scope: Private learning and assessment metadata only.
Dependencies: Question bank, technical lessons, source code, tests, and Agent Lee education policy.
Tests: JSON parse, one-to-one question coverage, answer-key coverage, visibility separation, and architecture tests.
Security Impact: Private interview-learning content; excluded from commercial learner distribution.
Database Impact: None.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 6.0.1
*/

using System.Text.Json;

namespace LeeWay.TransitHub.ArchitectureTests;

public sealed class InterviewAssessmentArchitectureTests
{
    [Fact]
    public void EveryPrivateQuestion_HasQuizAndAnswerKeyCoverage()
    {
        string root = FindRoot();
        using JsonDocument bank = ReadJson(Path.Combine(root, "docs", "private-learning", "leonard-lee", "question-bank.json"));
        using JsonDocument assessment = ReadJson(Path.Combine(root, "docs", "private-learning", "leonard-lee", "interview-assessment", "assessment-manifest.json"));
        using JsonDocument key = ReadJson(Path.Combine(root, "docs", "private-learning", "leonard-lee", "interview-assessment", "instructor", "answer-key.json"));

        string[] bankIds = bank.RootElement.GetProperty("questions").EnumerateArray().Select(x => x.GetProperty("id").GetString()!).OrderBy(x => x).ToArray();
        string[] assessmentIds = assessment.RootElement.GetProperty("questionMappings").EnumerateArray().Select(x => x.GetProperty("questionId").GetString()!).OrderBy(x => x).ToArray();
        string[] answerIds = key.RootElement.GetProperty("answers").EnumerateArray().Select(x => x.GetProperty("questionId").GetString()!).OrderBy(x => x).ToArray();

        Assert.Equal(bankIds, assessmentIds);
        Assert.Equal(bankIds, answerIds);
        Assert.Equal(bankIds.Length, assessment.RootElement.GetProperty("totalQuestionMappings").GetInt32());
        Assert.Equal(bankIds.Length, key.RootElement.GetProperty("totalAnswers").GetInt32());
    }

    [Fact]
    public void LearnerQuizzes_DoNotContainModelAnswers()
    {
        string root = FindRoot();
        string learnerRoot = Path.Combine(root, "docs", "private-learning", "leonard-lee", "interview-assessment", "learner");
        foreach (string path in Directory.GetFiles(learnerRoot, "*.md", SearchOption.TopDirectoryOnly))
        {
            string text = File.ReadAllText(path);
            Assert.False(text.Contains("**Model answer:**", StringComparison.OrdinalIgnoreCase));
            Assert.False(text.Contains("Required concepts:", StringComparison.OrdinalIgnoreCase));
        }
    }

    [Fact]
    public void AnswerKeyAndAssessment_ArePrivateAndExcludedFromCommercialRelease()
    {
        string root = FindRoot();
        using JsonDocument assessment = ReadJson(Path.Combine(root, "docs", "private-learning", "leonard-lee", "interview-assessment", "assessment-manifest.json"));
        using JsonDocument key = ReadJson(Path.Combine(root, "docs", "private-learning", "leonard-lee", "interview-assessment", "instructor", "answer-key.json"));
        using JsonDocument index = ReadJson(Path.Combine(root, "leeway", "capabilities", "enterprise-transit-hub", "education", "training-knowledge-index.json"));

        Assert.False(assessment.RootElement.GetProperty("commercialReleaseIncluded").GetBoolean());
        Assert.False(key.RootElement.GetProperty("commercialReleaseIncluded").GetBoolean());
        string[] commercial = index.RootElement.GetProperty("commercialSources").EnumerateArray().Select(x => x.GetString()!).ToArray();
        Assert.DoesNotContain(commercial, x => x.StartsWith("docs/private-learning/", StringComparison.Ordinal));
    }

    [Fact]
    public void AgentLeeProctor_WithholdsAnswersUntilSubmission()
    {
        string root = FindRoot();
        using JsonDocument proctor = ReadJson(Path.Combine(root, "leeway", "capabilities", "enterprise-transit-hub", "education", "interview-assessment-proctor.json"));
        JsonElement mode = proctor.RootElement.GetProperty("assessmentMode");
        Assert.Equal("DENY", proctor.RootElement.GetProperty("defaultDecision").GetString());
        Assert.False(mode.GetProperty("retrieveAnswerKeyBeforeSubmission").GetBoolean());
        Assert.True(mode.GetProperty("scoreAfterSubmission").GetBoolean());
        Assert.True(proctor.RootElement.GetProperty("receiptRequired").GetBoolean());
    }

    [Fact]
    public void LatestPhase_RegistersInterviewAssessmentSurfaces()
    {
        string root = FindRoot();
        using JsonDocument registry = ReadJson(Path.Combine(root, "docs", "learning", "learning-phase-registry.json"));
        using JsonDocument assessment = ReadJson(Path.Combine(root, "docs", "private-learning", "leonard-lee", "interview-assessment", "assessment-manifest.json"));
        JsonElement latest = registry.RootElement.GetProperty("phases").EnumerateArray().Last();
        Assert.StartsWith("PHASE-", latest.GetProperty("id").GetString()!);
        Assert.StartsWith("ACTIVE_", latest.GetProperty("status").GetString()!);
        Assert.Equal(assessment.RootElement.GetProperty("totalQuestionMappings").GetInt32(), latest.GetProperty("mappedAssessmentQuestionCount").GetInt32());
        foreach (string property in new[] { "interviewQuiz", "assessmentManifest", "instructorAnswerKey" })
        {
            string relative = latest.GetProperty(property).GetString()!;
            Assert.True(File.Exists(Path.Combine(root, relative.Replace('/', Path.DirectorySeparatorChar))), relative);
        }
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
            if (File.Exists(Path.Combine(current.FullName, "LeeWay.EnterpriseTransitHub.sln"))) return current.FullName;
            current = current.Parent;
        }
        throw new DirectoryNotFoundException("Unable to locate LeeWay Enterprise Transit Hub solution root.");
    }
}
