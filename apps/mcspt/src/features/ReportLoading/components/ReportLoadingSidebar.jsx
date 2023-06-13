import React from 'react';
import { secondsToMinutes } from '@browserstack/mcp-shared';
import { twClassNames } from '@browserstack/utils';
import reportRunningAnimation from 'assets/reportRunningAnimation.gif';
import reportLoadingAnimation from 'assets/tripleDots.gif';
import REPORT_LOADING_STATES from 'constants/reportLoadingStates';

import { sessionStateTextMap } from '../utils/reportLoadingUtils';

import useReportLoadingSidebar from './useReportLoadingSidebar';

const ReportLoadingSidebar = () => {
  const { sessionState, secondsElapsed } = useReportLoadingSidebar();

  return (
    <div className="border-base-300 flex flex-col border-r px-2 py-4 sm:w-64 xl:w-[360px]">
      <div
        className={twClassNames('flex flex-col flex-1 px-3 py-4 border-2', {
          'rounded-xl border-danger-600 bg-danger-50':
            sessionState === REPORT_LOADING_STATES.RECORDING,
          'border-transparent': sessionState !== REPORT_LOADING_STATES.RECORDING
        })}
      >
        {sessionState === REPORT_LOADING_STATES.RECORDING && (
          <div className="bg-danger-50 flex items-center justify-center rounded-md px-1">
            <div className="text-danger-900 text-3xl font-semibold leading-9">
              {secondsToMinutes(secondsElapsed)}
            </div>
          </div>
        )}

        <div
          className={twClassNames(
            'p-3 text-center text-base font-medium leading-6 whitespace-pre-line',
            {
              'text-danger-900':
                sessionState === REPORT_LOADING_STATES.RECORDING,
              'text-base-900': sessionState !== REPORT_LOADING_STATES.RECORDING
            }
          )}
        >
          {sessionStateTextMap[sessionState]}
        </div>

        <div
          className={twClassNames(
            'mx-auto flex aspect-[9/16]',
            'items-center justify-center',
            'rounded-lg border-8 border-base-900',
            {
              'bg-base-50': sessionState === REPORT_LOADING_STATES.RECORDING,
              'bg-white': sessionState !== REPORT_LOADING_STATES.RECORDING
            }
          )}
        >
          {sessionState !== REPORT_LOADING_STATES.RECORDING && (
            <img
              src={reportLoadingAnimation}
              className="w-full max-w-[192px]"
              alt="reportInProgress"
            />
          )}

          {sessionState === REPORT_LOADING_STATES.RECORDING && (
            <img
              src={reportRunningAnimation}
              className="w-full max-w-[192px]"
              alt="reportInProgress"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportLoadingSidebar;
