import React from 'react';
import {
  // ArrowBackOutlinedIcon,
  // ArrowForwardOutlinedIcon,
  InfoOutlinedIcon
} from 'assets/icons';
import { TMDropdown } from 'common/bifrostProxy';
import { dropDownOptions } from 'features/Repository/const/testCaseConst';

import useTestCaseView from './useTestCaseView';

const TestCaseTopBar = () => {
  const { testCaseDetails, actionHandler } = useTestCaseView();
  return (
    <div className="flex h-12 w-full items-start justify-between">
      <div className="line-clamp-2 flex items-start text-base font-medium">
        {testCaseDetails?.name}{' '}
        <InfoOutlinedIcon className="ml-1 h-5 !w-5 cursor-pointer" />
      </div>
      <div className="flex items-center">
        <TMDropdown
          onClick={actionHandler}
          triggerVariant="meatball-button"
          options={dropDownOptions}
        />
        {/* <ArrowBackOutlinedIcon className="ml-2 !h-5 !w-5 cursor-pointer" />
        <ArrowForwardOutlinedIcon className="!h-5 !w-5 cursor-pointer" /> */}
      </div>
    </div>
  );
};

export default TestCaseTopBar;
