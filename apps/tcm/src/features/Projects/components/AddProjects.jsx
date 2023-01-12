import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProjects } from 'api/projects.api';
import { TMButton, TMInputField, TMModal, TMTextArea } from 'bifrostProxy';
import AppRoute from 'const/routes';

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
        `${AppRoute.PROJECTS}/${res.data.project.id}${AppRoute.TEST_CASES}`,
      );
      hideAddProjectModal();
    });
  };

  return (
    <TMModal
      show
      withDismissButton
      handleDismissButtonClick={hideAddProjectModal}
      onClose={hideAddProjectModal}
    >
      <TMInputField
        wrapperClass="mb-2"
        label="Project Name"
        placeholder="Project Name 01"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.currentTarget.value })
        }
      />
      <TMTextArea
        wrapperClass="mb-2"
        label="Description"
        placeholder="Explaining in brief about the project description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.currentTarget.value })
        }
      />
      <div className="mt-3 flex justify-end">
        <TMButton variant="white" onClick={hideAddProjectModal}>
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          wrapperClassName="ml-3"
          onClick={createProjectHandler}
        >
          Add Project
        </TMButton>
      </div>
    </TMModal>
  );
};

export default AddProjects;
