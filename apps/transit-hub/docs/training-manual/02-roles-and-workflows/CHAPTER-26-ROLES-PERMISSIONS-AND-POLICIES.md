<!--
LEEWAY ENTERPRISE FILE HEADER
File: CHAPTER-26-ROLES-PERMISSIONS-AND-POLICIES.md
Path: docs/training-manual/02-roles-and-workflows/CHAPTER-26-ROLES-PERMISSIONS-AND-POLICIES.md
Project: LeeWay Enterprise Transit Hub
Layer: Training Manual / Governed Chapter
Purpose: Teach Chapter 26 — Roles, Permissions, and Policy-Based Authorization with role-specific procedures, evidence, exercises, and Agent Lee proctor guidance.
Inputs: Current Phase 04 implementation, official ASP.NET Core security guidance, LeeWay policies, and transportation workflows.
Outputs: Commercial training chapter source included in the generated master manual.
Mutation Scope: Documentation only.
Dependencies: Phase 04 security contracts, learning gate, and manual builder.
Tests: Manual build, chapter count, architecture tests, and human review.
Security Impact: Teaches fail-closed identity, tenant, permission, privacy, and service-account boundaries.
Database Impact: Documents future persistence enforcement; no database mutation.
Sovereign Cycle: Perception -> Origin -> Structure -> Execution -> Veritas -> Echo -> Synthesis -> Lee Prime
Status: ACTIVE / GOVERNED
Human Comprehension: REQUIRED
Owner: Leonard Lee / Leeway Industries
Version: 4.0.0
-->

# Chapter 26 — Roles, Permissions, and Policy-Based Authorization

## Purpose

This chapter explains how the Transit Hub converts organizational responsibility into testable authorization policies. Roles express who a subject is within the operating model. Permissions express classes of allowed operations. Policies combine authentication, claims, tenant requirements, and role rules into named decisions that endpoints can require.

## Learning objectives

A learner should be able to explain why role checks alone are insufficient, read the role-permission matrix, trace a named policy, distinguish declarative and imperative authorization, and identify the authorization decision that belongs at the HTTP boundary versus the resource boundary.

## Canonical roles

Phase 04 defines PlatformOwner, TenantOwner, TenantAdministrator, FleetManager, Dispatcher, SafetyManager, Mechanic, Driver, Viewer, and AgentService. The names are canonical and case-insensitive at ingestion. Unknown roles are rejected instead of silently accepted. This protects the application from misspelled or invented authority such as `SuperUnlimitedUser`.

The role catalog is intentionally small. A role should represent a stable job responsibility, not every button in the interface. A large fleet may eventually add custom role bundles, but custom bundles must still resolve to governed permissions. The platform must avoid role explosion, where dozens of nearly identical roles become impossible to review.

## Permission vocabulary

The initial permission vocabulary includes platform administration, tenant administration, fleet read, fleet manage, dispatch manage, maintenance manage, safety manage, training proctor, and agent tool execute. Permissions are lower-level than roles. For example, a FleetManager receives fleet read and fleet manage, while a Viewer receives only fleet read. AgentService receives fleet read, training proctor, and agent tool execute, but not platform administration.

The matrix in `TransitPermissions.cs` is a foundation for explanation and testing. In a production system, assignments may be stored in an identity or authorization service, but the canonical permission vocabulary remains part of the application contract. Any dynamic assignment system must preserve the same deny-by-default behavior and audit trail.

## Policy construction

`TransitSecurityServiceCollectionExtensions.cs` registers named policies. `TransitHub.Authenticated` requires a verified subject. `TransitHub.TenantMember` adds the tenant-access requirement. Fleet read and fleet manage policies require the corresponding permission claim and a matching tenant. Platform administration requires the PlatformOwner role and platform administration permission. Agent tool execution requires authentication, the AgentService role, the agent tool execute permission, the Transit Hub capability claim, and a matching tenant.

A named policy prevents controllers from rebuilding security logic differently. The endpoint declares the policy, while the composition root registers its meaning. Tests can inspect both the permission catalog and the live endpoint result.

## Authentication is not authority

A successful sign-in produces identity information. It does not answer every access question. A driver and fleet manager may both authenticate correctly, but only the fleet manager should pass `TransitHub.FleetManage`. A subject can also authenticate for one tenant and attempt to send a different tenant header. The tenant-access requirement blocks that cross-tenant request.

## Declarative authorization

Declarative authorization uses `[Authorize(Policy = ...)]` on a controller or action. This is appropriate when the decision can be made from the authenticated identity, claims, request tenant, and fixed policy. The Phase 04 evidence controller uses declarative policies for `whoami`, tenant member, fleet read, fleet manage, and agent tool endpoints.

Declarative checks happen before the action executes. This is valuable because denied requests never enter business logic. The controller remains thin and does not manually parse role strings.

## Resource-based authorization

Some decisions require the actual resource. For example, a dispatcher may be allowed to update trips only in an assigned region, a mechanic may close only work orders assigned to the mechanic’s depot, or a driver may read only the driver’s own inspection. The application must load the resource, then call `IAuthorizationService.AuthorizeAsync` with the resource and operation. Hiding an edit button or attaching only a broad role policy is not sufficient.

The future database phase must combine policy authorization with tenant-filtered repositories and resource ownership. Authorization at one layer does not eliminate the need for defense in depth.

## Default deny and least privilege

The Transit Hub follows default deny. A role receives only listed permissions. An unknown role is rejected. A missing claim does not imply a default tenant or permission. A missing capability denies Agent Lee tool execution. Platform administration is not inherited by AgentService. These rules make failure explicit and reduce accidental privilege.

Least privilege must be reviewed when job responsibilities change. Removing a user from a job must remove the corresponding role. Temporary elevated access requires an expiration and receipt. Support personnel should use controlled support access rather than permanent tenant-owner authority.

## UI behavior

The Web application may hide controls that the current subject cannot use, but UI visibility is not the security boundary. A user can call an API directly. The API must repeat the authorization check. The UI should treat policy results as presentation guidance and the API as final enforcement.

## Guided lab

1. Read `TransitRoles.cs`, `TransitPermissions.cs`, and `TransitPolicies.cs`.
2. Identify the permissions assigned to Viewer, FleetManager, TenantOwner, and AgentService.
3. Call the fleet-manage endpoint as FleetManager and confirm HTTP 200.
4. Call the same endpoint as Viewer and confirm HTTP 403.
5. Call the agent-tool endpoint as AgentService without the capability claim and confirm HTTP 403.
6. Add the exact capability claim and confirm HTTP 200.
7. Explain why the capability claim does not give platform administration.

## Troubleshooting

When a valid user receives 403, inspect the named policy, canonical role, derived permission claims, tenant match, and capability claim. Do not solve the problem by granting PlatformOwner. Determine the smallest missing authority. When a user receives 401, inspect authentication before authorization.

## Agent Lee proctor instructions

Ask the learner to map a real transportation job to roles and permissions, then challenge an overbroad assignment. Require the learner to explain declarative versus resource-based authorization and why UI hiding is not enforcement. Score the learner against evidence in the policy registration and runtime status codes.
