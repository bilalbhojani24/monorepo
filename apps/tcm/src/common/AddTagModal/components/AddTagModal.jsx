import React from 'react';
import { InfoOutlinedIcon } from 'assets/icons';
import {
  TMBadge,
  TMButton,
  TMEmptyState,
  TMInputWButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { onSubmitKeyHandler } from 'utils/helperFunctions';

import useAddTagModal from './useAddTagModal';

const AddTagModal = ({
  isVisible,
  onClose,
  existingTags,
  verifierFunction
}) => {
  const {
    errorText,
    enteredTag,
    allTags,
    setTagEntered,
    addTagHandler,
    onTagRemoveClick,
    onCloseHandler
  } = useAddTagModal({
    isVisible,
    onClose,
    verifierFunction,
    existingTags
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
          errorText={errorText}
          placeholder="Enter Tag name separated by comma"
          onChange={(e) => setTagEntered(e.currentTarget.value)}
        />
        <div className="text-base-700 mt-4 mb-2 block text-sm font-medium">
          Existing Tags in this test case:
        </div>
        <div className="border-base-300 flex max-h-32 w-full flex-wrap gap-2 overflow-y-auto rounded-md border p-2">
          {allTags.length ? (
            <>
              {allTags?.map((item) => (
                <TMBadge
                  text={item}
                  hasRemoveButton
                  isRounded
                  onClose={() => onTagRemoveClick(item)}
                />
              ))}
            </>
          ) : (
            <div className="flex w-full justify-center p-6">
              <TMEmptyState
                title=""
                description="No tags added for this test case"
                mainIcon={
                  <InfoOutlinedIcon className="text-base-400 !h-12 !w-12" />
                }
                buttonProps={null}
              />
            </div>
          )}
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
  onClose: PropTypes.func,
  verifierFunction: PropTypes.func,
  isVisible: PropTypes.bool,
  existingTags: PropTypes.string
};

AddTagModal.defaultProps = {
  onClose: () => {},
  verifierFunction: () => {},
  isVisible: false,
  existingTags: ''
};

export default AddTagModal;
