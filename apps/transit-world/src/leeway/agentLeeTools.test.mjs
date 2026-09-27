import test from 'node:test';
import assert from 'node:assert/strict';
import { agentLeeTools } from './agentLeeTools.js';

test('Agent Lee exposes spatial control and enterprise onboarding tools', () => {
  const tools = agentLeeTools();
  const names = new Set(tools.map((tool) => tool.function.name));

  for (const name of [
    'fly_to_location',
    'set_layer_visibility',
    'control_cctv',
    'track_entity',
    'annotate_map',
    'analyst_query',
    'open_enterprise_workspace',
    'start_onboarding',
    'list_enterprise_records',
    'locate_enterprise_record',
    'get_logistics_knowledge',
  ]) {
    assert.equal(names.has(name), true, name);
  }

  assert.ok(tools.every((tool) => tool.type === 'function'));
  assert.ok(tools.every((tool) => tool.function.parameters?.type === 'object'));
  const onboarding = tools.find((tool) => tool.function.name === 'start_onboarding');
  assert.ok(onboarding.function.parameters.properties.kind.enum.includes('company'));
});
