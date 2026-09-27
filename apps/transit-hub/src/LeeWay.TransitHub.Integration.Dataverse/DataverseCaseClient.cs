/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: DataverseCaseClient.cs
 * Path: src/LeeWay.TransitHub.Integration.Dataverse/DataverseCaseClient.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Integration / Dataverse Client
 * Purpose: Read case summaries through the Dataverse Web API when explicitly configured.
 * Inputs: HttpClient, DataverseOptions, and cancellation token.
 * Outputs: Typed Dataverse case summaries.
 * Mutation Scope: Outbound GET request only.
 * Dependencies: System.Net.Http.Json and external authentication configuration.
 * Tests: Contract tests in a later connected phase.
 * Security Impact: No credentials are stored; authentication must be injected externally.
 * Database Impact: Reads Dataverse only.
 * Sovereign Cycle: Perception -> Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

using System.Net.Http.Json;

namespace LeeWay.TransitHub.Integration.Dataverse;

public sealed class DataverseCaseClient(HttpClient httpClient, DataverseOptions options)
{
    public async Task<IReadOnlyCollection<DataverseCaseRecord>> GetCasesAsync(CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(httpClient);
        ArgumentNullException.ThrowIfNull(options);
        options.Validate();
        httpClient.BaseAddress ??= options.BaseUri;
        var envelope = await httpClient.GetFromJsonAsync<DataverseEnvelope>($"api/data/v9.2/{options.CasesEntitySet}?$select=ticketnumber,title,statecode", cancellationToken);
        return envelope?.Value ?? Array.Empty<DataverseCaseRecord>();
    }

    private sealed record DataverseEnvelope(IReadOnlyCollection<DataverseCaseRecord> Value);
}
