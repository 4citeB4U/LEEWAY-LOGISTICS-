import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addMunicipalTransitRecord,
  decodeMunicipalTransitState,
  emptyMunicipalTransitState,
  summarizeMunicipalTransitState,
} from './municipalTransitStore.js';

test('municipal transit store records core agency workflows', () => {
  let state = emptyMunicipalTransitState();
  state = addMunicipalTransitRecord(
    state,
    'routes',
    { name: 'Route 10', status: 'ACTIVE' },
    { now: () => 100, randomId: () => 'route-10' },
  );
  state = addMunicipalTransitRecord(
    state,
    'paratransitTrips',
    { rider: 'Rider 1', status: 'BOOKED' },
    { now: () => 200, randomId: () => 'para-1' },
  );
  state = addMunicipalTransitRecord(
    state,
    'apcCounts',
    { boardings: 12, alightings: 7 },
    { now: () => 300, randomId: () => 'apc-1' },
  );
  const summary = summarizeMunicipalTransitState(state);
  assert.equal(summary.routeCount, 1);
  assert.equal(summary.paratransitTripCount, 1);
  assert.equal(summary.passengerBoardings, 12);
  assert.equal(summary.passengerAlightings, 7);
});

test('municipal transit state fails closed to a clean candidate state', () => {
  const state = decodeMunicipalTransitState('{broken');
  assert.equal(state.version, 1);
  assert.deepEqual(state.routes, []);
  assert.equal(state.agency.mode, 'LOCAL_CANDIDATE');
});
