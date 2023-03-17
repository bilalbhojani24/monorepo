export const FIELD_KEYS = {
  PROJECT: 'project',
  ISSUE_TYPE: 'issue_type',
  INTEGRATON_TOOL: 'integration_tool'
};

export const TABS = [
  { name: 'Create issue' },
  { name: 'Update existing issue' }
];
export const fields = [
  {
    required: false,
    label: 'Assignee',
    key: 'assignee',
    optionsPath:
      '/api/pm-tools/v1/users?integrationKey=jira&format=single-value-select',
    schema: {
      field: 'single-value-select',
      'data-format': {
        $type: 'object',
        $properties: {
          id: {
            $type: 'string'
          }
        }
      }
    }
  },
  {
    required: false,
    label: 'Summary',
    key: 'summary',
    schema: {
      field: 'text',
      'data-format': {
        $type: 'string'
      }
    }
  },
  {
    required: false,
    label: 'Description',
    key: 'description',
    schema: {
      field: 'description',
      'data-format': {
        $type: 'string'
      }
    }
  },
  {
    required: false,
    label: 'Paragraph Field',
    key: 'customfield_10050',
    schema: {
      field: 'paragraph',
      'data-format': {
        $type: 'string'
      }
    }
  },
  {
    required: false,
    label: 'Date Field',
    key: 'customfield_10051',
    schema: {
      field: 'date',
      'data-format': {
        $type: 'string'
      }
    }
  },
  {
    required: false,
    label: 'Datetime field',
    key: 'customfield_10053',
    schema: {
      field: 'datetime',
      'data-format': {
        $type: 'string'
      }
    }
  },
  {
    required: false,
    label: 'Labels Field',
    key: 'customfield_10054',
    schema: {
      field: 'multi-text',
      'data-format': {
        $type: 'array',
        $items: {
          $type: 'string'
        }
      }
    }
  },
  {
    required: false,
    label: 'Checkbox Field',
    key: 'customfield_10056',
    options: [
      {
        key: '10043',
        label: 'Option 1'
      },
      {
        key: '10049',
        label: 'Option 2'
      }
    ],
    schema: {
      field: 'multi-value-select',
      'data-format': {
        $type: 'array',
        $items: [
          {
            $type: 'string'
          }
        ]
      }
    }
  },
  {
    required: false,
    label: 'URL Field',
    key: 'customfield_10058',
    validations: [
      {
        regex:
          '^(http(s)://.)[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$',
        'error-message': 'Invalid URL'
      }
    ],
    schema: {
      field: 'text',
      'data-format': {
        $type: 'string'
      }
    }
  },
  {
    required: false,
    label: 'Start date',
    key: 'customfield_10015',
    schema: {
      field: 'date',
      'data-format': {
        $type: 'string'
      }
    }
  },
  {
    required: false,
    label: 'Flagged',
    key: 'customfield_10021',
    options: [
      {
        key: '10019',
        label: 'Impediment'
      }
    ],
    schema: {
      field: 'multi-value-select',
      'data-format': {
        $type: 'array',
        $items: [
          {
            $type: 'string'
          }
        ]
      }
    }
  },
  {
    required: true,
    label: 'Reporter',
    key: 'reporter',
    optionsPath:
      '/api/pm-tools/v1/users?integrationKey=jira&format=single-value-select',
    schema: {
      field: 'single-value-select',
      'data-format': {
        $type: 'object',
        $properties: {
          id: {
            $type: 'string'
          }
        }
      }
    }
  },
  {
    required: false,
    label: 'Labels',
    key: 'labels',
    schema: {
      field: 'multi-text',
      'data-format': {
        $type: 'array',
        $items: {
          $type: 'string'
        }
      }
    }
  },
  {
    required: false,
    label: 'Due date',
    key: 'duedate',
    schema: {
      field: 'date',
      'data-format': {
        $type: 'string'
      }
    }
  },
  {
    required: false,
    schema: {
      'data-format': {
        $type: 'string'
      },
      field: 'text'
    },
    label: 'Numeric Field',
    key: 'customfield_10052'
  },
  {
    required: false,
    schema: {
      'data-format': {
        $type: 'string'
      },
      field: 'text'
    },
    label: 'Dropdown Field',
    key: 'customfield_10055'
  },
  {
    required: false,
    schema: {
      'data-format': {
        $type: 'string'
      },
      field: 'text'
    },
    label: 'Dep Dropdown',
    key: 'customfield_10057'
  },
  {
    required: false,
    schema: {
      'data-format': {
        $type: 'string'
      },
      field: 'text'
    },
    label: 'Text Field',
    key: 'customfield_10049'
  },
  {
    required: false,
    schema: {
      'data-format': {
        $type: 'string'
      },
      field: 'text'
    },
    label: 'Development',
    key: 'customfield_10000'
  },
  {
    required: false,
    schema: {
      'data-format': {
        $type: 'string'
      },
      field: 'text'
    },
    label: 'People',
    key: 'customfield_10047'
  },
  {
    required: false,
    schema: {
      'data-format': {
        $type: 'string'
      },
      field: 'text'
    },
    label: 'Single Person',
    key: 'customfield_10048'
  },
  {
    required: false,
    schema: {
      'data-format': {
        $type: 'string'
      },
      field: 'text'
    },
    label: 'Rank',
    key: 'customfield_10019'
  },
  {
    required: false,
    schema: {
      'data-format': {
        $type: 'string'
      },
      field: 'text'
    },
    label: 'Linked Issues',
    key: 'issuelinks'
  }
];
