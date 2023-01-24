import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CreateNewFolderOutlinedIcon } from 'assets/icons';
import { TMButton } from 'common/bifrostProxy';
import FolderExplorer from 'common/FolderExplorer';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import AddFolderModal from './AddFolderModal';
import useFolders from './useFolders';

import '../styles/Folders.scss';

export default function Folders() {
  const { projectId } = useParams();
  const {
    allFolders,
    isAddFolderModalVisible,
    showAddFolderModal,
    folderClickHandler,
  } = useFolders();

  return (
    <div className="flex flex-col">
      <AddFolderModal show={isAddFolderModalVisible} projectId={projectId} />
      <div className="border-base-300 flex items-center border-b p-3">
        <span className="text-base">Folders</span>
        <TMButton
          buttonType="half-rounded-button"
          variant="primary"
          colors="white"
          wrapperClassName="ml-2"
          size="extra-small"
          onClick={showAddFolderModal}
        >
          <CreateNewFolderOutlinedIcon className="text-base-500" />
        </TMButton>
      </div>
      <div className="flex w-full flex-col">
        <FolderExplorer
          projectId={projectId}
          allFolders={allFolders}
          onFolderClick={folderClickHandler}
        />
      </div>
    </div>
  );
}
