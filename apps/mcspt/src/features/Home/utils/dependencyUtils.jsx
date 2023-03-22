import React from 'react';
import { twClassNames } from '@browserstack/utils';
import selectMenuAndroidIcon from 'assets/selectMenuAndroidIcon.png';
import selectMenuIosIcon from 'assets/selectMenuIosIcon.png';

export const generateDeviceOptions = (deviceList) =>
  deviceList.map((device) => ({
    label: (
      <div className="flex items-center">
        <div className="flex">
          <div className="mr-3 h-5 w-5">
            <img
              src={
                device?.os === 'android'
                  ? selectMenuAndroidIcon
                  : selectMenuIosIcon
              }
              alt={device?.os}
            />
          </div>

          <div
            className={twClassNames('mr-1 text-sm font-medium leading-5', {
              'text-base-900': device?.compatible,
              'text-base-400': !device?.compatible
            })}
          >
            {device?.model}
          </div>

          <div
            className={twClassNames('text-sm font-normal leading-5', {
              'text-base-500': device?.compatible,
              'text-base-400': !device?.compatible
            })}
          >
            {`${device?.os} ${device?.osVersion}`}
          </div>
        </div>
      </div>
    ),
    value: device?.deviceId
  }));

export const generateAppOptions = (appList) =>
  appList.map((app) => ({
    label: app?.name,
    value: app?.packageName
  }));

export const getDefaultAutoGenerateName = (selectedDevice, selectedApp) =>
  `${selectedApp?.name} v${selectedApp?.version} on ${selectedDevice?.model} ${selectedDevice?.os} ${selectedDevice?.osVersion}`;

export const INCOMPATIBLE_DEVICE_MSG =
  'Unsupported OS version. Check troubleshooting docs.';
