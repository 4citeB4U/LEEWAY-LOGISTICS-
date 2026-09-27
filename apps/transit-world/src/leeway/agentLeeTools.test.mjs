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
  ]) {
    assert.equal(names.has(name), true, name);
  }

  assert.ok(tools.every((tool) => tool.type === 'function'));
  assert.ok(tools.every((tool) => tool.function.parameters?.type === 'object'));
});
