import React from 'react';
import { Button, DataTable, InputField, Tabs } from '@browserstack/bifrost';

import { SearchIcon } from '../../Icons';

const COLUMNS = [
  {
    name: 'Name',
    key: 'name',
    style: {},
    // isSortable: true,
  },
  {
    name: 'Title',
    key: 'title',
    style: {},
    // isSortable: true,
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
    // cell: (rowData) => (
    //   <button
    //     onClick={() => {
    //       console.log(rowData);
    //     }}
    //   >
    //     Edit
    //   </button>
    // ),
    style: {},
  },
];

const ROWS = [
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
];

const AllProjects = (props) => (
  <div>
    {/* header */}
    <div className="border-b-2 border-base-200">
      <div className="mx-4 my-5 flex justify-between">
        <span className="text-2xl font-bold leading-7 text-base-700">
          All Projects
        </span>
        <Button>Add Project</Button>
      </div>
    </div>
    <div className="bg-base-100">
      <div>
        <Tabs
          id="project-tabs"
          tabsArray={[{ name: 'Active Projects' }, { name: 'Closed Projects' }]}
        />
      </div>
      <div className="mt-4">
        <InputField
          leadingIcon={<SearchIcon />}
          placeholder="Search projects by name/Id"
        />
      </div>
      <div className="mt-4">
        <DataTable
          isSelectable
          isHeaderSticky
          columns={COLUMNS}
          rows={ROWS}
          // isSortable={false}
        />
      </div>
    </div>
  </div>
);

export default AllProjects;
