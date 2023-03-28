// TODO: after success, rearrange the folder, challenge updatedfolder structure to be fetched in allFolders

import React, { useEffect, useState } from 'react';
import { MdOutlineCreateNewFolder } from '@browserstack/bifrost';
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
import { setShowChangeFolderModal } from '../../../features/importCSVFlow/slices/importCSVSlice';

import AddFolderModal from './AddFolderModal';
import useFolderExplorerModal from './useFolderExplorerModal';

const FolderExplorerModal = ({
  allFolders,
  alertRequired,
  projectId,
  show,
  heading,
  subHeading,
  alertText,
  isRootAvailable,
  confirmButtonText,
  onClose,
  disabledFolders,
  loading,
  radioGroupTitle,
  rootFolderText,
  trailingButton,
  showEmptyModal,
  folderExplorerHeader
}) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [primaryMoveLocation, setPrimaryMoveLocation] = useState(
    moveFolderOptions[0].id
  );
  const {
    navigate,
    dispatch,
    handleCreateFolderButtonClick,
    handleActionClick,
    showAddFolderModal,
    hideModalHandler,
    parentFolderId
  } = useFolderExplorerModal({ projectId });
  const [internalAllFolders, setInternalAllFolders] = useState(null);

  // const moveFolderOnOkHandler = () => {
  //   onOK(
  //     primaryMoveLocation === moveFolderOptions[1]?.id ? null : selectedFolder,
  //     internalAllFolders
  //   );
  // };
  const updateFolderLocation = () => {
    if (primaryMoveLocation === moveFolderOptions[0]?.id) {
      navigate(`/import/csv?project=${projectId}&folder=${selectedFolder.id}`);
    } else if (primaryMoveLocation === moveFolderOptions[1]?.id)
      navigate(`/import/csv?project=${projectId}`);
    dispatch(setShowChangeFolderModal(false));
  };

  useEffect(() => {
    if (show) {
      setInternalAllFolders(allFolders);
      setPrimaryMoveLocation(moveFolderOptions[0].id);
      setSelectedFolder(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <>
      {projectId && (
        <TMModal show={show} withDismissButton onOverlayClick={onClose}>
          <TMModalHeader
            heading={heading}
            subHeading={subHeading}
            handleDismissClick={onClose}
          />
          {projectId && projectId !== 'new' && (
            <TMModalBody>
              {isRootAvailable && (
                <div className="mb-4 flex items-center justify-start pt-1 text-sm">
                  <span className="mr-2">{radioGroupTitle}</span>
                  <TMRadioGroup
                    direction="horizontal"
                    onChange={(e, selectedID) => {
                      setPrimaryMoveLocation(selectedID);
                    }}
                    selectedOption={{
                      id: primaryMoveLocation
                    }}
                    options={moveFolderOptions}
                  />
                </div>
              )}
              {primaryMoveLocation === moveFolderOptions[0].id ? (
                <div className="border-base-300 mb-4 max-h-64 overflow-auto rounded-md border">
                  <div className="border-base-200 flex justify-between border-b py-2 px-4">
                    <span>{folderExplorerHeader}</span>
                    {trailingButton && (
                      <TMButton
                        size="extra-small"
                        iconPlacement="end"
                        colors="white"
                        icon={<MdOutlineCreateNewFolder className="h-4 w-4" />}
                        onClick={handleCreateFolderButtonClick}
                      >
                        Create Folder
                      </TMButton>
                    )}
                  </div>
                  <FolderExplorer
                    projectId={projectId}
                    allFolders={allFolders}
                    onFolderClick={(folder) => setSelectedFolder(folder)}
                    onFoldersUpdate={(data) => setInternalAllFolders(data)}
                    disabledFolders={disabledFolders}
                    actionsEnabled
                    actionOptions={[
                      { id: 'add_folder', body: 'Add Sub Folder' }
                    ]}
                    isSingleSelect
                    actionClickHandler={handleActionClick}
                  />
                </div>
              ) : null}
              {(alertRequired ||
                primaryMoveLocation === moveFolderOptions[1].id) && (
                <TMAlerts
                  modifier="primary"
                  linkText={null}
                  description={
                    primaryMoveLocation === moveFolderOptions[0].id
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
                <div className="text-base-700 mt-2 mb-6 flex flex-col text-sm">
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
                primaryMoveLocation !== moveFolderOptions[1]?.id
              }
              variant="primary"
              wrapperClassName="ml-3"
              // onClick={moveFolderOnOkHandler}
              onClick={updateFolderLocation}
              loading={loading}
              isIconOnlyButton={loading}
            >
              {confirmButtonText}
            </TMButton>
          </TMModalFooter>
        </TMModal>
      )}
      {showAddFolderModal && projectId && (
        <AddFolderModal
          projectId={projectId}
          show={showAddFolderModal}
          folderId={parentFolderId}
          isSubFolder={!!parentFolderId}
          hideModal={hideModalHandler}
        />
      )}
    </>
  );
};

FolderExplorerModal.propTypes = {
  allFolders: PropTypes.arrayOf(PropTypes.object),
  alertRequired: PropTypes.bool,
  projectId: PropTypes.string,
  // selectedFolderId: PropTypes.string,
  show: PropTypes.bool,
  isRootAvailable: PropTypes.bool,
  onClose: PropTypes.func,
  // onOK: PropTypes.func,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  confirmButtonText: PropTypes.string,
  alertText: PropTypes.string,
  disabledFolders: PropTypes.arrayOf(PropTypes.number),
  loading: PropTypes.bool,
  radioGroupTitle: PropTypes.string,
  rootFolderText: PropTypes.string,
  trailingButton: PropTypes.bool,
  showEmptyModal: PropTypes.bool,
  folderExplorerHeader: PropTypes.string
};

FolderExplorerModal.defaultProps = {
  allFolders: [],
  alertRequired: false,
  projectId: '',
  show: false,
  isRootAvailable: false,
  onClose: () => {},
  // onOK: () => {},
  heading: '',
  subHeading: '',
  confirmButtonText: '',
  alertText: '',
  disabledFolders: [],
  loading: false,
  radioGroupTitle: '',
  rootFolderText: '',
  trailingButton: false,
  showEmptyModal: false,
  folderExplorerHeader: ''
};

export default FolderExplorerModal;
