import React from 'react';
import { O11yBadge } from 'common/bifrostProxy';
import DetailIcon from 'common/DetailIcon';
import PropTypes from 'prop-types';
import {
  capitalize,
  getIconName,
  getOsIconName,
  getShortOSName
} from 'utils/common';

export default function SnPPlatforms({ platforms, browsers }) {
  const browsersPlatforms = [...platforms, ...browsers];

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

  if (!browsersPlatforms?.length) {
    return <span className="ml-1">-</span>;
  }

  if (browsersPlatforms?.length === 1) {
    const item = browsersPlatforms[0];
    return (
      <div className="flex">
        <DetailIcon icon={getIcon(item)} text={getText(item)} />
      </div>
    );
  }
  if (browsersPlatforms?.length > 2) {
    const itemsToShow = browsersPlatforms.slice(0, 2);
    return (
      <div className="flex flex-wrap gap-2">
        {itemsToShow?.map((item) => (
          <DetailIcon
            icon={getIcon(item)}
            text={getText(item)}
            key={`${item.name}-${item.version}`}
          />
        ))}
        <O11yBadge
          text={`${browsersPlatforms.length - 2} more platform${
            browsersPlatforms.length - 2 === 1 ? '' : 's'
          }`}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {browsersPlatforms?.map((item) => (
        <DetailIcon
          icon={getIcon(item)}
          text={getText(item)}
          key={`${item.name}-${item.version}`}
        />
      ))}
    </div>
  );
}

SnPPlatforms.propTypes = {
  platforms: PropTypes.arrayOf(PropTypes.object),
  browsers: PropTypes.arrayOf(PropTypes.object)
};
SnPPlatforms.defaultProps = {
  platforms: [],
  browsers: []
};
