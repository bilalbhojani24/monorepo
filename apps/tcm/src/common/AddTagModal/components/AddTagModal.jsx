import React, { useState } from 'react';
import {
  TMBadge,
  TMButton,
  TMInputWButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const AddTagModal = ({
  isVisible,
  hideAddTagsModal,
  addSelectedTags,
  existingTags,
}) => {
  const [enteredTag, setTagEntered] = useState('');
  const addTagHandler = () => {};
  const onTagRemoveClick = () => {};
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
        <TMInputWButton
          id="tag-name"
          value={enteredTag}
          onButtonClick={addTagHandler}
          buttonElement="Add Tag"
          label="Tag Name"
          placeholder="Enter Tag name separated by comma"
          onChange={(e) => setTagEntered(e.currentTarget.value)}
        />
        <div className="text-base-700 mt-4 mb-2 block text-sm font-medium">
          Existing Tags in this test case:
        </div>
        <div className="border-base-300 flex max-h-32 w-full flex-wrap gap-2 overflow-y-auto rounded-md border p-2">
          {existingTags?.map((item) => (
            <TMBadge text={item} hasRemoveButton onClose={onTagRemoveClick} />
          ))}
        </div>
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton variant="primary" colors="white" onClick={hideAddTagsModal}>
          Close
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
