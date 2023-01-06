import React from 'react';
import { Button, InputField } from '@browserstack/bifrost';
import { DescriptionOutlinedIcon } from 'icons';

// import useFolders from './useFolders';
import '../styles/TestCases.scss';

export default function TestCases() {
  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full items-start border-b border-base-300 p-3">
        <InputField placeholder="Search by Test Case name, ID" />
        <Button
          buttonType="half-rounded-button"
          variant="white"
          wrapperClassName="ml-3"
          size="default"
        >
          Filter
        </Button>
      </div>
      <div className="flex flex-1">test</div>
    </div>
  );
}
