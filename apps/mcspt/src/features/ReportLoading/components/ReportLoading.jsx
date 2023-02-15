import React from 'react';
import {
  Button,
  MdApps,
  MdClose,
  MdOutlineStopCircle,
  MdPhoneAndroid,
  MdRadioButtonChecked
} from '@browserstack/bifrost';

import { REPORT_LOADING_STATES } from '../const/reportLoadingConstants';

import useReportLoading from './useReportLoading';

const sessionStateMap = {
  [REPORT_LOADING_STATES.CONNECTING]: {
    icon: <MdPhoneAndroid />,
    statusHeading: 'Connecting to the Google Pixel 7 Pro...'
  },
  [REPORT_LOADING_STATES.LAUNCHING]: {
    icon: <MdApps />,
    statusHeading: 'Launching the Wikipedia app...'
  },
  [REPORT_LOADING_STATES.RECORDING]: {
    icon: <MdRadioButtonChecked className="text-danger-600" />,
    statusHeading: 'Performance Data is being Recorded from your device'
  }
};

const ReportLoading = () => {
  const {
    sessionState,
    onCancelClicked,
    stopSessionClicked,
    secondsElapsed,
    convertIntoMinutes
  } = useReportLoading();

  return (
    <div className="flex flex-col">
      <div className="border-base-300 flex items-center justify-between border-b p-5">
        <div className="">
          <div className="text-2xl font-bold leading-8">
            Wikipedia_3.5.3-pixel7-13_01_22
          </div>
          <div className="text-base-500 text-sm font-medium leading-5">
            Testing in Progress
          </div>
        </div>

        {sessionState !== REPORT_LOADING_STATES.RECORDING && (
          <Button
            icon={
              <div className="mr-3">
                <MdClose />
              </div>
            }
            iconPlacement="start"
            size="large"
            colors="white"
            variant="primary"
            onClick={onCancelClicked}
          >
            Cancel
          </Button>
        )}

        {sessionState === REPORT_LOADING_STATES.RECORDING && (
          <div className="bg-danger-50 flex items-center rounded-md p-2">
            <div className="text-danger-900 mr-10 ml-4 text-3xl font-semibold leading-9">
              {convertIntoMinutes(secondsElapsed)}
            </div>

            <Button
              icon={
                <div className="mr-3">
                  <MdOutlineStopCircle />
                </div>
              }
              iconPlacement="start"
              size="large"
              colors="danger"
              variant="primary"
              onClick={stopSessionClicked}
            >
              Stop Test
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-9">
        <div className="mb-16 flex items-center">
          <div className="text-base-500 mr-3 text-4xl">
            {sessionStateMap?.[sessionState]?.icon}
          </div>

          <div className="">
            <div className="text-2xl font-bold leading-8">
              {sessionStateMap?.[sessionState]?.statusHeading}
            </div>
            <div className="text-base-700 text-xl font-medium leading-7">
              Please ensure that the device is connected & unlocked
            </div>
          </div>
        </div>

        <div className="border-base-300 mb-4 flex items-center rounded-lg border p-6">
          <div className="bg-brand-500 mr-5 flex h-12 w-12 items-center justify-center rounded-md text-2xl text-white">
            <MdPhoneAndroid />
          </div>

          <div className="">
            <div className="text-2xl font-semibold leading-8">
              Google Pixel 7 Pro
            </div>
            <div className="text-base-500 text-sm font-medium leading-5">
              Android 13
            </div>
          </div>
        </div>

        <div className="border-base-300 mb-4 flex items-center rounded-lg border p-6">
          <div className="bg-brand-500 mr-5 flex h-12 w-12 items-center justify-center rounded-md text-2xl text-white">
            <MdApps />
          </div>

          <div className="">
            <div className="text-2xl font-semibold leading-8">
              Wikipedia v2.0.3
            </div>
            <div className="text-base-500 text-sm font-medium leading-5">
              Application
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportLoading;
