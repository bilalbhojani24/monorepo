import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProjects } from 'api/projects.api';
import {
  TMButton,
  TMInputField,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMTextArea,
} from 'bifrostProxy';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import { updateProjects } from '../../../slices/globalSlice';
import { setAddProjectModalVisibility } from '../slices/projectSlice';

const AddProjects = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    access: 'private_proj',
  });

  const dispatch = useDispatch();
  const hideAddProjectModal = () => {
    dispatch(setAddProjectModalVisibility(false));
  };

  const createProjectHandler = () => {
    addProjects(formData).then((res) => {
      dispatch(updateProjects(res.data.project));
      navigate(
        routeFormatter(AppRoute.TEST_CASES, {
          projectId: res.data.project.id,
        }),
      );
      hideAddProjectModal();
    });
  };

  return (
    <TMModal show withDismissButton onOverlayClick={hideAddProjectModal}>
      <TMModalHeader
        heading="Add Project"
        handleDismissClick={hideAddProjectModal}
      />
      <TMModalBody>
        <div className="mb-4">
          <TMInputField
            label="Project Name"
            placeholder="Project Name 01"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.currentTarget.value })
            }
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

export default AddProjects;
