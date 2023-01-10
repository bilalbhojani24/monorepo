import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@browserstack/bifrost';
import AppRoute from 'const/routes';
import { CreateNewFolderOutlinedIcon } from 'Icons';

import AddFolderModal from './AddFolderModal';
import useFolders from './useFolders';

import '../styles/Folders.scss';

export default function Folders() {
  const { projectId } = useParams();
  const { allFolders, isAddFolderModalVisible, showAddFolderModal } =
    useFolders();

  // const folderClickHandler = (data) => {
  //   setSelectedFolder(data);
  // };

  return (
    <div className="flex flex-col">
      {isAddFolderModalVisible && <AddFolderModal projectId={projectId} />}
      <div className="flex items-center border-b border-base-300 p-3">
        <span className="text-base">Folders</span>
        <Button
          buttonType="half-rounded-button"
          variant="white"
          wrapperClassName="ml-2"
          size="extra-small"
          onClick={showAddFolderModal}
        >
          <CreateNewFolderOutlinedIcon className="text-base-500" />
        </Button>
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
const FolderItem = ({ title, onClick, id }) => {
  const { projectId } = useParams();
  return (
    <Link
      to={`${AppRoute.PROJECTS}/${projectId}${AppRoute.TEST_CASES}/folder/${id}`}
      className="w-full cursor-pointer border-b border-base-200 p-2"
      onClick={onClick}
    >
      {title}
    </Link>
  );
};
