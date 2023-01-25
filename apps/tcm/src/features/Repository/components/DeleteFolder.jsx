import React from 'react';
import { WarningAmberOutlinedIcon } from 'assets/icons';
import {
  TMButton,
  TMModal,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import useFolders from './useFolders';

const DeleteFolder = ({ show }) => {
  const { hideFolderModal, deleteFolderHandler } = useFolders();

  return (
    <TMModal show={show} withDismissButton onOverlayClick={hideFolderModal}>
      <TMModalHeader
        heading="Delete Folder"
        subHeading="Are you sure you want to delete this folder? All the data within this folder will be lost. This action cannot be undone."
        handleDismissClick={hideFolderModal}
        Icon={WarningAmberOutlinedIcon}
      />
      <TMModalFooter position="right">
        <TMButton variant="primary" colors="white" onClick={hideFolderModal}>
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          colors="danger"
          wrapperClassName="ml-3"
          onClick={deleteFolderHandler}
        >
          Delete Folder
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

DeleteFolder.propTypes = {
  show: PropTypes.bool
};

DeleteFolder.defaultProps = {
  show: false
};

export default DeleteFolder;
