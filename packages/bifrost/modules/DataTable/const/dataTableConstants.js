import React from 'react';

export const columns = [
  {
    name: 'Name',
    key: 'name',
    style: {},
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
    cell: (rowData) => {
      return <button>Edit</button>;
    },
    style: {},
  },
];

export const rows = [
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
];
