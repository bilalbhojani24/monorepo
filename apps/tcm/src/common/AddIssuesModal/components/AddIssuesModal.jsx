import React from 'react';
import { Loader, MdOutlineLayers } from '@browserstack/bifrost';
import { OpenInNewOutlinedIcon } from 'assets/icons';
import {
  TMButton,
  TMInputField,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader
  // TMSelectMenu
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { onSubmitKeyHandler } from 'utils/helperFunctions';

import useAddIssuesModal from './useAddIssuesModal';

const AddIssuesModal = ({ isVisible, onClose, onSave }) => {
  const {
    modalFocusRef,
    isLoading,
    jiraConfig,
    errorText,
    enterdIssueIDs,
    onCloseHandler,
    onLinkIssueClick,
    setIssueIds,
    createNewIssueModalHandler,
    configureJIRAInit
  } = useAddIssuesModal({
    isVisible,
    onClose,
    onSave
  });

  return (
    <TMModal
      show={isVisible}
      withDismissButton
      onOverlayClick={onCloseHandler}
      ref={modalFocusRef}
      size={!isLoading && jiraConfig ? 'lg' : 'sm'}
    >
      {jiraConfig && (
        <TMModalHeader
          heading="Add Link"
          handleDismissClick={onCloseHandler}
          subHeading={
            !isLoading && jiraConfig
              ? 'Add your Issue ID from your projects or create a new one:'
              : null
          }
        />
      )}
      <TMModalBody>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {jiraConfig ? (
              <div className="w-full">
                <TMInputField
                  id="jira-account"
                  label="JIRA Account"
                  disabled
                  value={jiraConfig?.host || ''}
                />
                {/* <div className="mt-4">
                      <TMSelectMenu
                        checkPosition="right"
                        label="Select Project"
                        placeholder="Select Project"
                        options={[]}
                      />
                    </div> */}
                <div className="mt-4 mb-2 flex flex-1 items-start justify-between">
                  <div className="mr-4 flex-1">
                    <TMInputField
                      placeholder="Enter JIRA IDs (separated by comma)"
                      label="Issue IDs"
                      errorText={errorText}
                      value={enterdIssueIDs}
                      ref={modalFocusRef}
                      onKeyDown={(e) => onSubmitKeyHandler(e, onLinkIssueClick)}
                      onChange={(e) => {
                        setIssueIds(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <TMButton
                    wrapperClassName="mt-6"
                    colors="white"
                    icon={<OpenInNewOutlinedIcon className="!h-4 !w-4" />}
                    iconPlacement="end"
                    onClick={createNewIssueModalHandler}
                  >
                    Create New Issue
                  </TMButton>
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                  <MdOutlineLayers className="text-base-600 h-14 w-14" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3
                    as="h3"
                    className="text-base-900 text-lg font-medium leading-6"
                  >
                    No JIRA Accounts Linked
                  </h3>
                  <div className="mt-2">
                    <p className="text-base-500 text-sm">
                      Click on the button below to link JIRA Account and we’ll
                      fetch projects to allow seamless integration.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </TMModalBody>
      <TMModalFooter position="right">
        {!isLoading && (
          <>
            {jiraConfig ? (
              <>
                {' '}
                <TMButton
                  variant="primary"
                  colors="white"
                  onClick={onCloseHandler}
                >
                  Cancel
                </TMButton>
                <TMButton variant="primary" onClick={onLinkIssueClick}>
                  Link Issue
                </TMButton>
              </>
            ) : (
              <TMButton fullWidth colors="brand" onClick={configureJIRAInit}>
                Setup JIRA Account
              </TMButton>
            )}
          </>
        )}
      </TMModalFooter>
    </TMModal>
  );
};

AddIssuesModal.propTypes = {
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  isVisible: PropTypes.bool
};

AddIssuesModal.defaultProps = {
  onClose: () => {},
  onSave: () => {},
  isVisible: false
};

export default AddIssuesModal;
