/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: SovereignStage.cs
 * Path: src/LeeWay.TransitHub.Governance/Stages/SovereignStage.cs
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Governance / Stage
 * Purpose: Define the eight LeeWay Sovereign Cycle stages.
 * Inputs: Governance stage selection.
 * Outputs: Strongly typed SovereignStage.
 * Mutation Scope: Declares stages only.
 * Dependencies: LeeWay Standards.
 * Tests: Architecture and receipt tests.
 * Security Impact: None.
 * Database Impact: May map to audit receipt values.
 * Sovereign Cycle: Origin -> Structure -> Veritas
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

namespace LeeWay.TransitHub.Governance.Stages;

public enum SovereignStage
{
    Perception = 1,
    Origin = 2,
    Structure = 3,
    Execution = 4,
    Veritas = 5,
    Echo = 6,
    Synthesis = 7,
    LeePrime = 8
}
