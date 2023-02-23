import React from 'react';
import {
  // ArrowBackOutlinedIcon,
  // ArrowForwardOutlinedIcon,
  InfoOutlinedIcon
} from 'assets/icons';
import {
  TMAlerts,
  TMDropdown,
  TMTooltip,
  TMTooltipBody,
  TMTooltipHeader
} from 'common/bifrostProxy';
import CopyButton from 'common/CopyButton';
import { dropDownOptions } from 'features/Repository/const/testCaseConst';
import PropTypes from 'prop-types';

import { TR_DROP_OPTIONS } from '../const/testCaseViewConst';

import useTestCaseViewDetails from './useTestCaseViewDetails';

const TestCaseTopBar = ({ actionHandler, isFromTestRun }) => {
  const { testCaseDetails } = useTestCaseViewDetails();
  return (
    <>
      {testCaseDetails?.is_automation && (
        <div className="mb-4 w-full">
          <TMAlerts
            linkText={null}
            modifier="primary"
            accentBorder={false}
            title="This is an automation test case."
          />
        </div>
      )}
      <div className="mb-4 flex  w-full items-start justify-between">
        <div className="relative flex w-full  items-end pr-2 text-base font-medium">
          {/* <div className="text-ellipsis">{testCaseDetails?.name}</div> */}
          <div className="line-clamp-2 overflow-hidden break-all">
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
                  <div className="text-sm">
                    <p>ID: {testCaseDetails?.identifier}</p>
                    <p>URL: {testCaseDetails?.links?.self?.slice(7)}</p>
                    <div className="mt-3 flex w-full gap-4">
                      <CopyButton copyValue={testCaseDetails?.identifier}>
                        Copy ID
                      </CopyButton>
                      <CopyButton
                        copyValue={
                          window.location.origin +
                          testCaseDetails?.links?.self?.slice(7)
                        }
                      >
                        Copy URL
                      </CopyButton>
                    </div>
                  </div>
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
            options={isFromTestRun ? TR_DROP_OPTIONS : dropDownOptions}
          />
          {/* <ArrowBackOutlinedIcon className="ml-2 !h-5 !w-5 cursor-pointer" />
        <ArrowForwardOutlinedIcon className="!h-5 !w-5 cursor-pointer" /> */}
        </div>
      </div>
    </>
  );
};

TestCaseTopBar.propTypes = {
  actionHandler: PropTypes.func,
  isFromTestRun: PropTypes.bool
};

TestCaseTopBar.defaultProps = {
  actionHandler: () => {},
  isFromTestRun: false
};

export default TestCaseTopBar;
