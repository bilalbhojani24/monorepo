import React from 'react';
import {
  // ArrowBackOutlinedIcon,
  // ArrowForwardOutlinedIcon,
  InfoOutlinedIcon
} from 'assets/icons';
import {
  TMDropdown,
  TMTooltip,
  TMTooltipBody,
  TMTooltipHeader
} from 'common/bifrostProxy';
import { dropDownOptions } from 'features/Repository/const/testCaseConst';

import useTestCaseView from './useTestCaseView';

const TestCaseTopBar = () => {
  const { testCaseDetails, actionHandler } = useTestCaseView();
  return (
    <div className="mb-4 flex  w-full items-start justify-between">
      <div className="relative flex max-h-12 w-full  items-end pr-2 text-base font-medium">
        {/* <div className="text-ellipsis">{testCaseDetails?.name}</div> */}
        <div className=" overflow-hidden text-ellipsis">
          {testCaseDetails?.name}
        </div>
        <TMTooltip
          size="sm"
          placementSide="bottom"
          theme="dark"
          content={
            <>
              <TMTooltipHeader>{testCaseDetails?.name}</TMTooltipHeader>
              <TMTooltipBody>
                <p className="text-sm">
                  ID: {testCaseDetails.id}
                  URL: {testCaseDetails.links.self}
                </p>
              </TMTooltipBody>
            </>
          }
        >
          <InfoOutlinedIcon className="ml-1 !h-3.5 !w-3.5" />
        </TMTooltip>
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
