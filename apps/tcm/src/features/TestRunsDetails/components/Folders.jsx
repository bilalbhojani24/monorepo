import React from 'react';
import FolderExplorer from 'common/FolderExplorer';
import Loader from 'common/Loader';

import useTRTCFolders from './useTRTCFolders';

const Folders = () => {
  const {
    projectId,
    allFolders,
    selectedFolder,
    isFoldersLoading,
    onFoldersUpdate,
    onFolderClick
  } = useTRTCFolders();

  return (
    <aside className="lg:order-first lg:block lg:shrink-0">
      <div className="relative flex h-full w-96 flex-col overflow-hidden">
        {/* <div className="border-base-300  flex h-12 w-full  items-center border-b py-0.5 px-3">
          <span className="text-base">Folder View</span>
        </div> */}

        <div className="flex h-full w-full flex-1 shrink  flex-col overflow-y-auto">
          {isFoldersLoading ? <Loader wrapperClassName="h-full" /> : null}
          <FolderExplorer
            projectId={projectId}
            folderId={selectedFolder?.id || null}
            allFolders={allFolders}
            isSingleSelect
            onFolderClick={onFolderClick}
            onFoldersUpdate={onFoldersUpdate}
          />
        </div>
      </div>
    </aside>
  );
};

export default Folders;
