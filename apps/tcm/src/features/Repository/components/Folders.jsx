import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CreateNewFolderOutlinedIcon } from 'assets/icons';
import { TMButton } from 'common/bifrostProxy';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import AddFolderModal from './AddFolderModal';
import useFolders from './useFolders';

import '../styles/Folders.scss';

export default function Folders() {
  const { projectId } = useParams();
  const { allFolders, isAddFolderModalVisible, showAddFolderModal } =
    useFolders();

  return (
    <div className="flex flex-col">
      {isAddFolderModalVisible && <AddFolderModal projectId={projectId} />}
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
        {allFolders?.map((item) => (
          <FolderItem
            title={item?.name}
            key={item.id}
            id={item.id}
            // onClick={() => folderClickHandler(item)}
          />
        ))}
      </div>
    </div>
  );
}

// this is obviously temporary skip its errors
// eslint-disable-next-line react/prop-types
const FolderItem = ({ title, onClick, id }) => {
  const { projectId } = useParams();
  return (
    <Link
      to={routeFormatter(AppRoute.TEST_CASES, {
        projectId,
        folderId: id,
      })}
      className="border-base-200 w-full cursor-pointer border-b p-2"
      onClick={onClick}
    >
      {title}
    </Link>
  );
};
