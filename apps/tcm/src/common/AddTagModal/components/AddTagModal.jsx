import React, { useState } from 'react';
import {
  TMButton,
  TMInputField,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMTextArea,
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const AddTagModal = ({
  isVisible,
  hideAddTagsModal,
  addSelectedTags,
  existingTags,
}) => {
  const [enteredTag, setTagEntered] = useState('');
  if (!isVisible) return '';

  return (
    <TMModal
      show={isVisible}
      withDismissButton
      onOverlayClick={hideAddTagsModal}
      size="large"
    >
      <TMModalHeader heading="Add Tag" handleDismissClick={hideAddTagsModal} />
      <TMModalBody>
        <TMInputField
          id="tag-name"
          value={enteredTag}
          label="Tag Name"
          placeholder="Enter New Tag Name"
          onChange={(e) => setTagEntered(e.currentTarget.value)}
        />
        <div className="mt-4">
          <TMTextArea
            value={existingTags}
            id="Existing Tags"
            label="Existing Tags"
            // onChange={(e) =>
            //   // BE expects string in an array
            //   handleTestCaseFieldChange('steps', [e.currentTarget.value])
            // }
          />
        </div>
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton variant="primary" colors="white" onClick={hideAddTagsModal}>
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          wrapperClassName="ml-3"
          onClick={() => addSelectedTags(enteredTag)}
        >
          Add & Select
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

AddTagModal.propTypes = {
  hideAddTagsModal: PropTypes.func,
  addSelectedTags: PropTypes.func,
  isVisible: PropTypes.bool,
  existingTags: PropTypes.string,
};

AddTagModal.defaultProps = {
  hideAddTagsModal: () => {},
  addSelectedTags: () => {},
  isVisible: false,
  existingTags: '',
};

export default AddTagModal;
