import * as Cesium from 'cesium';
import {
  createRouteClient,
  DEFAULT_VEHICLE,
  MAX_STOPS,
  moveStop,
  optimizeStopOrder,
  fuelEstimate,
  formatFuelPriceProvenance,
  parseCoordinate,
  validPoint,
  createPlannerRequests,
  routeCapability,
} from './routePlannerCore.js';
import {
  formatRouteDistance,
  formatRouteDuration,
} from '../data/routeSteps.js';
import './routePlanner.css';
import { normalizeValhallaUrl } from './valhallaRouting.js';

/** A standalone planner; container controls whether it is visible. No business login required. */
export function mountRoutePlanner({
  viewer,
  container,
  client = createRouteClient(),
  onStatus = () => {},
}) {
  const root = document.createElement('section');
  root.className = 'lw-route-planner';
  root.innerHTML = `<div class="lrp-heading"><h2>Plan your route</h2><button type="button" data-do="close" aria-label="Close route planner">×</button></div><p>Enter addresses or latitude, longitude. Search, then select the exact location.</p><div data-stops></div>
  <div class="lrp-actions"><button type="button" data-do="add">＋ Add stop</button><button type="button" data-do="reverse">Reverse order</button><button type="button" data-do="map">Pick stop on map</button><button type="button" data-do="location">Use my location</button></div>
  <details><summary>Routing server, vehicle and fuel settings</summary>
  <label>Valhalla server URL (optional)<input data-valhalla type="url" placeholder="https://your-routing-server.example"></label>
  <p>Blank uses the public passenger-car service. Your Valhalla server enables truck costing and receives route coordinates. It must allow this app through CORS and contain your driving region. HTTP loopback is supported for local testing.</p>
  <label><input data-hard-exclusions type="checkbox"> Server operator confirms allow_hard_exclusions is enabled</label>
  <div class="lrp-settings">
  <label>Vehicle<select data-profile="type"><option value="car">Passenger car</option><option value="van">Commercial van</option><option value="truck">Rigid truck</option><option value="semi">Semi / tractor trailer</option></select></label>
  <label>Height (m)<input data-profile="heightM" type="number" min="0.1" step="0.1" value="4.1"></label>
  <label>Width (m)<input data-profile="widthM" type="number" min="0.1" step="0.1" value="2.6"></label>
  <label>Length (m)<input data-profile="lengthM" type="number" min="0.1" step="0.1" value="22"></label>
  <label>Gross weight (kg)<input data-profile="grossWeightKg" type="number" min="1" value="36287"></label>
  <label>Axle weight (kg)<input data-profile="axleWeightKg" type="number" min="1" value="9000"></label>
  <label>Axle count<input data-profile="axleCount" type="number" min="2" max="20" step="1" value="5"></label>
  <label>Assumed fuel economy (US MPG)<input data-profile="mpg" type="number" min="0.1" step="0.1" value="25"></label>
  <label>Your fuel price (USD/US gal)<input data-profile="fuelPrice" type="number" min="0" step="0.001" placeholder="Optional"><small data-fuel-provenance>Manual price; no station quote supplied.</small></label>
  </div><label><input data-profile="hazmat" type="checkbox"> Hazardous materials</label><label><input data-profile="oversize" type="checkbox"> Oversize / permit load</label><label><input data-profile="avoidTolls" type="checkbox"> Prefer fewer tolls (Valhalla; may still use tolls)</label>
  <label><input data-profile="excludeTolls" type="checkbox"> Require no toll segments (hard-exclusion server required)</label>
  <p>Valhalla truck costing uses mapped dimensions, weight and hazmat restrictions; incomplete map data and oversize permits remain unverified. Hard exclusion routes with any reported toll segment, including at endpoints, are rejected. Neither provider supplies toll prices.</p>
  <label><input data-preview type="checkbox"> Without Valhalla, allow passenger-road preview for this commercial vehicle (not truck clearance)</label></details>
  <div class="lrp-actions"><button type="button" data-do="plan" class="lrp-primary">Get road route</button><button type="button" data-do="optimize">Optimize stops</button><button type="button" data-do="cancel">Cancel route</button><button type="button" data-do="clear">Clear all</button></div>
  <p role="status" aria-live="polite" data-status>Ready. Start with two locations.</p><div data-result></div><small>Addresses are sent to OpenStreetMap Nominatim. Route coordinates are sent to your configured Valhalla server, or public OSRM when no server is configured. Availability is not guaranteed. © OpenStreetMap contributors.</small>`;
  (container || document.body).append(root);
  const endpointInput = root.querySelector('[data-valhalla]');
  try {
    endpointInput.value =
      localStorage.getItem('leeway.valhalla.url') ??
      (import.meta.env?.VITE_LEEWAY_VALHALLA_URL || '');
  } catch {
    endpointInput.value = import.meta.env?.VITE_LEEWAY_VALHALLA_URL || '';
  }
  let stops = [{ text: '' }, { text: '' }],
    entities = [],
    mapHandler = null,
    route = null,
    fuelPriceProvenance = null;
  const requests = createPlannerRequests();
  const list = root.querySelector('[data-stops]'),
    result = root.querySelector('[data-result]');
  const status = (text) => {
    root.querySelector('[data-status]').textContent = text;
    onStatus(text);
  };
  function removeRoute() {
    for (const e of entities) viewer.entities.remove(e);
    entities = [];
    route = null;
    result.replaceChildren();
    viewer.scene.requestRender?.();
  }
  function disarmMap() {
    mapHandler?.destroy();
    mapHandler = null;
    root.querySelector('[data-do="map"]').textContent = 'Pick stop on map';
  }
  function invalidate() {
    requests.invalidate();
    removeRoute();
  }
  function renderStops() {
    list.replaceChildren();
    stops.forEach((stop, index) => {
      const row = document.createElement('div');
      row.className = 'lrp-stop';
      const label = document.createElement('label');
      label.textContent =
        index === 0
          ? 'Start'
          : index === stops.length - 1
            ? 'Destination'
            : `Stop ${index}`;
      const field = document.createElement('input');
      field.value = stop.text;
      field.placeholder = 'Address or latitude, longitude';
      field.setAttribute('aria-label', label.textContent);
      field.autocomplete = 'off';
      field.addEventListener('input', () => {
        stop.text = field.value;
        stop.point = null;
        stop.candidates = null;
        row.querySelector('select')?.remove();
        row.querySelector('small')?.remove();
        invalidate();
        status('Location changed. Search and select it before routing.');
      });
      label.append(field);
      row.append(label);
      const controls = document.createElement('div');
      controls.className = 'lrp-actions';
      for (const [text, action, disabled] of [
        ['Search', () => search(index), false],
        ['↑', () => reorder(index, index - 1), index === 0],
        ['↓', () => reorder(index, index + 1), index === stops.length - 1],
        [
          'Remove',
          () => {
            invalidate();
            stops.splice(index, 1);
            renderStops();
          },
          stops.length <= 2,
        ],
      ]) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = text;
        button.disabled = disabled;
        button.setAttribute(
          'aria-label',
          `${text} ${label.firstChild.textContent}`,
        );
        button.addEventListener('click', () => void action());
        controls.append(button);
      }
      row.append(controls);
      if (stop.candidates?.length) {
        const select = document.createElement('select');
        select.setAttribute(
          'aria-label',
          `Choose location for stop ${index + 1}`,
        );
        select.add(new Option('Select the matching address', ''));
        stop.candidates.forEach((p, i) =>
          select.add(new Option(p.label, String(i))),
        );
        select.value = stop.point
          ? String(stop.candidates.indexOf(stop.point))
          : '';
        select.addEventListener('change', () => {
          invalidate();
          stop.point =
            select.value === '' ? null : stop.candidates[Number(select.value)];
          status(
            stop.point ? 'Location selected.' : 'Select an address match.',
          );
        });
        row.append(select);
      }
      if (stop.point) {
        const note = document.createElement('small');
        note.textContent = `Selected: ${stop.point.label || `${stop.point.lat}, ${stop.point.lon}`}`;
        row.append(note);
      }
      list.append(row);
    });
    root.querySelector('[data-do="add"]').disabled = stops.length >= MAX_STOPS;
  }
  function reorder(from, to) {
    invalidate();
    stops = moveStop(stops, from, to);
    renderStops();
    status('Stop order changed. Get a new route.');
  }
  async function search(index) {
    invalidate();
    const active = requests.begin();
    const stop = stops[index];
    status('Searching address…');
    try {
      const points = await client.search(stop.text, {
        signal: active.signal,
      });
      if (!active.isCurrent()) return;
      stop.candidates = points;
      stop.point = points.length === 1 ? points[0] : null;
      renderStops();
      status(
        points.length
          ? points.length === 1
            ? 'Location found.'
            : 'Select the matching address from the list.'
          : 'No location found. Try a full street address, city and state.',
      );
    } catch (error) {
      if (active.isCurrent()) status(error.message);
    }
  }
  function profile() {
    const p = { ...DEFAULT_VEHICLE };
    for (const el of root.querySelectorAll('[data-profile]')) {
      const key = el.dataset.profile;
      p[key] =
        el.type === 'checkbox'
          ? el.checked
          : el.type === 'number'
            ? Number(el.value)
            : el.value;
      if (
        el.type === 'number' &&
        (!el.checkValidity() ||
          !Number.isFinite(p[key]) ||
          (key !== 'fuelPrice' && p[key] <= 0))
      )
        throw new Error(
          'Enter valid positive vehicle dimensions, weight and MPG.',
        );
    }
    return p;
  }
  function draw(payload) {
    entities.push(
      viewer.entities.add({
        name: 'Planned road route',
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray(
            payload.geometry.flatMap((p) => [p[0], p[1]]),
          ),
          width: 6,
          material: Cesium.Color.fromCssColorString('#43d9ff'),
          clampToGround: true,
        },
      }),
    );
    stops.forEach((stop, i) =>
      entities.push(
        viewer.entities.add({
          name: stop.point.label || `Stop ${i + 1}`,
          position: Cesium.Cartesian3.fromDegrees(
            stop.point.lon,
            stop.point.lat,
          ),
          point: {
            pixelSize: 13,
            color: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.fromCssColorString('#167da5'),
            outlineWidth: 3,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          },
          label: {
            text: String(i + 1),
            font: 'bold 15px sans-serif',
            pixelOffset: new Cesium.Cartesian2(0, -24),
            fillColor: Cesium.Color.WHITE,
            showBackground: true,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
          },
        }),
      ),
    );
    void viewer.flyTo(entities, { duration: 1 });
    viewer.scene.requestRender?.();
  }
  async function plan(optimize = false) {
    invalidate();
    disarmMap();
    const active = requests.begin();
    try {
      const vehicle = profile(),
        options = {
          signal: active.signal,
          profile: vehicle,
          preview: root.querySelector('[data-preview]').checked,
          valhallaUrl: normalizeValhallaUrl(endpointInput.value),
          hardExclusionsEnabled: root.querySelector('[data-hard-exclusions]')
            .checked,
        };
      routeCapability(vehicle, options.preview, options);
      for (const stop of stops)
        if (!stop.point) stop.point = parseCoordinate(stop.text);
      for (let i = 0; i < stops.length; i++)
        if (!stops[i].point) {
          if (stops[i].candidates?.length > 1) {
            status(`Select the matching address for location ${i + 1}.`);
            list.children[i]?.querySelector('select')?.focus();
            return null;
          }
          status(`Finding location ${i + 1} of ${stops.length}…`);
          const points = await client.search(stops[i].text, {
            signal: active.signal,
          });
          if (!active.isCurrent()) return null;
          stops[i].candidates = points;
          stops[i].point = points.length === 1 ? points[0] : null;
          renderStops();
          if (!stops[i].point) {
            status(
              points.length
                ? `Select the matching address for location ${i + 1}, then get the route again.`
                : `Location ${i + 1} was not found. Try a full address.`,
            );
            list.children[i]?.querySelector('select,input')?.focus();
            return null;
          }
        }
      status(
        optimize
          ? 'Comparing road distances between stops…'
          : 'Finding the road route…',
      );
      let ordered = stops.slice(),
        savedDistance = 0;
      if (optimize) {
        const matrix = await client.matrix(
          stops.map((s) => s.point),
          options,
        );
        if (!active.isCurrent()) return null;
        const optimal = optimizeStopOrder(matrix);
        const old = matrix.reduce(
          (total, row, i) =>
            i ? total + (matrix[i - 1][i] ?? Infinity) : total,
          0,
        );
        savedDistance = Number.isFinite(old)
          ? Math.max(0, old - optimal.distanceM)
          : 0;
        ordered = optimal.order.map((i) => stops[i]);
      }
      const payload = await client.route(
        ordered.map((s) => s.point),
        options,
      );
      if (!active.isCurrent()) return null;
      stops = ordered;
      renderStops();
      route = {
        ...payload,
        vehicle: { ...vehicle },
        preview: options.preview,
        providerEndpoint: options.valhallaUrl || 'public OSRM',
        fuelPriceProvenance,
        stops: ordered.map((stop) => ({ ...stop.point })),
      };
      draw(payload);
      const estimate = fuelEstimate(
        payload.distanceM,
        vehicle.mpg,
        vehicle.fuelPrice,
      );
      const headline = document.createElement('p');
      headline.textContent = `${formatRouteDistance(payload.distanceM)} · ${formatRouteDuration(payload.durationS)} · ${payload.authority}`;
      result.append(headline);
      const costs = document.createElement('p');
      costs.textContent = estimate
        ? `Estimated fuel: ${estimate.gallons.toFixed(1)} US gal${estimate.cost === null ? ' — enter a fuel price to estimate cost' : ` · $${estimate.cost.toFixed(2)} USD`}. Uses your MPG and price; excludes tolls, idling and traffic.`
        : 'Fuel estimate unavailable.';
      if (fuelPriceProvenance && estimate?.cost != null) {
        costs.textContent += ` Price source: ${formatFuelPriceProvenance(fuelPriceProvenance)}`;
      }
      result.append(costs);
      if (optimize) {
        const info = document.createElement('p');
        info.textContent = `Order optimized by road distance with start and destination fixed. Estimated distance reduction: ${formatRouteDistance(savedDistance)}. This is not traffic-aware or a guarantee of minimum fuel use.`;
        result.append(info);
      }
      const details = document.createElement('details'),
        summary = document.createElement('summary');
      summary.textContent = 'Route instructions (not live navigation)';
      details.append(summary);
      const instructions = document.createElement('ol');
      for (const step of payload.steps || []) {
        const li = document.createElement('li');
        li.textContent = `${step.instruction} · ${formatRouteDistance(step.distanceM)}`;
        instructions.append(li);
      }
      details.append(instructions);
      result.append(details);
      status(`Road route ready. ${payload.source}.`);
      return structuredClone(route);
    } catch (error) {
      if (active.isCurrent()) status(error.message);
      return null;
    }
  }
  function addMapStop(point) {
    if (!validPoint(point)) {
      status('Choose a valid location on the map.');
      return;
    }
    const empty = stops.findIndex((s) => !s.text);
    if (stops.length >= MAX_STOPS && empty < 0) {
      status('Maximum 12 locations (10 intermediate stops).');
      return;
    }
    invalidate();
    const stop = {
      text: point.label || `${point.lat.toFixed(6)}, ${point.lon.toFixed(6)}`,
      point: { ...point },
    };
    if (empty >= 0) stops[empty] = stop;
    else stops.splice(stops.length - 1, 0, stop);
    renderStops();
    status('Map location added. Get a new route.');
  }
  const settingsChanged = (event) => {
    if (
      event.target.matches(
        '[data-profile],[data-preview],[data-valhalla],[data-hard-exclusions]',
      )
    ) {
      if (event.target.dataset.profile === 'fuelPrice') {
        fuelPriceProvenance = null;
        root.querySelector('[data-fuel-provenance]').textContent =
          'Manual price; no station quote supplied.';
      }
      invalidate();
      status('Vehicle settings changed. Get a new route.');
    }
  };
  root.addEventListener('input', settingsChanged);
  root.addEventListener('change', settingsChanged);
  endpointInput.addEventListener('change', () => {
    try {
      localStorage.setItem(
        'leeway.valhalla.url',
        normalizeValhallaUrl(endpointInput.value),
      );
    } catch (error) {
      status(error.message);
    }
  });
  root.addEventListener('click', (event) => {
    const action = event.target.closest('[data-do]')?.dataset.do;
    if (!action) return;
    if (action === 'close') close();
    if (action === 'plan') void plan();
    if (action === 'optimize') void plan(true);
    if (action === 'add' && stops.length < MAX_STOPS) {
      invalidate();
      stops.splice(stops.length - 1, 0, { text: '' });
      renderStops();
    }
    if (action === 'reverse') {
      invalidate();
      stops.reverse();
      renderStops();
    }
    if (action === 'cancel') {
      invalidate();
      disarmMap();
      status('Route canceled. Locations kept for editing.');
    }
    if (action === 'clear') {
      invalidate();
      disarmMap();
      stops = [{ text: '' }, { text: '' }];
      renderStops();
      status('All locations and route cleared.');
    }
    if (action === 'location') {
      if (!navigator.geolocation) {
        status('Location is unavailable in this browser.');
        return;
      }
      const active = requests.capture();
      status('Waiting for location permission…');
      navigator.geolocation.getCurrentPosition(
        (p) => {
          if (active.isCurrent())
            addMapStop({
              lat: p.coords.latitude,
              lon: p.coords.longitude,
              label: 'My location',
            });
        },
        (e) => {
          if (active.isCurrent()) status(`Location unavailable: ${e.message}`);
        },
        { timeout: 15000 },
      );
    }
    if (action === 'map') {
      if (mapHandler) {
        disarmMap();
        status('Map selection canceled.');
        return;
      }
      status('Click the map to add a stop before the destination.');
      root.querySelector('[data-do="map"]').textContent = 'Cancel map pick';
      mapHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      mapHandler.setInputAction((event) => {
        const ray = viewer.camera.getPickRay(event.position);
        const position =
          (ray && viewer.scene.globe.pick(ray, viewer.scene)) ||
          viewer.camera.pickEllipsoid(event.position);
        if (!position) {
          status('Choose a location on the globe.');
          return;
        }
        const c = Cesium.Cartographic.fromCartesian(position);
        disarmMap();
        addMapStop({
          lat: Cesium.Math.toDegrees(c.latitude),
          lon: Cesium.Math.toDegrees(c.longitude),
        });
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
  });
  function open() {
    root.hidden = false;
    root.classList.add('open');
    root.querySelector('input')?.focus();
  }
  function close() {
    root.hidden = true;
    root.classList.remove('open');
    disarmMap();
  }
  function toggle(force) {
    (force ?? root.hidden) ? open() : close();
  }
  renderStops();
  close();
  return {
    root,
    open,
    close,
    toggle,
    plan,
    optimize: () => plan(true),
    addMapStop,
    setFuelPrice(value, provenance) {
      const price = Number(value);
      if (!Number.isFinite(price) || price <= 0) {
        status('Fuel price must be a positive USD per US gallon amount.');
        return false;
      }
      invalidate();
      root.querySelector('[data-profile="fuelPrice"]').value = String(price);
      fuelPriceProvenance =
        String(provenance || '')
          .trim()
          .slice(0, 400) || null;
      root.querySelector('[data-fuel-provenance]').textContent =
        formatFuelPriceProvenance(fuelPriceProvenance);
      status('Fuel price updated. Get a new route to refresh the estimate.');
      return true;
    },
    clear() {
      invalidate();
      disarmMap();
      stops = [{ text: '' }, { text: '' }];
      renderStops();
      status('All locations and route cleared.');
    },
    getState: () => structuredClone({ stops, route, fuelPriceProvenance }),
    destroy() {
      invalidate();
      disarmMap();
      root.remove();
    },
  };
}
