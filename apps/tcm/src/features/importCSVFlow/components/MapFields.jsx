import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  MdInfoOutline,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
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
  ADD_FIELD_LABEL,
  ADD_FIELD_VALUE,
  IGNORE_FIELD_LABEL,
  IGNORE_FIELD_VALUE,
  MAP_FIELD_COLUMNS
} from '../const/importCSVConstants';
import { setTags, setUsers } from '../slices/csvThunk';
import { setMapFieldsError } from '../slices/importCSVSlice';

import DisplayMapping from './DisplayMapping';
import MapFieldModal from './mapFieldModal';
import useImportCSV from './useImportCSV';
import useMapFields from './useMapFields';

const MapFields = () => {
  const dispatch = useDispatch();
  const { mapFieldModalConfig } = useImportCSV();
  const {
    ampEventMapPageLoaded,
    mapFieldsError,
    allowedValueMapper,
    typeMapper,
    rowRef,
    showMappings,
    valueMappings,
    myFieldMappings,
    mapNameToDisplay,
    errorLabelInMapFields,
    mapFieldProceedLoading,
    allImportFields,
    showSelectMenuErrorInMapFields,
    editMappingHandler,
    setDefaultDropdownValue,
    handleSelectMenuChange,
    handleUpdateClick,
    handleMappingProceedClick,
    handleValueMappingMenuChange
  } = useMapFields();
  const { projectId } = useParams();
  const rows = rowRef.current;

  const getValueMappingsCount = (mapping) =>
    Object.values(mapping).reduce((noOfMappedValues, value) => {
      if (value?.action && value?.action === 'ignore') return noOfMappedValues;
      return noOfMappedValues + 1;
    }, 0);

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
            triggerWrapperClassName="border-none shadow-none pr-10 max-w-full font-medium text-base-900 text-sm w-auto"
            checkPosition="right"
            defaultValue={defaultValue}
            options={allowedValueMapper[value]?.allowedValueDisplayOptions}
            onChange={handleValueMappingMenuChange(actualName, value)}
          />
        );

      case 'field_dropdown': // modal
        return (
          <span className="pl-3 text-sm font-medium">
            <span className="text-base-700 mr-1">
              {`${
                valueMappings && valueMappings?.[actualName]
                  ? getValueMappingsCount(valueMappings?.[actualName])
                  : ''
              } Value Mapped`}
            </span>
            <button
              type="button"
              className="text-brand-500"
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
        return <div className="ml-3">No Mapping Needed</div>;

      default:
        return <div className="ml-3">--</div>;
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
                <p className="mb-0 text-sm">
                  Select and map values from your CSV to values of Test
                  Management’s system values. This will help you maintain the
                  fields with correct values
                </p>
                <a
                  target="blank"
                  href="https://www.browserstack.com/docs/test-management/quick-start/import-csv"
                  className="text-sm underline"
                >
                  Learn more
                </a>
              </TMTooltipBody>
            </>
          }
        >
          <MdInfoOutline className="ml-1 h-4 w-4" />
        </TMTooltip>
      );
    return '';
  };

  useEffect(() => {
    rows.forEach((row) => {
      if (
        typeMapper[row.mappedValue] === 'field_multi' &&
        !Object.keys(valueMappings).includes(row.field)
      ) {
        setDefaultDropdownValue(
          row.field,
          row.mappedValue,
          allowedValueMapper[row.mappedValue]?.allowedValueDisplayOptions[0]
        );
      }
    });
    dispatch(setUsers(projectId));
    dispatch(setTags(projectId));
    ampEventMapPageLoaded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mb-5 w-4/5 max-w-7xl">
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
      <div className="border-base-300 max-h-max rounded-md border border-solid bg-white pt-5">
        <div>
          <div className="bg-white px-5">
            <TMSectionHeadings
              title="Map Fields"
              variant="buttons"
              trailingHeadNode={
                <div className="min-w-fit">
                  <TMButton
                    variant="primary"
                    onClick={handleMappingProceedClick}
                    isIconOnlyButton={mapFieldProceedLoading}
                    loading={mapFieldProceedLoading}
                  >
                    Proceed
                  </TMButton>
                </div>
              }
            />
          </div>
          {showMappings && (
            <>
              <DisplayMapping
                fieldMappings={myFieldMappings}
                onEditMapping={editMappingHandler}
                nameToDisplayMapper={mapNameToDisplay}
                allImportFields={allImportFields}
              />
            </>
          )}
        </div>
        {!showMappings && (
          <>
            <div className="text-base-800 my-4 px-6 text-sm">
              Fields and values are mapped by default. You can update the
              mapping if needed:
            </div>
            <Table
              containerWrapperClass="bg-white shadow-none ring-0"
              className="h-full"
            >
              <TableHead wrapperClassName="w-full bg-base-50">
                <TableRow wrapperClassName="relative">
                  {MAP_FIELD_COLUMNS.map((col, index) => (
                    <TableCell
                      key={col.key}
                      variant="header"
                      wrapperClassName={twClassNames(
                        'text-base-500 text-xs font-normal px-7 w-1/3',
                        {
                          'px-8': index === 2
                        }
                      )}
                    >
                      <span className="flex items-center">
                        {col.name}
                        {getTooltip(index)}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.field}>
                    <TableCell wrapperClassName="py-1 w-1/6 px-4 mr-12 text-base-900 font-medium">
                      {row.field}
                    </TableCell>
                    <TableCell wrapperClassName="py-1 px-4 w-1/5">
                      <TMSelectMenu
                        triggerWrapperClassName={twClassNames(
                          'text-base-900 shadow-none pr-6 w-full max-w-[180px]',
                          {
                            'border-danger-400':
                              errorLabelInMapFields.has(
                                row?.mappedField?.defaultValue?.label
                              ) && showSelectMenuErrorInMapFields
                          },
                          {
                            'border-none': !(
                              errorLabelInMapFields.has(
                                row.mappedField.defaultValue.label
                              ) && showSelectMenuErrorInMapFields
                            )
                          }
                        )}
                        checkPosition="right"
                        options={row.mappedField.displayOptions}
                        dividerIdx={1}
                        /* eslint-disable react/jsx-props-no-spreading */
                        {...(row.mappedField.defaultValue.label && {
                          defaultValue: row.mappedField.defaultValue
                        })}
                        {...(!row.mappedField.defaultValue.label && {
                          defaultValue: {
                            label:
                              row.mappedValue === ADD_FIELD_VALUE
                                ? ADD_FIELD_LABEL
                                : IGNORE_FIELD_LABEL,
                            value: row.mappedValue || IGNORE_FIELD_VALUE
                          }
                        })}
                        onChange={handleSelectMenuChange(row.field)}
                      />
                    </TableCell>
                    <TableCell
                      wrapperClassName={twClassNames(
                        'py-1 w-1/5 px-5 max-w-[250px]'
                      )}
                    >
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
          </>
        )}
      </div>
    </div>
  );
};
export default MapFields;
