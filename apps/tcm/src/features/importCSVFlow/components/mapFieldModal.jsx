import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
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
  MAP_MODAL_COLUMNS,
  VALUE_MAPPING_OPTIONS
} from '../const/importCSVConstants';
import { setMapFieldModalConfig } from '../slices/importCSVSlice';

const MapFieldModal = ({ modalConfig, valueMappings }) => {
  const dispatch = useDispatch();
  const rowRef = useRef(null);
  const key = Object.keys(valueMappings)?.[0];
  const value = valueMappings?.[key];

  if (value && Object.keys(value)?.length > 0) {
    rowRef.current = Object.keys(value)?.map((field) => ({
      displayOptions: VALUE_MAPPING_OPTIONS[key.toUpperCase()],
      csvValue: field
    }));
  }

  const onModalCloseHandler = () => {
    dispatch(setMapFieldModalConfig({ ...modalConfig, show: false }));
  };

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
        <Table wrapperClass="mb-4">
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
            {rowRef?.current?.map((row) => (
              <TableRow key={row.field}>
                <TableCell wrapperClass="py-1">{row.csvValue}</TableCell>
                <TableCell wrapperClass="py-2 mr-4">
                  <TMSelectMenu
                    checkPosition="right"
                    options={row?.displayOptions}
                    /* eslint-disable react/jsx-props-no-spreading */
                    // {...(row.mappedField.defaultValue.label && {
                    //   defaultValue: row.mappedField.defaultValue
                    // })}
                    // {...(!row.mappedField.defaultValue.label && {
                    //   defaultValue: {
                    //     label: 'Ignore Column',
                    //     value: 'Ignore Column'
                    //   }
                    // })}
                    // onChange={handleSelectMenuChange(row.field)}
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
        <TMButton variant="primary" colors="white">
          Cancel
        </TMButton>
        <TMButton variant="primary" colors="brand">
          Save
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};
export default MapFieldModal;
