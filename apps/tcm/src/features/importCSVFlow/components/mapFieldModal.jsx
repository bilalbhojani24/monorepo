import React, { useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import {
  TMAlerts,
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMSelectMenu
} from 'common/bifrostProxy';

import {
  ADD_VALUE_LABEL,
  ADD_VALUE_VALUE,
  IGNORE_VALUE_LABEL,
  IGNORE_VALUE_VALUE,
  MAP_MODAL_COLUMNS
} from '../const/importCSVConstants';

import useMapFields from './useMapFields';

const MapFieldModal = ({ modalConfig, valueMappings }) => {
  const modalRowRef = useRef(null);
  const {
    handleSaveClick,
    onModalCloseHandler,
    handleModalSelectMenuChange,
    VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN,
    mapNameToDisplay
  } = useMapFields();
  const csvFileField = modalConfig?.field;
  const mappedField = mapNameToDisplay[modalConfig?.mapped_field];
  const value = valueMappings?.[csvFileField];

  // creating rows to show in modal Table
  if (value && Object.keys(value)?.length > 0) {
    modalRowRef.current = Object.keys(value)?.map((field) => {
      const displayOptions =
        VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN[
          mappedField.split(' ').join('').toUpperCase()
        ];
      let defaultSelected = null;
      for (let i = 0; i < displayOptions?.length; i += 1) {
        if (value[field]?.action === ADD_VALUE_VALUE) {
          defaultSelected = { label: ADD_VALUE_LABEL, value: ADD_VALUE_VALUE };
          break;
        } else if (value[field]?.action === IGNORE_VALUE_VALUE) {
          defaultSelected = {
            label: IGNORE_VALUE_LABEL,
            value: IGNORE_VALUE_VALUE
          };
          break;
        } else if (
          (mappedField === 'State' &&
            displayOptions[i].value === value[field].toLowerCase()) ||
          displayOptions[i].value === value[field] ||
          (mappedField === 'Test Case Type' &&
            displayOptions[i].value === 'smoke_sanity' &&
            value[field].toLowerCase() === 'smoke & sanity') ||
          displayOptions[i].value === value[field]
        ) {
          defaultSelected = displayOptions[i];
          break;
        }
      }
      if (!defaultSelected)
        defaultSelected = {
          label: IGNORE_VALUE_LABEL,
          value: IGNORE_VALUE_VALUE
        };

      return {
        displayOptions,
        csvValue: field,
        defaultSelected
      };
    });
  }

  return (
    <TMModal
      show={modalConfig?.show}
      withDismissButton
      onOverlayClick={onModalCloseHandler}
    >
      <TMModalHeader
        heading={`Map Values for '${csvFileField}'`}
        handleDismissClick={onModalCloseHandler}
      />
      <TMModalBody>
        <div>
          Values for {csvFileField} are mapped by default. You can update the
          mapping if needed:
        </div>
        <Table containerWrapperClass="mb-4 mt-4">
          <TableHead wrapperClass="w-full rounded-xs">
            <TableRow wrapperClass="relative">
              {MAP_MODAL_COLUMNS.map((col) => (
                <TableCell key={col.key} variant="header">
                  {col.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {modalRowRef?.current?.map((row) => (
              <TableRow key={row.csvValue}>
                <TableCell wrapperClassName="py-1 w-1/3">
                  {row.csvValue}
                </TableCell>
                <TableCell wrapperClassName="py-2 mr-4 w-2/3">
                  <TMSelectMenu
                    checkPosition="right"
                    options={row?.displayOptions}
                    defaultValue={row?.defaultSelected}
                    onChange={handleModalSelectMenuChange(
                      csvFileField,
                      row.csvValue
                    )}
                    dividerIdx={row?.displayOptions.length - 3}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TMAlerts
          show
          title="New values will be created with same name as present in respective CSV fields. "
          linkText={null}
          modifier="primary"
        />
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton
          variant="primary"
          colors="white"
          onClick={onModalCloseHandler}
        >
          Cancel
        </TMButton>
        <TMButton variant="primary" colors="brand" onClick={handleSaveClick}>
          Save
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

export default MapFieldModal;
