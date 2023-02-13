import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { TMButton, TMSectionHeadings, TMSelectMenu } from 'common/bifrostProxy';

import { MAP_FIELD_COLUMNS } from '../const/importCSVConstants';

import MapFieldModal from './mapFieldModal';
import useImportCSV from './useImportCSV';
import useMapFields from './useMapFields';

const MapFields = ({ importId, importFields, defaultFields, customFields }) => {
  const { mapFieldModalConfig } = useImportCSV();
  const {
    typeMapper,
    rowRef,
    handleSelectMenuChange,
    handleUpdateClick,
    valueMappings
  } = useMapFields({ importId, defaultFields, customFields, importFields });

  const rows = rowRef.current;
  const getMappingForLastCol = (value, mappingType) => {
    switch (mappingType) {
      case 'field_text':
        return (
          <TMSelectMenu
            checkPosition="right"
            options={[
              { label: 'Text', value: 'Text' },
              { label: 'HTML', value: 'HTML' }
            ]}
          />
        );

      case 'field_dropdown':
        return (
          <span>
            Value Mapped{' '}
            <button
              type="button"
              className="text-brand-400"
              onClick={handleUpdateClick(value)}
            >
              (Update)
            </button>
          </span>
        );

      default:
        return <>No Mapping Needed</>;
    }
  };

  return (
    <div className="border-base-200 m-4 flex h-max w-4/5 flex-col rounded-md border-2 border-solid bg-white p-6">
      <TMSectionHeadings
        title="Map Fields"
        variant="buttons"
        trailingHeadNode={
          <>
            <TMButton variant="primary" colors="white" wrapperClassName="mr-3">
              Back
            </TMButton>
            <TMButton variant="primary">Proceed</TMButton>
          </>
        }
      />
      <div className="text-base-800 my-4 text-sm">
        Fields and values are mapped by default. You can update the mapping if
        needed:
      </div>
      <Table className="h-full">
        <TableHead wrapperClass="w-full rounded-xs">
          <TableRow wrapperClass="relative">
            {MAP_FIELD_COLUMNS.map((col) => (
              <TableCell key={col.key} variant="header">
                {col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.field}>
              <TableCell wrapperClass="py-1">{row.field}</TableCell>
              <TableCell wrapperClass="py-2 mr-4">
                <TMSelectMenu
                  checkPosition="right"
                  options={row.mappedField.displayOptions}
                  /* eslint-disable react/jsx-props-no-spreading */
                  {...(row.mappedField.defaultValue.label && {
                    defaultValue: row.mappedField.defaultValue
                  })}
                  {...(!row.mappedField.defaultValue.label && {
                    defaultValue: {
                      label: 'Ignore Column',
                      value: 'Ignore Column'
                    }
                  })}
                  onChange={handleSelectMenuChange(row.field)}
                />
              </TableCell>
              <TableCell wrapperClass="py-1">
                {getMappingForLastCol(
                  row.mappedValue,
                  typeMapper[row.mappedValue]
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {mapFieldModalConfig.show && (
        <MapFieldModal
          modalConfig={mapFieldModalConfig}
          valueMappings={valueMappings}
        />
      )}
    </div>
  );
};
export default MapFields;
