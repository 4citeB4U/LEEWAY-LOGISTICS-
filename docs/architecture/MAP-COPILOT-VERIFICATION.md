# Map copilot continuation verification

## Implemented behavior

- Review route runs from the selected planner snapshot without a language model: addresses, miles, provider duration, vehicle, route authority, estimated gallons and cost with price provenance. Missing prices and model connections do not fabricate answers.
- Driver-facing planner distances use miles and feet. Provider requests retain SI units.
- An incoming shared address opens Directions with the destination prefilled.
- Drive Mode provides an Agent Lee control and a closeable copilot panel. Opening it and receiving a reply do not automatically focus the text input while driving. Voice readiness remains visible.
- Missing command handlers, GPS failures and failed optimization cannot produce a completed-action message. Negated and conditional requests do not trigger deterministic keyword actions.
- Offline navigation failures open the self-contained saved-trip viewer, including direct index and shared-address launches. The service worker only caches shipped static directories and its standalone offline assets; private API JSON and external live feeds are excluded.

## Evidence

- `node --test src/leeway/*.test.mjs`: 119 tests passed, zero failed. Includes malformed/stale GPS, route cancellation, model-independent route briefings, failed commands, fuel provenance, offline navigation fallback, and exclusion of private/API/cross-origin requests from the cache.
- Production build passed. Existing large-chunk warnings and missing upstream submarine-cable dataset warning remain.
- Browser: selected Chicago Union Station's street address and Navy Pier at 600 East Grand Avenue through live geocoding. OSRM returned a 3.0-mile route. Recalled both recent addresses after reload and calculated the route again. Saved-trip timestamp and Go control appeared.
- Browser: Go entered Drive Mode, Agent Lee opened, and Review route returned the selected route facts with no connected model. Actual browser GPS was unavailable; guidance stayed paused and speed remained unknown.
- Responsive browser verification at 390 × 844: after repairing the copilot overlap, the instruction ended at y=318.98, the copilot began at y=331 and ended at y=710, and the speed/footer began at y=742.67. The panel fits between guidance and footer; temporary viewport settings were reset.
- Browser: a shared address launch opened Directions and prefilled `600 E Grand Ave, Chicago, IL`.
- A connected Android Device Bridge returned checksum-verified model metadata and a test inference response. This only verifies that adapter path, not a particular preferred model, voice identity, or logistics reasoning quality.

## Outstanding product gates

These are not marked complete by this continuation:

- Physical Android installation, correct live GPS following, cloned voice playback and microphone interruption, model selection and grounding qualification.
- Downloaded regional street basemap, offline geocoding and offline routing graph. The current offline feature preserves a previously calculated trip; it cannot create arbitrary new road routes offline.
- Production Vercel account/project, authenticated tenants, Redis and TURN configuration, phone-to-phone media qualification, and production data-provider credentials/coverage.
- A configured and qualified truck routing region, current restriction coverage, permit/HOS integration, complete weigh-station coverage, exact toll prices and verified station-specific prices.
- Full transportation CRM/provider onboarding, broker/load-board connectors, document OCR, commercial shipment telemetry, route-corridor camera selection, complete flight endpoints and local place/history knowledge packs.
- Canonical task-specific Formula evaluation. Bounded endpoint health does not supply or verify a task-to-Formula input mapping.

The existing globe and upstream attribution are retained. Agent Lee remains a copilot; system-owned route, cost and provenance facts do not depend on model inference.
