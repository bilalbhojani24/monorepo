/* eslint-disable tailwindcss/no-arbitrary-value */
/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Hyperlink, MdOutlineAutoFixHigh } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yBadge, O11yTabs, O11yTooltip } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import StatusBadges from 'common/StatusBadges';
import { DOC_KEY_MAPPING } from 'constants/common';
import {
  ADV_FILTER_OPERATIONS,
  ADV_FILTER_TYPES,
  FILTER_OPERATION_TYPE
} from 'features/FilterSkeleton/constants';
import { setAppliedFilter } from 'features/FilterSkeleton/slices/filterSlice';
import { hideIntegrationsWidget } from 'features/IntegrationsWidget/utils';
import { getActiveProject, getHeaderSize } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { getDocUrl, logOllyEvent } from 'utils/common';

import { TABS } from '../constants';
import {
  getBuildMetaData,
  resetBuildMeta,
  setActiveTab
} from '../slices/buildDetailsSlice';
import {
  getBuildDetailsActiveTab,
  getBuildMeta,
  getBuildUUID
} from '../slices/selectors';

import BuildMetaActions from './BuildMetaActions';
import BuildMetaData from './BuildMetaData';

const tabsList = Object.keys(TABS).map((key) => ({
  name: TABS[key].name,
  value: TABS[key].id,
  icon: TABS[key].icon
}));

function BuildDetailsHeader({
  updateCount,
  onUpdateBtnClick,
  isNewItemLoading,
  applyTestListFilter
}) {
  const headerSize = useSelector(getHeaderSize);
  const getActiveTab = useSelector(getBuildDetailsActiveTab);
  const navigate = useNavigate();
  const buildMeta = useSelector(getBuildMeta);
  const dispatch = useDispatch();
  const buildUUID = useSelector(getBuildUUID);
  const activeProject = useSelector(getActiveProject);

  const logMetaInteractionEvent = (interaction, addOns = {}) => {
    logOllyEvent({
      event: 'O11yBuildMetaHeaderInteracted',
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id,
        build_name: buildMeta.data?.name,
        build_uuid: buildMeta.data?.uuid,
        interaction,
        ...addOns
      }
    });
  };

  useEffect(() => {
    if (buildUUID) {
      dispatch(getBuildMetaData({ buildUUID }));
    }
    return () => {
      dispatch(resetBuildMeta());
    };
  }, [buildUUID, dispatch]);

  const onTabChange = (tabInfo) => {
    const searchParams = new URLSearchParams();
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
    logMetaInteractionEvent('tab_changed', {
      active: tabInfo.value
    });
    dispatch(hideIntegrationsWidget());
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  const handleClickStatusBadge = ({ itemClicked }) => {
    logMetaInteractionEvent(`${itemClicked}_clicked`);
    const searchParams = new URLSearchParams(window?.location?.search);
    searchParams.set('status', itemClicked);
    if (searchParams.get('tab') === 'tests') {
      // apply directly
      dispatch(
        setAppliedFilter({
          type: ADV_FILTER_TYPES.status.key,
          id: `${ADV_FILTER_TYPES.status.key}:${itemClicked}`,
          text: itemClicked,
          value: itemClicked,
          operationType: FILTER_OPERATION_TYPE.ADD_OPERATION,
          customOperation: ADV_FILTER_OPERATIONS.REPLACE_BY_TYPE
        })
      );
    } else {
      applyTestListFilter({
        query: searchParams.toString()
      });
    }
  };

  if (buildMeta.isLoading && isEmpty(buildMeta.data)) {
    return (
      <div className="border-base-200 border-b px-8 py-6">
        <O11yLoader />
      </div>
    );
  }

  const {
    isAutoDetectedName,
    originalName,
    name,
    buildNumber,
    tags,
    statusStats,
    isArchived
  } = buildMeta.data;

  return (
    <div
      className={twClassNames(
        'border-base-200 bg-base-50 sticky top-16 z-10 px-6 pt-6',
        {
          'border-b': !(
            buildMeta?.data?.buildError?.message ||
            buildMeta?.data?.isParsingReport
          )
        }
      )}
      style={{
        top: `${headerSize}px`
      }}
    >
      <div className="flex">
        <section className="flex flex-1 flex-col">
          <h1 className="w-full text-2xl font-bold leading-7">
            {isArchived ? '(Archived) ' : ''}
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
                      <Hyperlink
                        target="_blank"
                        href={getDocUrl({
                          path: DOC_KEY_MAPPING.automation_build
                        })}
                        className="text-base-50 mt-2 block text-sm font-medium leading-5 underline"
                      >
                        Learn More
                      </Hyperlink>
                    </div>
                  }
                >
                  <MdOutlineAutoFixHigh
                    className="text-base-500 mx-2 inline-block text-xl"
                    onMouseEnter={() => {
                      logMetaInteractionEvent('auto_detect_hovered');
                    }}
                  />
                </O11yTooltip>
              )}
            </div>
            {tags?.map((tag) => (
              <O11yBadge
                key={tag}
                wrapperClassName="mx-2 text-sm leading-5 font-medium bg-base-200"
                hasRemoveButton={false}
                modifier="base"
                hasDot={false}
                text={tag}
              />
            ))}
          </h1>
          <BuildMetaData
            logMetaInteractionEvent={logMetaInteractionEvent}
            wrapperClassName="mt-2"
          />
        </section>
        <div className="flex shrink-0 flex-col items-end justify-between pb-4">
          <BuildMetaActions
            isNewItemLoading={isNewItemLoading}
            onUpdateBtnClick={onUpdateBtnClick}
            updateCount={updateCount}
            buildData={buildMeta.data}
          />
        </div>
      </div>
      {!(
        buildMeta?.data?.buildError?.message || buildMeta?.data?.isParsingReport
      ) && (
        <div className="-mb-[1px] flex justify-between">
          <O11yTabs
            defaultIndex={getActiveTab.idx}
            tabsArray={tabsList}
            onTabChange={onTabChange}
          />
          <StatusBadges
            statusStats={statusStats}
            onClickHandler={handleClickStatusBadge}
          />
        </div>
      )}
    </div>
  );
}

export default BuildDetailsHeader;

BuildDetailsHeader.propTypes = {
  updateCount: PropTypes.number.isRequired,
  onUpdateBtnClick: PropTypes.func.isRequired,
  applyTestListFilter: PropTypes.func.isRequired,
  isNewItemLoading: PropTypes.bool.isRequired
};
