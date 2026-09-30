# LeeWay Logistics — Transit World

LeeWay Logistics Transit World is the spatial operating surface for the LeeWay Logistics platform.

It combines a live 3D world with trucking, dispatch, fleet operations, public transit context, driver operations, customer/broker CRM, maintenance, facilities, terminals, HR/onboarding, and Agent Lee assistance.

## Product identity

This is a **LeeWay product**.

Primary identity:
- Product: **LeeWay Logistics**
- Spatial operating surface: **Transit World**
- AI assistant: **Agent Lee**
- Default local model: **Gemma 4 E4B through Ollama**
- Governance: LeeWay Standards / Veritas / receipts / human authority

The world is not a decorative map. It is a spatial view over governed business records.

## World-first workflow

WORLD → REGION → CITY → FACILITY → ROUTE → VEHICLE → DRIVER → LOAD → CONTRACT → DOCUMENT

Operators can use the same governed records through:
- world view
- map view
- CRM boards
- dispatch workspaces
- driver cockpit
- maintenance workbench
- HR/onboarding
- load-board workflows
- terminal/warehouse operations

## Agent Lee

Agent Lee is the local AI assistant for Transit World.

The default model is:

```text
gemma4:e4b
```

Agent Lee connects to a local Ollama runtime and does not fabricate an AI response when the model is unavailable.

Example local setup:

```powershell
ollama pull gemma4:e4b
ollama run gemma4:e4b
```

For the public GitHub Pages site, the browser connects to the local Ollama endpoint on the user's own device when explicitly allowed. GitHub Pages itself does not host the model.

## Current route boundary

The current visual road route remains:

```text
OSRM_CAR_BASE_ONLY
```

That means:
- useful for road-following visualization
- not a truck-safe route claim
- truck safety remains UNVERIFIED until authoritative truck restrictions are connected

The LeeWay truck route authority is designed to incorporate height, width, length, gross weight, axle weight, hazmat, HGV/access restrictions, bridge/tunnel clearance, grade, facility approach, weather, traffic, HOS, and appointments.

## Verified implementation

Current repository evidence includes:
- Transit World LeeWay tests: 21/21 PASS
- Transit World production build: PASS
- Transit Hub test suite: 68/68 PASS
- Pages deployment workflow: PASS
- GitHub Pages project-path assets: verified
- Cesium runtime assets: verified HTTP 200
- Driver Cockpit training fallback: implemented
- private/public transit feed separation: verified

See the repository-level `receipts/` directory.

## Spatial engine lineage and appreciation

LeeWay Transit World includes source code derived from the MIT-licensed **God's Eye View** project by **Bilawal Sidhu**, pinned from upstream commit:

```text
b210ab0fe4d71c7faa0268134e0aa5f3c53fc7fe
```

LeeWay appreciates that open-source spatial work and preserves the required license/provenance.

That project is an **upstream spatial-engine lineage**, not the product identity of LeeWay Logistics.

See:
- `../../docs/licensing/THIRD-PARTY-SPATIAL-PROVENANCE.md`
- `../../integrations/source-manifest.json`
- `LICENSE`
- `THIRD_PARTY_NOTICES.md`

## Run locally

Requirements:
- Node 24.14+ or Node 26
- Ollama for local Agent Lee / Gemma 4

```powershell
cd apps/transit-world
npm ci
npm run doctor
npm run dev
```

Open:

```text
http://localhost:4173
```

## Public site

LeeWay Transit World is deployed through GitHub Pages from the repository root workflow:

```text
https://4citeb4u.github.io/LEEWAY-LOGISTICS-/
```

The Pages version uses training/demo fallback data when the local Transit Hub backend is unavailable. It never labels those fixtures as live GPS or production records.

---

**LeeWay principle:** AI should increase human capability, not replace human responsibility.

## Public browser deployment

The maps run directly in the browser on GitHub Pages and Vercel. No phone packages or local model are required to view or operate the maps. Local Agent Lee model setup above is optional and separate. See [deployment and source boundaries](DEPLOYMENT.md).

The personal edition now lives in the independent [Leeway-Maps repository](https://github.com/4citeB4U/Leeway-Maps).
