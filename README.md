# LeeWay Logistics

LeeWay Logistics is a world-first logistics operating system combining a spatial transportation command center, a connected Monday-style CRM, a full Transit Hub, trucking operations, load management, fleet/maintenance, driver operations, HR/onboarding, employment workflows, and LeeWay governance.

## Product vision

The default experience is a living 3D world. An authorized user can begin at the globe, search for an address or operational entity, and move from world to region to facility to route to vehicle to driver to load while preserving context.

The world is not a decorative map. It is the operating surface for logistics.

## Core experiences

- Transit World: 3D terrain, roads, buildings, weather, traffic, public transit, CCTV, private fleet, routes, terminals, facilities, and tracked assets.
- Driver Cockpit: active load, route, HOS, truck profile, documents, broker/customer information, DVIR, detention, and route-safety state.
- Dispatch World View: fleet, loads, drivers, routes, exceptions, facilities, terminals, maintenance, and customer/broker relationships.
- Logistics CRM: accounts, contacts, brokers, shippers, consignees, facilities, activities, communications, documents, cases, and workflow automation.
- Load Board: available loads, offers, confirmations, assignments, load chaining, deadhead analysis, rate/profit analysis, appointments, and status.
- Transit Hub: trucking, freight, municipal transit, school transportation, paratransit, delivery/service fleets, terminals, maintenance, safety, inspections, incidents, and reporting.
- People Operations: recruiting, employment board, applications, driver qualification, onboarding, training, credentials, scheduling, reviews, safety records, and offboarding.
- Fleet & Maintenance: assets, telemetry, inspections, work orders, preventive maintenance, roadside events, service hubs, fuel, tires, and repair history.
- Governance: Veritas gates, receipts, provenance, tenant separation, human approval, and LeeWay Formula integration.

## Current verified implementation

- Transit Hub baseline: 68 tests passed, 0 failed before promotion.
- Spatial upstream baseline: 5,055 tests passed, 0 failed, 10 skipped before LeeWay integration.
- LeeWay integration tests: 21/21 passed.
- Production spatial build: 697 modules transformed and built successfully.
- Runtime bridge: PASS_DRIVER_COCKPIT_AND_RUNTIME_BRIDGE.
- Private LeeWay fleet remains separate from public transit feed registry.
- Current training vehicle: LW-1001.
- Current active training load: LW-DEMO-0001.
- OSRM car routing is used only as a visual/base route.
- Truck-safe routing remains UNVERIFIED until truck restriction evidence is connected.
- Canonical LeeWay Formula execution is not yet bound and is not claimed.

See receipts/leeway-transit-world-runtime-receipt.json.

## Repository layout

apps/transit-world - Spatial world, Driver Cockpit, world layers
apps/transit-hub - Enterprise Transit Hub backend and tests
domains/domain-registry.json - Product domain map
integrations/source-manifest.json - Source/provenance authorities
docs - Architecture, research, licensing
scripts/Start-LeeWayTransitWorld.ps1 - Reproducible local runtime proof
receipts - Execution evidence

## Authority

LeeWay Logistics is the product umbrella. Existing LeeWay repositories remain provenance/source authorities until a capability is deliberately migrated and verified here.

Principle: AI should increase human capability, not replace human responsibility.

Execution discipline: Investigate -> Diagnose -> Plan -> Implement -> Test -> Validate -> Repair -> Retest -> Verify -> Evidence.

No claim of LIVE, SAFE, VERIFIED, READY, or COMPLETE is valid without evidence.

## Agent Lee / Gemma 4

LeeWay Logistics uses **Agent Lee** as the product assistant.

Default local model:

```text
gemma4:e4b
```

The public Transit World UI connects to a local Ollama runtime when available. GitHub Pages does not host the model and does not silently substitute a cloud model.

Agent Lee is governed by LeeWay Standards and must preserve human authority, distinguish training/demo data from live records, and never promote an unverified visual road route into a truck-safe claim.

See `docs/AGENT-LEE-GEMMA4.md`.

## Spatial engine appreciation

LeeWay Transit World includes MIT-licensed spatial-engine lineage from **God's Eye View** by **Bilawal Sidhu**. That contribution is credited in the licensing/provenance documentation and inside Transit World.

The product identity, logistics workflows, Transit Hub, CRM architecture, Driver Cockpit, Agent Lee integration, governance, and product roadmap are LeeWay components.
