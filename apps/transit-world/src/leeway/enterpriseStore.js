const STORAGE_KEY = 'leeway.logistics.enterprise.v1';

const seed = Object.freeze({
  schemaVersion: 1,
  organization: {
    id: 'org-demo',
    legalName: 'LeeWay Training Carrier',
    dba: 'LeeWay Logistics Demo',
    status: 'TRAINING_DEMO',
    companyType: 'Motor Carrier / Logistics',
    modes: ['Trucking', 'Freight', 'Municipal Transit'],
    primaryLocation: 'Milwaukee, WI',
    onboardingStep: 4,
    onboardingTotal: 7,
  },
  people: [
    {
      id: 'emp-001',
      name: 'Marcus Williams',
      role: 'Driver',
      status: 'ACTIVE',
      onboarding: 'COMPLETE',
      location: 'Chicago, IL',
      evidence: ['CDL', 'Medical Certificate', 'Policy Acknowledgement'],
    },
    {
      id: 'emp-002',
      name: 'Alicia Carter',
      role: 'Dispatcher',
      status: 'ACTIVE',
      onboarding: 'COMPLETE',
      location: 'Milwaukee, WI',
      evidence: ['Employment Application', 'Policy Acknowledgement'],
    },
    {
      id: 'cand-003',
      name: 'Jordan Reed',
      role: 'Driver Candidate',
      status: 'ONBOARDING',
      onboarding: 'DOCUMENT_REVIEW',
      location: 'Milwaukee, WI',
      evidence: ['Employment Application', 'CDL'],
    },
  ],
  equipment: [
    {
      id: 'veh-lw1001',
      unit: 'LW-1001',
      type: 'Tractor',
      subtype: 'Class 8',
      status: 'ACTIVE',
      assignment: 'Marcus Williams',
      evidence: ['Registration', 'Insurance', 'Inspection'],
    },
    {
      id: 'trl-demo-01',
      unit: 'TRL-DEMO-01',
      type: 'Trailer',
      subtype: '53 ft Dry Van',
      status: 'ACTIVE',
      assignment: 'LW-1001',
      evidence: ['Registration', 'Inspection'],
    },
  ],
  crm: {
    accounts: [
      {
        id: 'acct-001',
        name: 'Training Broker',
        type: 'Broker',
        status: 'ACTIVE',
        location: 'Chicago, IL',
      },
      {
        id: 'acct-002',
        name: 'Frost Bank Tower',
        type: 'Customer / Facility',
        status: 'ACTIVE',
        location: 'Chicago, IL',
      },
      {
        id: 'acct-003',
        name: 'LeeWay Milwaukee Training Terminal',
        type: 'Terminal',
        status: 'ACTIVE',
        location: 'Milwaukee, WI',
      },
    ],
    activities: [],
  },
  documents: [
    {
      id: 'doc-001',
      ownerType: 'organization',
      ownerId: 'org-demo',
      category: 'Insurance',
      name: 'Training insurance certificate',
      status: 'TRAINING_DEMO',
      size: null,
      uploadedAt: null,
    },
  ],
  integrations: [
    { id: 'bank', name: 'Banking', status: 'NOT_CONNECTED' },
    { id: 'payroll', name: 'Payroll', status: 'NOT_CONNECTED' },
    { id: 'accounting', name: 'Accounting', status: 'NOT_CONNECTED' },
    { id: 'eld', name: 'ELD / Telematics', status: 'NOT_CONNECTED' },
    { id: 'fuel', name: 'Fuel Cards', status: 'NOT_CONNECTED' },
    { id: 'email', name: 'Email / Calendar', status: 'NOT_CONNECTED' },
  ],
  onboardingCases: [
    {
      id: 'case-org-demo',
      type: 'ORGANIZATION',
      subjectId: 'org-demo',
      status: 'IN_PROGRESS',
      step: 4,
      totalSteps: 7,
      checklist: [
        { id: 'identity', label: 'Organization identity', status: 'COMPLETE' },
        { id: 'operations', label: 'Operating profile', status: 'COMPLETE' },
        { id: 'admins', label: 'Admins and people', status: 'COMPLETE' },
        { id: 'equipment', label: 'Equipment and fleet', status: 'IN_PROGRESS' },
        { id: 'documents', label: 'Documents and evidence', status: 'PENDING' },
        { id: 'integrations', label: 'Integrations', status: 'PENDING' },
        { id: 'activate', label: 'Review and activate', status: 'PENDING' },
      ],
    },
  ],
});

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function storage() {
  try {
    return globalThis.localStorage || null;
  } catch {
    return null;
  }
}

let memory = clone(seed);

