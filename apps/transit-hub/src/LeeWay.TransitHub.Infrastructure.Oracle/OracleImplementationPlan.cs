/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: OracleImplementationPlan.cs
 * Path: src/LeeWay.TransitHub.Infrastructure.Oracle/OracleImplementationPlan.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Infrastructure / Oracle Plan
 * Purpose: Expose the governed Oracle migration sequence without opening a connection.
 * Inputs: Version-controlled PL/SQL script paths.
 * Outputs: Ordered Oracle implementation plan.
 * Mutation Scope: Read-only.
 * Dependencies: database/oracle scripts.
 * Tests: Architecture and script-existence checks.
 * Security Impact: No credentials or connections.
 * Database Impact: Declares Oracle migration order only.
 * Sovereign Cycle: Structure -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

namespace LeeWay.TransitHub.Infrastructure.Oracle;

public static class OracleImplementationPlan
{
    public static IReadOnlyCollection<string> RequiredScripts { get; } = new[]
    {
        "database/oracle/001-create-schema.sql",
        "database/oracle/002-create-tables.sql",
        "database/oracle/003-create-package.sql",
        "database/oracle/004-seed-training-data.sql",
        "database/oracle/005-verification.sql"
    };
}
