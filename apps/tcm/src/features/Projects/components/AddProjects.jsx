import React from 'react';
import {
  TMButton,
  TMInputField,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMTextArea
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { onSubmitKeyHandler } from 'utils/helperFunctions';

import useProjects from './useProjects';

const AddProjects = ({ show, onClose, isFirstProject }) => {
  const {
    modalFocusRef,
    formData,
    formError,
    setFormData,
    createProjectHandler,
    hideAddProjectModal,
    setFormError,
    createProjectCtaLoading
  } = useProjects({ isFirstProject, onClose });

  return (
    <TMModal
      show={show}
      withDismissButton
      onOverlayClick={hideAddProjectModal}
      ref={modalFocusRef}
    >
      <TMModalHeader
        heading="Create Project"
        handleDismissClick={hideAddProjectModal}
      />
      <TMModalBody>
        <div className="mb-4">
          <TMInputField
            ref={modalFocusRef}
            label="Project Name *"
            placeholder="Enter project name"
            value={formData.name}
            errorText={formError.nameError}
            onKeyDown={(e) => onSubmitKeyHandler(e, createProjectHandler)}
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
          placeholder="Write in brief about the project"
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
          isIconOnlyButton={createProjectCtaLoading}
          loading={createProjectCtaLoading}
        >
          Create Project
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

AddProjects.propTypes = {
  show: PropTypes.bool,
  isFirstProject: PropTypes.bool,
  onClose: PropTypes.func
};

AddProjects.defaultProps = {
  show: false,
  isFirstProject: false,
  onClose: null // this should be null and be a function onlyif needed
};

export default AddProjects;
