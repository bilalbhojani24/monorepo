/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react/no-array-index-key */
import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import Checkbox from '../Checkbox';
import TableBody from '../TableBody';
import TableCell from '../TableCell';
import TableHead from '../TableHead';
import TableRow from '../TableRow';

import Table from './index';

const columns = [
  {
    name: 'Name',
    key: 'name',
    isSortable: true
  },
  {
    name: 'Title',
    key: 'title',
    isSortable: true
  },
  {
    name: 'Email',
    key: 'email'
  },
  {
    name: 'Role',
    key: 'role'
  },
  {
    name: '',
    key: 'action',
    cell: () => (
      <Button variant="minimal" colors="brand">
        Edit
      </Button>
    )
  }
];

const rows = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member'
  },
  {
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    role: 'Admin'
  },
  {
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    role: 'Admin'
  }
];

const handleSort = (col, dir) => {
  console.log(col);
  console.log(dir);
};

const defaultConfig = {
  title: 'Application/Components/Table',
  component: Table,
  subcomponents: { TableBody, TableHead, TableCell, TableRow },
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import {Table} from '@browserstack/bifrost'"}
        />
      )
    }
  },

  argTypes: {
    children: {
      option: { type: null },
      defaultValue: (
        <>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key} variant="header">
                  {col.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((column, colIdx) => {
                  const value = row[column.key];
                  return (
                    <TableCell
                      key={column.id}
                      wrapperClassName={
                        colIdx === 0
                          ? 'text-base-900 font-medium'
                          : 'text-base-500'
                      }
                    >
                      {column.cell ? <>{column.cell(row)}</> : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </>
      )
    },
    containerWrapperClass: {
      option: { type: 'string' },
      defaultValue: ''
    },
    tableWrapperClass: {
      option: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};

const Template = (args) => <Table {...args} />;
const FullWidthTableTemplate = (args) => <Table {...args} />;
const StripedTableTemplate = (args) => <Table {...args} />;
const UppercaseHeadingTableTemplate = (args) => <Table {...args} />;
const WhiteBackgroundTableTemplate = (args) => <Table {...args} />;
const MultiLineContentTableTemplate = (args) => <Table {...args} />;
const GroupedRowsTableTemplate = (args) => <Table {...args} />;
const StickyHeaderTableTemplate = (args) => <Table {...args} />;
const SelectableTableTemplate = (args) => <Table {...args} />;
const SortableTableTemplate = (args) => <Table {...args} />;
const CondensedTableTemplate = (args) => <Table {...args} />;

const Primary = Template.bind({});
const FullWidthTable = FullWidthTableTemplate.bind({});
const StripedTable = StripedTableTemplate.bind({});
const UppercaseHeadingTable = UppercaseHeadingTableTemplate.bind({});
const WhiteBackgroundTable = WhiteBackgroundTableTemplate.bind({});
const MultiLineContentTable = MultiLineContentTableTemplate.bind({});
const GroupedRowsTable = GroupedRowsTableTemplate.bind({});
const StickyHeaderTable = StickyHeaderTableTemplate.bind({});
const SelectableTable = SelectableTableTemplate.bind({});
const SortableTable = SortableTableTemplate.bind({});
const CondensedTable = CondensedTableTemplate.bind({});

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export {
  CondensedTable,
  FullWidthTable,
  GroupedRowsTable,
  MultiLineContentTable,
  Primary,
  SelectableTable,
  SortableTable,
  StickyHeaderTable,
  StripedTable,
  UppercaseHeadingTable,
  WhiteBackgroundTable
};

// Condensed Table start
CondensedTable.args = {
  containerWrapperClass: 'md:rounded-none shadow-none',
  children: (
    <>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell
              key={col.key}
              variant="header"
              wrapperClassName="first:pr-3 last:pl-3 px-2"
            >
              {col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow
            key={idx}
            onRowClick={() => {
              console.log('Row clicked');
            }}
          >
            {columns.map((column, colIdx) => {
              const value = row[column.key];
              return (
                <TableCell
                  key={column.id}
                  wrapperClassName={`
                    ${colIdx === 0 ? 'font-medium text-base-900' : ''}
                   first:pr-3 last:pl-3 px-2 py-2`}
                >
                  {column.cell ? <>{column.cell()}</> : value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </>
  )
};
// Condensed Table end

// Fullwidth Table start
FullWidthTable.args = {
  containerWrapperClass: 'md:rounded-none shadow-none',
  children: (
    <>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.key} variant="header">
              {col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={idx}>
            {columns.map((column, colIdx) => {
              const value = row[column.key];
              return (
                <TableCell
                  key={column.id}
                  wrapperClassName={
                    colIdx === 0 ? 'font-medium text-base-900' : ''
                  }
                >
                  {column.cell ? <>{column.cell()}</> : value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </>
  )
};
// Fullwidth Table end

// Group row Table start
const GRTColumns = [
  {
    name: 'Name',
    key: 'name'
  },
  {
    name: 'Title',
    key: 'title'
  },
  {
    name: 'Email',
    key: 'role'
  },
  {
    name: 'Role',
    key: 'role'
  },
  {
    name: '',
    key: 'action',
    cell: () => (
      <Button variant="minimal" colors="brand">
        Edit
      </Button>
    )
  }
];
const GRTRows = [
  {
    name: 'Edinburgh',
    people: [
      {
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        email: 'lindsay.walton@example.com',
        role: 'Member'
      },
      {
        name: 'Courtney Henry',
        title: 'Designer',
        email: 'courtney.henry@example.com',
        role: 'Admin'
      }
    ]
  },
  {
    name: 'London',
    people: [
      {
        name: 'Tom cook',
        title: 'Front-end Developer',
        email: 'lindsay.walton@example.com',
        role: 'Member'
      },
      {
        name: 'Whitney Francis',
        title: 'Designer',
        email: 'courtney.henry@example.com',
        role: 'Admin'
      }
    ]
  }
];
GroupedRowsTable.args = {
  children: (
    <>
      <TableHead wrapperClassName="bg-white">
        <TableRow>
          {GRTColumns.map((col) => (
            <TableCell key={col.key} variant="header">
              {col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {GRTRows.map((row, idx) => (
          <>
            <TableRow>
              <TableCell
                variant="header"
                colspan={GRTColumns.length}
                wrapperClassName="bg-base-50"
              >
                {row.name}
              </TableCell>
            </TableRow>
            {row.people.map((per, perIdx) => (
              <TableRow key={idx + perIdx}>
                {GRTColumns.map((column, colIdx) => {
                  const value = per[column.key];
                  return (
                    <TableCell
                      key={column.id}
                      wrapperClassName={
                        colIdx === 0
                          ? 'text-base-900 font-medium'
                          : 'text-base-500'
                      }
                    >
                      {column.cell ? <>{column.cell(row)}</> : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </>
        ))}
      </TableBody>
    </>
  )
};
// Group row Table end

// MultiLineContentTable Table start
const MLCColumns = [
  {
    name: 'Name',
    key: 'name',
    cell: (value) => (
      <div className="flex items-center">
        <div className="h-10 w-10 shrink-0">
          <img className="h-10 w-10 rounded-full" src={value.image} alt="" />
        </div>
        <div className="ml-4">
          <div className="text-base-900 font-medium">{value.name}</div>
          <div className="text-base-500">{value.email}</div>
        </div>
      </div>
    )
  },
  {
    name: 'Title',
    key: 'title',
    cell: (row) => (
      <div>
        <div className="text-base-900">{row.title}</div>
        <div className="text-base-500">{row.department}</div>
      </div>
    )
  },
  {
    name: 'Status',
    key: 'status',
    cell: () => (
      <span className="bg-success-100 text-success-800 inline-flex rounded-full px-2 text-xs font-semibold leading-5">
        Active
      </span>
    )
  },
  {
    name: 'Role',
    key: 'role'
  },
  {
    name: '',
    key: 'action',
    cell: (row) => (
      <a href="/" className="hover:text-brand-900 text-brand-600">
        Edit<span className="sr-only">, {row.name}</span>
      </a>
    )
  }
];
const MLCRows = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];
MultiLineContentTable.args = {
  children: (
    <>
      <TableHead>
        <TableRow>
          {MLCColumns.map((col) => (
            <TableCell key={col.key} variant="header">
              {col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {MLCRows.map((row, idx) => (
          <TableRow key={idx}>
            {MLCColumns.map((column) => {
              const value = row[column.key];
              return (
                <TableCell key={column.id}>
                  {column.cell ? <>{column.cell(row)}</> : value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </>
  )
};
// MultiLineContentTable Table end

// Sticky Header Table start
StickyHeaderTable.args = {
  children: (
    <>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.key} variant="header" isSticky>
              {col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {[...rows, ...rows, ...rows, ...rows, ...rows].map((row, idx) => (
          <TableRow key={idx}>
            {columns.map((column) => {
              const value = row[column.key];
              return (
                <TableCell key={column.id}>
                  {column.cell ? <>{column.cell}</> : value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </>
  ),
  containerWrapperClass: 'overflow-visible overflow-x-visible md:rounded-none'
};
// Sticky Header Table end

// SelectableTable Table start
SelectableTable.args = {
  children: (
    <>
      <TableHead>
        <TableRow>
          {columns.map((col, id) => (
            <>
              {id === 0 ? (
                <>
                  <TableCell
                    key={col.key}
                    variant="header"
                    wrapperClassName="flex items-center !pl-6"
                  >
                    <Checkbox
                      wrapperClassName="pt-0 mr-6 h-4 w-4"
                      border={false}
                      name={col.key}
                    />
                    {col.name}
                  </TableCell>
                </>
              ) : (
                <TableCell key={col.key} variant="header">
                  {col.name}
                </TableCell>
              )}
            </>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={idx}>
            {columns.map((column, colIdx) => {
              const value = row[column.key];
              return (
                <>
                  {colIdx === 0 ? (
                    <TableCell
                      key={column.id}
                      wrapperClassName="flex items-center text-base-900 font-medium !pl-6"
                    >
                      <Checkbox
                        border={false}
                        wrapperClassName="pt-0 mr-6 h-4 w-4"
                      />
                      {column.cell ? <>{column.cell}</> : value}
                    </TableCell>
                  ) : (
                    <TableCell key={column.id}>
                      {column.cell ? <>{column.cell}</> : value}
                    </TableCell>
                  )}
                </>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </>
  )
};
// SelectableTable Table end

// sortable table start
SortableTable.args = {
  children: (
    <>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell
              key={col.key}
              variant="header"
              sortable={col.isSortable}
              onSort={(key) => {
                handleSort(col, key);
              }}
              sortDirection="desc"
            >
              {col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={idx}>
            {columns.map((column, colIdx) => {
              const value = row[column.key];
              return (
                <TableCell
                  key={column.id}
                  wrapperClassName={
                    colIdx === 0 ? 'text-base-900 font-medium' : 'text-base-500'
                  }
                >
                  {column.cell ? <>{column.cell(row)}</> : value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </>
  )
};
// sortable table end

// Striped Table start
StripedTable.args = {
  children: (
    <>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.key} variant="header">
              {col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody wrapperClassName="divide-y-0">
        {rows.map((row, idx) => (
          <TableRow key={idx} selected={idx % 2 !== 0}>
            {columns.map((column, colIdx) => {
              const value = row[column.key];
              return (
                <TableCell
                  key={column.id}
                  wrapperClassName={
                    colIdx === 0 ? 'text-base-900 font-medium' : 'text-base-500'
                  }
                >
                  {column.cell ? <>{column.cell()}</> : value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </>
  )
};
// Striped Table end

// UppercaseHeadingTable Table start
UppercaseHeadingTable.args = {
  children: (
    <>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell
              key={col.key}
              variant="header"
              textTransform="uppercase"
              wrapperClassName="text-base-500 font-medium"
            >
              {col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={idx}>
            {columns.map((column, colIdx) => {
              const value = row[column.key];
              return (
                <TableCell
                  key={column.id}
                  wrapperClassName={
                    colIdx === 0 ? 'text-base-900 font-medium' : 'text-base-500'
                  }
                >
                  {column.cell ? <>{column.cell()}</> : value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </>
  )
};
// UppercaseHeadingTable Table end

// WhiteBackgroundTable Table start
WhiteBackgroundTable.args = {
  containerWrapperClass: 'bg-white ring-0 shadow-none',
  children: (
    <>
      <TableHead wrapperClassName="bg-white">
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.key} variant="header" textTransform="uppercase">
              {col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow key={idx}>
            {columns.map((column) => {
              const value = row[column.key];
              return (
                <TableCell key={column.id}>
                  {column.cell ? <>{column.cell()}</> : value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </>
  )
};
// WhiteBackgroundTable Table end
