import * as Cesium from 'cesium';
import { createRouteClient, DEFAULT_VEHICLE } from './routePlannerCore.js';
import { addLoadCandidate, choiceEvent, parseLoadIntake } from './loadIntakeCore.js';
import { buildTriangulation, estimateTriangleEconomics } from './triangulationCore.js';

const COLORS = ['#4be7ff', '#ffb659', '#b38cff'];
const LETTERS = ['A', 'B', 'C'];

function money(value) {
  return Number.isFinite(Number(value))
    ? `$${Number(value).toLocaleString('en-US', { maximumFractionDigits: 2 })}`
    : 'Not supplied';
}
function safeStorage() { try { return globalThis.localStorage; } catch { return null; } }
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
}
function routeProfile(mpg) {
  return { ...DEFAULT_VEHICLE, type: 'semi', mpg: Number(mpg) || 6.5 };
}
function recordLocal(key, event) {
  const storage = safeStorage();
  try {
    const prior = JSON.parse(storage?.getItem(key) || '[]');
    storage?.setItem(key, JSON.stringify([...prior.slice(-49), event]));
  } catch {}
}

export function mountLoadComparison({ viewer, client = createRouteClient(), onStatus = () => {} } = {}) {
  if (!viewer || document.getElementById('leeway-load-comparison')) return null;
  const root = document.createElement('section');
  root.id = 'leeway-load-comparison';
  root.hidden = true;
  root.innerHTML = `<header><div><small>LEEWAY LOGISTICS PRO · DISPATCH COPILOT</small><h2>Loads and trip triangle</h2><p>Build up to three load legs, close the loop to the driver’s home base, and inspect the planning math before any dispatcher books or assigns work.</p></div><button type="button" data-action="close" aria-label="Close dispatch planning">×</button></header>
  <details open><summary>Broker tender intake</summary><textarea data-intake aria-label="Broker tender text" placeholder="Broker: Northstar\nLoad ID: 123\nPickup: 100 N Main St, Milwaukee, WI 53202\nDelivery: 1 S Pinckney St, Madison, WI 53703\nRate: $2,800"></textarea><div class="llc-actions"><button type="button" data-action="parse">Extract draft</button><label class="llc-file">Scan or attach tender<input data-document type="file" accept="image/*,.txt,.eml,.pdf" capture="environment"></label><button type="button" data-action="clear-draft">Clear draft</button></div><p class="llc-note" data-document-status>Paste text now. The camera control can capture a phone image; local OCR is only used when an authorized recognition adapter is connected, so an image is never presented as extracted text before that happens.</p></details>
  <form data-draft><div class="llc-grid"><label>Broker<input name="broker" autocomplete="organization"></label><label>Reference<input name="reference"></label><label>Pickup street address<input name="pickup" required placeholder="Street, city, state ZIP"></label><label>Delivery street address<input name="delivery" required placeholder="Street, city, state ZIP"></label><label>Equipment<input name="equipment" placeholder="Dry van, reefer, flatbed…"></label><label>Commodity<input name="commodity" placeholder="Freight description"></label><label>Offer rate USD<input name="rate" type="number" min="0" step="0.01"></label></div><div class="llc-actions"><button type="submit">Add to comparison</button><button type="button" data-action="map-offers">Map separate offers</button><button type="button" data-action="clear-offers">Clear comparison</button></div></form>
  <p class="llc-status" role="status" aria-live="polite">Add up to three offers. Pickup, delivery, and home base must be actual street addresses.</p><div data-offers class="llc-offers"></div>
  <details open class="llc-triangle"><summary>Dispatcher trip triangle</summary><p>Choose the offers in run order. The system returns from the last delivery to the driver’s home base, then shows a planning estimate. It does not book freight, certify hours of service, or prove truck restrictions.</p><div class="llc-grid"><label>Driver home base<input name="homeBase" data-home-base placeholder="Street, city, state ZIP"></label><label>Truck MPG<input name="mpg" data-mpg type="number" min="1" step="0.1" value="6.5"></label><label>Fuel price per gallon USD<input name="fuelPrice" data-fuel-price type="number" min="0" step="0.01" value="4.00"></label></div><div class="llc-actions"><button type="button" data-action="map-triangle">Map selected triangle</button><button type="button" data-action="save-triangle">Save local dispatch draft</button></div><div class="llc-triangle-summary" data-triangle-summary>Set a home base, select one to three offers, then map the closed-loop plan.</div></details>`;
  document.body.append(root);
  const form = root.querySelector('[data-draft]');
  const intake = root.querySelector('[data-intake]');
  const status = root.querySelector('.llc-status');
  const documentStatus = root.querySelector('[data-document-status]');
  const offersElement = root.querySelector('[data-offers]');
  const triangleSummary = root.querySelector('[data-triangle-summary]');
  const entities = [];
  let offers = [];
  let sequence = 0;
  let lastTriangle = null;

  const say = (message) => { status.textContent = message; onStatus(message); };
  const removeEntities = () => {
    for (const entity of entities.splice(0)) viewer.entities.remove(entity);
    viewer.scene.requestRender?.();
  };
  function drawLine(route, color, name) {
    entities.push(viewer.entities.add({
      name,
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray(route.geometry.flatMap(([lon, lat]) => [lon, lat])),
        width: 6,
        material: Cesium.Color.fromCssColorString(color),
        clampToGround: true,
      },
    }));
  }
  function drawPoint(point, label, color) {
    entities.push(viewer.entities.add({
      name: label,
      position: Cesium.Cartesian3.fromDegrees(point.lon, point.lat),
      point: { pixelSize: 13, color: Cesium.Color.fromCssColorString(color), outlineColor: Cesium.Color.WHITE, outlineWidth: 2, heightReference: Cesium.HeightReference.CLAMP_TO_GROUND },
      label: { text: label, font: 'bold 13px sans-serif', fillColor: Cesium.Color.WHITE, showBackground: true, pixelOffset: new Cesium.Cartesian2(0, -22), heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, disableDepthTestDistance: Number.POSITIVE_INFINITY },
    }));
  }
  function render() {
    offersElement.replaceChildren();
    offers.forEach((offer, index) => {
      const article = document.createElement('article');
      article.className = 'llc-offer';
      article.style.setProperty('--offer-color', COLORS[index]);
      article.innerHTML = `<label class="llc-select"><input type="checkbox" data-triangle-offer="${index}" checked> Include in triangle as leg ${index + 1}</label><strong>Offer ${LETTERS[index]} · ${escapeHtml(offer.reference || 'No reference')}</strong><span>${escapeHtml(offer.broker)}</span><p><b>${LETTERS[index]}1</b> ${escapeHtml(offer.pickup)}</p><p><b>${LETTERS[index]}2</b> ${escapeHtml(offer.delivery)}</p><small>${escapeHtml(offer.equipment || 'Equipment not supplied')} · ${money(offer.rate)}</small><div class="llc-actions"><button type="button" data-choice="PREFER" data-index="${index}">Prefer this load</button><button type="button" data-choice="ASK_DISPATCH" data-index="${index}">Ask dispatch</button><button type="button" data-choice="CANNOT_TAKE" data-index="${index}">Cannot take</button><button type="button" data-remove="${index}">Remove</button></div>`;
      offersElement.append(article);
    });
    if (!offers.length) offersElement.textContent = 'No load offers in comparison.';
  }
  function draftFrom(value) {
    for (const [name, fieldValue] of Object.entries(value)) {
      const input = form.elements.namedItem(name);
      if (input) input.value = fieldValue ?? '';
    }
  }
  async function resolveAddress(address, label) {
    const rows = await client.search(address);
    if (!rows.length) throw new Error(`${label} could not be found. Confirm the street address and ZIP code.`);
    // Nominatim ranks the textual address matches. We disclose the top match instead
    // of turning a typed address into raw latitude/longitude in the operator UI.
    return rows[0];
  }
  async function mapOffers() {
    if (!offers.length) { say('Add one or more offers before mapping them.'); return; }
    removeEntities();
    const mapped = [];
    try {
      for (let index = 0; index < offers.length; index += 1) {
        const offer = offers[index];
        say(`Finding the top map match for offer ${LETTERS[index]}…`);
        const pickup = await resolveAddress(offer.pickup, `Offer ${LETTERS[index]} pickup`);
        const delivery = await resolveAddress(offer.delivery, `Offer ${LETTERS[index]} delivery`);
        const route = await client.route([pickup, delivery], { profile: routeProfile(root.querySelector('[data-mpg]').value), preview: true });
        drawLine(route, COLORS[index], `Offer ${LETTERS[index]} route preview`);
        drawPoint(pickup, `${LETTERS[index]}1`, COLORS[index]);
        drawPoint(delivery, `${LETTERS[index]}2`, COLORS[index]);
        mapped.push({ route, pickup, delivery });
      }
      await viewer.flyTo(entities, { duration: 1 });
      const summary = mapped.map((row, index) => `${LETTERS[index]}: ${(row.route.distanceM / 1609.344).toFixed(1)} mi`).join(' · ');
      say(`Mapped ${offers.length} separate load offer${offers.length === 1 ? '' : 's'} — ${summary}. Provider top matches were used; these are passenger-road previews until a qualified truck router is configured.`);
    } catch (error) { say(error.message || 'Load routes could not be mapped.'); }
  }
  function selectedOffers() {
    return [...root.querySelectorAll('[data-triangle-offer]:checked')]
      .map((input) => offers[Number(input.dataset.triangleOffer)])
      .filter(Boolean);
  }
  function formatTriangleEstimate(estimate) {
    const hours = estimate.routeHours == null ? 'unavailable' : `${estimate.routeHours.toFixed(1)} road hours`;
    const rate = estimate.rateComplete ? money(estimate.totalRate) : `${money(estimate.totalRate)} + rate(s) missing`;
    const fuel = estimate.fuelCost == null ? 'fuel cost needs a price' : money(estimate.fuelCost);
    return `<strong>Closed-loop planning estimate</strong><p>${estimate.miles.toFixed(1)} mi · ${hours} · ${estimate.elevenHourDrivingDays ?? '—'} eleven-hour driving day(s)</p><p>Load rate: ${rate} · Fuel: ${fuel} · Rate per mile: ${estimate.ratePerMile == null ? 'not available' : money(estimate.ratePerMile)} · Before other expenses: ${estimate.fuelMarginBeforeOtherCosts == null ? 'not available' : money(estimate.fuelMarginBeforeOtherCosts)}</p><small>Passenger-road preview and planning math only. Dispatch must verify HOS, appointment windows, truck restrictions, permits, weights, tolls, fuel quotes, and broker terms before booking.</small>`;
  }
  async function mapTriangle() {
    removeEntities();
    try {
      const plan = buildTriangulation({ homeBase: root.querySelector('[data-home-base]').value, offers: selectedOffers() });
      const points = [];
      for (const stop of plan.stops) {
        say(`Finding ${stop.label}…`);
        points.push(await resolveAddress(stop.address, stop.label));
      }
      const routes = [];
      const profile = routeProfile(root.querySelector('[data-mpg]').value);
      for (let index = 0; index < points.length - 1; index += 1) {
        const route = await client.route([points[index], points[index + 1]], { profile, preview: true });
        routes.push(route);
        drawLine(route, COLORS[index % COLORS.length], `${plan.stops[index].label} to ${plan.stops[index + 1].label}`);
      }
      points.forEach((point, index) => drawPoint(point, index === 0 ? 'H' : index === points.length - 1 ? 'HOME' : plan.stops[index].label.replace(' pickup', ' P').replace(' delivery', ' D'), COLORS[Math.max(0, index - 1) % COLORS.length]));
      const distanceM = routes.reduce((sum, route) => sum + route.distanceM, 0);
      const durationS = routes.reduce((sum, route) => sum + route.durationS, 0);
      const estimate = estimateTriangleEconomics({ plan, distanceM, durationS, mpg: root.querySelector('[data-mpg]').value, fuelPrice: root.querySelector('[data-fuel-price]').value });
      lastTriangle = { ...plan, estimate, mappedAt: new Date().toISOString(), routeAuthority: routes[0]?.authority || 'unknown' };
      triangleSummary.innerHTML = formatTriangleEstimate(estimate);
      await viewer.flyTo(entities, { duration: 1 });
      say(`Mapped a ${plan.loads.length}-load closed loop from home base and back. Review the dispatch estimate below; no booking or driver assignment was sent.`);
    } catch (error) {
      triangleSummary.textContent = `Triangle needs attention: ${error.message}`;
      say(error.message || 'The triangle could not be mapped.');
    }
  }
  async function handleDocument(file) {
    if (!file) return;
    const isText = /^text\//i.test(file.type) || /\.(?:txt|eml|csv)$/i.test(file.name);
    if (isText) {
      intake.value = await file.text();
      documentStatus.textContent = `${file.name} was read as local text. Select Extract draft and confirm every address.`;
      return;
    }
    const isImage = /^image\//i.test(file.type);
    documentStatus.textContent = isImage
      ? `${file.name} is attached as a local camera scan. OCR is not connected in this browser session, so no addresses or rates were invented. Paste the tender text or connect an authorized recognition adapter before extraction.`
      : `${file.name} is attached locally. PDF/image extraction requires an authorized recognition adapter; this page did not upload or parse it.`;
  }
  function open(value = true) { root.hidden = !value; if (value) root.querySelector('[data-intake]')?.focus(); }
  root.addEventListener('click', (event) => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'close') { open(false); return; }
    if (action === 'parse') { const parsed = parseLoadIntake(intake.value); draftFrom(parsed); say('Tender draft extracted. Confirm every pickup and delivery street address before adding it.'); return; }
    if (action === 'clear-draft') { intake.value = ''; form.reset(); documentStatus.textContent = 'Tender draft cleared.'; say('Tender draft cleared.'); return; }
    if (action === 'map-offers') { void mapOffers(); return; }
    if (action === 'map-triangle') { void mapTriangle(); return; }
    if (action === 'save-triangle') {
      if (!lastTriangle) { say('Map a triangle before saving its local dispatch draft.'); return; }
      recordLocal('leeway.dispatch.triangle-drafts.v1', { ...lastTriangle, savedAt: new Date().toISOString(), externalWrite: false });
      say('Closed-loop plan saved in this browser as a local dispatch draft. No broker, carrier, or driver system was changed.');
      return;
    }
    if (action === 'clear-offers') { offers = []; lastTriangle = null; removeEntities(); render(); triangleSummary.textContent = 'Set a home base, select one to three offers, then map the closed-loop plan.'; say('Load comparison cleared.'); return; }
    const remove = event.target.closest('[data-remove]');
    if (remove) { offers.splice(Number(remove.dataset.remove), 1); lastTriangle = null; removeEntities(); render(); say('Offer removed from comparison.'); return; }
    const choice = event.target.closest('[data-choice]');
    if (choice) {
      const offer = offers[Number(choice.dataset.index)];
      try { const result = choiceEvent({ candidate: offer, choice: choice.dataset.choice }); recordLocal('leeway.dispatch.load-choice-events.v1', result); say(`${choice.textContent} recorded for dispatch. No broker response or booking was sent.`); } catch (error) { say(error.message); }
    }
  });
  root.querySelector('[data-document]').addEventListener('change', (event) => { void handleDocument(event.currentTarget.files?.[0]); });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      const values = Object.fromEntries(new FormData(form).entries());
      offers = addLoadCandidate(offers, { ...values, id: `dispatch-offer-${Date.now()}-${++sequence}`, sourceText: intake.value });
      form.reset(); render(); say(`Offer ${LETTERS[offers.length - 1]} added. Include it in the trip triangle or map separate preview paths.`);
    } catch (error) { say(error.message); }
  });
  render();
  return { root, open, toggle() { open(root.hidden); }, close() { open(false); }, destroy() { removeEntities(); root.remove(); } };
}
