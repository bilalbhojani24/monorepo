import React from 'react';
import { MdCode, MdOutlineBarChart } from '@browserstack/bifrost';
import {
  TMBadge,
  TMTable,
  TMTableBody,
  TMTableCell,
  TMTableRow
} from 'common/bifrostProxy';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useTestRunDetails from './useTestRunDetails';

const MiniDetails = () => {
  const { isTestRunDetailsLoading, testRunDetails, getProgressOptions } =
    useTestRunDetails();
  const totalValue = testRunDetails?.overall_progress
    ? Object.values(testRunDetails?.overall_progress).reduce(
        (total, num) => total + num,
        0
      )
    : 0;

  const untestedPerc =
    100 - (testRunDetails?.overall_progress?.untested / totalValue) * 100;
  const isPassed = testRunDetails?.overall_progress?.passed === totalValue;

  return (
    <div className="border-base-300 border-b border-r-0 bg-white">
      <TMTable containerWrapperClass="md:rounded-none max-w-6xl border-r-0 ring-0 shadow-none border-none">
        <TMTableBody wrapperClassName="border-none">
          <TMTableRow wrapperClassName="border-none flex">
            <TMTableCell wrapperClassName="py-2 border-none flex w-1/3">
              <div className="text-base-500 flex items-center text-sm">
                <MdOutlineBarChart className="mr-2 h-5 w-5" />
                Overall Progress:
                <span className="text-base-500 ml-0.5">
                  {Number.isNaN(untestedPerc)
                    ? ''
                    : `${untestedPerc.toFixed(0)}%`}
                </span>
                {!isTestRunDetailsLoading && (
                  <>
                    {(isPassed && testRunDetails?.test_cases_count > 0) ||
                    testRunDetails?.overall_progress?.failed > 0 ? (
                      <TMBadge
                        wrapperClassName="ml-1 pointer-events-none"
                        text={isPassed ? 'Passed' : 'Failed'}
                        modifier={isPassed ? 'success' : 'error'}
                        size="large"
                      />
                    ) : null}
                  </>
                )}
              </div>
            </TMTableCell>
            <TMTableCell wrapperClassName="py-2 border-none flex w-1/3">
              <div className="text-base-500 flex items-center text-sm">
                <MdCode className="mr-2 h-5 w-5" />
                Total Count
              </div>
            </TMTableCell>
            <TMTableCell wrapperClassName="py-2 border-none flex w-1/3">
              {/* <div className="text-base-500 flex items-center text-sm">
                <MdCode className="mr-2 h-5 w-5" />
                Run Status
              </div> */}
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
                {testRunDetails?.test_cases_count} Tests
              </div>
            </TMTableCell>
            <TMTableCell wrapperClassName="py-2 border-none flex w-1/3">
              {/* <div className="text-base-900 pl-7 capitalize">
                {testRunDetails?.run_state?.replace('_', ' ')}
              </div> */}
            </TMTableCell>
          </TMTableRow>
        </TMTableBody>
      </TMTable>
    </div>
  );
};

export default MiniDetails;
