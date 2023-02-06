import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { TMSectionHeadings } from 'common/bifrostProxy';
// import classNames from 'classnames';
// import SelectMenu from '../../../../../../packages/bifrost/modules/SelectMenu/index';
import { TMSelectMenu } from 'common/bifrostProxy';

const MapFields = ({
  importFields,
  defaultFields,
  customFields,
  fieldMappings
}) => {
  console.log(
    'props',
    importFields,
    defaultFields,
    customFields,
    fieldMappings
  );
  const defaultOptions = defaultFields.map((value) => ({
    label: value,
    value
  }));

  const customOptions = customFields.map((value) => ({
    label: value,
    value
  }));

  const rows = importFields.map((item) => {
    const options = [...defaultOptions, ...customOptions];
    return {
      field: item,
      mappedField: {
        options,
        defaultValue: { label: fieldMappings[item], value: fieldMappings[item] }
      },
      mappedValue: null
    };
  });

  //   const options = [...defaultOptions, ...customOptions];

  //   const tableColumn = [
  //     {
  //       name: 'CSV Column Header',
  //       key: 'field'
  //     },
  //     {
  //       name: 'Test Management Fields',
  //       key: 'mappedField',
  //       cell: () => (
  //         <div className="flex">
  //           <TMSelectMenu options={options} />
  //         </div>
  //       )
  //     },
  //     {
  //       name: 'Value Mapping',
  //       key: 'mappedValue',
  //       cell: (rowData) => {
  //         console.log(rowData);
  //         <>hello</>;
  //         // <TMBadge
  //         //   wrapperClassName="capitalize"
  //         //   text={rowData.latest_status}
  //         //   modifier={rowData.latest_status
  //         //     .replace('untested', 'base')
  //         //     .replace('passed', 'success')
  //         //     .replace('failed', 'error')}
  //         // />
  //       }
  //     }
  //   ];

  const columns = [
    {
      name: 'CSV Column Header',
      key: 'field'
    },
    {
      name: 'Test Management Fields',
      key: 'mappedField'
    },
    {
      name: 'Value Mapping',
      key: 'mappedValue'
    }
  ];

  return (
    <div className="border-base-200 m-4 flex w-4/5 flex-col self-center rounded-md border-2 border-solid bg-white p-6">
      <TMSectionHeadings
        title="Map Fields"
        variant="buttons"
        primaryButtonProps={{
          children: 'Back'
        }}
        secondaryButtonProps={{ children: 'Proceed' }}
      />
      <div className="text-base-800 my-4 text-sm">
        Fields and values are mapped by default. You can update the mapping if
        needed:
      </div>
      {/* <TMDataTable isCondensed columns={tableColumn} rows={row} /> */}
      <Table>
        <TableHead wrapperClass="w-full rounded-xs">
          <TableRow wrapperClass="relative">
            {columns.map((col) => (
              <TableCell key={col.key} variant="header">
                {col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.field}>
              <TableCell variant="body" wrapperClass="py-1">
                {row.field}
              </TableCell>
              <TableCell variant="body" wrapperClass="py-1 flex">
                <TMSelectMenu
                  checkPosition="right"
                  options={row.mappedField.options}
                  defaultValue={row.mappedField.defaultValue}
                />
              </TableCell>
              <TableCell variant="body" wrapperClass="py-1">
                No Mapping Needed
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default MapFields;
