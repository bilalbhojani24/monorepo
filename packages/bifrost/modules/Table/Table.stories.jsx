/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { delay } from '@browserstack/utils';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

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
    name: 'Dan Adams',
    title: 'Back-end Developer',
    email: 'dan.adams@example.com',
    role: 'Supervisor'
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

const Headings = ['Name', 'Title', 'Email', 'Role'];
const Names = ['Lindsay Walton', 'Courtney Henry', 'Dan Adams'];
const Titles = ['Front-end Developer', 'Back-end Developer', 'Designer'];
const Emails = [
  'lindsay.walton@example.com',
  'courtney.henry@example.com',
  'dan.adams@example.com'
];
const Roles = ['Member', 'Admin', 'Supervisor'];

const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  Headings.forEach(async (heading) => {
    await expect(canvas.getByText(heading)).toBeVisible();
  });
  Names.forEach(async (name) => {
    await expect(canvas.getByText(name)).toBeVisible();
  });
  Titles.forEach(async (title) => {
    await expect(canvas.getByText(title)).toBeVisible();
  });
  Emails.forEach(async (email) => {
    await expect(canvas.getByText(email)).toBeVisible();
  });
  Roles.forEach(async (role) => {
    await expect(canvas.getByText(role)).toBeVisible();
  });
  await expect(canvas.queryAllByText('Edit').length).toBe(3);
};

const FullWidthTable = FullWidthTableTemplate.bind({});
FullWidthTable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  Headings.forEach(async (heading) => {
    await expect(canvas.getByText(heading)).toBeVisible();
  });
  Names.forEach(async (name) => {
    await expect(canvas.getByText(name)).toBeVisible();
  });
  Titles.forEach(async (title) => {
    await expect(canvas.getByText(title)).toBeVisible();
  });
  Emails.forEach(async (email) => {
    await expect(canvas.getByText(email)).toBeVisible();
  });
  Roles.forEach(async (role) => {
    await expect(canvas.getByText(role)).toBeVisible();
  });
  await expect(canvas.queryAllByText('Edit').length).toBe(3);
};

const StripedTable = StripedTableTemplate.bind({});
StripedTable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  Headings.forEach(async (heading) => {
    await expect(canvas.getByText(heading)).toBeVisible();
  });
  Names.forEach(async (name) => {
    await expect(canvas.getByText(name)).toBeVisible();
  });
  Titles.forEach(async (title) => {
    await expect(canvas.getByText(title)).toBeVisible();
  });
  Emails.forEach(async (email) => {
    await expect(canvas.getByText(email)).toBeVisible();
  });
  Roles.forEach(async (role) => {
    await expect(canvas.getByText(role)).toBeVisible();
  });
  await expect(canvas.queryAllByText('Edit').length).toBe(3);
};

const UppercaseHeadingTable = UppercaseHeadingTableTemplate.bind({});
UppercaseHeadingTable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  Headings.forEach(async (heading) => {
    await expect(canvas.getByText(heading)).toBeVisible();
  });
  Names.forEach(async (name) => {
    await expect(canvas.getByText(name)).toBeVisible();
  });
  Titles.forEach(async (title) => {
    await expect(canvas.getByText(title)).toBeVisible();
  });
  Emails.forEach(async (email) => {
    await expect(canvas.getByText(email)).toBeVisible();
  });
  Roles.forEach(async (role) => {
    await expect(canvas.getByText(role)).toBeVisible();
  });
  await expect(canvas.queryAllByText('Edit').length).toBe(3);
};

const WhiteBackgroundTable = WhiteBackgroundTableTemplate.bind({});
WhiteBackgroundTable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  Headings.forEach(async (heading) => {
    await expect(canvas.getByText(heading)).toBeVisible();
  });
  Names.forEach(async (name) => {
    await expect(canvas.getByText(name)).toBeVisible();
  });
  Titles.forEach(async (title) => {
    await expect(canvas.getByText(title)).toBeVisible();
  });
  Emails.forEach(async (email) => {
    await expect(canvas.getByText(email)).toBeVisible();
  });
  Roles.forEach(async (role) => {
    await expect(canvas.getByText(role)).toBeVisible();
  });
  await expect(canvas.queryAllByText('Edit').length).toBe(3);
};

const MultiLineContentTable = MultiLineContentTableTemplate.bind({});
MultiLineContentTable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.queryAllByText(Names[0]).length).toBe(3);
  await expect(canvas.queryAllByText(Titles[0]).length).toBe(3);
  await expect(canvas.getByText('Status')).toBeVisible();
  await expect(canvas.queryAllByText('Active').length).toBe(3);
  await expect(canvas.queryAllByText(Roles[0]).length).toBe(3);
  await expect(canvas.queryAllByText('Edit').length).toBe(3);
};

