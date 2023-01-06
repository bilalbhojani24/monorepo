import { EmptyState } from '@browserstack/bifrost';
import { CreateNewFolderOutlinedIcon } from 'icons';

// import useFolders from './useFolders';

import '../styles/Folders.scss';

export default function Folders() {
  return (
    <div className="flex items-center justify-center">
      <EmptyState
        title="No Folders Available"
        description="Get started by clicking on the button below to create a folder"
        mainIcon={<CreateNewFolderOutlinedIcon className="!h-12 !w-12" />}
      />
    </div>
  );
}
