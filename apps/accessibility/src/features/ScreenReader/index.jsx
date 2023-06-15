import React from 'react';
import { Tooltip, TooltipBody } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import AndroidImage from 'assets/android_icon.svg';
import MacImage from 'assets/mac_icon.svg';
import WindowsImage from 'assets/windows_icon.svg';
import ReverseTrialAlertWrapper from 'common/ReverseTrialAlertWrapper';
import {
  SCREEN_READER_DEVICE_TITLES,
  SCREEN_READER_DEVICE_TYPE,
  SCREEN_READER_HEADER_TITLES,
  TRIAL_IN_PROGRESS
} from 'constants';
import PropTypes from 'prop-types';
import { handleClickByEnterOrSpace } from 'utils/helper';

import useScreenReader from './useScreenReader';

function ScreenReaderSection({ title, devices }) {
  const { handleCardClick, showTooltip, trialState, handlePointerDownOutside } =
    useScreenReader(devices.length);

  const getImage = (os) => {
    if (os === SCREEN_READER_DEVICE_TYPE.ANDROID) return AndroidImage;
    if (os === SCREEN_READER_DEVICE_TYPE.WINDOWS) return WindowsImage;
    return MacImage;
  };

  console.log({ showTooltip, trialState });

  return (
    <div className="mb-4 pl-6">
      <div className="mb-4 flex items-center">
        <p className="text-base-900 text-xs font-medium">{title}</p>
        <div
          className="border-base-200 ml-4 border-b"
          style={{ minWidth: '530px' }}
        />
      </div>
      <div className="flex">
        {devices.map((item, index) => (
          <Tooltip
            show={showTooltip[index] && trialState === TRIAL_IN_PROGRESS}
            placementAlign="end"
            placementSide="bottom"
            arrowPadding={-10}
            content={
              <TooltipBody>
                Please wait. Your free trial is being processed..
              </TooltipBody>
            }
            theme="dark"
            onPointerDownOutside={handlePointerDownOutside}
          >
            <div
              key={`${item.deviceDisplayName || item.osDisplayName}${
                item.browserDisplayName
              }`}
              className="border-base-300 focus-within:ring-brand-500 hover:border-base-400 relative mr-4 flex w-80 items-center space-x-3 rounded-lg border bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-offset-2"
            >
              <div className="shrink-0">
                <img
                  className="h-10 w-10"
                  src={getImage(item.startParams.os)}
                  alt={`${item.osDisplayName} logo`}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCardClick(item.startParams, index)}
                  aria-label={`Open screen reader in ${
                    item.deviceDisplayName || item.osDisplayName
                  }${item.browserDisplayName}`}
                  onKeyDown={(e) =>
                    handleClickByEnterOrSpace(e, () =>
                      handleCardClick(item.startParams, index)
                    )
                  }
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-base-900 text-sm font-medium">
                    {item.deviceDisplayName || item.osDisplayName}
                  </p>
                  <p className="text-base-500 truncate text-sm">
                    {item.browserDisplayName}
                  </p>
                </div>
              </div>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

function ScreenReader() {
  const { deviceCombinations, showAlert } = useScreenReader();

  const shouldShowData = Object.keys(deviceCombinations).some(
    (key) => deviceCombinations[key].length > 0
  );

  return (
    <div className="bg-base-50 h-screen">
      {shouldShowData ? (
        <>
          <div className="p-6">
            <p className="text-base-900 mb-2 text-2xl font-bold">
              {SCREEN_READER_HEADER_TITLES.TITLE}{' '}
            </p>
            <p className="text-base-500 text-sm font-medium">
              {SCREEN_READER_HEADER_TITLES.SUB_TITLE}
            </p>
          </div>
          <div
            className={twClassNames({
              'px-6 pb-6': showAlert,
              'w-[720px]': showAlert
            })}
          >
            <ReverseTrialAlertWrapper />
          </div>
          <ScreenReaderSection
            title={SCREEN_READER_DEVICE_TITLES.MAC}
            devices={deviceCombinations.mac}
          />
          <ScreenReaderSection
            title={SCREEN_READER_DEVICE_TITLES.WINDOWS}
            devices={deviceCombinations.windows}
          />
          <ScreenReaderSection
            title={SCREEN_READER_DEVICE_TITLES.ANDROID}
            devices={deviceCombinations.android}
          />
        </>
      ) : null}
    </div>
  );
}

ScreenReaderSection.propTypes = {
  title: PropTypes.string.isRequired,
  devices: PropTypes.instanceOf(Array).isRequired
};

export default ScreenReader;
