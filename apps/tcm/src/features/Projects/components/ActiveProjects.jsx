import React from 'react';
import { DataTable, PageHeadings } from '@browserstack/bifrost';

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

const ActiveProjects = (props) => (
  <div>
    {/* header */}
    <div className="bg-base-100 px-4 py-2">
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

export default ActiveProjects;
