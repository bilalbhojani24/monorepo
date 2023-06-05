import React from 'react';
import {
  Button,
  DescriptionList,
  DescriptionListBody,
  DescriptionListHeader,
  KeyValue,
  MdChevronLeft,
  MdOutlineAnalytics,
  MdTipsAndUpdates
} from '@browserstack/bifrost';
import { secondsToMinutes } from '@browserstack/mcp-shared';
import { twClassNames } from '@browserstack/utils';
import reportRunningAnimation from 'assets/reportRunningAnimation.gif';
import reportLoadingAnimation from 'assets/tripleDots.gif';
import REPORT_LOADING_STATES from 'constants/reportLoadingStates';

import { sessionStateTextMap } from '../utils/reportLoadingUtils';

import GenerateReportPrompt from './GenerateReportPrompt';
import QuitTestingPrompt from './QuitTestingPrompt';
import useReportLoading from './useReportLoading';

const ReportLoading = () => {
  const {
    sessionState,
    sessionDetails,
    quitTestConfirmed,
    stopSessionClicked,
    secondsElapsed,
    isSessionStopInProgress,
    showGenerateReportPrompt,
    setShowGenerateReportPrompt,
    showQuitTestingPrompt,
    setShowQuitTestingPrompt,
    testDataDescriptionList,
    selectedTipMsg
  } = useReportLoading();

  return (
    <div className="flex w-full flex-col">
      <div className="border-base-300 text-base-500 flex items-center border-b p-4">
        <div className="cursor-pointer text-xl">
          <MdChevronLeft
            onClick={() => {
              if (sessionState === REPORT_LOADING_STATES.RECORDING) {
                setShowQuitTestingPrompt(true);
              }
            }}
          />
        </div>

        <div className="mx-2 text-sm font-medium leading-5">
          {sessionDetails.sessionName}
        </div>
      </div>

      <div className="bg-base-50 flex flex-1">
        <div className="border-base-300 flex flex-col border-r px-2 py-4 sm:w-64 xl:w-[360px]">
          <div
            className={twClassNames('flex flex-col flex-1 px-3 py-4 border-2', {
              'rounded-xl border-danger-600 bg-danger-50':
                sessionState === REPORT_LOADING_STATES.RECORDING,
              'border-transparent':
                sessionState !== REPORT_LOADING_STATES.RECORDING
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
                  'text-base-900':
                    sessionState !== REPORT_LOADING_STATES.RECORDING
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
                  'bg-base-50':
                    sessionState === REPORT_LOADING_STATES.RECORDING,
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

        <div className="flex-1 px-4 py-2">
          {testDataDescriptionList?.length > 0 && (
            <DescriptionList isCard>
              <DescriptionListHeader
                heading={sessionDetails?.sessionName}
                subHeading={sessionDetails?.package?.bundleId}
              />
              <DescriptionListBody>
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  {testDataDescriptionList?.map((item) => (
                    <div
                      className={twClassNames({
                        'sm:col-span-2': item.id > 4,
                        'sm:col-span-1': item.id <= 4
                      })}
                      key={item.id}
                    >
                      <KeyValue
                        label={item.label}
                        value={item.value}
                        valueClassNames="mt-1"
                      />
                    </div>
                  ))}
                </div>
              </DescriptionListBody>
            </DescriptionList>
          )}

          {sessionState !== REPORT_LOADING_STATES.STOPPING &&
            sessionState !== REPORT_LOADING_STATES.COMPLETE && (
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
                  disabled={sessionState !== REPORT_LOADING_STATES.RECORDING}
                >
                  Generate Performance Report
                </Button>
              </div>
            )}

          {(sessionState === REPORT_LOADING_STATES.STOPPING ||
            sessionState === REPORT_LOADING_STATES.COMPLETE) && (
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

      <QuitTestingPrompt
        showQuitTestingPrompt={showQuitTestingPrompt}
        setShowQuitTestingPrompt={setShowQuitTestingPrompt}
        quitTestConfirmed={quitTestConfirmed}
      />
    </div>
  );
};

export default ReportLoading;