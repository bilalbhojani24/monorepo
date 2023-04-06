import React from 'react';
import { MdFolderOpen } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yHyperlink } from 'common/bifrostProxy';
import DetailIcon from 'common/DetailIcon/containers/DetailIcon';
import ScopeLine from 'common/ScopeLine/containers/ScopeLine';
import PropTypes from 'prop-types';
import { capitalize, getOsIconName, getShortOSName } from 'utils/common';
import { getCustomTimeStamp } from 'utils/dateTime';

export default function RootNodeMetaData({
  filePath,
  os,
  browser,
  startedAt,
  vcFileUrl,
  middleScopes,
  device,
  handleClickFileUrl
}) {
  return (
    <div className="mt-1 flex items-center">
      <div
        className={twClassNames('flex items-center', {
          "after:content-[''] after:w-1 after:h-1 after:rounded":
            os?.name || browser?.name || device
        })}
      >
        {device ? (
          <div className="mr-2">
            <DetailIcon
              icon={
                browser?.name
                  ? `icon-${browser.name.toLowerCase()}`
                  : `device_icon`
              }
              text={device}
            />
          </div>
        ) : (
          <>
            {browser?.name && (
              <div className="mr-2">
                <DetailIcon
                  icon={`icon-${browser.name.toLowerCase()}`}
                  text={`${capitalize(browser.name)} ${browser.version}`}
                />
              </div>
            )}
          </>
        )}
        {os?.name && (
          <DetailIcon
            icon={`icon-${getOsIconName(os.name)}`}
            text={`${getShortOSName(os.name)} ${os.version}`}
          />
        )}
      </div>
      <div
        className={twClassNames('flex gap-1 items-center w-[150px]', {
          "after:content-[''] after:w-1 after:h-1 after:rounded":
            !!startedAt || !!middleScopes?.length
        })}
      >
        <MdFolderOpen className="h-8 w-8" />
        {/*  eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          className="overflow-hidden text-ellipsis whitespace-nowrap  text-sm"
          role="button"
          tabIndex="0"
          onClick={(e) => e.stopPropagation()}
        >
          {vcFileUrl && vcFileUrl !== '' ? (
            <O11yHyperlink
              href={vcFileUrl}
              target="_blank"
              className="text-base-600"
              onClick={handleClickFileUrl}
            >
              {filePath}
            </O11yHyperlink>
          ) : (
            <>{filePath}</>
          )}
        </div>
      </div>
      {!!startedAt && (
        <p
          className={twClassNames(
            'text-sm whitespace-nowrap flex items-center',
            {
              "after:content-[''] after:w-1 after:h-1 after:rounded":
                !!middleScopes?.length
            }
          )}
        >
          Last updated {getCustomTimeStamp({ dateString: startedAt })}
        </p>
      )}
      {!!middleScopes?.length && (
        <div className={twClassNames('flex items-center max-w-[300px]')}>
          <ScopeLine scopes={middleScopes} />
        </div>
      )}
    </div>
  );
}

RootNodeMetaData.propTypes = {
  filePath: PropTypes.string.isRequired,
  vcFileUrl: PropTypes.string,
  device: PropTypes.string,
  os: PropTypes.objectOf(PropTypes.any),
  browser: PropTypes.objectOf(PropTypes.any),
  startedAt: PropTypes.string,
  handleClickFileUrl: PropTypes.func,
  middleScopes: PropTypes.arrayOf(PropTypes.string)
};
RootNodeMetaData.defaultProps = {
  startedAt: null,
  device: '',
  os: {
    name: '',
    version: ''
  },
  browser: {
    name: '',
    version: ''
  },
  vcFileUrl: '',
  middleScopes: [],
  handleClickFileUrl: () => {}
};
