import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { O11yBadge, O11yTooltip } from 'common/bifrostProxy';
import DetailIcon from 'common/DetailIcon';
import PropTypes from 'prop-types';
import {
  capitalize,
  getIconName,
  getOsIconName,
  getShortOSName
} from 'utils/common';

const getIcon = (item) => {
  if (item?.device || item?.device === '') {
    return getIconName(item?.name, item?.device?.name || item?.device);
  }
  return `icon-${getOsIconName(item.name)}`;
};

const getText = (item) => {
  if (item?.device || item?.device === '') {
    return item.device
      ? item.device
      : `${capitalize(item.name)} ${item.version}`;
  }
  return `${getShortOSName(item.name)} ${item.version}`;
};

const RestPlatformsAndBrowsers = ({ browsersPlatforms }) => (
  <div className="flex flex-col gap-2">
    {browsersPlatforms?.map((item) => (
      <DetailIcon
        icon={getIcon(item)}
        text={getText(item)}
        key={`${item.name}-${item.version}`}
      />
    ))}
  </div>
);

RestPlatformsAndBrowsers.propTypes = {
  browsersPlatforms: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default function SnPPlatforms({
  platforms,
  browsers,
  onViewMoreClick,
  wrapperClassName
}) {
  const browsersPlatforms = [...platforms, ...browsers];

  if (!browsersPlatforms?.length) {
    return (
      <span className={twClassNames('ml-1 text-center', wrapperClassName)}>
        -
      </span>
    );
  }

  if (browsersPlatforms?.length === 1) {
    const item = browsersPlatforms[0];
    return (
      <div
        className={twClassNames(
          'flex items-center justify-center',
          wrapperClassName
        )}
      >
        <DetailIcon
          icon={getIcon(item)}
          text={getText(item)}
          openTextInTooltip
        />
      </div>
    );
  }
  if (browsersPlatforms?.length > 2) {
    const itemsToShow = browsersPlatforms.slice(0, 2);
    return (
      <div
        className={twClassNames(
          'flex flex-wrap items-center justify-center gap-2',
          wrapperClassName
        )}
      >
        {itemsToShow?.map((item) => (
          <DetailIcon
            icon={getIcon(item)}
            text={getText(item)}
            key={`${item.name}-${item.version}`}
            openTextInTooltip
          />
        ))}
        <O11yTooltip
          placementSide="top"
          placementAlign="center"
          wrapperClassName="p-3"
          content={
            <RestPlatformsAndBrowsers
              browsersPlatforms={browsersPlatforms.slice(2)}
            />
          }
        >
          <O11yBadge
            text={`+${browsersPlatforms.length - 2}`}
            onClick={onViewMoreClick}
          />
        </O11yTooltip>
      </div>
    );
  }
  return (
    <div
      className={twClassNames(
        'flex flex-wrap items-center justify-center gap-2',
        wrapperClassName
      )}
    >
      {browsersPlatforms?.map((item) => (
        <DetailIcon
          icon={getIcon(item)}
          text={getText(item)}
          openTextInTooltip
          key={`${item.name}-${item.version}`}
        />
      ))}
    </div>
  );
}

SnPPlatforms.propTypes = {
  platforms: PropTypes.arrayOf(PropTypes.object),
  browsers: PropTypes.arrayOf(PropTypes.object),
  onViewMoreClick: PropTypes.func.isRequired,
  wrapperClassName: PropTypes.string
};
SnPPlatforms.defaultProps = {
  platforms: [],
  browsers: [],
  wrapperClassName: ''
};
