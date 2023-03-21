/* eslint-disable tailwindcss/no-arbitrary-value */
/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Hyperlink,
  MdCancel,
  MdCheckCircle,
  MdContactSupport,
  MdOutlineAutoFixHigh,
  MdOutlineTimer,
  MdPerson,
  MdRemoveCircle,
  MdSchedule
} from '@browserstack/bifrost';
import {
  O11yBadge,
  O11yMetaData,
  O11yTabs,
  O11yTooltip
} from 'common/bifrostProxy';
import CiIcon from 'common/CiIcon';
import O11yLoader from 'common/O11yLoader';
import StatusBadges from 'common/StatusBadges';
import VCIcon from 'common/VCIcon';
import ViewMetaPopOver from 'common/ViewMetaPopOver';
import { DOC_KEY_MAPPING, TEST_STATUS } from 'constants/common';
import isEmpty from 'lodash/isEmpty';
import { getBuildMarkedStatus, getDocUrl } from 'utils/common';
import { getCustomTimeStamp, milliSecondsToTime } from 'utils/dateTime';

import { TABS } from '../constants';
import {
  clearBuildMeta,
  getBuildMetaData,
  setActiveTab
} from '../slices/buildDetailsSlice';
import {
  getBuildDetailsActiveTab,
  getBuildMeta,
  getBuildUUID
} from '../slices/selectors';

const tabsList = Object.keys(TABS).map((key) => ({
  name: TABS[key].name,
  value: TABS[key].id,
  icon: TABS[key].icon
}));

function BuildDetailsHeader() {
  const getActiveTab = useSelector(getBuildDetailsActiveTab);
  const navigate = useNavigate();
  const buildMeta = useSelector(getBuildMeta);
  const dispatch = useDispatch();
  const buildUUID = useSelector(getBuildUUID);
  useEffect(() => {
    if (buildUUID) {
      dispatch(getBuildMetaData({ buildUUID }));
    }
    return () => {
      dispatch(clearBuildMeta());
    };
  }, [buildUUID, dispatch]);

  const onTabChange = (tabInfo) => {
    const searchParams = new URLSearchParams(window?.location?.search);
    const activeIndex = Object.keys(TABS).findIndex(
      (item) => item === tabInfo.value
    );
    dispatch(
      setActiveTab({
        id: tabInfo.value,
        idx: activeIndex
      })
    );
    searchParams.set('tab', tabInfo.value);
    navigate({ search: searchParams.toString() });
  };

  if (buildMeta.isLoading && isEmpty(buildMeta.data)) {
    return (
      <div className="border-base-200 border-b px-8 py-6">
        <O11yLoader />
      </div>
    );
  }

  const renderStatusIcon = () => {
    const status = getBuildMarkedStatus(
      buildMeta.data.status,
      buildMeta.data.statusStats
    );
    if (TEST_STATUS.PENDING === status) {
      return (
        <O11yMetaData
          icon={<O11yLoader loaderClass="text-brand-600 h-4 w-4" />}
          metaDescription="Running"
          textColorClass="text-brand-600"
        />
      );
    }
    if (TEST_STATUS.FAIL === status)
      return (
        <O11yMetaData
          icon={<MdCancel className="h-5 w-5" />}
          metaDescription="Failed"
          textColorClass="text-danger-600"
        />
      );
    if (TEST_STATUS.PASS === status)
      return (
        <O11yMetaData
          icon={<MdCheckCircle className="h-5 w-5" />}
          metaDescription="Passed"
          textColorClass="text-success-600"
        />
      );
    if (TEST_STATUS.UNKNOWN === status)
      return (
        <O11yMetaData
          icon={<MdContactSupport className="h-5 w-5" />}
          metaDescription="Unknown"
          textColorClass="text-attention-500"
        />
      );
    if (TEST_STATUS.SKIPPED === status)
      return (
        <O11yMetaData
          icon={<MdRemoveCircle className="h-5 w-5" />}
          metaDescription="Skipped"
          textColorClass="text-base-500"
        />
      );
    return (
      <O11yMetaData
        icon={<MdContactSupport className="h-5 w-5" />}
        metaDescription="Unknown"
        textColorClass="text-attention-500"
      />
    );
  };

  const {
    isAutoDetectedName,
    originalName,
    name,
    buildNumber,
    tags,
    statusStats,
    user,
    startedAt,
    versionControlInfo,
    ciBuildData,
    duration
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
        {tags?.map((tag) => (
          <O11yBadge
            key={tag}
            wrapperClassName="mx-2 text-sm leading-5 font-medium"
            hasRemoveButton={false}
            modifier="base"
            hasDot={false}
            text={tag}
          />
        ))}
      </h1>
      <div className="mt-2 flex flex-wrap items-center gap-4">
        {renderStatusIcon()}
        <O11yMetaData
          icon={<MdPerson className="h-5 w-5" />}
          metaDescription={user}
          textColorClass="text-base-500"
        />
        {startedAt && (
          <O11yMetaData
            icon={<MdSchedule className="h-5 w-5" />}
            metaDescription={getCustomTimeStamp({
              dateString: new Date(startedAt)
            })}
            textColorClass="text-base-500"
          />
        )}
        {versionControlInfo?.commitId && (
          <Hyperlink href={versionControlInfo?.url}>
            <O11yMetaData
              icon={
                <VCIcon
                  url={versionControlInfo?.url}
                  iconProps={{ className: 'h-5 w-5' }}
                />
              }
              metaDescription={versionControlInfo.commitId.slice(0, 8)}
              textColorClass="text-base-500 hover:text-brand-700"
            />
          </Hyperlink>
        )}
        {ciBuildData?.buildNumber && (
          <O11yTooltip
            theme="dark"
            placementSide="bottom"
            wrapperClassName="py-2"
            content={
              <>
                {ciBuildData?.jobName ? (
                  <div className="mx-4">
                    <p className="text-base-300 text-sm">
                      Job name: {ciBuildData.jobName}
                    </p>
                  </div>
                ) : null}
              </>
            }
          >
            <Hyperlink href={versionControlInfo?.url}>
              <O11yMetaData
                icon={
                  <CiIcon
                    name={ciBuildData?.name}
                    iconProps={{ className: 'h-5 w-5' }}
                  />
                }
                metaDescription={`CI build ${ciBuildData?.buildNumber}`}
                textColorClass="text-base-500 hover:text-brand-700"
              />
            </Hyperlink>
          </O11yTooltip>
        )}
        {duration && (
          <O11yMetaData
            icon={<MdOutlineTimer className="h-5 w-5" />}
            metaDescription={milliSecondsToTime(duration)}
            textColorClass="text-base-500"
          />
        )}
        <ViewMetaPopOver data={buildMeta.data || {}} />
      </div>
      <div className="-mb-[1px] flex justify-between">
        <O11yTabs
          defaultIndex={getActiveTab.idx}
          tabsArray={tabsList}
          onTabChange={onTabChange}
        />
        <StatusBadges statusStats={statusStats} />
      </div>
    </div>
  );
}

export default BuildDetailsHeader;