const GroupedRowsTable = GroupedRowsTableTemplate.bind({});
GroupedRowsTable.play = async ({ canvasElement }) => {
  const groupedNames = [
    'Lindsay Walton',
    'Courtney Henry',
    'Tom cook',
    'Whitney Francis'
  ];
  const groupedTitles = ['Front-end Developer', 'Designer'];
  const groupedRoles = ['Member', 'Admin'];
  const groupedEmails = [
    'lindsay.walton@example.com',
    'courtney.henry@example.com',
    'tom.cook@example.com',
    'whitney.francis@example.com'
  ];
  const groupedLocations = ['Edinburgh', 'London'];

  const canvas = within(canvasElement);
  Headings.forEach(async (heading) => {
    await expect(canvas.getByText(heading)).toBeVisible();
  });
  groupedLocations.forEach(async (location) => {
    await expect(canvas.getByText(location)).toBeVisible();
  });
  groupedNames.forEach(async (name) => {
    await expect(canvas.getByText(name)).toBeVisible();
  });
  groupedTitles.forEach(async (title) => {
    await expect(canvas.queryAllByText(title).length).toBe(2);
  });
  groupedEmails.forEach(async (email) => {
    await expect(canvas.getByText(email)).toBeVisible();
  });
  groupedRoles.forEach(async (role) => {
    await expect(canvas.queryAllByText(role).length).toBe(2);
  });
  await expect(canvas.queryAllByText('Edit').length).toBe(4);
};

const StickyHeaderTable = StickyHeaderTableTemplate.bind({});
StickyHeaderTable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  Headings.forEach(async (heading) => {
    await expect(canvas.getByText(heading)).toBeVisible();
  });
  Names.forEach(async (name) => {
    await expect(canvas.queryAllByText(name).length).toBe(5);
  });
  Titles.forEach(async (title) => {
    await expect(canvas.queryAllByText(title).length).toBe(5);
  });
  Emails.forEach(async (email) => {
    await expect(canvas.queryAllByText(email).length).toBe(5);
  });
  Roles.forEach(async (role) => {
    await expect(canvas.queryAllByText(role).length).toBe(5);
  });
};

const SelectableTable = SelectableTableTemplate.bind({});
SelectableTable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  Headings.forEach(async (heading) => {
    await expect(canvas.getByText(heading)).toBeVisible();
  });
  Names.forEach(async (name) => {
    await expect(canvas.getByText(name)).toBeVisible();
  });
  Titles.forEach(async (title) => {
    await expect(canvas.getByText(title)).toBeVisible();
  });
  Emails.forEach(async (email) => {
    await expect(canvas.getByText(email)).toBeVisible();
  });
  Roles.forEach(async (role) => {
    await expect(canvas.getByText(role)).toBeVisible();
  });
  await delay(1);
  const inputs = document.querySelectorAll('input');
  inputs.forEach(async (input) => {
    input.click();
  });
};

const SortableTable = SortableTableTemplate.bind({});
SortableTable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  Headings.forEach(async (heading) => {
    await expect(canvas.getByText(heading)).toBeVisible();
  });
  Names.forEach(async (name) => {
    await expect(canvas.getByText(name)).toBeVisible();
  });
  Titles.forEach(async (title) => {
    await expect(canvas.getByText(title)).toBeVisible();
  });
  Emails.forEach(async (email) => {
    await expect(canvas.getByText(email)).toBeVisible();
  });
  Roles.forEach(async (role) => {
    await expect(canvas.getByText(role)).toBeVisible();
  });
  await expect(canvas.queryAllByText('Edit').length).toBe(3);
};

const CondensedTable = CondensedTableTemplate.bind({});
CondensedTable.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  Headings.forEach(async (heading) => {
    await expect(canvas.getByText(heading)).toBeVisible();
  });
  Names.forEach(async (name) => {
    await expect(canvas.getByText(name)).toBeVisible();
  });
  Titles.forEach(async (title) => {
    await expect(canvas.getByText(title)).toBeVisible();
  });
  Emails.forEach(async (email) => {
    await expect(canvas.getByText(email)).toBeVisible();
  });
  Roles.forEach(async (role) => {
    await expect(canvas.getByText(role)).toBeVisible();
  });
  await expect(canvas.queryAllByText('Edit').length).toBe(3);
};

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
        email: 'tom.cook@example.com',
        role: 'Member'
      },
      {
        name: 'Whitney Francis',
        title: 'Designer',
        email: 'whitney.francis@example.com',
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
