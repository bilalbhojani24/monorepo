import React from 'react';
import { MdCode, MdOutlineBarChart } from '@browserstack/bifrost';
import {
  TMTable,
  TMTableBody,
  TMTableCell,
  TMTableRow
} from 'common/bifrostProxy';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useTestRunDetails from './useTestRunDetails';

const MiniDetails = () => {
  const { testRunDetails, getProgressOptions } = useTestRunDetails();
  const totalValue = testRunDetails?.overall_progress
    ? Object.values(testRunDetails?.overall_progress).reduce(
        (total, num) => total + num,
        0
      )
    : 0;
  const untestedPerc =
    100 - (testRunDetails?.overall_progress?.untested / totalValue) * 100;

  return (
    <TMTable containerWrapperClass="border-b border-base-300 md:rounded-none">
      <TMTableBody>
        <TMTableRow wrapperClassName="border-none flex">
          <TMTableCell wrapperClassName="py-2 border-none flex w-1/3">
            <div className="text-base-500 flex items-center text-sm">
              <MdOutlineBarChart className="mr-2 h-5 w-5" />
              Overall Progress:{' '}
              {Number.isNaN(untestedPerc)
                ? '--'
                : `${untestedPerc.toFixed(0)}%`}
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
          <td className="flex w-1/3 border-none py-2">
            <div className="flex w-full items-center px-6">
              {testRunDetails?.overall_progress && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={getProgressOptions(testRunDetails)}
                />
              )}
            </div>
          </td>
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
