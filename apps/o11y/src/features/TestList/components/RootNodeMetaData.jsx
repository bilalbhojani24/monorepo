import React from 'react';
import { Hyperlink, MdFolderOpen } from '@browserstack/bifrost';
import classNames from 'classnames';
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
        className={classNames('to-root-metadata__deviceData', {
          'to-root-metadata__dot': os?.name || browser?.name || device
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
        className={classNames('detail-icon', {
          'to-root-metadata__dot': !!startedAt || !!middleScopes?.length
        })}
      >
        <MdFolderOpen className="h-6 w-6" />
        {/*  eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          className="text-sm"
          role="button"
          tabIndex="0"
          onClick={(e) => e.stopPropagation()}
        >
          {vcFileUrl && vcFileUrl !== '' ? (
            <Hyperlink
              href={vcFileUrl}
              target="_blank"
              modifier="default"
              linkWeight="regular"
              wrapperClassName="to-anchor"
              onClick={handleClickFileUrl}
            >
              {filePath}
            </Hyperlink>
          ) : (
            <>{filePath}</>
          )}
        </div>
      </div>
      {!!startedAt && (
        <p
          className={classNames('to-root-metadata__lastUpdated', {
            'to-root-metadata__dot': !!middleScopes?.length
          })}
        >
          Last updated {getCustomTimeStamp({ dateString: startedAt })}
        </p>
      )}
      {!!middleScopes?.length && (
        <div className={classNames('to-root-metadata__scope')}>
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
