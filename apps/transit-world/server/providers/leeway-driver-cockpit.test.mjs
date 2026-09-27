import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildDriverCockpit,
  cockpitRouteContract,
} from './leeway-driver-cockpit.js';

test('cockpit route contract keeps OSRM visual route separate from truck safety', () => {
  const result = cockpitRouteContract({
    activeLoad: {
      pickup: { name: 'A', lat: 43, lon: -88 },
      delivery: { name: 'B', lat: 42, lon: -87 },
    },
    routeIntelligence: { truckSafetyStatus: 'UNVERIFIED' },
  });
  assert.equal(result.visualAuthority, 'OSRM_CAR_BASE_ONLY');
  assert.equal(result.truckSafetyStatus, 'UNVERIFIED');
});
test('driver cockpit joins Transit Hub vehicle identity and never claims Formula execution', async () => {
  const cockpit = await buildDriverCockpit({
    fetchImpl: async () => ({
      ok: true,
      json: async () => [{
        id: '3d4f9670-7987-4c6c-8ed5-bc83762f8b41',
        fleetNumber: 'LW-1001',
        manufacturer: 'New Flyer',
        model: 'Xcelsior CHARGE NG',
        modelYear: 2025,
        status: 1,
      }],
    }),
  });
  assert.equal(cockpit.vehicle.fleetNumber, 'LW-1001');
  assert.equal(cockpit.mode, 'TRAINING_DEMO');
  assert.equal(cockpit.provenance.liveTruckSafeRouting, false);
  assert.equal(cockpit.provenance.formulaExecuted, false);
});
