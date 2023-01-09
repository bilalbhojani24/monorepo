import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@browserstack/bifrost';
import { getFolders } from 'api/folders.api.js';
import AppRoute from 'const/routes';
import { CreateNewFolderOutlinedIcon } from 'Icons';

import useFolders from './useFolders';

import '../styles/Folders.scss';

export default function Folders() {
  const { projectId } = useParams();
  const { allFolders, setAllFolders } = useFolders();

  // const folderClickHandler = (data) => {
  //   setSelectedFolder(data);
  // };

  useEffect(() => {
    if (projectId) {
      getFolders({ projectId }).then((data) => {
        setAllFolders(data?.folders || []);
      });
    } else {
      debugger;
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center border-b border-base-300 p-3">
        <span className="text-base">Folders</span>
        <Button
          buttonType="half-rounded-button"
          variant="white"
          wrapperClassName="ml-2"
          size="extra-small"
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

const FolderItem = ({ title, onClick, id }) => {
  const { projectId } = useParams();
  return (
    <Link
      to={`${AppRoute.REPO}/${projectId}/folder/${id}`}
      className="w-full cursor-pointer border-b border-base-200 p-2"
      onClick={onClick}
    >
      {title}
    </Link>
  );
};
