import React from 'react';
import {
  Button,
  MdAddCircle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';

const columns = [
  {
    name: 'Test Session Name',
    key: 'testSessionName',
    cell: (row) => (
      <>
        <div className="text-sm font-medium leading-5">
          {row.testSessionName}
        </div>
      </>
    )
  },
  {
    name: 'Application',
    key: 'application',
    cell: (row) => (
      <div className="flex flex-col">
        <div className="text-base-900 text-sm font-medium leading-5">
          {row.application}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5">
          {row.packageDetails}
        </div>
      </div>
    )
  },
  {
    name: 'Device',
    key: 'device',
    cell: (row) => (
      <>
        <div className="text-base-900 text-sm font-medium leading-5 ">
          {row.device}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5 ">
          {row.osDetails}
        </div>
      </>
    )
  }
];

const rows = [
  {
    testSessionName: 'Wikipedia_v2.1.0-Google_Pixel_7-12_01_2023-15:59:23',
    application: 'Wikipedia',
    device: 'Google Pixel 7 Pro',
    time: '10:54pm',
    packageDetails: 'com.wikipedia.app ∙ v2.03',
    osDetails: 'Android 13'
  },
  {
    testSessionName: 'Wikipedia_v2.1.0-Google_Pixel_7-12_01_2023-15:59:24',
    application: 'Zomato',
    device: 'iPhone 14 Pro Max',
    time: '10:55pm',
    packageDetails: 'org.zomato.app ∙ v1.46',
    osDetails: 'iOS 16'
  },
  {
    testSessionName: 'Wikipedia_v2.1.0-Google_Pixel_7-12_01_2023-15:59:25',
    application: 'Swigyy',
    device: 'Samsung Galaxy S22 Ultra',
    time: '10:56pm',
    packageDetails: 'com.swiggy.app ∙ v7.98',
    osDetails: 'Android 13'
  }
];

const NewUserHome = ({ newTestClicked }) => (
  <div className="flex flex-col items-center p-16">
    <div className="mb-2 text-lg font-semibold uppercase leading-6 tracking-wider">
      WELCOME TO
    </div>
    <div className="mb-4 text-3xl font-bold leading-9 ">
      BrowserStack Mobile Performance Testing
    </div>
    <div className="mb-4 text-xl leading-7">
      Start your first mobile performance test
    </div>
    <Button
      wrapperClassName="mb-16"
      icon={
        <div className="mr-3">
          <MdAddCircle />
        </div>
      }
      iconPlacement="start"
      size="default"
      colors="brand"
      variant="primary"
      onClick={newTestClicked}
    >
      New Test
    </Button>
    <div className="my-2 text-xl font-normal leading-7">
      Or explore from our sample reports
    </div>

    <Table containerWrapperClass="w-full">
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
        {rows.map((row) => (
          <TableRow key={row.testSessionName}>
            {columns.map((column, colIdx) => {
              const value = row[column.key];
              return (
                <TableCell
                  key={column.key}
                  wrapperClass={
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
    </Table>
  </div>
);

export default NewUserHome;
