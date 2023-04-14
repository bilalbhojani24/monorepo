export const FIELD_KEYS = {
  PROJECT: 'project',
  ISSUE_TYPE: 'issue_type',
  TICKET_ID: 'ticket_id',
  INTEGRATON_TOOL: 'integration_tool'
};

export const ISSUE_MODES = {
  CREATION: 'create',
  UPDATION: 'update'
};

export const TABS = [
  { name: 'Create issue', mode: ISSUE_MODES.CREATION },
  { name: 'Update existing issue', mode: ISSUE_MODES.UPDATION }
];