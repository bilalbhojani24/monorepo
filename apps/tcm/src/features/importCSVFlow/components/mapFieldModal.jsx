import React from 'react';
import { useDispatch } from 'react-redux';
import {
  TMAlerts,
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';

import { setMapFieldModalConfig } from '../slices/importCSVSlice';

const MapFieldModal = ({ modalConfig }) => {
  const dispatch = useDispatch();
  //   const columns = [
  //     {
  //       name: 'CSV Values',
  //       key: 'field'
  //     },
  //     {
  //       name: 'System Values',
  //       key: 'mappedField'
  //     }
  //   ];

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
        heading={`Map Values for '${modalConfig?.field}'`}
        handleDismissClick={onModalCloseHandler}
      />
      <TMModalBody>
        <div>
          Values for {modalConfig?.field} are mapped by default. You can update
          the mapping if needed:
        </div>
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
