import test from 'node:test';
import assert from 'node:assert/strict';
import { projectLeeWayVehicles } from './leeway-transit.js';

test('LeeWay projection joins governed vehicle identity to explicit spatial telemetry', () => {
  const vehicles = [{
    id: '3d4f9670-7987-4c6c-8ed5-bc83762f8b41',
    fleetNumber: 'LW-1001',
    manufacturer: 'New Flyer',
    model: 'Xcelsior CHARGE NG',
    modelYear: 2025,
    status: 1,
  }];
  const telemetry = {
    mode: 'TRAINING_DEMO',
    rows: [{
      fleetNumber: 'LW-1001',
      lat: 43.0389,
      lon: -87.9065,
      bearing: 315,
      speedMps: 0,
    }],
  };
  const result = projectLeeWayVehicles(vehicles, telemetry, 1_700_000_000_000);
  assert.equal(result.length, 1);
  assert.equal(result[0].label, '[DEMO] LW-1001');
  assert.equal(result[0].lat, 43.0389);
  assert.equal(result[0].leewayVehicle.telemetryMode, 'TRAINING_DEMO');
});

test('vehicle identity without spatial evidence does not render a fake location', () => {
  const result = projectLeeWayVehicles(
    [{ id: 'x', fleetNumber: 'LW-NO-GPS' }],
    { mode: 'UNVERIFIED', rows: [] },
  );
  assert.deepEqual(result, []);
});
