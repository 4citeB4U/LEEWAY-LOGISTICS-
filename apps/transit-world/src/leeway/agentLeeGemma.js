import * as Cesium from 'cesium';
import { createAgentLeeToolRuntime } from './agentLeeTools.js';

const DEFAULT_MODEL = 'gemma4:e4b';
const DEFAULT_ENDPOINT = 'http://127.0.0.1:11435';

function loadSetting(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function saveSetting(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function sceneContext(application) {
  try {
    const viewer = application?.getComponents?.()?.scene?.viewer;
    if (!viewer?.camera) return null;
    const carto = viewer.camera.positionCartographic;
    return {
      latitude: Cesium.Math.toDegrees(carto.latitude),
      longitude: Cesium.Math.toDegrees(carto.longitude),
      altitudeMeters: carto.height,
      headingDegrees: Cesium.Math.toDegrees(viewer.camera.heading || 0),
      pitchDegrees: Cesium.Math.toDegrees(viewer.camera.pitch || 0),
    };
  } catch {
    return null;
  }
}

function systemPrompt(context) {
  return [
    'You are Agent Lee inside LeeWay Logistics — Transit World.',
    'LeeWay principle: AI should increase human capability, not replace human responsibility.',
    'LeeWay context funnel: HUMAN, DEVICE/SYSTEM, AGENT, INTENT, ENVIRONMENT, PLATFORM, CAPABILITY, AUTHORITY, PERMISSION, STATE, HISTORY, RISK, CONNECTIVITY, EVIDENCE, RECOVERY, ADAPTATION.',
    'LeeWay execution discipline: Investigate → Diagnose → Plan → Implement → Test → Validate → Repair → Retest → Verify → Evidence. First success is not completion.',
    'Do not claim the canonical LeeWay Formula executed unless a verified Formula receipt is present.',
    'Your role is to act as a logistics super-expert for drivers, dispatchers, fleet managers, transportation agencies, brokers, shippers, HR teams, maintenance teams, terminals, warehouses, rail, marine/intermodal operations, and executive operators.',
    'For action requests, use the available LeeWay tools before answering. Never claim a map, layer, CRM workspace, onboarding flow, tracking action, camera movement, route, or record opened unless the tool result says ok=true.',
    'For questions about what the operator is looking at, use get_entity_context or get_current_view_state before explaining the scene. For analytical counts or nearest/fastest/highest questions over loaded world data, use analyst_query.',
    'Use open_enterprise_workspace and start_onboarding for CRM, HR, employee, equipment, document, integration, and company onboarding requests. Use locate_enterprise_record when the operator names an employee, unit, customer, broker, terminal, or facility.',
    'Preserve source/provenance state when discussing live layers. Never turn stale, fallback, training, or unavailable data into a live-data claim.',
    'Never claim a route is truck-safe unless verified truck restriction evidence is present.',
    'Treat OSRM car routes as visual/base routes only.',
    'Treat TRAINING_DEMO data as demonstration data, never live GPS or production records.',
    'Keep answers operational, concise, and evidence-aware.',
    context ? `Current map camera context: ${JSON.stringify(context)}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

async function probeOllama({ endpoint, model }) {
  const base = endpoint.replace(/\/$/, '');
  const response = await fetch(`${base}/api/tags`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`Ollama HTTP ${response.status}`);
  const body = await response.json();
  const names = Array.isArray(body?.models)
    ? body.models.map((row) => String(row?.name || row?.model || ''))
    : [];
  return {
    reachable: true,
    modelInstalled: names.includes(model),
    models: names,
  };
}

async function callOllama({
  endpoint,
  model,
  messages,
  context,
  toolRuntime,
}) {
  const base = endpoint.replace(/\/$/, '');
  const conversation = [
    { role: 'system', content: systemPrompt(context) },
    ...messages,
  ];
  const toolResults = [];

  for (let round = 0; round < 6; round += 1) {
    const response = await fetch(`${base}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        stream: false,
        messages: conversation,
        tools: toolRuntime?.tools || [],
      }),
    });
    if (!response.ok) {
      throw new Error(`Ollama HTTP ${response.status}`);
    }

    const body = await response.json();
    const message = body?.message || {};
    const calls = Array.isArray(message.tool_calls) ? message.tool_calls : [];
    conversation.push(message);

    if (!calls.length) {
      const content = String(message.content || '').trim();
      if (!content) throw new Error('Gemma returned no message content');
      return { content, toolResults };
    }

    for (const call of calls) {
      const name = call?.function?.name;
      const args =
        call?.function?.arguments && typeof call.function.arguments === 'object'
          ? call.function.arguments
          : {};
      if (!name || !toolRuntime) {
        throw new Error('Gemma requested a tool but no LeeWay tool runtime is available');
      }

      let result;
      try {
        result = await toolRuntime.execute(name, args);
      } catch (error) {
        result = {
          ok: false,
          action: name,
          error: String(error?.message || error),
        };
      }
      toolResults.push({ name, arguments: args, result });
      conversation.push({
        role: 'tool',
        tool_name: name,
        content: JSON.stringify(result),
      });
    }
  }

  throw new Error('Agent Lee tool loop exceeded the six-round safety limit');
}

