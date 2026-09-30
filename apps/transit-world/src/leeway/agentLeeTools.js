import { createGevActionRunner } from '../voice/gevActions.js';
import { GEV_ACTION_SCHEMAS } from '../voice/actionSchemas.js';
import {
  readEnterpriseState,
  summarizeEnterpriseState,
} from './enterpriseStore.js';
import {
  LOGISTICS_KNOWLEDGE_TOPICS,
  logisticsKnowledge,
} from './logisticsKnowledge.js';

const SPATIAL_TOOL_NAMES = Object.freeze([
  'fly_to_location',
  'adjust_camera_zoom',
  'zoom_to_globe',
  'set_layer_visibility',
  'show_data_layers_menu',
  'get_entity_context',
  'get_current_view_state',
  'set_map_stack',
  'control_cctv',
  'track_entity',
  'stop_tracking',
  'frame_overhead',
  'annotate_map',
  'clear_annotations',
  'move_camera',
  'fly_route',
  'analyst_query',
]);

const descriptions = Object.freeze({
  fly_to_location:
    'Fly the LeeWay Transit World camera to a named place, address, facility, city, region, landmark, or coordinates.',
  adjust_camera_zoom:
    'Zoom the current map view in or out without changing the selected operating context.',
  zoom_to_globe: 'Return to a full-world globe view.',
  set_layer_visibility:
    'Enable or disable a registered world-awareness data layer such as traffic, CCTV, vessels, flights, satellites, fires, transit, or infrastructure.',
  show_data_layers_menu:
    'Open the map data-layer chooser and optionally focus one layer.',
  get_entity_context:
    'Read the selected asset or current map context before answering what the operator is looking at.',
  get_current_view_state:
    'Read current camera, layer, feed-provenance, map-stack, and scene state.',
  set_map_stack: 'Switch the map source or 3D stack.',
  control_cctv:
    'Operate public CCTV coverage: enable, find nearest, select, focus, cycle, or show coverage.',
  track_entity:
    'Track or follow a specific loaded vehicle, vessel, aircraft, or satellite entity.',
  stop_tracking: 'Stop following the currently tracked entity.',
  frame_overhead:
    'Frame loaded flights, vessels, satellites, or military traffic above the current area.',
  annotate_map:
    'Mark locations, draw areas, connect places, or draw walking/driving/cycling routes on the world.',
  clear_annotations:
    'Clear map annotations only when the operator explicitly requests it.',
  move_camera: 'Orbit, pan, tilt, rotate, or stop map camera motion.',
  fly_route: 'Fly the camera along an existing route annotation.',
  analyst_query:
    'Analyze currently loaded world-layer records by scope, filters, sort order, or proximity without moving the map.',
});

const enterpriseSchemas = Object.freeze([
  {
    name: 'open_enterprise_workspace',
    description:
      'Open a LeeWay enterprise workspace such as command, people, equipment, CRM, documents, or integrations.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        workspace: {
          type: 'string',
          enum: [
            'command',
            'people',
            'equipment',
            'crm',
            'documents',
            'integrations',
          ],
        },
      },
      required: ['workspace'],
    },
  },
  {
    name: 'start_onboarding',
    description:
      'Start a guided LeeWay onboarding flow for a company, employee, equipment asset, or CRM account.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        kind: {
          type: 'string',
          enum: ['company', 'employee', 'equipment', 'account'],
        },
      },
      required: ['kind'],
    },
  },
  {
    name: 'list_enterprise_records',
    description:
      'Read LeeWay enterprise records from the current local candidate CRM store.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        domain: {
          type: 'string',
          enum: [
            'summary',
            'people',
            'equipment',
            'accounts',
            'documents',
            'integrations',
            'onboarding',
          ],
        },
      },
      required: ['domain'],
    },
  },
  {
    name: 'locate_enterprise_record',
    description:
      'Find a LeeWay employee, unit, customer, broker, terminal, or facility record and open its connected workspace or map location.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        query: { type: 'string', minLength: 1, maxLength: 160 },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_logistics_knowledge',
    description:
      'Retrieve focused LeeWay logistics domain knowledge, operating questions, evidence rules, and authoritative references for the requested topic.',
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        topic: {
          type: 'string',
          enum: [...LOGISTICS_KNOWLEDGE_TOPICS],
        },
      },
      required: ['topic'],
    },
  },
  {
    name: 'open_dispatch_load_planning',
    description:
      'Open the dispatcher load-comparison and closed-loop trip-triangle planner. It prepares planning only and never books freight.',
    parameters: { type: 'object', additionalProperties: false, properties: {} },
  },
]);

function toOllamaTool(schema) {
  return {
    type: 'function',
    function: {
      name: schema.name,
      description:
        descriptions[schema.name] || schema.description || schema.name,
      parameters: schema.parameters || { type: 'object', properties: {} },
    },
  };
}

