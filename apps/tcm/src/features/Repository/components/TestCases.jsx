import React from 'react';
import { Button, InputField } from '@browserstack/bifrost';
import { SearchIcon } from 'icons';

import BlankPage from './BlankPage';

// import useFolders from './useFolders';
import '../styles/TestCases.scss';

export default function TestCases() {
  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full items-start border-b border-base-300 p-3">
        <InputField
          placeholder="Search by Test Case name, ID"
          leadingIcon={<SearchIcon className="text-base-400" />}
        />
        <Button
          buttonType="half-rounded-button"
          variant="white"
          wrapperClassName="ml-3"
          size="default"
        >
          Filter
        </Button>
      </div>
      <div className="flex w-full flex-1 items-center justify-center border-l border-base-300">
        <BlankPage />
      </div>
    </div>
  );
}