function ensureStyles(documentRef) {
  if (documentRef.getElementById('leeway-agent-lee-styles')) return;
  const style = documentRef.createElement('style');
  style.id = 'leeway-agent-lee-styles';
  style.textContent = `
    #leeway-agent-lee {
      position: fixed;
      left: 18px;
      bottom: 18px;
      z-index: 9600;
      width: min(420px, calc(100vw - 36px));
      background: rgba(2, 10, 17, .94);
      border: 1px solid rgba(98, 231, 255, .48);
      box-shadow: 0 18px 70px rgba(0,0,0,.52);
      backdrop-filter: blur(14px);
      color: #edffff;
      font: 12px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }
    #leeway-agent-lee * { box-sizing: border-box; }
    .lal-head { padding: 12px 14px; border-bottom: 1px solid rgba(98,231,255,.18); }
    .lal-kicker { font-size: 9px; letter-spacing: .16em; opacity: .62; }
    .lal-title { font-size: 15px; font-weight: 800; margin-top: 3px; }
    .lal-status { margin-top: 6px; font-size: 10px; }
    .lal-status[data-state="connected"] { color: #86ffa8; }
    .lal-status[data-state="disconnected"] { color: #ffd877; }
    .lal-body { padding: 12px 14px; }
    .lal-log {
      max-height: 210px;
      overflow: auto;
      padding: 8px;
      background: rgba(255,255,255,.025);
      border: 1px solid rgba(255,255,255,.07);
      white-space: pre-wrap;
    }
    .lal-entry { margin: 0 0 9px; }
    .lal-entry strong { color: #91edff; }
    .lal-row { display:flex; gap:7px; margin-top:8px; }
    .lal-input {
      flex:1; min-width:0; padding:9px;
      background:#07121b; color:#efffff;
      border:1px solid rgba(98,231,255,.28);
      font:inherit;
    }
    .lal-btn {
      padding:9px 10px; cursor:pointer;
      background:rgba(98,231,255,.08); color:#efffff;
      border:1px solid rgba(98,231,255,.28);
      font:inherit;
    }
    .lal-settings { margin-top:8px; display:grid; grid-template-columns:1fr 1fr; gap:6px; }
    .lal-settings input { width:100%; padding:7px; background:#07121b; color:#efffff; border:1px solid rgba(255,255,255,.12); font:inherit; }
    .lal-note { margin-top:7px; opacity:.58; font-size:9px; }
    @media (max-width:720px) {
      #leeway-agent-lee { left:12px; bottom:calc(48vh + 24px); width:calc(100vw - 24px); }
      .lal-log { max-height:120px; }
    }
  `;
  documentRef.head.appendChild(style);
}

function appendEntry(log, role, content) {
  const entry = document.createElement('div');
  entry.className = 'lal-entry';
  const label = role === 'user' ? 'YOU' : 'AGENT LEE';
  entry.innerHTML = `<strong>${label}</strong>\n`;
  const text = document.createTextNode(content);
  entry.appendChild(text);
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
}

