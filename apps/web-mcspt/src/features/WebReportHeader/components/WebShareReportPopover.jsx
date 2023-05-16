import React from 'react';
import {
  InputField,
  InputGroupButton,
  MdCheck,
  MdContentCopy,
  MdPublic
} from '@browserstack/bifrost';

import useWebSharedReportPopover from './useWebSharedReportPopover';

const SharedReportPopover = () => {
  const { showLinkCopied, shareableLinkForReport, copySharedReportLink } =
    useWebSharedReportPopover();

  return (
    <div className="w-[480px] px-4">
      <div className="text-base-700 text-sm font-medium leading-5">
        Report URL
      </div>

      <div className="mt-1 mb-4">
        <InputField
          id="inputShareReportPopover"
          type="text"
          disabled
          value={shareableLinkForReport}
          addOnAfter={
            <InputGroupButton
              position="end"
              size="default"
              colors="brand"
              variant="primary"
              icon={showLinkCopied ? <MdCheck /> : <MdContentCopy />}
              onClick={copySharedReportLink}
            >
              <div className="whitespace-nowrap text-white">
                {showLinkCopied ? 'Copied !' : 'Copy Link'}
              </div>
            </InputGroupButton>
          }
        />
      </div>

      <div className="flex">
        <div className="text-base-400 mr-1 text-xl">
          <MdPublic />
        </div>

        <div className="text-base-600 text-sm font-normal leading-5">
          The report can be accessed by anyone with the link
        </div>
      </div>
    </div>
  );
};

export default SharedReportPopover;
