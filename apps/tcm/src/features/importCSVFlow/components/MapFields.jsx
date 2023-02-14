import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { InfoOutlinedIcon } from 'assets/icons';
import {
  TMButton,
  TMSectionHeadings,
  TMSelectMenu,
  TMTooltip,
  TMTooltipBody,
  TMTooltipHeader
} from 'common/bifrostProxy';

import { MAP_FIELD_COLUMNS } from '../const/importCSVConstants';

import MapFieldModal from './mapFieldModal';
import useImportCSV from './useImportCSV';
import useMapFields from './useMapFields';

const MapFields = ({ importId, importFields, defaultFields, customFields }) => {
  const { mapFieldModalConfig } = useImportCSV();
  const {
    allowedValueMapper,
    typeMapper,
    rowRef,
    defaultValueMappings,
    handleSelectMenuChange,
    handleUpdateClick,
    handleMappingProceedClick,
    handleValueMappingMenuChange
  } = useMapFields({ importId, defaultFields, customFields, importFields });

  const rows = rowRef.current;
  const getMappingForLastCol = (actualName, value, mappingType) => {
    switch (mappingType) {
      case 'field_multi':
        return (
          <TMSelectMenu
            checkPosition="right"
            defaultValue={
              allowedValueMapper[value]?.allowedValueDisplayOptions[0]
            }
            options={allowedValueMapper[value]?.allowedValueDisplayOptions}
            onChange={handleValueMappingMenuChange(actualName, value)}
            // onChange={handleChange //yaha pe dispatch karna hai valueMapping ke liye}
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

      case 'field_int':
        return 'No Mapping Needed';

      case 'field_string':
        return 'No Mapping Needed (String)';

      case 'field_date':
        return 'No Mapping Needed (Date)';

      default:
        return '--';
    }
  };

  const getTooltip = (index) => {
    if (index === 2)
      return (
        <TMTooltip
          size="xs"
          placementAlign="start"
          placementSide="bottom"
          theme="dark"
          content={
            <>
              <TMTooltipHeader>Value Mapping</TMTooltipHeader>
              <TMTooltipBody>
                <p className="text-sm">
                  Select and map values from your CSV to values of Test
                  Management’s system values. This will help you maintain the
                  fields with correct values
                  <div className="underline">Learn more</div>
                </p>
              </TMTooltipBody>
            </>
          }
        >
          <InfoOutlinedIcon fontSize="inherit" className="ml-1" />
        </TMTooltip>
      );
    return '';
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
            <TMButton variant="primary" onClick={handleMappingProceedClick}>
              Proceed
            </TMButton>
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
            {MAP_FIELD_COLUMNS.map((col, index) => (
              <TableCell key={col.key} variant="header">
                {col.name}
                {getTooltip(index)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.field}>
              <TableCell wrapperClassName="py-1">{row.field}</TableCell>
              <TableCell wrapperClassName="py-2 mr-4">
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
              <TableCell wrapperClassName="py-1">
                {getMappingForLastCol(
                  row.field,
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
          valueMappings={defaultValueMappings}
        />
      )}
    </div>
  );
};
export default MapFields;