export function readEnterpriseState() {
  const target = storage();
  if (!target) return clone(memory);
  try {
    const raw = target.getItem(STORAGE_KEY);
    if (!raw) {
      target.setItem(STORAGE_KEY, JSON.stringify(seed));
      return clone(seed);
    }
    const parsed = JSON.parse(raw);
    return parsed?.schemaVersion === 1 ? parsed : clone(seed);
  } catch {
    return clone(memory);
  }
}

export function writeEnterpriseState(next) {
  const value = clone(next);
  memory = value;
  const target = storage();
  try {
    target?.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {}
  return clone(value);
}

export function resetEnterpriseState() {
  return writeEnterpriseState(seed);
}

function mutate(mutator) {
  const state = readEnterpriseState();
  mutator(state);
  return writeEnterpriseState(state);
}

function id(prefix) {
  const cryptoId = globalThis.crypto?.randomUUID?.();
  return cryptoId ? `${prefix}-${cryptoId}` : `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function addPerson(input = {}) {
  return mutate((state) => {
    state.people.unshift({
      id: id('person'),
      name: String(input.name || 'New employee').trim(),
      role: String(input.role || 'Employee').trim(),
      status: String(input.status || 'ONBOARDING'),
      onboarding: String(input.onboarding || 'STARTED'),
      location: String(input.location || '').trim(),
      email: String(input.email || '').trim(),
      phone: String(input.phone || '').trim(),
      evidence: Array.isArray(input.evidence) ? [...input.evidence] : [],
      createdAt: new Date().toISOString(),
    });
  });
}

export function addEquipment(input = {}) {
  return mutate((state) => {
    state.equipment.unshift({
      id: id('equipment'),
      unit: String(input.unit || 'NEW-UNIT').trim(),
      type: String(input.type || 'Vehicle').trim(),
      subtype: String(input.subtype || '').trim(),
      status: String(input.status || 'ONBOARDING'),
      assignment: String(input.assignment || '').trim(),
      evidence: Array.isArray(input.evidence) ? [...input.evidence] : [],
      createdAt: new Date().toISOString(),
    });
  });
}

export function addAccount(input = {}) {
  return mutate((state) => {
    state.crm.accounts.unshift({
      id: id('account'),
      name: String(input.name || 'New account').trim(),
      type: String(input.type || 'Customer').trim(),
      status: String(input.status || 'ACTIVE'),
      location: String(input.location || '').trim(),
      createdAt: new Date().toISOString(),
    });
  });
}

export function addDocumentMetadata({
  ownerType = 'organization',
  ownerId = 'org-demo',
  category = 'General',
  file,
} = {}) {
  if (!file) return readEnterpriseState();
  return mutate((state) => {
    state.documents.unshift({
      id: id('document'),
      ownerType,
      ownerId,
      category,
      name: file.name || 'Uploaded file',
      type: file.type || 'application/octet-stream',
      size: Number(file.size) || 0,
      status: 'RECEIVED_LOCAL_METADATA_ONLY',
      uploadedAt: new Date().toISOString(),
    });
  });
}

export function updateOrganization(patch = {}) {
  return mutate((state) => {
    state.organization = { ...state.organization, ...patch };
  });
}

export function advanceOrganizationOnboarding(step) {
  return mutate((state) => {
    const caseItem = state.onboardingCases.find((item) => item.type === 'ORGANIZATION');
    if (!caseItem) return;
    const next = Math.max(1, Math.min(caseItem.totalSteps, Number(step) || caseItem.step));
    caseItem.step = next;
    caseItem.status = next >= caseItem.totalSteps ? 'READY_FOR_REVIEW' : 'IN_PROGRESS';
    caseItem.checklist = caseItem.checklist.map((item, index) => ({
      ...item,
      status: index + 1 < next ? 'COMPLETE' : index + 1 === next ? 'IN_PROGRESS' : 'PENDING',
    }));
    state.organization.onboardingStep = next;
  });
}

export function markIntegration(idValue, status = 'NOT_CONNECTED') {
  return mutate((state) => {
    const row = state.integrations.find((item) => item.id === idValue);
    if (row) row.status = status;
  });
}

export function summarizeEnterpriseState() {
  const state = readEnterpriseState();
  return {
    organization: state.organization,
    employeeCount: state.people.filter((row) => row.status === 'ACTIVE').length,
    onboardingPeople: state.people.filter((row) => row.status === 'ONBOARDING').length,
    equipmentCount: state.equipment.length,
    crmAccountCount: state.crm.accounts.length,
    documentCount: state.documents.length,
    integrationsConnected: state.integrations.filter((row) => row.status === 'CONNECTED').length,
    onboardingCases: state.onboardingCases,
  };
}
