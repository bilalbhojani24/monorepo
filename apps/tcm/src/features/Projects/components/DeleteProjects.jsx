import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProjectAPI } from 'api/projects.api';
import { WarningAmberOutlinedIcon } from 'assets/icons';
import {
  TMButton,
  TMModal,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import {
  deleteProject,
  setDeleteProjectModalVisibility
} from '../slices/projectSlice';

import useProjects from './useProjects';

const DeleteProjects = ({ show }) => {
  const { selectedProject } = useProjects();

  const dispatch = useDispatch();
  const hideDeleteProjectModal = () => {
    dispatch(setDeleteProjectModalVisibility(false));
  };

  const deleteProjectHandler = () => {
    if (selectedProject)
      deleteProjectAPI(selectedProject.id).then((res) => {
        dispatch(deleteProject(res.data.project));
        hideDeleteProjectModal();
      });
  };

  return (
    <TMModal
      show={show}
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
