import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, InputField, Modal } from '@browserstack/bifrost';
import { addProjects } from 'api/projects.api';

import {
  setAddProjectModalVisibility,
  updateProjects,
} from '../slices/projectSlice';

const AddProjects = () => {
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
      hideAddProjectModal();
    });
  };

  return (
    <Modal
      show
      withDismissButton
      handleDismissButtonClick={hideAddProjectModal}
      onClose={hideAddProjectModal}
    >
      <InputField
        wrapperClass="mb-2"
        label="Project Name"
        placeholder="Project Name 01"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.currentTarget.value })
        }
      />
      <div className="mt-3 flex justify-end">
        <Button variant="white" onClick={hideAddProjectModal}>
          Cancel
        </Button>
        <Button
          variant="white"
          wrapperClassName="ml-3"
          onClick={createProjectHandler}
        >
          Create Folder
        </Button>
      </div>
    </Modal>
  );
};

export default AddProjects;
