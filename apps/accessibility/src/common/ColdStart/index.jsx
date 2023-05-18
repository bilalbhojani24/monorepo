import React from 'react';
import { Button } from '@browserstack/bifrost';

import FolderAdd from '../../assets/folder-add.svg';

export default function ColdStart() {
  return (
    <>
      <img src={FolderAdd} alt="add folder icon" className="mb-5 h-7 w-9" />
      <p className="mb-1 font-semibold">No accessibility builds yet</p>
      <p className="text-base-500 mb-6">
        Automate your accessibility testing with the BrowserStack SDK.
      </p>
      <Button>Get started</Button>
    </>
  );
}
