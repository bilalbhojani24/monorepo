import React from 'react';
import {
  Button,
  DescriptionList,
  MdChevronLeft,
  MdEdit,
  MdOutlineAnalytics,
  MdTipsAndUpdates
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import reportLoadingAnimation from 'assets/reportLoadingAnimation.gif';
import { REPORT_LOADING_STATES } from 'constants/mcpConstants';
import { secondsToMinutes } from 'utils/dateUtils';

import GenerateReportPrompt from './GenerateReportPrompt';
import useReportLoading from './useReportLoading';

const ReportLoading = () => {
  const {
    sessionState,
    sessionDetails,
    sessionStateTextMap,
    onCancelClicked,
    stopSessionClicked,
    secondsElapsed,
    isSessionStopInProgress,
    showGenerateReportPrompt,
    setShowGenerateReportPrompt,
    testDataDescriptionList,
    selectedTipMsg
  } = useReportLoading();

  return (
    <div className="flex w-full flex-col">
      <div className="border-base-300 text-base-500 flex items-center border-b p-4">
        <div className="text-xl">
          <MdChevronLeft onClick={onCancelClicked} />
        </div>

        <div className="mx-2 text-sm font-medium leading-5">
          {sessionDetails.sessionName}
        </div>

        <div className="text-xl">
          <MdEdit />
        </div>
      </div>

      <div className="bg-base-50 flex flex-1">
        <div className="border-base-300 border-r p-2 sm:w-64 xl:w-[360px]">
          <div
            className={twClassNames('', {
              'rounded-xl border-2 border-danger-600 bg-danger-50':
                sessionState === REPORT_LOADING_STATES.RECORDING
            })}
          >
            {sessionState === REPORT_LOADING_STATES.RECORDING && (
              <div className="bg-danger-50 m-2 flex items-center justify-center rounded-md">
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
                  'text-base-900':
                    sessionState !== REPORT_LOADING_STATES.RECORDING
                }
              )}
            >
              {sessionStateTextMap[sessionState]}
            </div>

            <div
              className="
            border-base-900 bg-base-50 my-3 mx-auto mt-1.5 flex h-[432px] w-52 flex-1 
            items-center justify-center rounded-lg border-8 px-5
            "
            >
              <img
                src={reportLoadingAnimation}
                className="w-full max-w-[192px]"
                alt="reportInProgress"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 py-2">
          {testDataDescriptionList?.length > 0 && (
            <DescriptionList
              descriptions={testDataDescriptionList}
              alignment="two-column"
            />
          )}

          {sessionState !== REPORT_LOADING_STATES.STOPPING && (
            <div className="mt-6">
              <Button
                loading={isSessionStopInProgress}
                icon={<MdOutlineAnalytics />}
                variant="primary"
                colors="brand"
                size="extra-large"
                onClick={() => {
                  setShowGenerateReportPrompt(true);
                }}
              >
                Generate Performance Report
              </Button>
            </div>
          )}

          {sessionState === REPORT_LOADING_STATES.STOPPING && (
            <div className="bg-info-50 mt-2 flex rounded-md p-4">
              <div className="text-info-400 mr-3 text-xl">
                <MdTipsAndUpdates />
              </div>

              <div className="">
                <div className="text-info-800 mb-2 text-sm font-medium leading-5">
                  Did you know?
                </div>
                <div className="text-info-700 text-sm font-normal leading-5">
                  {selectedTipMsg}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <GenerateReportPrompt
        showGenerateReportPrompt={showGenerateReportPrompt}
        setShowGenerateReportPrompt={setShowGenerateReportPrompt}
        stopSessionClicked={stopSessionClicked}
      />
    </div>
  );
};

export default ReportLoading;
