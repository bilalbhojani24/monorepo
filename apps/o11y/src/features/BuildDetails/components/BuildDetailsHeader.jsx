/* eslint-disable tailwindcss/no-arbitrary-value */
/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineAutoFixHigh } from '@browserstack/bifrost';
import { O11yBadge, O11yTabs, O11yTooltip } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import StatusBadges from 'common/StatusBadges';
import { DOC_KEY_MAPPING } from 'constants/common';
import { getDocUrl } from 'utils/common';

import { TABS } from '../constants';
import { getBuildMetaData } from '../slices/buildDetailsSlice';
import { getBuildMeta, getBuildUUID } from '../slices/selectors';

const tabsList = Object.keys(TABS).map((key) => ({
  name: TABS[key].name,
  value: key,
  icon: TABS[key].icon
}));

function BuildDetailsHeader() {
  const buildMeta = useSelector(getBuildMeta);
  const dispatch = useDispatch();
  const buildUUID = useSelector(getBuildUUID);
  useEffect(() => {
    if (buildUUID) {
      dispatch(getBuildMetaData({ buildUUID }));
    }
  }, [buildUUID, dispatch]);

  if (buildMeta.isLoading) {
    return (
      <div className="border-base-200 border-b px-8 py-6">
        <O11yLoader loaderClass="text-base-200 fill-base-400 w-8 h-8" />
      </div>
    );
  }

  const {
    isAutoDetectedName,
    originalName,
    name,
    buildNumber,
    tags,
    statusStats
  } = buildMeta.data;

  return (
    <div className="border-base-200 border-b px-8 pt-6">
      <h1 className="text-2xl font-bold leading-7">
        {isAutoDetectedName ? originalName : name}{' '}
        <div className="inline-block">
          {!!buildNumber && `#${buildNumber}`}
          {isAutoDetectedName && (
            <O11yTooltip
              theme="dark"
              placementSide="right"
              content={
                <div className="mx-4">
                  <p className="text-base-300 text-sm leading-5">
                    Static build name automatically detected: {name}
                  </p>
                  <a
                    target="_new"
                    href={getDocUrl({
                      path: DOC_KEY_MAPPING.automation_build
                    })}
                    className="text-base-50 mt-2 block text-sm font-medium leading-5 underline"
                  >
                    Learn More
                  </a>
                </div>
              }
            >
              <MdOutlineAutoFixHigh className="text-base-500 mx-2 inline-block text-xl" />
            </O11yTooltip>
          )}
        </div>
        {tags.map((tag) => (
          <O11yBadge
            wrapperClassName="mx-2 text-sm leading-5 font-medium"
            hasRemoveButton={false}
            modifier="base"
            hasDot={false}
            text={tag}
          />
        ))}
      </h1>
      <div className="-mb-[1px] flex justify-between">
        <O11yTabs
          defaultIndex={0}
          tabsArray={tabsList}
          // onTabChange={onTabChange}
        />
        <StatusBadges statusStats={statusStats} />
      </div>
    </div>
  );
}

export default BuildDetailsHeader;
