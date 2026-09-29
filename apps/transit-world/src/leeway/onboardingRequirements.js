export const EMPLOYEE_ONBOARDING_PROFILES = Object.freeze({
  Driver: Object.freeze({
    sections: [
      'Employment application',
      'Identity / work authorization',
      'Federal tax withholding',
      'Payroll / direct-deposit enrollment',
      'Company policies / acknowledgements',
      'Driver qualification evidence',
    ],
    evidence: [
      'Employment Application',
      'Form I-9 / employment eligibility evidence',
      'Form W-4',
      'CDL / driver license',
      'Motor vehicle record inquiry',
      'Road test / accepted equivalent',
      'Medical qualification evidence where applicable',
      'Safety / policy acknowledgements',
    ],
    note: 'Driver qualification requirements vary by operation, jurisdiction, vehicle, and exemption status. Configure the production checklist against current FMCSA/state/company requirements.',
  }),
  Dispatcher: Object.freeze({
    sections: [
      'Employment application',
      'Identity / work authorization',
      'Federal tax withholding',
      'Payroll / direct-deposit enrollment',
      'Company policies / acknowledgements',
      'Operations access',
    ],
    evidence: [
      'Employment Application',
      'Form I-9 / employment eligibility evidence',
      'Form W-4',
      'Policy Acknowledgements',
      'Role / system-access approvals',
    ],
  }),
  'Fleet Manager': Object.freeze({
    sections: [
      'Employment application',
      'Identity / work authorization',
      'Federal tax withholding',
      'Payroll / direct-deposit enrollment',
      'Company policies / acknowledgements',
      'Fleet / maintenance access',
    ],
    evidence: [
      'Employment Application',
      'Form I-9 / employment eligibility evidence',
      'Form W-4',
      'Policy Acknowledgements',
      'Role / system-access approvals',
    ],
  }),
  Maintenance: Object.freeze({
    sections: [
      'Employment application',
      'Identity / work authorization',
      'Federal tax withholding',
      'Payroll / direct-deposit enrollment',
      'Safety / shop policies',
      'Credentials / certifications where applicable',
    ],
    evidence: [
      'Employment Application',
      'Form I-9 / employment eligibility evidence',
      'Form W-4',
      'Safety / Policy Acknowledgements',
      'Technician credentials where applicable',
    ],
  }),
  'Transit Operator': Object.freeze({
    sections: [
      'Employment application',
      'Identity / work authorization',
      'Federal tax withholding',
      'Payroll / direct-deposit enrollment',
      'Transit qualification / safety',
      'Agency policies',
    ],
    evidence: [
      'Employment Application',
      'Form I-9 / employment eligibility evidence',
      'Form W-4',
      'License / endorsements where applicable',
      'Medical / safety qualification where applicable',
      'Agency Policy Acknowledgements',
    ],
  }),
  'HR / Recruiting': Object.freeze({
    sections: [
      'Employment application',
      'Identity / work authorization',
      'Federal tax withholding',
      'Payroll / direct-deposit enrollment',
      'Confidentiality / HR policies',
      'System access',
    ],
    evidence: [
      'Employment Application',
      'Form I-9 / employment eligibility evidence',
      'Form W-4',
      'Confidentiality / Policy Acknowledgements',
      'Role / system-access approvals',
    ],
  }),
  Operations: Object.freeze({
    sections: [
      'Employment application',
      'Identity / work authorization',
      'Federal tax withholding',
      'Payroll / direct-deposit enrollment',
      'Operations policies',
      'System access',
    ],
    evidence: [
      'Employment Application',
      'Form I-9 / employment eligibility evidence',
      'Form W-4',
      'Policy Acknowledgements',
      'Role / system-access approvals',
    ],
  }),
});

export const ORGANIZATION_ONBOARDING_STEPS = Object.freeze([
  Object.freeze({ id: 'identity', label: 'Organization identity' }),
  Object.freeze({ id: 'operations', label: 'Operating profile' }),
  Object.freeze({ id: 'admins', label: 'Admins and people' }),
  Object.freeze({ id: 'equipment', label: 'Equipment and fleet' }),
  Object.freeze({ id: 'documents', label: 'Documents and evidence' }),
  Object.freeze({ id: 'integrations', label: 'Integrations' }),
  Object.freeze({ id: 'activate', label: 'Review and activate' }),
]);

export function onboardingProfile(role = 'Driver') {
  return (
    EMPLOYEE_ONBOARDING_PROFILES[role] ||
    EMPLOYEE_ONBOARDING_PROFILES.Operations
  );
}
