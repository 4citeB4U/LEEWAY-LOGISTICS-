/*
 * LEEWAY ENTERPRISE FILE HEADER
 * File: app.js
 * Path: src/LeeWay.TransitHub.Web/wwwroot/app.js
 * Project: LeeWay Enterprise Transit Hub
 * Layer: Web / Client Logic
 * Purpose: Retrieve API data and render dashboard cards and tables.
 * Inputs: Dashboard, vehicle, and work-order API responses.
 * Outputs: Browser DOM updates.
 * Mutation Scope: Dashboard DOM only.
 * Dependencies: Browser Fetch API and API at localhost:5080.
 * Tests: Manual browser check.
 * Security Impact: No credentials or persistent storage.
 * Database Impact: No direct database access.
 * Sovereign Cycle: Perception -> Synthesis -> Lee Prime
 * Status: ACTIVE / GOVERNED
 * Human Comprehension: REQUIRED
 * Owner: Leonard Lee / Leeway Industries
 * Version: 1.0.0
 */

const api = 'http://localhost:5080';
const statusElement = document.getElementById('api-status');

async function getJson(path) {
  const response = await fetch(`${api}${path}`);
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  return response.json();
}

function card(label, value) {
  return `<article class="card"><strong>${label}</strong><div>${value}</div></article>`;
}

async function load() {
  try {
    const [summary, vehicles, workOrders] = await Promise.all([
      getJson('/api/dashboard'),
      getJson('/api/vehicles'),
      getJson('/api/workorders')
    ]);
    statusElement.textContent = 'API connected - in-memory training mode';
    statusElement.className = 'ok';
    document.getElementById('summary').innerHTML = [
      card('Vehicles', summary.vehicleCount),
      card('Out of service', summary.outOfServiceVehicleCount),
      card('Open work orders', summary.openWorkOrderCount),
      card('Incidents', summary.incidentCount),
      card('Customer cases', summary.customerCaseCount),
      card('Pending forms', summary.pendingEmployeeFormCount),
      card('Inspections', summary.inspectionCount)
    ].join('');
    document.getElementById('vehicles').innerHTML = `<table><thead><tr><th>Fleet</th><th>Manufacturer</th><th>Model</th><th>Status</th></tr></thead><tbody>${vehicles.map(v => `<tr><td>${v.fleetNumber}</td><td>${v.manufacturer}</td><td>${v.model}</td><td>${v.status}</td></tr>`).join('')}</tbody></table>`;
    document.getElementById('work-orders').innerHTML = `<table><thead><tr><th>Title</th><th>Priority</th><th>Status</th></tr></thead><tbody>${workOrders.map(w => `<tr><td>${w.title}</td><td>${w.priority}</td><td>${w.status}</td></tr>`).join('')}</tbody></table>`;
  } catch (error) {
    statusElement.textContent = `API unavailable: ${error.message}`;
    statusElement.className = 'error';
  }
}

load();
