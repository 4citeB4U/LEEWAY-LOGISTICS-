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
      employeeNumber: 'LW-D-001',
      preferredLanguage: 'English',
      photoUrl: '',
      cdlClass: 'Class A',
      cdlState: 'IL',
      medicalStatus: 'CURRENT',
      assignedEquipmentId: 'veh-lw1001',
      hoursAvailable: '8h 42m',
      safetyScore: '96%',
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
      manufacturer: 'Kenworth',
      model: 'T680',
      modelYear: 2024,
      vinTail: '2841',
      currentRoute: 'Chicago, IL → Milwaukee, WI',
      eta: '16:35 CT',
      fuelPercent: 68,
      loadPercent: 82,
      maintenanceStatus: 'SERVICE CURRENT',
      workOrder: 'No open work order',
      evidence: ['Registration', 'Insurance', 'Inspection'],
    },
    {
      id: 'trl-demo-01',
      unit: 'TRL-DEMO-01',
      type: 'Trailer',
      subtype: '53 ft Dry Van',
      status: 'ACTIVE',
      assignment: 'LW-1001',
      manufacturer: 'Great Dane',
      model: 'Champion CP',
      modelYear: 2023,
      vinTail: '9416',
      currentRoute: 'Chicago, IL → Milwaukee, WI',
      eta: '16:35 CT',
      fuelPercent: null,
      loadPercent: 82,
      maintenanceStatus: 'INSPECTION CURRENT',
      workOrder: 'No open work order',
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
        stage: 'Negotiation',
        priority: 'HIGH',
        contact: 'Broker desk',
        nextFollowUp: 'Today · 15:30 CT',
        nextAction: 'Confirm rate and pickup window',
        lane: 'Chicago, IL → Milwaukee, WI',
        estimatedValue: 2800,
      },
      {
        id: 'acct-002',
        name: 'Frost Bank Tower',
        type: 'Customer / Facility',
        status: 'ACTIVE',
        location: 'Chicago, IL',
        stage: 'Active customer',
        priority: 'MEDIUM',
        contact: 'Receiving office',
        nextFollowUp: 'Tomorrow · 09:00 CT',
        nextAction: 'Review recurring delivery cadence',
        lane: 'Midwest regional',
        estimatedValue: 7200,
      },
      {
        id: 'acct-003',
        name: 'LeeWay Milwaukee Training Terminal',
        type: 'Terminal',
        status: 'ACTIVE',
        location: 'Milwaukee, WI',
        stage: 'Operational',
        priority: 'MEDIUM',
        contact: 'Terminal manager',
        nextFollowUp: 'Friday · 11:00 CT',
        nextAction: 'Confirm yard capacity',
        lane: 'Milwaukee hub',
        estimatedValue: 0,
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
        {
          id: 'equipment',
          label: 'Equipment and fleet',
          status: 'IN_PROGRESS',
        },
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

function hydrateState(value) {
  const next = clone(value);
  const seededPeople = new Map(seed.people.map((row) => [row.id, row]));
  const seededEquipment = new Map(seed.equipment.map((row) => [row.id, row]));
  const seededAccounts = new Map(seed.crm.accounts.map((row) => [row.id, row]));
  next.people = (next.people || []).map((row) => ({
    ...(seededPeople.get(row.id) || {}),
    ...row,
  }));
  next.equipment = (next.equipment || []).map((row) => ({
    ...(seededEquipment.get(row.id) || {}),
    ...row,
  }));
  next.crm ||= { accounts: [], activities: [] };
  next.crm.accounts = (next.crm.accounts || []).map((row) => ({
    ...(seededAccounts.get(row.id) || {}),
    ...row,
  }));
  next.crm.activities ||= [];
  return next;
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
    return parsed?.schemaVersion === 1 ? hydrateState(parsed) : clone(seed);
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
  return cryptoId
    ? `${prefix}-${cryptoId}`
    : `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
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
      requiredEvidence: Array.isArray(input.requiredEvidence)
        ? [...input.requiredEvidence]
        : [],
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
      manufacturer: String(input.manufacturer || '').trim(),
      model: String(input.model || '').trim(),
      modelYear: Number(input.modelYear) || null,
      currentRoute: String(input.currentRoute || '').trim(),
      eta: String(input.eta || '').trim(),
      fuelPercent: Number.isFinite(Number(input.fuelPercent))
        ? Number(input.fuelPercent)
        : null,
      loadPercent: Number.isFinite(Number(input.loadPercent))
        ? Number(input.loadPercent)
        : null,
      maintenanceStatus: String(input.maintenanceStatus || 'PENDING REVIEW'),
      workOrder: String(input.workOrder || 'No open work order'),
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
      stage: String(input.stage || 'Prospect').trim(),
      priority: String(input.priority || 'MEDIUM').trim(),
      contact: String(input.contact || '').trim(),
      nextFollowUp: String(input.nextFollowUp || '').trim(),
      nextAction: String(input.nextAction || '').trim(),
      lane: String(input.lane || '').trim(),
      estimatedValue: Number(input.estimatedValue) || 0,
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
    const caseItem = state.onboardingCases.find(
      (item) => item.type === 'ORGANIZATION',
    );
    if (!caseItem) return;
    const next = Math.max(
      1,
      Math.min(caseItem.totalSteps, Number(step) || caseItem.step),
    );
    caseItem.step = next;
    caseItem.status =
      next >= caseItem.totalSteps ? 'READY_FOR_REVIEW' : 'IN_PROGRESS';
    caseItem.checklist = caseItem.checklist.map((item, index) => ({
      ...item,
      status:
        index + 1 < next
          ? 'COMPLETE'
          : index + 1 === next
            ? 'IN_PROGRESS'
            : 'PENDING',
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
    onboardingPeople: state.people.filter((row) => row.status === 'ONBOARDING')
      .length,
    equipmentCount: state.equipment.length,
    crmAccountCount: state.crm.accounts.length,
    documentCount: state.documents.length,
    integrationsConnected: state.integrations.filter(
      (row) => row.status === 'CONNECTED',
    ).length,
    onboardingCases: state.onboardingCases,
  };
}
