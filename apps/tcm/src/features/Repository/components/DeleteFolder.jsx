import React from 'react';
import { WarningAmberOutlinedIcon } from 'assets/icons';
import {
  TMButton,
  TMModal,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import useFolderActions from '../../../common/FolderExplorer/components/useFolderActions';

const DeleteFolder = ({ show, hideModal }) => {
  const { deleteFolderHandler } = useFolderActions(hideModal);

  return (
    <TMModal show={show} withDismissButton onOverlayClick={hideModal}>
      <TMModalHeader
        heading="Delete Folder"
        subHeading="Are you sure you want to delete this folder? All the data within this folder will be lost. This action cannot be undone."
        handleDismissClick={hideModal}
        Icon={WarningAmberOutlinedIcon}
      />
      <TMModalFooter position="right">
        <TMButton variant="primary" colors="white" onClick={hideModal}>
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
  show: PropTypes.bool,
  hideModal: PropTypes.func
};

DeleteFolder.defaultProps = {
  show: false,
  hideModal: () => {}
};

export default DeleteFolder;
