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

import { MAP_MODAL_COLUMNS } from '../const/importCSVConstants';

import useMapFields from './useMapFields';

const MapFieldModal = ({ modalConfig, valueMappings }) => {
  const modalRowRef = useRef(null);
  const key = modalConfig?.field;
  const value = valueMappings?.[key];
  const {
    handleSaveClick,
    onModalCloseHandler,
    handleModalSelectMenuChange,
    VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN
  } = useMapFields();

  console.log(
    'inside modal',
    key,
    valueMappings,
    valueMappings?.[key],
    VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN
  );
  // creating rows to show in modal Table
  if (value && Object.keys(value)?.length > 0) {
    modalRowRef.current = Object.keys(value)?.map((field) => {
      const displayOptions =
        VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN[
          key.split(' ').join('').toUpperCase()
        ];
      let defaultSelected = displayOptions[0];
      displayOptions.forEach((item) => {
        if (item.label.toLowerCase() === value[field]) defaultSelected = item;
      });
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
        heading={`Map Values for '${key}'`}
        handleDismissClick={onModalCloseHandler}
      />
      <TMModalBody>
        <div>
          Values for {modalConfig?.field} are mapped by default. You can update
          the mapping if needed:
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
              <TableRow key={key}>
                <TableCell wrapperClass="py-1">{row.csvValue}</TableCell>
                <TableCell wrapperClass="py-2 mr-4">
                  <TMSelectMenu
                    checkPosition="right"
                    options={row?.displayOptions || []}
                    defaultValue={row?.defaultSelected}
                    onChange={handleModalSelectMenuChange(key, row.csvValue)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TMAlerts
          show
          title="New Values will be created with same name as present in respective CSV fields. "
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
