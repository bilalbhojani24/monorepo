import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdErrorOutline, MdOutlineFindInPage } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yEmptyState, O11yTooltip } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
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
  const { logInsightsInteractionEvent, applyTestListFilter } =
    useContext(TestInsightsContext);

  const buildId = useSelector(getBuildUUID);
  const defectsStats = useSelector(getDefectsStats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDefectsData({ buildId }));
  }, [buildId, dispatch]);

  const handleChartClick = useCallback(
    (data) => {
      applyTestListFilter({ query: `issueTypeGroup=${data.id}` });
    },
    [applyTestListFilter]
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
      <div className="flex h-full flex-col justify-center">
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
      <div className="mt-4 flex h-full flex-col">
        <div className="overflow-auto py-5 pb-2 pt-0">
          <div className="flex items-end gap-4 bg-white pt-1">
            <BigNumber
              data={{
                count: totalDefects,
                heading: 'Failures'
              }}
              config={{ noHover: true }}
            />
            <div className="mb-2 w-full flex-1">
              <div className="flex">
                {defectsStats.data?.data?.map((item) => {
                  const isItemVisible = (item.value * 100) / totalDefects > 0;
                  return (
                    <>
                      {isItemVisible && (
                        <div
                          role="presentation"
                          className="pointer-events-auto flex h-5 cursor-pointer overflow-hidden rounded-none first:rounded-l-full last:rounded-r-full"
                          style={{
                            color: item.color,
                            backgroundColor: item.color,
                            width: `${(item.value * 100) / totalDefects}%`
                          }}
                          onClick={() => handleCategoryClick(item)}
                          key={item.id}
                        >
                          {!!item.value && (
                            <O11yTooltip
                              theme="dark"
                              placementSide="top"
                              wrapperClassName="py-2 text-white"
                              triggerAsChild
                              triggerWrapperClassName="flex flex-1"
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
                                className="pointer-events-auto contents w-full cursor-pointer overflow-hidden"
                                onClick={() => handleCategoryClick(item)}
                                role="presentation"
                              />
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
          {!isEmpty(defectsStats.data?.data) && (
            <div className="my-5 grid grid-cols-1 gap-x-2 gap-y-7">
              {defectsStats.data?.data?.map((item) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <div
                  className="flex cursor-pointer items-center justify-between text-sm"
                  key={item.id}
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
          )}
        </div>
      </div>
    </>
  );
}
