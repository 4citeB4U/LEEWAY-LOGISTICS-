import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ORGANIZATION_ONBOARDING_STEPS,
  onboardingProfile,
} from './onboardingRequirements.js';

test('company onboarding remains a seven-step guided flow', () => {
  assert.equal(ORGANIZATION_ONBOARDING_STEPS.length, 7);
  assert.equal(ORGANIZATION_ONBOARDING_STEPS[0].id, 'identity');
  assert.equal(ORGANIZATION_ONBOARDING_STEPS.at(-1).id, 'activate');
});

test('driver profile separates required qualification evidence from receipt state', () => {
  const profile = onboardingProfile('Driver');
  assert.ok(profile.evidence.includes('Employment Application'));
  assert.ok(profile.evidence.includes('CDL / driver license'));
  assert.ok(profile.evidence.includes('Motor vehicle record inquiry'));
  assert.ok(profile.evidence.some((item) => item.includes('Medical qualification')));
});
