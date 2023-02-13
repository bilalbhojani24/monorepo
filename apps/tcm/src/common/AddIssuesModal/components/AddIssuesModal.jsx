import React from 'react';
import { Loader } from '@browserstack/bifrost';
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

import useAddIssuesModal from './useAddIssuesModal';

const AddIssuesModal = ({ isVisible, onClose, onSave }) => {
  const {
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
      // size="medium"
    >
      <TMModalHeader
        heading="Add Link"
        handleDismissClick={onCloseHandler}
        subHeading={
          !isLoading && jiraConfig
            ? 'Add your Issue ID from your projects or create a new one:'
            : null
        }
      />
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
                  value={jiraConfig?.email || ''}
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
              <div className="flex w-full justify-center">
                <TMButton onClick={configureJIRAInit}>
                  Configure your JIRA first
                </TMButton>
              </div>
            )}
          </>
        )}
      </TMModalBody>
      <TMModalFooter position="right">
        {!isLoading && jiraConfig && (
          <>
            <TMButton variant="primary" colors="white" onClick={onCloseHandler}>
              Cancel
            </TMButton>
            <TMButton variant="primary" onClick={onLinkIssueClick}>
              Link Issue
            </TMButton>
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
