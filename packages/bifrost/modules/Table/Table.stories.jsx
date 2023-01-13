import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import TableBody from '../TableBody';
import TableCell from '../TableCell';
import TableHead from '../TableHead';
import TableRow from '../TableRow';

import Table from './index';

const columns = [
  {
    name: 'Name',
    key: 'name',
    isSortable: true,
  },
  {
    name: 'Title',
    key: 'title',
    isSortable: true,
  },
  {
    name: 'Email',
    key: 'email',
  },
  {
    name: 'Role',
    key: 'role',
  },
  {
    name: 'Price',
    key: 'price',
  },
  {
    name: 'Quantity',
    key: 'quantity',
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
];

const handleSort = (col, dir) => {
  console.log(col);
  console.log(dir);
};

const defaultConfig = {
  title: 'Application/Components/Table',
  component: Table,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Table from 'bifrost/Table'"}
        />
      ),
    },
  },

  argTypes: {
    children: {
      option: { type: null },
      defaultValue: (
        <>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  variant="header"
                  sortable
                  onSort={(dir) => {
                    handleSort(col, dir);
                  }}
                >
                  {col.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow hover selected={idx % 2 !== 0}>
                {columns.map((column) => {
                  const value = row[column.key];
                  return <TableCell key={column.id}>{value}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </>
      ),
    },
    containerClass: {
      option: { type: 'string' },
      defaultValue: '',
    },
    tableClass: {
      option: { type: 'string' },
      defaultValue: '',
    },
  },
  controls: {},
};
const Template = (args) => <Table {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
