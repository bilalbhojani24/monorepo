import React from 'react';
import { MdOutlineCreateNewFolder } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import {
  TMAlerts,
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMRadioGroup
} from 'common/bifrostProxy';
import FolderExplorer from 'common/FolderExplorer';
import PropTypes from 'prop-types';

import { moveFolderOptions } from '../../../const/immutables';

import AddFolderModal from './AddFolderModal';
import useFolderExplorerModal from './useFolderExplorerModal';

const FolderExplorerModal = ({
  actionOptions,
  alertRequired,
  alertText,
  allFolders,
  confirmButtonCb,
  confirmButtonText,
  disabledFolders,
  folderExplorerHeader,
  heading,
  isCreateFolderButton,
  isRootAvailable,
  loading,
  onClose,
  projectId,
  radioGroupTitle,
  rootFolderText,
  show,
  showEmptyModal,
  subHeading,
  folderExplorerWrapperClassName
}) => {
  const {
    handleActionClick,
    handleConfirmButtonClick,
    handleCreateFolderButtonClick,
    handleNewFolderCreated,
    hideAddFolderModalHandler,
    internalAllFolders,
    parentFolderId,
    primaryMoveLocation,
    selectedFolder,
    setInternalAllFolders,
    setPrimaryMoveLocation,
    setSelectedFolder,
    showAddFolderModal
  } = useFolderExplorerModal({
    allFolders,
    confirmButtonCb,
    moveFolderOptions,
    projectId,
    show
  });

  return (
    <>
      {projectId && (
        <TMModal show={show} withDismissButton onOverlayClick={onClose}>
          <TMModalHeader
            heading={heading}
            subHeading={subHeading}
            handleDismissClick={onClose}
          />
          {projectId && !showEmptyModal && (
            <TMModalBody>
              {isRootAvailable && (
                <div className="mb-4 flex items-center justify-start pt-1 text-sm">
                  <span className="mr-2">{radioGroupTitle}</span>
                  <TMRadioGroup
                    direction="inline"
                    onChange={(selectedValue) => {
                      setPrimaryMoveLocation(selectedValue);
                      setInternalAllFolders(null); // reset
                    }}
                    value={primaryMoveLocation}
                    options={moveFolderOptions}
                  />
                </div>
              )}
              {primaryMoveLocation === moveFolderOptions[0].value ? (
                <div
                  className={twClassNames(
                    'border-base-300 mb-4 overflow-auto rounded-md border',
                    folderExplorerWrapperClassName
                  )}
                >
                  <div className="border-base-200 flex justify-between border-b px-4 py-2">
                    <span>{folderExplorerHeader}</span>
                    {isCreateFolderButton && internalAllFolders?.length ? (
                      <TMButton
                        size="extra-small"
                        iconPlacement="end"
                        colors="white"
                        icon={<MdOutlineCreateNewFolder className="h-4 w-4" />}
                        onClick={handleCreateFolderButtonClick}
                      >
                        Create Folder
                      </TMButton>
                    ) : null}
                  </div>
                  <FolderExplorer
                    projectId={projectId}
                    allFolders={internalAllFolders}
                    onFolderClick={(folder) => setSelectedFolder(folder)}
                    onFoldersUpdate={(data) => setInternalAllFolders(data)}
                    disabledFolders={disabledFolders}
                    actionsEnabled
                    actionOptions={actionOptions}
                    isSingleSelect
                    isAddFoldersEnabled
                    actionClickHandler={handleActionClick}
                    onAddNewFolderClick={handleCreateFolderButtonClick}
                  />
                </div>
              ) : null}
              {(alertRequired ||
                primaryMoveLocation === moveFolderOptions[1].value) && (
                <TMAlerts
                  modifier="primary"
                  detailsNode={null}
                  description={
                    primaryMoveLocation === moveFolderOptions[0].value
                      ? alertText
                      : rootFolderText
                  }
                />
              )}
            </TMModalBody>
          )}
          {showEmptyModal && (
            <TMModalBody>
              <div className="border-base-300 mb-4 flex max-h-64 flex-col items-center justify-center overflow-auto rounded-md border px-12 py-4">
                <MdOutlineCreateNewFolder className="text-base-300 mb-1.5 h-12 w-12" />
                <div>Add Folders</div>
                <div className="text-base-700 mb-6 mt-2 flex flex-col text-sm">
                  <div className="flex justify-center">
                    No folder available. Create a folder by
                  </div>
                  <div className="flex justify-center">
                    clicking on the button below
                  </div>
                </div>
                <TMButton
                  size="extra-small"
                  colors="white"
                  onClick={handleCreateFolderButtonClick}
                >
                  Create Folder
                </TMButton>
              </div>
            </TMModalBody>
          )}
          <TMModalFooter position="right">
            <TMButton colors="white" onClick={onClose} variant="primary">
              Cancel
            </TMButton>
            <TMButton
              disabled={
                !selectedFolder &&
                primaryMoveLocation !== moveFolderOptions[1]?.value
              }
              variant="primary"
              wrapperClassName="ml-3"
              onClick={handleConfirmButtonClick}
              loading={loading}
              isIconOnlyButton={loading}
            >
              {confirmButtonText}
            </TMButton>
          </TMModalFooter>
        </TMModal>
      )}
      {showAddFolderModal && (
        <AddFolderModal
          projectId={projectId}
          show={showAddFolderModal}
          folderId={parentFolderId}
          isSubFolder={!!parentFolderId}
          hideModal={hideAddFolderModalHandler}
          onNewFolderCreated={handleNewFolderCreated}
        />
      )}
    </>
  );
};

FolderExplorerModal.propTypes = {
  allFolders: PropTypes.arrayOf(PropTypes.object),
  actionOptions: PropTypes.arrayOf(PropTypes.object),
  alertRequired: PropTypes.bool,
  projectId: PropTypes.string,
  show: PropTypes.bool,
  isRootAvailable: PropTypes.bool,
  onClose: PropTypes.func,
  confirmButtonCb: PropTypes.func,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  confirmButtonText: PropTypes.string,
  alertText: PropTypes.string,
  disabledFolders: PropTypes.arrayOf(PropTypes.number),
  loading: PropTypes.bool,
  radioGroupTitle: PropTypes.string,
  rootFolderText: PropTypes.string,
  isCreateFolderButton: PropTypes.bool,
  showEmptyModal: PropTypes.bool,
  folderExplorerHeader: PropTypes.string,
  folderExplorerWrapperClassName: PropTypes.string
};

FolderExplorerModal.defaultProps = {
  allFolders: [],
  actionOptions: [],
  alertRequired: false,
  projectId: '',
  show: false,
  isRootAvailable: false,
  onClose: () => {},
  confirmButtonCb: () => {},
  heading: '',
  subHeading: '',
  confirmButtonText: '',
  alertText: '',
  disabledFolders: [],
  loading: false,
  radioGroupTitle: '',
  rootFolderText: '',
  isCreateFolderButton: false,
  showEmptyModal: false,
  folderExplorerHeader: '',
  folderExplorerWrapperClassName: ''
};

export default FolderExplorerModal;
