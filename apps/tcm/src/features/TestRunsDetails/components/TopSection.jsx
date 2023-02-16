import React from 'react';
import { MdOutlineAccessTime, MdPersonOutline } from '@browserstack/bifrost';
import { TMButton, TMMetadata, TMPageHeadings } from 'common/bifrostProxy';
import { formatTime } from 'utils/helperFunctions';

import useTestRunDetails from './useTestRunDetails';

const TopSection = () => {
  const { showIssuesHandler, testRunDetails } = useTestRunDetails();
  return (
    <div className="border-base-300 w-full border-b pb-4">
      <TMPageHeadings
        wrapperClassName="px-4 pt-6 bg-transparent"
        heading={`Test Run - ${formatTime(testRunDetails?.created_at)}`}
        actions={
          <>
            <TMButton
              variant="primary"
              colors="white"
              onClick={showIssuesHandler}
            >
              Issues
            </TMButton>
          </>
        }
        subSection={
          <div className="mt-4 flex gap-4">
            <TMMetadata
              metaDescription={testRunDetails?.assignee?.full_name}
              textColorClass="text-base-500 mt-1"
              icon={<MdPersonOutline className="text-base-500 h-5 w-5" />}
            />
            <TMMetadata
              metaDescription={formatTime(testRunDetails?.created_at, 'timeG')}
              textColorClass="text-base-500 mt-1"
              icon={<MdOutlineAccessTime className="text-base-500 h-5 w-5" />}
            />
          </div>
        }
      />
    </div>
  );
};

export default TopSection;
