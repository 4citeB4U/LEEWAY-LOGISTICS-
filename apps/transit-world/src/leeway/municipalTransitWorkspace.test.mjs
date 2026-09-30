import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { municipalTransitTabForDomain } from './municipalTransitWorkspace.js';

test('municipal domains route to the correct operations tabs', () => {
  assert.equal(municipalTransitTabForDomain('municipal-service-planning'), 'planning');
  assert.equal(municipalTransitTabForDomain('municipal-cadavl'), 'cadavl');
  assert.equal(municipalTransitTabForDomain('municipal-rider-info'), 'rider');
  assert.equal(municipalTransitTabForDomain('municipal-ada-demand'), 'paratransit');
  assert.equal(municipalTransitTabForDomain('municipal-fare-apc'), 'fare');
  assert.equal(municipalTransitTabForDomain('municipal-maintenance-safety'), 'maintenance');
});

test('workspace contains core municipal operating surfaces', () => {
  const source = readFileSync(new URL('./municipalTransitWorkspace.js', import.meta.url), 'utf8');
  for (const label of ['Service Planning','CAD / AVL','Rider + GTFS','ADA / Paratransit','Fare + APC','Maintenance + Safety','Reports'])
    assert.match(source, new RegExp(label.replace(/[+/]/g, '\\$&')));
});
