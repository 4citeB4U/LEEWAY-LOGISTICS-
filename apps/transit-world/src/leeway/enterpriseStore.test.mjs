import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addAccount,
  addEquipment,
  addPerson,
  readEnterpriseState,
  resetEnterpriseState,
  summarizeEnterpriseState,
} from './enterpriseStore.js';

test('enterprise store connects people equipment CRM and onboarding state', () => {
  resetEnterpriseState();
  const before = summarizeEnterpriseState();
  addPerson({ name: 'Test Driver', role: 'Driver', location: 'Milwaukee, WI' });
  addEquipment({ unit: 'TEST-100', type: 'Tractor', subtype: 'Class 8' });
  addAccount({ name: 'Test Customer', type: 'Customer', location: 'Chicago, IL' });
  const after = summarizeEnterpriseState();

  assert.equal(after.onboardingPeople, before.onboardingPeople + 1);
  assert.equal(after.equipmentCount, before.equipmentCount + 1);
  assert.equal(after.crmAccountCount, before.crmAccountCount + 1);

  const state = readEnterpriseState();
  assert.equal(state.people[0].name, 'Test Driver');
  assert.equal(state.equipment[0].unit, 'TEST-100');
  assert.equal(state.crm.accounts[0].name, 'Test Customer');
});
