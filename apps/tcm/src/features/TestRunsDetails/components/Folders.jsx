import React from 'react';
import {
  // CreateNewFolderOutlinedIcon,
  FindInPageOutlinedIcon
  // SourceOutlinedIcon
} from 'assets/icons';
import { TMEmptyState } from 'common/bifrostProxy';
// import FolderExplorer from 'common/FolderExplorer';
import Loader from 'common/Loader';

import useTRTCFolders from './useTRTCFolders';

const Folders = () => {
  const {
    // projectId,
    // allFolders,
    isTestCasesLoading,
    allTestCases
    // selectedFolder,
    // isFoldersLoading,
    // onFoldersUpdate,
    // onFolderClick
  } = useTRTCFolders();

  return (
    <aside className="lg:order-first lg:block lg:shrink-0">
      <div className="relative flex h-full w-96 flex-col overflow-hidden">
        {/* <div className="border-base-300  flex h-12 w-full  items-center border-b py-0.5 px-3">
          <span className="text-base">Folder View</span>
        </div> */}

        <div className="flex h-full w-full flex-1 shrink  flex-col overflow-y-auto">
          {isTestCasesLoading ? (
            <Loader wrapperClassName="h-full" />
          ) : (
            <div className="flex h-full w-full flex-col items-stretch justify-center p-16">
              <TMEmptyState
                // title=""
                title={`${allTestCases.length} Test cases for this test run`}
                mainIcon={
                  <FindInPageOutlinedIcon className="text-base-400 !h-12 !w-12" />
                }
                buttonProps={null}
              />
            </div>
          )}
          {/* <FolderExplorer
            projectId={projectId}
            folderId={selectedFolder?.id || null}
            allFolders={allFolders}
            isSingleSelect
            onFolderClick={onFolderClick}
            onFoldersUpdate={onFoldersUpdate}
          /> */}
        </div>
      </div>
    </aside>
  );
};

export default Folders;
