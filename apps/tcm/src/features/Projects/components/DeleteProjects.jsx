import React from 'react';
import { WarningAmberOutlinedIcon } from 'assets/icons';
import {
  TMButton,
  TMModal,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import useProjects from './useProjects';

const DeleteProjects = ({ show }) => {
  const { modalFocusRef, hideDeleteProjectModal, deleteProjectHandler } =
    useProjects();

  return (
    <TMModal
      show={show}
      ref={modalFocusRef}
      withDismissButton
      onOverlayClick={hideDeleteProjectModal}
    >
      <TMModalHeader
        heading="Delete Project"
        subHeading="Are you sure you want to delete your project? All the data will be permanently deleted. This action cannot be undone."
        handleDismissClick={hideDeleteProjectModal}
        Icon={WarningAmberOutlinedIcon}
      />
      <TMModalFooter position="right">
        <TMButton
          variant="primary"
          colors="white"
          onClick={hideDeleteProjectModal}
          ref={modalFocusRef}
        >
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          colors="danger"
          wrapperClassName="ml-3"
          onClick={deleteProjectHandler}
        >
          Delete Project
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};
DeleteProjects.propTypes = {
  show: PropTypes.bool
};

DeleteProjects.defaultProps = {
  show: false
};
export default DeleteProjects;
