import React from 'react';
import {
  Button,
  MdAndroid,
  MdClose,
  MdHourglassEmpty,
  Radio
} from '@browserstack/bifrost';

import { twClassNames } from '../../../utils/tailwindUtils';

import useSelectDeviceStep from './useSelectDeviceStep';

export default function NewPerformanceSessionModal({ setShowNewSessionModal }) {
  const {
    areDevicesStillLoading,
    listOfDevices,
    selectedDevice,
    deviceSelected,
    navigateToNext
  } = useSelectDeviceStep();

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-base-300 border-b py-5 px-4">
        <div className="flex justify-between">
          <div className="text-xl font-bold">Select a device</div>
          <div className="text-base-600 text-2xl">
            <MdClose
              onClick={() => {
                setShowNewSessionModal((value) => !value);
              }}
            />
          </div>
        </div>
        <div className="text-base-500 mt-1">Select a device to test on</div>
      </div>

      {!!areDevicesStillLoading && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="bg-base-100 text-base-600 flex h-12 w-12 items-center justify-center rounded-full text-2xl">
            <MdHourglassEmpty />
          </div>

          <div className="mt-6 text-lg font-medium">
            Devices you connect will appear here
          </div>

          <div className="text-base-500 mt-1">
            Connect a device with a USB cable to start testing
          </div>
        </div>
      )}

      {!areDevicesStillLoading && (
        <div className="relative flex flex-1 flex-col">
          <div className="flex flex-1 flex-col p-4">
            {listOfDevices.map((x) => (
              <div
                className={twClassNames(
                  ' mb-2.5 flex items-center justify-between rounded border p-4',
                  {
                    'border-base-200': x.deviceId !== selectedDevice?.deviceId,
                    'border-brand-200 bg-brand-50':
                      x.deviceId === selectedDevice?.deviceId
                  }
                )}
                key={x.deviceId}
                role="presentation"
                onClick={() => {
                  deviceSelected(x);
                }}
              >
                <Radio
                  id={`radio-${x.deviceId}`}
                  name={x.model}
                  description={null}
                  checked={x.deviceId === selectedDevice?.deviceId}
                />

                <div
                  className={twClassNames('flex items-center', {
                    'text-base-500': x.deviceId !== selectedDevice?.deviceId,
                    'text-brand-600': x.deviceId === selectedDevice?.deviceId
                  })}
                >
                  <div className="mr-2 text-lg">
                    <MdAndroid />
                  </div>

                  <div className="text-sm font-normal leading-5">{x.os}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-base-200 absolute bottom-0 flex w-full border-t p-3">
            <Button
              wrapperClassName="ml-auto"
              size="large"
              colors="brand"
              variant="primary"
              onClick={navigateToNext}
              disabled={!selectedDevice}
            >
              Test With Selected Device
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
