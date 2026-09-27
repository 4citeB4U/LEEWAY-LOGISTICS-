/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: DataverseOptions.cs
 * Path: src/LeeWay.TransitHub.Integration.Dataverse/DataverseOptions.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Integration / Dataverse Configuration
 * Purpose: Represent non-secret Dataverse endpoint configuration.
 * Inputs: Configuration values.
 * Outputs: Validated Dataverse options.
 * Mutation Scope: Configuration object only.
 * Dependencies: Future authentication provider.
 * Tests: Security tests.
 * Security Impact: Contains no tokens, client secrets, or tenant credentials.
 * Database Impact: Maps to Dataverse entities, not local database.
 * Sovereign Cycle: Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

namespace LeeWay.TransitHub.Integration.Dataverse;

public sealed class DataverseOptions
{
    public const string SectionName = "Dataverse";
    public Uri? BaseUri { get; init; }
    public string CasesEntitySet { get; init; } = "incidents";

    public void Validate()
    {
        if (BaseUri is null || !BaseUri.IsAbsoluteUri) throw new InvalidOperationException("Dataverse BaseUri must be an absolute URI.");
        if (string.IsNullOrWhiteSpace(CasesEntitySet)) throw new InvalidOperationException("Dataverse entity-set name is required.");
    }
}
