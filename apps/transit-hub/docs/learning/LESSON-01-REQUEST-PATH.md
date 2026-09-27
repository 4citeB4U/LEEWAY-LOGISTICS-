<!--
LEEWAY ENTERPRISE FILE HEADER
File: LESSON-01-REQUEST-PATH.md
Path: docs/learning/LESSON-01-REQUEST-PATH.md
Project: LeeWay Enterprise Transit Hub
Layer: Learning / C# Foundation
Purpose: Teach the first complete C# request path.
Inputs: Foundation source and runtime output.
Outputs: Human understanding of controller, service, interface, repository, entity, and test.
Mutation Scope: Learning documentation only.
Dependencies: Domain, Application, Infrastructure.InMemory, API, and UnitTests.
Tests: Seven comprehension answers and endpoint demonstration.
Security Impact: Prevents blind acceptance.
Database Impact: Prepares for repository replacement.
Sovereign Cycle: Perception -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 1.0.0
-->

# Lesson 01: Follow the First Request Path

Read these files in order:

1. `Domain/Entities/Vehicle.cs`
2. `Application/Abstractions/IVehicleRepository.cs`
3. `Application/Services/VehicleService.cs`
4. `Infrastructure.InMemory/Repositories/InMemoryVehicleRepository.cs`
5. `Api/Controllers/VehiclesController.cs`
6. `Api/Program.cs`
7. `UnitTests/VehicleTests.cs`

## Request path

`GET /api/vehicles -> VehiclesController -> VehicleService -> IVehicleRepository -> InMemoryVehicleRepository -> Vehicle -> JSON`

## Questions

- Why does the controller call a service instead of a dictionary?
- Why does the service depend on an interface?
- Which class changes when SQL Server replaces memory?
- Which Vehicle properties cannot be changed directly?
- Which test proves a blank fleet number is rejected?
- Where is dependency injection configured?
- What is the difference between build PASS and behavior-test PASS?
