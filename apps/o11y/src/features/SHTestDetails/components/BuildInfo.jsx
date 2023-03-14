import React from 'react';
import DetailIcon from 'common/DetailIcon';
import PropTypes from 'prop-types';
import {
  capitalize,
  getIconName,
  getOsIconName,
  getShortOSName
} from 'utils/common';

const BuildInfo = ({ buildDetails }) => (
  <div>
    <div className="">
      <p className="text-base-900 text-sm font-medium leading-5">
        {buildDetails?.isAutoDetectedName
          ? buildDetails?.originalName
          : buildDetails?.name}
      </p>
      {buildDetails?.isAutoDetectedName && (
        // <BuildDerivedNameTooltip derivedName={buildDetails?.name} />
        <span>tooltip</span>
      )}
    </div>
    <div className="flex gap-2">
      {(buildDetails?.os?.name ||
        buildDetails?.device ||
        buildDetails?.browser?.name) && (
        <div className="flex gap-3">
          {buildDetails?.os?.name && (
            <DetailIcon
              icon={`icon-${getOsIconName(buildDetails?.os.name)}`}
              text={`${getShortOSName(buildDetails?.os.name)} ${
                buildDetails?.os?.version
              }`}
            />
          )}
          {buildDetails?.device ? (
            <DetailIcon
              icon={getIconName(buildDetails?.browser?.name)}
              text={buildDetails?.device}
            />
          ) : (
            <>
              {buildDetails?.browser?.name && (
                <DetailIcon
                  icon={`icon-${buildDetails?.browser?.name.toLowerCase()}`}
                  text={`${capitalize(buildDetails?.browser?.name)} ${
                    buildDetails?.browser?.version
                  }`}
                />
              )}
            </>
          )}
        </div>
      )}
      {!!buildDetails?.startedAt && (
        // <MetabuildDetails
        //   label={`${getCustomTimeStamp({
        //     dateString: buildDetails.startedAt
        //   })}`}
        //   icon={<AccessTimeIcon />}
        //   title="Started at"
        //   hasDot={false}
        // />
        <span>meta info</span>
      )}
    </div>
  </div>
);

BuildInfo.propTypes = {
  buildDetails: PropTypes.objectOf(PropTypes.any).isRequired
};

export default BuildInfo;
