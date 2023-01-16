import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editProjectAPI } from 'api/projects.api';
import {
  TMButton,
  TMInputField,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMSelectMenu,
  TMTextArea,
} from 'bifrostProxy';
import { updateProject } from 'globalSlice';

import { projectStatus } from '../const/projectsConst';
import { setEditProjectModalVisibility } from '../slices/projectSlice';

import useProjects from './useProjects';

const EditProjects = () => {
  const { selectedProject } = useProjects();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const dispatch = useDispatch();
  const hideEditProjectModal = () => {
    dispatch(setEditProjectModalVisibility(false));
  };

  const editProjectHandler = () => {
    editProjectAPI(selectedProject.id, {
      project: formData,
    }).then((res) => {
      dispatch(updateProject(res.data.project));
      hideEditProjectModal();
    });
  };

  useEffect(() => {
    if (selectedProject)
      setFormData({
        name: selectedProject.name,
        description: selectedProject.description,
        state: selectedProject.state,
      });
  }, [selectedProject]);

  // debugger;
  return (
    <TMModal show withDismissButton onOverlayClick={hideEditProjectModal}>
      <TMModalHeader
        heading="Edit Project"
        handleDismissClick={hideEditProjectModal}
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
        <div className="mb-4">
          <TMTextArea
            label="Description"
            placeholder="Explaining in brief about the project description"
            defaultValue={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.currentTarget.value })
            }
          />
        </div>
        <div className="w-2/4">
          <TMSelectMenu
            label="State"
            onChange={(e) => setFormData({ ...formData, state: e.value })}
            options={projectStatus}
          />
        </div>
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton
          variant="primary"
          colors="white"
          onClick={hideEditProjectModal}
        >
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          wrapperClassName="ml-3"
          onClick={editProjectHandler}
        >
          Update Project
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

export default EditProjects;
