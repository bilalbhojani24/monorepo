import React from 'react';
import { MdCode, MdOutlineBarChart } from '@browserstack/bifrost';
import {
  TMTable,
  TMTableBody,
  TMTableCell,
  TMTableRow
} from 'common/bifrostProxy';

import useTestRunDetails from './useTestRunDetails';

const MiniDetails = () => {
  const { testRunDetails } = useTestRunDetails();
  return (
    <TMTable containerWrapperClass="border-b border-base-300 md:rounded-none ribin">
      <TMTableBody>
        <TMTableRow wrapperClassName="border-none flex">
          <TMTableCell wrapperClassName="py-2 border-none flex w-1/3">
            <div className="text-base-500 flex items-center text-sm">
              <MdOutlineBarChart className="mr-2 h-5 w-5" />
              Overall Progress: 0%
            </div>
          </TMTableCell>
          <TMTableCell wrapperClassName="py-2 border-none flex w-1/3">
            <div className="text-base-500 flex items-center text-sm">
              <MdCode className="mr-2 h-5 w-5" />
              Total Count
            </div>
          </TMTableCell>
          <TMTableCell wrapperClassName="py-2 border-none flex w-1/3">
            <div className="text-base-500 flex items-center text-sm">
              <MdCode className="mr-2 h-5 w-5" />
              Run Status
            </div>
          </TMTableCell>
        </TMTableRow>
        <TMTableRow wrapperClassName="border-none flex">
          <TMTableCell wrapperClassName="py-2 border-none flex w-1/3">
            <div className="text-base-900 pl-7">Test</div>
          </TMTableCell>
          <TMTableCell wrapperClassName="py-2 border-none flex w-1/3">
            <div className="text-base-900 pl-7">
              {testRunDetails?.test_cases?.length} Tests
            </div>
          </TMTableCell>
          <TMTableCell wrapperClassName="py-2 border-none flex w-1/3">
            <div className="text-base-900 pl-7 capitalize">
              {testRunDetails?.run_state?.replace('_', ' ')}
            </div>
          </TMTableCell>
        </TMTableRow>
      </TMTableBody>
    </TMTable>
  );
};

export default MiniDetails;
