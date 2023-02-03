import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProjectsAPI } from 'api/projects.api';
import {
  TMButton,
  TMInputField,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMTextArea
} from 'common/bifrostProxy';
import AppRoute from 'const/routes';
import { addGlobalProject } from 'globalSlice';
import PropTypes from 'prop-types';
import { routeFormatter } from 'utils/helperFunctions';

import {
  addProject,
  setAddProjectModalVisibility
} from '../slices/projectSlice';

const AddProjects = ({ show }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const [formError, setFormError] = useState({
    nameError: ''
  });

  const dispatch = useDispatch();
  const hideAddProjectModal = () => {
    dispatch(setAddProjectModalVisibility(false));
  };

  const createProjectHandler = () => {
    if (formData.name.length === 0) {
      setFormError({ ...formError, nameError: 'Name is not specified' });
    } else
      addProjectsAPI(formData).then((res) => {
        dispatch(addProject(res.data.project));
        dispatch(addGlobalProject(res.data.project));
        navigate(
          routeFormatter(AppRoute.TEST_CASES, {
            projectId: res.data.project.id
          })
        );
        hideAddProjectModal();
      });
  };

  return (
    <TMModal show={show} withDismissButton onOverlayClick={hideAddProjectModal}>
      <TMModalHeader
        heading="Add Project"
        handleDismissClick={hideAddProjectModal}
      />
      <TMModalBody>
        <div className="mb-4">
          <TMInputField
            label="Project Name"
            placeholder="Project Name"
            value={formData.name}
            errorText={formError.nameError}
            onChange={(e) => {
              if (formError?.nameError && e.currentTarget.value.length) {
                setFormError({ ...formError, nameError: '' });
              }
              setFormData({ ...formData, name: e.currentTarget.value });
            }}
          />
        </div>
        <TMTextArea
          label="Description"
          placeholder="Explaining in brief about the project description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.currentTarget.value })
          }
        />
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton
          variant="primary"
          colors="white"
          onClick={hideAddProjectModal}
        >
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          wrapperClassName="ml-3"
          onClick={createProjectHandler}
        >
          Add Project
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

AddProjects.propTypes = {
  show: PropTypes.bool
};

AddProjects.defaultProps = {
  show: false
};

export default AddProjects;
