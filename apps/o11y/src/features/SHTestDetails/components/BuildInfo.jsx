import React from 'react';
import {
  MdOutlineAccessTime,
  MdOutlineAutoFixHigh
} from '@browserstack/bifrost';
import { O11yBadge, O11yMetaData, O11yTooltip } from 'common/bifrostProxy';
import DetailIcon from 'common/DetailIcon';
import { DOC_KEY_MAPPING } from 'constants/common';
import PropTypes from 'prop-types';
import {
  capitalize,
  getDocUrl,
  getOsIconName,
  getShortOSName
} from 'utils/common';
import { getCustomTimeStamp } from 'utils/dateTime';

const BuildInfo = ({ buildDetails }) => (
  <div className="flex flex-col gap-1">
    <div className="flex gap-2">
      <p className="text-base-900 text-sm font-medium leading-5">
        {buildDetails?.isAutoDetectedName
          ? buildDetails?.originalName
          : buildDetails?.name}
      </p>

      {buildDetails.isAutoDetectedName && (
        <O11yTooltip
          placementSide="right"
          theme="dark"
          content={
            <div className="mx-4">
              <p className="text-base-300">
                Static build name automatically detected:
                {buildDetails.name}
              </p>
              <a
                target="_new"
                href={getDocUrl({
                  path: DOC_KEY_MAPPING.automation_build
                })}
                className="text-base-50 mt-2 block underline"
              >
                Learn More
              </a>
            </div>
          }
        >
          <MdOutlineAutoFixHigh className="text-base-500 inline-block" />
        </O11yTooltip>
      )}
      <div className="flex gap-1">
        {buildDetails?.tags?.map((tag) => (
          <O11yBadge key={tag} text={tag} />
        ))}
      </div>
    </div>
    <div className="flex gap-2">
      {(buildDetails?.os?.name ||
        buildDetails?.device ||
        buildDetails?.browser?.name) && (
        <div className="flex flex-wrap gap-3">
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
              icon={
                buildDetails?.browser?.name
                  ? `icon-${buildDetails?.browser?.name.toLowerCase()}`
                  : 'device_icon'
              }
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
        <O11yMetaData
          metaDescription={`${getCustomTimeStamp({
            dateString: buildDetails.startedAt
          })}`}
          icon={<MdOutlineAccessTime className="text-base-400 h-4 w-4" />}
          // metaTitle="Started at"
          textColorClass="text-base-500"
        />
      )}
    </div>
  </div>
);

BuildInfo.propTypes = {
  buildDetails: PropTypes.objectOf(PropTypes.any).isRequired
};

export default BuildInfo;
