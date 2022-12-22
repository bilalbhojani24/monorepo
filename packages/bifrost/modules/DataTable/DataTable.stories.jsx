import React from 'react';
import DataTable from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { columns, rows } from './const/dataTableConstants';

const defaultConfig = {
  title: 'Application/Components/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import DataTable from 'bifrost/DataTable'"} />;
      }
    }
  },
  argTypes: {
    columns: {
      option: { type: null },
      defaultValue: columns
    },
    isFullWhite: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    isHeaderCapitalize: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    isHeaderSticky: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    isSelectable: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    isStriped: {
      option: { type: 'boolean' },
      defaultValue: false
    },

    onAllRowSelect: {
      option: { type: null },
      defaultValue: (selectedRows) => {
        console.log(selectedRows);
      }
    },
    onRowSelect: {
      option: { type: null },
      defaultValue: (selectedRow, selectedRows) => {
        console.log(selectedRow);
        console.log(selectedRows);
      }
    },
    onSort: {
      option: { type: null },
      defaultValue: (key, direction) => {
        console.log(key, direction);
      }
    },
    rowClass: {
      option: { type: 'string' },
      defaultValue: ''
    },
    rows: {
      option: { type: null },
      defaultValue: rows
    },
    selectedRowClass: {
      option: { type: 'string' },
      defaultValue: ''
    },
    tableClass: {
      option: { type: 'string' },
      defaultValue: ''
    },
    tableContainerClass: {
      option: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <DataTable {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
