# Regional self-hosted Valhalla

This deployment uses the official Valhalla image and OpenStreetMap data. It avoids per-route commercial API charges. Hosting, storage, updates, and operational validation remain the operator's responsibility. The initial proof uses **District of Columbia only**, not nationwide routing.

The [retained runtime proof](./runtime-proof.json) records Valhalla `3.9.0-f56b53a1c` on Docker Desktop/Linux amd64, a 7.772 km truck route with hazmat/dimensions supplied, rejection of that trip when bridges and tunnels are excluded, and rejection of Chicago coordinates outside this graph. The [dataset proof](./dataset-proof.json) records the dated extract and verified hashes. These are dated observations, not an always-live connection or truck-safety certification. The idle service used approximately 84 MiB during qualification.

## Start

Requirements: an authorized Docker host with Compose, at least 2 GiB spare memory, a dedicated writable data directory, and internet access for the initial image and regional extract. No browser, phone OS, model, or absolute host path is part of the contract. Linux containers on this Windows Docker host are the initial test adapter; other hosts require their own qualification.

1. Set `VALHALLA_DATA_DIR` to your dedicated absolute data directory and optionally `VALHALLA_PORT` (default 8002). See `.env.example`; keep environment files and downloaded tiles outside Git.
2. Download the approximately 21 MB [DC extract](https://download.geofabrik.de/north-america/us/district-of-columbia.html) into that directory as `district-of-columbia.osm.pbf`. Record the resolved dated URL and SHA-256. Do not substitute a national extract without a separate capacity plan.
3. From the repository root run `docker compose -f integrations/valhalla/compose.yml up -d`.
4. Inspect `docker compose -f integrations/valhalla/compose.yml logs --tail 80`; graph construction must finish before routing is usable.
5. Run `node integrations/valhalla/verify.mjs` and retain its output as a dated receipt. A successful `/status` alone is insufficient.

POSIX environment example: `export VALHALLA_DATA_DIR=/absolute/path/to/valhalla-data`.
PowerShell example: `$env:VALHALLA_DATA_DIR = 'C:/authorized/work/valhalla-data'`.
The variable is a replaceable host binding. Compose binds only `127.0.0.1`, caps memory at 2 GiB and CPU at two cores, and does not restart automatically after host reboot. Stop with `docker compose -f integrations/valhalla/compose.yml down`; data stays intact.

The image is pinned to its official multi-architecture digest. Updating it is an explicit operation followed by rebuilding and verification. Startup generates default configuration if absent, enables `service_limits.allow_hard_exclusions`, and starts the official tile-builder/service. Elevation, transit, external speed configuration, and timezone downloads are disabled for this bounded proof. Time-dependent/timezone coverage is therefore **not qualified**. Administration data is built from the local extract.

Existing tile archives are reused. To intentionally update map data, stop this deployment, retain the previous dataset and receipt, place the approved new regional PBF in a separate dedicated data directory, point `VALHALLA_DATA_DIR` there, and rebuild/verify before switching clients. This avoids confusing an updated download with an updated routing graph.

## Client contract

The local adapter exposes `POST http://127.0.0.1:8002/route` and the standard Valhalla APIs. A remotely installed PWA cannot reach this workstation by using its own `localhost`; production phone access needs an explicitly configured authenticated HTTPS adapter. This setup deliberately creates no public endpoint.

For a local browser client, send the JSON request body with `Content-Type: text/plain`. The qualified image returns `Access-Control-Allow-Origin: *`, accepts that body, but returns HTTP 405 for OPTIONS: `application/json` would trigger a failing browser preflight. HTTPS pages may additionally require explicit local-network permission; a successful Node request does not establish a phone/browser connection.

Use `costing: "truck"` with `costing_options.truck`. Dimensions are meters; weight and axle load are metric tonnes. Supported inputs include `height`, `width`, `length`, `weight`, `axle_load`, `axle_count`, and `hazmat`. Keep `hgv_no_access_penalty: 43200` and `ignore_restrictions: false`. Do not use passenger-car routes as truck validation. Request `format: "osrm", shape_format: "geojson"` for GeoJSON geometry.

Hard `exclude_tolls`, `exclude_highways`, `exclude_ferries`, `exclude_bridges`, and `exclude_tunnels` need the enabled server flag. They can yield no route and may still allow the excluded feature at the route's start/end. Clients must inspect warnings, errors, and returned geometry; `use_tolls: 0` is only a preference. Do not silently fall back to car routing after a truck request fails.

OSM restriction completeness varies. A generated route does not prove lawful hazmat/oversize operation, bridge clearance, permit compliance, weather safety, current construction, fuel prices, or toll charges. This graph includes no live traffic or closure subscription. Routing outside the regional extract must fail visibly. Address lookup is a separate geocoder; Valhalla accepts coordinates.

## Provenance

- [Official Docker source and configuration](https://github.com/valhalla/valhalla/blob/master/docker/README.md)
- [Official installation guide](https://valhalla.github.io/valhalla/start/installation/)
- [Official routing API and costing options](https://valhalla.github.io/valhalla/api/route/api-reference/)
- [Geofabrik DC extract](https://download.geofabrik.de/north-america/us/district-of-columbia.html)
- Map data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), ODbL. Preserve attribution and applicable data-distribution obligations.

`CONTRACT_PORTABLE` describes these relative files and explicit configuration. `ADAPTER_IMPLEMENTED` describes this Docker recipe. Only a successful retained runtime receipt establishes `PLATFORM_TESTED` for a particular host, image, and dataset.
