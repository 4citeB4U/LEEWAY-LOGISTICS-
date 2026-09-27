/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: OracleConnectionOptions.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.Oracle/OracleConnectionOptions.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / Oracle Configuration
 * Purpose: Represent and validate future Oracle connection settings without storing passwords.
 * Inputs: Configuration provider values.
 * Outputs: Validated Oracle options.
 * Mutation Scope: Configuration object only.
 * Dependencies: Oracle provider will be added in a separately governed phase.
 * Tests: Security tests.
 * Security Impact: Passwords are deliberately excluded.
 * Database Impact: Controls future Oracle connectivity.
 * Sovereign Cycle: Structure -> Execution -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

namespace LeeWay.TransitHub.Infrastructure.Oracle;

public sealed class OracleConnectionOptions
{
    public const string SectionName = "Oracle";
    public string DataSource { get; init; } = string.Empty;
    public string UserId { get; init; } = string.Empty;

    public void Validate()
    {
        if (string.IsNullOrWhiteSpace(DataSource)) throw new InvalidOperationException("Oracle data source has not been configured.");
        if (string.IsNullOrWhiteSpace(UserId)) throw new InvalidOperationException("Oracle user ID has not been configured.");
    }
}
