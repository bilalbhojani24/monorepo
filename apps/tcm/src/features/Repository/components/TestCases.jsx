import React from 'react';
import { EmptyState } from '@browserstack/bifrost';
import { DescriptionOutlinedIcon } from 'icons';

// import useFolders from './useFolders';
import '../styles/TestCases.scss';

export default function TestCases() {
  return (
    <div className="flex items-center justify-center">
      <EmptyState
        title="No Test Cases Available"
        description="Get started by clicking on the buttons below to create/import a test case. "
        mainIcon={<DescriptionOutlinedIcon className="!h-12 !w-12" />}
      />
    </div>
  );
}
