# LeeWay Logistics CRM + Onboarding Operating Model

## Product rule

Transit World is the spatial operating surface. CRM and onboarding are separate governed workspaces over the same connected records.

The map remains visually dominant until the operator requests a business workspace.

## Connected record graph

Organization -> People -> Equipment -> Loads -> Accounts -> Facilities -> Documents -> Activities -> Evidence.

The same record may appear in world, map, board, table, inspector, activity, onboarding, or document views without duplicating truth.

## Company onboarding

The candidate workflow is seven steps:

1. Organization identity
2. Operating profile
3. Admins and people
4. Equipment and fleet
5. Documents and evidence
6. Integrations
7. Review and activation

Production requirements must be configured per company type, jurisdiction, role, transport mode, and regulatory authority.

## Employee onboarding

The guided employee flow captures:

- identity/contact information
- role and location
- role-based required evidence
- uploaded document metadata
- onboarding status
- review state

Driver onboarding may include employment application, license/CDL, medical/safety credentials where applicable, MVR/qualification evidence, policies, payroll/tax records, and company-specific requirements. This candidate does not claim regulatory completeness.

## Equipment onboarding

Asset intake supports tractors, trailers, trucks, buses, vans, service vehicles, rail equipment, and other governed assets.

Evidence may include registration, insurance, inspections, lease/title records, maintenance history, photos, manuals, and telematics linkage.

## CRM

CRM accounts include:

- customers
- brokers
- shippers
- consignees
- terminals
- warehouses
- repair/service hubs
- ports/intermodal locations

Accounts can have a location and therefore become spatial entities in Transit World.

## Document intake

GitHub Pages stores only local record/file metadata in the candidate build.

Production document bytes must be sent to an authorized evidence/document backend. Financial credentials and banking secrets must never be stored in Pages/localStorage.

## Integrations

The workspace exposes governed integration boundaries for:

- banking
- payroll
- accounting
- ELD / telematics
- fuel cards
- email / calendar

A visible connector card is not evidence of a live connection. Until a backend/connector is bound, status remains NOT_CONNECTED or CONNECTOR_NOT_BOUND.

## Agent Lee

Agent Lee can use both spatial and enterprise tools.

Spatial capabilities include navigation, map layers, CCTV, tracking, camera motion, routes, annotations, world context, and analyst queries.

Enterprise capabilities include:

- open_enterprise_workspace
- start_onboarding
- list_enterprise_records
- locate_enterprise_record

Agent Lee must use tools before claiming that an operational action succeeded.

## LeeWay funnel

Every consequential action remains subject to:

HUMAN -> DEVICE/SYSTEM -> AGENT -> INTENT -> ENVIRONMENT -> PLATFORM -> CAPABILITY -> AUTHORITY -> PERMISSION -> STATE -> HISTORY -> RISK -> CONNECTIVITY -> EVIDENCE -> RECOVERY -> ADAPTATION.

Execution discipline:

Investigate -> Diagnose -> Plan -> Implement -> Test -> Validate -> Repair -> Retest -> Verify -> Evidence.