export function agentLeeTools({ edition = globalThis.document?.body?.dataset?.leewayEdition || 'business' } = {}) {
  const spatial = GEV_ACTION_SCHEMAS.filter((schema) =>
    SPATIAL_TOOL_NAMES.includes(schema.name),
  ).map(toOllamaTool);
  return edition === 'personal' ? spatial : [...spatial, ...enterpriseSchemas.map(toOllamaTool)];
}

function enterpriseRecords(domain) {
  const state = readEnterpriseState();
  if (domain === 'summary') return summarizeEnterpriseState();
  if (domain === 'people') return state.people;
  if (domain === 'equipment') return state.equipment;
  if (domain === 'accounts') return state.crm.accounts;
  if (domain === 'documents') return state.documents;
  if (domain === 'integrations') return state.integrations;
  if (domain === 'onboarding') return state.onboardingCases;
  return null;
}

export function createAgentLeeToolRuntime(application, shell) {
  const components = application.getComponents();
  const scene = components.scene;
  const controls = components.controls;
  const data = components.data;
  const tools = components.tools;

  const spatialRunner = createGevActionRunner({
    viewer: scene.viewer,
    styleManager: controls.styleManager,
    dataManager: data.dataManager,
    sceneDirector: tools.sceneDirector,
    annotations: tools.annotations,
    floorServices: scene.operations.surface.groundFloor,
    annotationResolver: scene.operations.annotationResolver,
    searchNavigation: scene.operations.searchAndFlyTo,
  });

  async function runEnterprise(name, args = {}) {
    if (globalThis.document?.body?.dataset?.leewayEdition === 'personal') {
      throw new Error('Business records are unavailable in LeeWay Maps');
    }
    if (name === 'open_enterprise_workspace') {
      const map = {
        command: 'overview',
        people: 'people',
        equipment: 'equipment',
        crm: 'crm',
        documents: 'documents',
        integrations: 'integrations',
      };
      shell.workspace.open(map[args.workspace] || 'overview');
      return { ok: true, action: name, workspace: args.workspace };
    }

    if (name === 'start_onboarding') {
      if (args.kind === 'company') shell.workspace.startCompanyOnboarding();
      else if (args.kind === 'employee')
        shell.workspace.startEmployeeOnboarding();
      else if (args.kind === 'equipment')
        shell.workspace.startEquipmentOnboarding();
      else shell.workspace.startAccountIntake();
      return { ok: true, action: name, kind: args.kind };
    }

    if (name === 'list_enterprise_records') {
      const records = enterpriseRecords(args.domain);
      return { ok: true, action: name, domain: args.domain, records };
    }

    if (name === 'get_logistics_knowledge') {
      const knowledge = logisticsKnowledge(args.topic);
      return {
        ok: Boolean(knowledge),
        action: name,
        topic: args.topic,
        knowledge,
        error: knowledge ? null : 'Unknown logistics knowledge topic',
      };
    }

    if (name === 'open_dispatch_load_planning') {
      shell.openLoadPlanning?.();
      return { ok: true, action: name, externalWrite: false };
    }

    if (name === 'locate_enterprise_record') {
      const query = String(args.query || '')
        .trim()
        .toLowerCase();
      const state = readEnterpriseState();
      const person = state.people.find((row) =>
        [row.name, row.role, row.location].some((value) =>
          String(value || '')
            .toLowerCase()
            .includes(query),
        ),
      );
      if (person) {
        shell.workspace.openPeople();
        return {
          ok: true,
          action: name,
          type: 'person',
          record: person,
          mapMoved: false,
        };
      }
      const equipment = state.equipment.find((row) =>
        [row.unit, row.type, row.assignment].some((value) =>
          String(value || '')
            .toLowerCase()
            .includes(query),
        ),
      );
      if (equipment) {
        shell.workspace.openEquipment();
        return {
          ok: true,
          action: name,
          type: 'equipment',
          record: equipment,
          mapMoved: false,
        };
      }
      const account = state.crm.accounts.find((row) =>
        [row.name, row.type, row.location].some((value) =>
          String(value || '')
            .toLowerCase()
            .includes(query),
        ),
      );
      if (account) {
        shell.workspace.openCrm();
        const moved = account.location
          ? await shell.locate(account.location)
          : false;
        return {
          ok: true,
          action: name,
          type: 'account',
          record: account,
          mapMoved: moved,
        };
      }
      const moved = await shell.locate(args.query);
      return {
        ok: moved,
        action: name,
        type: moved ? 'map-location' : null,
        query: args.query,
        mapMoved: moved,
        error: moved ? null : 'No enterprise record or map location matched',
      };
    }

    throw new Error(`Unknown LeeWay enterprise tool: ${name}`);
  }

  return {
    tools: agentLeeTools(),
    async execute(name, args = {}) {
      if (enterpriseSchemas.some((schema) => schema.name === name)) {
        return runEnterprise(name, args);
      }
      if (!SPATIAL_TOOL_NAMES.includes(name)) {
        throw new Error(`Tool is not authorized for Agent Lee: ${name}`);
      }
      return spatialRunner(name, args, { isCurrent: () => true });
    },
  };
}
