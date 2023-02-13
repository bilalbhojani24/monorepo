import React from 'react';
import {
  Button,
  InputField,
  InputWButton,
  MdApps,
  MdClose,
  MdPhoneAndroid
} from '@browserstack/bifrost';

import useConfirmStartTesting from './useConfirmStartTesting';

export default function ConfirmStartTesting({ setShowNewSessionModal }) {
  const { selectedDevice, selectedApp, navigateToStep, startTestSession } =
    useConfirmStartTesting();

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-base-300 border-b py-5 px-4">
        <div className="flex justify-between">
          <div className="text-xl font-bold">Start Testing</div>
          <div className="text-base-600 text-2xl">
            <MdClose
              onClick={() => {
                setShowNewSessionModal((value) => !value);
              }}
            />
          </div>
        </div>

        <div className="text-base-500 mt-1">
          Confirm Details & Start Testing
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-8">
          <InputField
            id="testName"
            label="Test Name"
            placeholder="Enter Test Name"
            value="Wikipedia-v2.0.3-Google-Pixel-7-Pro-13_01_2022-15_42_21"
          />
        </div>

        <div className="mb-8">
          <InputWButton
            id="deviceIdentifier"
            label="Device"
            buttonElement={
              <div className="flex items-center">
                <div className="mr-2 text-xl">
                  <MdPhoneAndroid />
                </div>
                <div className="text-base font-medium leading-6">Change</div>
              </div>
            }
            onButtonClick={() => {
              navigateToStep(1);
            }}
            value={selectedDevice?.model}
            readOnly
          />
        </div>

        <div className="mb-8">
          <InputWButton
            id="applicationIdentifier"
            label="Application"
            buttonElement={
              <div className="flex items-center">
                <div className="mr-2 text-xl">
                  <MdApps />
                </div>
                <div className="text-base font-medium leading-6">Change</div>
              </div>
            }
            onButtonClick={() => {
              navigateToStep(2);
            }}
            value={`${selectedApp?.name}-v${selectedApp?.version}`}
            readOnly
          />
        </div>
      </div>

      <div className="border-base-200 bottom-0 flex w-full justify-between border-t bg-white p-3">
        <Button
          size="large"
          colors="white"
          variant="primary"
          onClick={() => {
            navigateToStep(2);
          }}
        >
          Back
        </Button>

        <Button
          size="large"
          colors="brand"
          variant="primary"
          onClick={startTestSession}
        >
          Start Testing
        </Button>
      </div>
    </div>
  );
}
