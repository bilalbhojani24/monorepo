import React from 'react';
import { MdOutlineExpandMore } from '@browserstack/bifrost';
import { O11yButton, O11yPopover } from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { getCustomTimeStamp } from 'utils/dateTime';

import ViewMetaPopOverItem from './ViewMetaPopOverItem';

function ViewMetaPopOver({ data, handleInteraction }) {
  return (
    <O11yPopover
      theme="light"
      placementSide="bottom"
      arrowWidth={0}
      size="md"
      content={
        // eslint-disable-next-line tailwindcss/no-arbitrary-value
        <div className="divide-base-200 flex max-h-[30rem] w-80 flex-col divide-y overflow-auto px-5">
          {data?.versionControlInfo?.commitId && (
            <ViewMetaPopOverItem
              title="Commit URL"
              text={data.versionControlInfo.commitId.slice(0, 8)}
              link={data.versionControlInfo.url}
            />
          )}
          {data?.ciBuildData?.buildNumber && (
            <ViewMetaPopOverItem
              title="CI Build"
              text={`${data.ciBuildData.name}-${data.ciBuildData.buildNumber}`}
              link={data.ciBuildData.buildUrl}
            />
          )}
          {data?.user && (
            <ViewMetaPopOverItem title="Username" text={data.user} />
          )}
          {data?.startedAt && (
            <ViewMetaPopOverItem
              title="Ran on"
              text={getCustomTimeStamp({ dateString: data.startedAt })}
            />
          )}
          {data?.hostInfo?.hostname && (
            <ViewMetaPopOverItem
              title="Host name"
              text={data.hostInfo.hostname}
            />
          )}{' '}
          {data?.observabilityVersion?.frameworkName && (
            <ViewMetaPopOverItem
              title="Framework"
              text={data.observabilityVersion.frameworkName}
            />
          )}
          {data?.observabilityVersion?.frameworkVersion && (
            <ViewMetaPopOverItem
              title="Framework version"
              text={data.observabilityVersion.frameworkVersion}
            />
          )}
          {data?.observabilityVersion?.sdkVersion && (
            <ViewMetaPopOverItem
              title="SDK version"
              text={data.observabilityVersion.sdkVersion}
            />
          )}
          {data?.uuid && (
            <ViewMetaPopOverItem title="Build UUID" text={data.uuid} showCopy />
          )}
        </div>
      }
    >
      <div>
        <O11yButton
          colors="white"
          iconPlacement="end"
          icon={<MdOutlineExpandMore className="text-xl" />}
          onClick={() => handleInteraction({ interaction: 'viewed_metadata' })}
          type="submit"
          variant="minimal"
          wrapperClassName="font-medium text-sm text-base-700"
        >
          View metadata
        </O11yButton>
      </div>
    </O11yPopover>
  );
}

ViewMetaPopOver.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInteraction: PropTypes.func
};

ViewMetaPopOver.defaultProps = {
  handleInteraction: () => {}
};

export default ViewMetaPopOver;
