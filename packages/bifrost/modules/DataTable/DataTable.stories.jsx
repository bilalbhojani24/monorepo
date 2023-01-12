import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';

import DataTable from './index';

const columns = [
  {
    name: 'Name',
    key: 'name',
    style: {
      width: '200px',
    },
    isSortable: true,
  },
  {
    name: 'Title',
    key: 'title',
    style: {},
    isSortable: true,
  },
  {
    name: 'Email',
    key: 'email',
    style: {},
  },
  {
    name: 'Role',
    key: 'role',
    style: {},
  },
  {
    name: 'Price',
    key: 'price',
    style: {},
  },
  {
    name: 'Quantity',
    key: 'quantity',
    style: {},
  },
  {
    name: '',
    key: 'action',
    cell: (rowData) => (
      <Button
        variant="white"
        onClick={() => {
          console.log(rowData);
        }}
      >
        Edit
      </Button>
    ),
    style: {},
  },
];

const rows = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '12.00',
    price: '$123',
  },
  {
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    role: 'Admin',
    quantity: '19.00',
    price: '$1230',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    quantity: '21.00',
    price: '$12388',
  },
];

const defaultConfig = {
  title: 'Application/Components/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import DataTable from 'bifrost/DataTable'"}
        />
      ),
    },
  },
  argTypes: {
    columns: {
      option: { type: null },
      defaultValue: columns,
    },
    isFullWhite: {
      option: { type: 'boolean' },
      defaultValue: false,
    },
    isHeaderCapitalize: {
      option: { type: 'boolean' },
      defaultValue: false,
    },
    isHeaderSticky: {
      option: { type: 'boolean' },
      defaultValue: false,
    },
    isSelectable: {
      option: { type: 'boolean' },
      defaultValue: false,
    },
    isStriped: {
      option: { type: 'boolean' },
      defaultValue: false,
    },

    onAllRowSelect: {
      option: { type: null },
      defaultValue: (selectedRows) => {
        console.log(selectedRows);
      },
    },
    onRowClick: {
      option: { type: null },
      defaultValue: (row) => {
        console.log(row);
      },
    },
    onRowSelect: {
      option: { type: null },
      defaultValue: (selectedRow, selectedRows) => {
        console.log(selectedRow);
        console.log(selectedRows);
      },
    },
    onSort: {
      option: { type: null },
      defaultValue: null,
    },
    rowClass: {
      option: { type: 'string' },
      defaultValue: '',
    },
    rows: {
      option: { type: null },
      defaultValue: rows,
    },
    selectedRowClass: {
      option: { type: 'string' },
      defaultValue: '',
    },
    tableClass: {
      option: { type: 'string' },
      defaultValue: '',
    },
    tableContainerClass: {
      option: { type: 'string' },
      defaultValue: '',
    },
  },
  controls: {},
};
const Template = (args) => <DataTable {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
