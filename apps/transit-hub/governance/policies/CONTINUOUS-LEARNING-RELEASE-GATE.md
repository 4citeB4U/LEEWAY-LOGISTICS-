<!--
LEEWAY ENTERPRISE FILE HEADER
File: CONTINUOUS-LEARNING-RELEASE-GATE.md
Path: governance/policies/CONTINUOUS-LEARNING-RELEASE-GATE.md
Project: LeeWay Enterprise Transit Hub
Layer: Governance / Learning Policy
Purpose: Make training, lessons, private questions, family-teaching support, and Agent Lee knowledge mandatory parts of every product phase.
Inputs: Implementation changes, learner roles, manual progress, question bank, and capability knowledge.
Outputs: Release-blocking learning requirements and evidence expectations.
Mutation Scope: Policy only.
Dependencies: LeeWay Veritas, receipt policy, learning registry, and CI.
Tests: ContinuousLearningArchitectureTests and Verify-ContinuousLearningGate.ps1.
Security Impact: Prevents stale instructions, unsafe hidden changes, and accidental disclosure between commercial and private learning.
Database Impact: None.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 4.0.0
-->

# Continuous Learning Release Gate

Every implementation phase must update the learning system in the same transaction as the code. A phase cannot receive a full LeeWay PASS when the product behavior changes but the humans, instructors, family learners, support staff, or Agent Lee knowledge sources remain stale.

## Mandatory phase surfaces

1. Technical lesson explaining what changed and why.
2. Leonard Lee private workbook with evidence fields.
3. Private question bank and master question archive.
4. Private progress tracker.
5. Commercial manual chapter or an explicit governed explanation that no commercial behavior changed.
6. Generated master manual and measurable progress evidence.
7. Agent Lee knowledge and proctor indexes.
8. Automated tests that prove the learning artifacts exist and agree.
9. Phase receipt recording learning status and truthful incomplete work.

Private answers and family material remain excluded from commercial release. Agent Lee must resolve visibility before retrieval. Future phase scripts must invoke `Verify-ContinuousLearningGate.ps1` before publication. GitHub CI must run the same gate.
