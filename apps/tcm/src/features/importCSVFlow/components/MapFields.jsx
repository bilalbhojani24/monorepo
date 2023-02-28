import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { InfoOutlinedIcon } from 'assets/icons';
import {
  TMAlerts,
  TMButton,
  TMSectionHeadings,
  TMSelectMenu,
  TMTooltip,
  TMTooltipBody,
  TMTooltipHeader
} from 'common/bifrostProxy';

import {
  IGNORE_FIELD_LABEL,
  IGNORE_FIELD_VALUE,
  MAP_FIELD_COLUMNS
} from '../const/importCSVConstants';
import { setTags, setUsers } from '../slices/csvThunk';
import { setMapFieldsError } from '../slices/importCSVSlice';

import MapFieldModal from './mapFieldModal';
import useImportCSV from './useImportCSV';
import useMapFields from './useMapFields';

const MapFields = () => {
  const dispatch = useDispatch();
  const { mapFieldModalConfig } = useImportCSV();
  const {
    mapFieldsError,
    allowedValueMapper,
    typeMapper,
    rowRef,
    valueMappings,
    errorLabelInMapFields,
    mapFieldProceedLoading,
    showSelectMenuErrorInMapFields,
    setDefaultDropdownValue,
    handleSelectMenuChange,
    handleUpdateClick,
    handleMappingProceedClick,
    handleValueMappingMenuChange
  } = useMapFields();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const rows = rowRef.current;
  const getMappingForLastCol = (actualName, value, mappingType) => {
    switch (mappingType) {
      case 'field_multi': // dropdown
        // eslint-disable-next-line no-case-declarations
        let defaultValue = {
          label:
            allowedValueMapper[value]?.allowedValueNameToDisplayMapper[
              valueMappings[actualName]
            ],
          value:
            allowedValueMapper[value]?.allowedValueNameToDisplayMapper[
              valueMappings[actualName]
            ]
        };
        if (!defaultValue.label)
          defaultValue =
            allowedValueMapper[value]?.allowedValueDisplayOptions[0];

        return (
          <TMSelectMenu
            checkPosition="right"
            defaultValue={defaultValue}
            options={allowedValueMapper[value]?.allowedValueDisplayOptions}
            onChange={handleValueMappingMenuChange(actualName, value)}
          />
        );

      case 'field_dropdown': // modal
        return (
          <span>
            Value Mapped{' '}
            <button
              type="button"
              className="text-brand-400"
              onClick={handleUpdateClick(actualName, value)}
            >
              (Update)
            </button>
          </span>
        );

      case 'field_int':
      case 'field_string':
      case 'field_date':
      case 'Add':
        return 'No Mapping Needed';

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
          alignOffset={-20}
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

  useEffect(() => {
    rows.forEach((row) => {
      if (typeMapper[row.mappedValue] === 'field_multi')
        setDefaultDropdownValue(
          row.field,
          row.mappedValue,
          allowedValueMapper[row.mappedValue]?.allowedValueDisplayOptions[0]
        );
    });
    dispatch(setUsers(queryParams.get('project')));
    dispatch(setTags(queryParams.get('project')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-4/5 max-w-7xl">
      {mapFieldsError && (
        <div className="mb-3">
          <TMAlerts
            accentBorder={false}
            show={!!mapFieldsError}
            dismissButton
            modifier="error"
            title={mapFieldsError}
            linkText={null}
            dismissButtonFn={() => dispatch(setMapFieldsError(''))}
          />
        </div>
      )}
      <div className="border-base-200 max-h-max rounded-md border-2 border-solid bg-white p-6">
        <TMSectionHeadings
          title="Map Fields"
          variant="buttons"
          trailingHeadNode={
            <div className="min-w-fit">
              <TMButton
                variant="primary"
                onClick={handleMappingProceedClick}
                loading={mapFieldProceedLoading}
              >
                Proceed
              </TMButton>
            </div>
          }
        />
        <div className="text-base-800 my-4 text-sm">
          Fields and values are mapped by default. You can update the mapping if
          needed:
        </div>
        <Table className="h-full">
          <TableHead wrapperClassName="w-full rounded-xs">
            <TableRow wrapperClassName="relative">
              {MAP_FIELD_COLUMNS.map((col, index) => (
                <TableCell
                  key={col.key}
                  variant="header"
                  wrapperClassName={index === 2 ? 'px-10' : 'px-4'}
                >
                  {col.name}
                  {getTooltip(index)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.field}>
                <TableCell wrapperClassName="py-1 w-1/4 px-4">
                  {row.field}
                </TableCell>
                <TableCell wrapperClassName="py-2 px-4 w-auto">
                  <TMSelectMenu
                    triggerWrapperClassName={
                      errorLabelInMapFields?.has(
                        row.mappedField.defaultValue.label
                      ) && showSelectMenuErrorInMapFields
                        ? 'border-danger-400'
                        : ''
                    }
                    checkPosition="right"
                    options={row.mappedField.displayOptions}
                    dividerIdx={1}
                    /* eslint-disable react/jsx-props-no-spreading */
                    {...(row.mappedField.defaultValue.label && {
                      defaultValue: row.mappedField.defaultValue
                    })}
                    {...(!row.mappedField.defaultValue.label && {
                      defaultValue: {
                        label: IGNORE_FIELD_LABEL,
                        value: IGNORE_FIELD_VALUE
                      }
                    })}
                    onChange={handleSelectMenuChange(row.field)}
                  />
                </TableCell>
                <TableCell wrapperClassName="py-1 w-2/5 px-10">
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
            valueMappings={valueMappings}
          />
        )}
      </div>
    </div>
  );
};
export default MapFields;
