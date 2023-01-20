import React from 'react';
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
import { onSubmitKeyHandler } from 'utils/helperFunctions';

import useAddTagModal from './useAddTagModal';

const AddTagModal = ({
  isVisible,
  hideAddTagsModal,
  existingTags,
  verifierFunction,
}) => {
  const {
    duplicateTags,
    enteredTag,
    allTags,
    setTagEntered,
    addTagHandler,
    onTagRemoveClick,
    onCloseHandler,
  } = useAddTagModal({
    isVisible,
    hideAddTagsModal,
    verifierFunction,
    existingTags,
  });

  return (
    <TMModal
      show={isVisible}
      withDismissButton
      onOverlayClick={onCloseHandler}
      // size="medium"
    >
      <TMModalHeader heading="Add Tag" handleDismissClick={onCloseHandler} />
      <TMModalBody>
        <TMInputWButton
          id="tag-name"
          value={enteredTag}
          onKeyDown={onSubmitKeyHandler(addTagHandler)}
          onButtonClick={addTagHandler}
          buttonElement="Add Tag"
          label="Tag Name"
          errorText={
            duplicateTags.includes(enteredTag) &&
            'A tag with the same name already exists'
          }
          placeholder="Enter Tag name separated by comma"
          onChange={(e) => setTagEntered(e.currentTarget.value)}
        />
        <div className="text-base-700 mt-4 mb-2 block text-sm font-medium">
          Existing Tags in this test case:
        </div>
        <div className="border-base-300 flex max-h-32 w-full flex-wrap gap-2 overflow-y-auto rounded-md border p-2">
          {allTags?.map((item) => (
            <TMBadge text={item} hasRemoveButton onClose={onTagRemoveClick} />
          ))}
        </div>
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton variant="primary" colors="white" onClick={onCloseHandler}>
          Close
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

AddTagModal.propTypes = {
  hideAddTagsModal: PropTypes.func,
  verifierFunction: PropTypes.func,
  isVisible: PropTypes.bool,
  existingTags: PropTypes.string,
};

AddTagModal.defaultProps = {
  hideAddTagsModal: () => {},
  verifierFunction: () => {},
  isVisible: false,
  existingTags: '',
};

export default AddTagModal;
