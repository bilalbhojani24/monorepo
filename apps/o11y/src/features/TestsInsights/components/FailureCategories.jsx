import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdErrorOutline, MdOutlineFindInPage } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yEmptyState, O11yTooltip } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
// import { setAppliedFiltersTagsViaURL } from 'testops/TestFilters/slices/dataSlice';
// import { setTestRuns } from 'testops/TestList/slices/dataSlice';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import BigNumber from 'features/TestsInsights/components/BigNumber';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import isEmpty from 'lodash/isEmpty';

import { getDefectsStats } from '../slices/selectors';
import { getDefectsData } from '../slices/testInsightsSlice';

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
    [navigate]
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
      <div className="flex h-full flex-col">
        <O11yLoader text="Fetching data" />
      </div>
    );
  }
  if (defectsStats?.hasNetworkError || hasNoData) {
    return (
      <div className="flex h-full flex-col justify-center">
        <O11yEmptyState
          title="Something went wrong"
          description={null}
          buttonProps={{
            children: 'Reload',
            onClick: () => dispatch(getDefectsData({ buildId })),
            size: 'default'
          }}
          mainIcon={
            <MdErrorOutline
              className={twClassNames('text-danger-600 inline-block w-8 h-8')}
            />
          }
        />
      </div>
    );
  }

  if (!totalDefects) {
    return (
      <div className="flex h-full flex-col justify-center">
        <O11yEmptyState
          title="No failed tests found"
          description={null}
          buttonProps={null}
          mainIcon={
            <MdOutlineFindInPage
              className={twClassNames('text-base-400 inline-block h-8 w-8')}
            />
          }
        />
      </div>
    );
  }

  if (areAllTBI.status) {
    return (
      <div className="flex h-full flex-col justify-center">
        <O11yEmptyState
          title="Investigation needed!"
          description="All failed tests are to be investigated"
          buttonProps={{
            children: 'Start Investigation',
            onClick: handleClickStartInvestigation,
            size: 'default'
          }}
          mainIcon={
            <MdOutlineFindInPage
              className={twClassNames('text-base-400 inline-block w-8 h-8')}
            />
          }
        />
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
          <div className="sticky flex items-center gap-4 bg-white pt-1">
            <BigNumber
              data={{
                count: totalDefects,
                meta: 'Failures'
              }}
              config={{ noHover: true }}
            />
            <div className="w-full flex-1">
              <div className="flex">
                {defectsStats.data?.data?.map((item) => {
                  const isItemVisible = (item.value * 100) / totalDefects > 0;
                  return (
                    <>
                      {isItemVisible && (
                        <div
                          className="flex h-5 overflow-hidden rounded-none first:rounded-l-full last:rounded-r-full"
                          style={{
                            color: item.color,
                            backgroundColor: item.color,
                            width: `${(item.value * 100) / totalDefects}%`
                          }}
                        >
                          {!!item.value && (
                            <O11yTooltip
                              theme="dark"
                              placementSide="top"
                              wrapperClassName="py-2 text-white"
                              content={
                                <div className="flex items-center gap-1 px-2">
                                  <span
                                    className="inline-flex h-2 w-2 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                  />
                                  <span className="whitespace-nowrap text-xs">
                                    {item.name}:
                                  </span>
                                  <span className="font-semibold">
                                    {(
                                      (item.value * 100) /
                                      totalDefects
                                    ).toFixed(2)}
                                    %
                                  </span>
                                </div>
                              }
                            >
                              <div
                                type="button"
                                className="contents overflow-hidden"
                              >
                                {item.name}
                              </div>
                            </O11yTooltip>
                          )}
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-x-2 gap-y-5">
            {defectsStats.data?.data?.map((item) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                className="flex cursor-pointer items-center justify-between pb-2 text-sm"
                key={item.id}
                // role="button"
                onClick={() => handleCategoryClick(item)}
              >
                <p className="flex items-center gap-2">
                  <span
                    className="inline-flex h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
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
