/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: SecretRedactor.cs
 * Path: src/LeeWay.TransitHub.Application/Security/SecretRedactor.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Application / Security Utility
 * Purpose: Remove known sensitive values from diagnostic text without changing non-sensitive evidence.
 * Inputs: Diagnostic text and an explicit collection of sensitive values.
 * Outputs: Text with every non-empty sensitive value replaced by a fixed marker.
 * Mutation Scope: None.
 * Dependencies: .NET string processing only.
 * Tests: Build, unit, integration, security, architecture, and runtime verification.
 * Security Impact: Never attempts to infer or store secrets; callers provide values in memory.
 * Database Impact: None.
 * Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 6.0.0
 */

namespace LeeWay.TransitHub.Application.Security;

public static class SecretRedactor
{
    public const string Marker = "[REDACTED]";

    public static string Redact(string? text, IEnumerable<string?> sensitiveValues)
    {
        string result = text ?? string.Empty;
        ArgumentNullException.ThrowIfNull(sensitiveValues);
        foreach (string secret in sensitiveValues
            .Where(value => !string.IsNullOrWhiteSpace(value))
            .Select(value => value!)
            .Distinct(StringComparer.Ordinal))
        {
            result = result.Replace(secret, Marker, StringComparison.Ordinal);
        }
        return result;
    }
}