export function mountAgentLeeGemma(application, shell = null) {
  if (document.getElementById('leeway-agent-lee')) return null;
  ensureStyles(document);
  const toolRuntime = shell ? createAgentLeeToolRuntime(application, shell) : null;

  const root = document.createElement('section');
  root.id = 'leeway-agent-lee';
  root.innerHTML = `
    <div class="lal-head">
      <div class="lal-kicker">LEEWAY LOGISTICS · LOCAL AI</div>
      <div class="lal-title">Agent Lee · Gemma 4 E4B</div>
      <div class="lal-status" data-state="disconnected">LOCAL MODEL: DISCONNECTED</div>
    </div>
    <div class="lal-body">
      <div class="lal-log">
        <div class="lal-entry"><strong>AGENT LEE</strong>\nI can operate Transit World, inspect map context, control layers and CCTV, locate records, and guide CRM, employee, equipment, and company onboarding. Local Gemma 4 provides the reasoning engine.</div>
      </div>
      <div class="lal-row">
        <input class="lal-input" aria-label="Ask Agent Lee" placeholder="Ask about a load, route, driver, facility, maintenance, CRM, or fleet..." />
        <button class="lal-btn" type="button" data-action="send">ASK</button>
      </div>
      <div class="lal-settings">
        <input data-setting="model" aria-label="Gemma model" />
        <input data-setting="endpoint" aria-label="Ollama endpoint" />
      </div>
      <div class="lal-note">Default model: gemma4:e4b · Local Ollama only · no cloud API required. The browser never treats a disconnected model as active.</div>
    </div>
  `;
  document.body.appendChild(root);

  const status = root.querySelector('.lal-status');
  const log = root.querySelector('.lal-log');
  const input = root.querySelector('.lal-input');
  const modelInput = root.querySelector('[data-setting="model"]');
  const endpointInput = root.querySelector('[data-setting="endpoint"]');
  const sendButton = root.querySelector('[data-action="send"]');
  const history = [];

  modelInput.value = loadSetting('leeway.agentLee.model', DEFAULT_MODEL);
  endpointInput.value = loadSetting('leeway.agentLee.endpoint', DEFAULT_ENDPOINT);

  function persist() {
    saveSetting('leeway.agentLee.model', modelInput.value.trim() || DEFAULT_MODEL);
    saveSetting('leeway.agentLee.endpoint', endpointInput.value.trim() || DEFAULT_ENDPOINT);
  }

  async function probe() {
    persist();
    const model = modelInput.value.trim() || DEFAULT_MODEL;
    const endpoint = endpointInput.value.trim() || DEFAULT_ENDPOINT;
    try {
      const state = await probeOllama({ endpoint, model });
      if (state.modelInstalled) {
        status.dataset.state = 'connected';
        status.textContent = `READY · ${model}${toolRuntime ? ` · ${toolRuntime.tools.length} TOOLS` : ''}`;
      } else {
        status.dataset.state = 'disconnected';
        status.textContent = `MODEL MISSING · ${model}`;
      }
      return state;
    } catch {
      status.dataset.state = 'disconnected';
      status.textContent = 'LOCAL MODEL: DISCONNECTED';
      return { reachable: false, modelInstalled: false, models: [] };
    }
  }

  async function ask() {
    const content = input.value.trim();
    if (!content) return;
    persist();
    appendEntry(log, 'user', content);
    input.value = '';
    sendButton.disabled = true;
    status.dataset.state = 'disconnected';
    status.textContent = 'CONNECTING TO LOCAL GEMMA 4…';

    const model = modelInput.value.trim() || DEFAULT_MODEL;
    const endpoint = endpointInput.value.trim() || DEFAULT_ENDPOINT;
    const context = sceneContext(application);

    try {
      const response = await callOllama({
        endpoint,
        model,
        messages: [...history, { role: 'user', content }],
        context,
        toolRuntime,
      });
      history.push(
        { role: 'user', content },
        { role: 'assistant', content: response.content },
      );
      appendEntry(log, 'assistant', response.content);
      status.dataset.state = 'connected';
      status.textContent = `CONNECTED · ${model}`;
    } catch (error) {
      const message =
        'Local Gemma 4 is not reachable from this browser. Start Ollama on this device and allow this LeeWay Pages origin, then ask again. No AI answer was fabricated.';
      appendEntry(log, 'assistant', message);
      status.dataset.state = 'disconnected';
      status.textContent = 'LOCAL MODEL: DISCONNECTED';
      console.warn('Agent Lee local Gemma connection failed:', error);
    } finally {
      sendButton.disabled = false;
      input.focus();
    }
  }

  sendButton.addEventListener('click', ask);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') ask();
  });
  modelInput.addEventListener('change', () => {
    persist();
    void probe();
  });
  endpointInput.addEventListener('change', () => {
    persist();
    void probe();
  });

  void probe();

  return {
    root,
    ask,
    probe,
    destroy() {
      root.remove();
    },
  };
}