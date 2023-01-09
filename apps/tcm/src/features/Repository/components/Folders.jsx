import React from 'react';
import { Button } from '@browserstack/bifrost';
import { CreateNewFolderOutlinedIcon } from 'Icons';

// import useFolders from './useFolders';
import '../styles/Folders.scss';

export default function Folders() {
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
    </div>
  );
}
