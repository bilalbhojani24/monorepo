import React from 'react';
import { MdOutlineExpandMore, Popover } from '@browserstack/bifrost';
import PropTypes from 'prop-types';
import { getCustomTimeStamp } from 'utils/dateTime';

import { A11yButton } from '../../../../../common/MinimalDropdown/A11yButton';
import ViewMetaPopOverItem from '../../../../../common/MinimalDropdown/ViewMetaPopOverItem';

function ViewMetaPopOver({ data, handleInteraction }) {
  return (
    <Popover
      theme="light"
      placementSide="bottom"
      arrowWidth={0}
      size="md"
      content={
        // eslint-disable-next-line tailwindcss/no-arbitrary-value
        <div className="divide-base-200 flex max-h-[30rem] w-80 flex-col divide-y overflow-auto px-5">
          {data?.wcagVersion && (
            <ViewMetaPopOverItem title="WCAG version" text={data.wcagVersion} />
          )}
          {data?.buildId && (
            <ViewMetaPopOverItem title="Build ID" text={data.buildId} />
          )}
          {data?.createdBy.name && (
            <ViewMetaPopOverItem title="User" text={data.createdBy.name} />
          )}
          {data?.createdAt && (
            <ViewMetaPopOverItem
              title="Ran on"
              text={getCustomTimeStamp({ dateString: data.createdAt })}
            />
          )}
          {data?.hostInfo?.hostname && (
            <ViewMetaPopOverItem
              title="Host name"
              text={data.hostInfo.hostname}
            />
          )}{' '}
          {data?.sessionData.framework && (
            <ViewMetaPopOverItem
              title="Framework"
              text={`${data.sessionData.framework.name} ${data.sessionData.framework.version}`}
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
        <A11yButton
          colors="white"
          iconPlacement="end"
          icon={<MdOutlineExpandMore className="text-xl" />}
          onClick={() => handleInteraction({ interaction: 'viewed_metadata' })}
          type="submit"
          variant="minimal"
          wrapperClassName="font-medium text-sm text-base-700"
        >
          View metadata
        </A11yButton>
      </div>
    </Popover>
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
