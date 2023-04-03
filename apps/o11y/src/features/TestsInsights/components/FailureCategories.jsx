/* eslint-disable tailwindcss/no-custom-classname */
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yTooltip } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
// import { setAppliedFiltersTagsViaURL } from 'testops/TestFilters/slices/dataSlice';
// import { setTestRuns } from 'testops/TestList/slices/dataSlice';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
// import { DOC_LINKS } from 'constants/common';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import { isEmpty } from 'lodash';

// import { OpenInNewIcon } from 'trike/Icons';
// import 'images/testops/icons/no-data-search.svg';
import { getDefectsStats } from '../slices/selectors';
import { getDefectsData } from '../slices/testInsightsSlice';

import BigNumber from './BigNumber';
// import BigNumber from '../widgets/BigNumber';
// import CardHeader from '../widgets/CardHeader';

// import '../styles/Defects.scss';

const getTBIStatus = (data = [], total = 0) => {
  const tbiId = 'tobeinvestigated';
  const result = {
    status: false,
    item: {}
  };
  data.forEach((item) => {
    if (item.id.toLowerCase().split(' ').join('') === tbiId) {
      const percentage = (item.value * 100) / total;
      if (percentage === 100) {
        result.status = true;
        result.item = item;
      }
    }
  });

  return result;
};

export default function FailureCategories() {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);

  const buildId = useSelector(getBuildUUID);
  const defectsStats = useSelector(getDefectsStats);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDefectsData({ buildId }));
  }, [buildId, dispatch]);

  const handleChartClick = useCallback(
    (data) => {
      // Clearing test runs before landing on test listing to fetch new tests based on applied filter
      // dispatch(setTestRuns([]));
      const searchString = `?tab=tests&issueTypeGroup=${data.id}`;
      navigate({ search: searchString });
      // dispatch(setAppliedFiltersTagsViaURL());
    },
    [dispatch, navigate]
  );

  const totalDefects = useMemo(() => {
    let total = 0;
    if (defectsStats.data?.data?.length) {
      defectsStats.data?.data?.forEach((item) => {
        total += item.value;
      });
    }
    return total;
  }, [defectsStats.data?.data]);

  const hasNoData = useMemo(
    () => isEmpty(defectsStats?.data) && !defectsStats?.isLoading,
    [defectsStats?.data, defectsStats?.isLoading]
  );

  const areAllTBI = useMemo(
    () => getTBIStatus(defectsStats.data?.data, totalDefects),
    [defectsStats.data?.data, totalDefects]
  );

  const handleClickStartInvestigation = () => {
    logInsightsInteractionEvent({
      interaction: 'failure_category_start_investigation_clicked'
    });
    handleChartClick(areAllTBI.item);
  };

  if (defectsStats?.isLoading) {
    return (
      <div className="ti-defects ti-defects--loading">
        {/* <CardHeader title="Failure Categories" showMore /> */}
        <div className="ti-defects__loading-spin">
          <O11yLoader text="Fetching data" />
        </div>
      </div>
    );
  }
  if (defectsStats?.hasNetworkError || hasNoData) {
    return (
      <div className="ti-defects">
        {/* <CardHeader title="Failure Categories" showMore /> */}
        {/* <PlaceHolder
          type="error"
          text="Something went wrong"
          ctaText="Reload"
          onClickCTA={() => dispatch(getDefectsData({ buildId }))}
        /> */}
      </div>
    );
  }

  if (!totalDefects) {
    return (
      <div className="ti-defects">
        {/* <CardHeader title="Failure Categories" showMore />
        <PlaceHolder
          text="No failed tests found"
          illustration={
            <svg className="ti-placeholder__illustration">
              <use xlinkHref="#no-data-rocket" />
            </svg>
          }
        /> */}
      </div>
    );
  }

  if (areAllTBI.status) {
    return (
      <div className="ti-defects">
        {/* <CardHeader title="Failure Categories" showMore />
        <PlaceHolder
          text="Manual investigation yet to start"
          metaText={
            <>
              Start tagging failures manually for Auto Analysis to kick-in{' '}
              <HyperLink
                target="_blank"
                href={DOC_LINKS.autoAnalyser}
                icon={<OpenInNewIcon />}
                iconPlacement="right"
                label="Learn more"
                linkWeight="regular"
                modifier="primary"
                className="to-anchor"
              >
                Learn more
              </HyperLink>
            </>
          }
          illustration={
            <svg className="ti-placeholder__illustration">
              <use xlinkHref="#no-data-search" />
            </svg>
          }
          ctaText="Start Investigation"
          onClickCTA={handleClickStartInvestigation}
        /> */}
      </div>
    );
  }

  const handleCategoryClick = (item) => {
    logInsightsInteractionEvent({ interaction: 'failure_category_clicked' });
    handleChartClick(item);
  };

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="overflow-auto py-5 pt-0 pb-2">
          <div className="sticky flex items-end gap-4 bg-white pt-1">
            <BigNumber
              data={{
                count: totalDefects,
                meta: 'Failures'
              }}
              config={{ noHover: true }}
            />
            <div className="w-full flex-1">
              <div className="flex">
                {defectsStats.data?.data?.map((item, index) => (
                  <div
                    style={{ width: `${(item.value * 100) / totalDefects}%` }}
                  >
                    {!!item.value && (
                      <O11yTooltip
                        theme="light"
                        placementSide="top"
                        wrapperClassName="py-2"
                        content={
                          <div className="ti-defects__tooltip-content">
                            <span
                              className="ti-defects__color-dot"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="ti-defects__tooltip-key">
                              {item.name}:
                            </span>
                            <span className="ti-defects__tooltip-value">
                              {((item.value * 100) / totalDefects).toFixed(2)}%
                            </span>
                          </div>
                        }
                      >
                        <div
                          type="button"
                          className={twClassNames(
                            'h-8 overflow-hidden rounded-none ',
                            {
                              'rounded-l-full': index === 0,
                              'rounded-r-full':
                                defectsStats.data?.data?.length - 1 === index
                            }
                          )}
                          style={{
                            color: item.color,
                            backgroundColor: item.color
                          }}
                        >
                          {item.name}
                        </div>
                      </O11yTooltip>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-x-2 gap-y-5">
            {defectsStats.data?.data?.map((item) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div
                className="flex cursor-pointer items-center justify-between pb-2 text-sm"
                key={item.id}
                role="button"
                onClick={() => handleCategoryClick(item)}
                tabIndex={0}
              >
                <p className="flex items-center gap-2">
                  <span
                    className="inline-flex h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="ti-defects__item-card--text">
                    {item.name}
                  </span>
                </p>
                <p className="font-medium">
                  {item?.value >= 10 ? item.value : `0${item.value}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
