import test from 'node:test';
import assert from 'node:assert/strict';
import {
  classifyCopilotCommand,
  executeCopilotCommand,
} from './copilotCommands.js';

test('classifies only unambiguous system copilot actions', () => {
  assert.equal(classifyCopilotCommand('Open personal map'), null);
  assert.equal(
    classifyCopilotCommand('Show me the weather radar').action,
    'weather',
  );
  assert.equal(
    classifyCopilotCommand('Open my dispatch load triangle').action,
    'load-planning',
  );
  assert.equal(
    classifyCopilotCommand('Tell me whether this bridge is safe'),
    null,
  );
});

test('opens load planning without a model or external write', async () => {
  let calls = 0;
  const result = await executeCopilotCommand('Open load planning', {
    openLoadPlanning() {
      calls++;
    },
  });
  assert.equal(result.handled, true);
  assert.equal(calls, 1);
  assert.match(result.message, /does not book freight/);
});

test('does not manufacture a model action for ordinary questions', async () => {
  const result = await executeCopilotCommand(
    'What is the history of Milwaukee?',
    {},
  );
  assert.deepEqual(result, { handled: false });
});
