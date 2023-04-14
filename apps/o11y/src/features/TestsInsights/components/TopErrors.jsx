import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';
import {
  AccordionInteractiveHeader,
  AccordionPanel,
  MdBarChart,
  MdErrorOutline,
  MdOutlineTask
} from '@browserstack/bifrost';
import { O11yAccordian, O11yBadge, O11yEmptyState } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import {
  getBuildMeta,
  getBuildUUID
} from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import isEmpty from 'lodash/isEmpty';

import { getTopErrorStats } from '../slices/selectors';
import { getTopErrorsData } from '../slices/testInsightsSlice';

import BigNumber from './BigNumber';
import TopErrorsTestRun from './TopErrorsTestRun';
import UniqueErrorTableHeader from './UniqueErrorTableHeader';
import UniqueErrorTitle from './UniqueErrorTitle';

export default function TopErrors() {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);
  const topErrorsStats = useSelector(getTopErrorStats);
  const buildMeta = useSelector(getBuildMeta);

  const buildId = useSelector(getBuildUUID);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopErrorsData({ buildId }));
  }, [buildId, dispatch]);

  if (topErrorsStats?.isLoading) {
    return (
      <div className="flex h-full items-center">
        <O11yLoader text="Fetching data" />
      </div>
    );
  }

  if (!buildMeta?.data.status || !topErrorsStats?.data?.ready) {
    return (
      <div className="flex h-full flex-col justify-center">
        <O11yEmptyState
          title="Analysis yet to run"
          description="Unique error analysis results will be available after build run completion"
          mainIcon={
            <MdBarChart className="text-base-400 inline-block !h-12 !w-12" />
          }
          buttonProps={null}
        />
      </div>
    );
  }

  if (topErrorsStats?.hasNetworkError) {
    return (
      <div className="flex h-full flex-col justify-center">
        <O11yEmptyState
          title="Something went wrong!"
          description={null}
          mainIcon={
            <MdErrorOutline className="text-danger-600 inline-block !h-12 !w-12" />
          }
          buttonProps={{
            children: 'Reload',
            onClick: () => dispatch(getTopErrorsData({ buildId })),
            size: 'default'
          }}
        />
      </div>
    );
  }

  if (
    (isEmpty(topErrorsStats.data) || !topErrorsStats.data?.overview?.count) &&
    !topErrorsStats.isLoading
  ) {
    return (
      <div className="flex h-full flex-col justify-center">
        <O11yEmptyState
          title="No Errors!"
          description="We found zero errors in this build"
          mainIcon={
            <MdOutlineTask className="text-base-400 inline-block !h-12 !w-12" />
          }
          buttonProps={null}
        />
      </div>
    );
  }

  const handleAccordionExpand = (_, isOpen) => {
    if (isOpen) {
      logInsightsInteractionEvent({
        interaction: 'unique_errors_accordion_opened'
      });
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mt-4">
        <BigNumber
          data={{
            ...topErrorsStats?.data?.overview,
            title: '',
            heading: 'Total'
          }}
          config={{ noHover: true }}
        />
      </div>
      <div className="mt-4 flex h-full flex-1 flex-col">
        <UniqueErrorTableHeader />
        <div className="border-base-300 h-full flex-1 overflow-auto border border-t-0">
          <Virtuoso
            data={topErrorsStats?.data?.data || []}
            itemContent={(index, singleBuildData) => (
              <div className="border-base-200 border-b">
                <O11yAccordian>
                  <AccordionInteractiveHeader
                    onClick={handleAccordionExpand}
                    wrapperClassName="px-3 py-3 bg-white flex-1 [&>_div:first-child>div:first-child>.truncate]:shrink-0 font-mono"
                    title={
                      <div className="overflow-hidden whitespace-normal break-words text-left text-sm">
                        <UniqueErrorTitle title={singleBuildData.title} />
                      </div>
                    }
                    asideContent={
                      <div className="flex">
                        <O11yBadge
                          wrapperClassName="m-2 text-sm font-medium"
                          onClick={() => {}}
                          hasRemoveButton={false}
                          modifier="error"
                          hasDot={false}
                          text={singleBuildData.count}
                        />
                      </div>
                    }
                  />
                  <AccordionPanel wrapperClassName="bg-white w-full overflow-hidden">
                    <div className="border-base-300 mx-8 mb-2 overflow-hidden rounded-t-md border">
                      <TopErrorsTestRun
                        data={singleBuildData.testRuns}
                        parentId={singleBuildData.id}
                      />
                    </div>
                  </AccordionPanel>
                </O11yAccordian>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
