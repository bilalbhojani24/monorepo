import React, { useEffect } from 'react';
import {
  TMButton,
  TMInputField,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  // TMSelectMenu,
  TMTextArea
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { onSubmitKeyHandler } from 'utils/helperFunctions';

// import { projectStatus } from '../const/projectsConst';
import useProjects from './useProjects';

const EditProjects = ({ show }) => {
  const {
    modalFocusRef,
    selectedProject,
    editProjectHandler,
    formData,
    formError,
    setFormError,
    setFormData,
    hideEditProjectModal,
    editProjectCtaLoading
  } = useProjects();

  useEffect(() => {
    if (selectedProject && show)
      setFormData({
        name: selectedProject.name,
        description: selectedProject.description,
        state: selectedProject.state
      });
  }, [selectedProject, setFormData, show]);

  return (
    <TMModal
      ref={modalFocusRef}
      show={show}
      withDismissButton
      onOverlayClick={hideEditProjectModal}
    >
      <TMModalHeader
        heading="Edit Project"
        handleDismissClick={hideEditProjectModal}
      />
      <TMModalBody>
        <div className="mb-4">
          <TMInputField
            label="Project Name"
            ref={modalFocusRef}
            placeholder="Project Name 01"
            onKeyDown={(e) => onSubmitKeyHandler(e, editProjectHandler)}
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
        {/* <div className="w-2/4">
          <TMSelectMenu
            label="State"
            onChange={(e) => setFormData({ ...formData, state: e.value })}
            options={projectStatus}
          />
        </div> */}
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
          isIconOnlyButton={editProjectCtaLoading}
          loading={editProjectCtaLoading}
        >
          Update Project
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};
EditProjects.propTypes = {
  show: PropTypes.bool
};

EditProjects.defaultProps = {
  show: false
};

export default EditProjects;
