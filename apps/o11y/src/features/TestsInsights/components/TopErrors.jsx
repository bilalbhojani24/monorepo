import React, { forwardRef, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';
import {
  AccordionInteractiveHeader,
  AccordionPanel,
  MdBarChart,
  MdErrorOutline,
  MdOutlineTask
} from '@browserstack/bifrost';
import {
  O11yAccordian,
  O11yBadge,
  O11yEmptyState,
  O11yTooltip
} from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
// import VirtualisedTable from 'common/VirtualisedTable';
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

const getFormattedData = (data) =>
  data.map((item, idx) => {
    const titleSplit = item.title.split('\n');
    return {
      ...item,
      title: (
        <>
          {titleSplit.slice(0, 3).map((text) => (
            <p className="truncate" key={text}>
              {text}
            </p>
          ))}
          {titleSplit.length > 3 && (
            <O11yTooltip placementSide="bottom" mouseEnterDelay={250}>
              <p className="text-xs">...{titleSplit.length - 3} more line(s)</p>
            </O11yTooltip>
          )}
        </>
      ),
      id: idx,
      badge: item.count,
      content: <TopErrorsTestRun data={item.testRuns} parentId={item.id} />
    };
  });

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
      <div className=" flex h-full flex-col">
        <div className="flex flex-1 items-center">
          <O11yLoader text="Fetching data" />
        </div>
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

  const List = forwardRef((props, ref) => (
    <div
      {...props}
      ref={ref}
      className="border-base-300 rounded-b-md border border-t-0"
    />
  ));

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
        <div className="h-full flex-1 overflow-auto">
          <Virtuoso
            data={getFormattedData(topErrorsStats?.data?.data || [])}
            components={{
              List
            }}
            itemContent={(index, singleBuildData) => (
              <>
                <O11yAccordian>
                  <AccordionInteractiveHeader
                    onClick={handleAccordionExpand}
                    wrapperClassName="px-3 py-3 flex-1 bg-white"
                    title={
                      // eslint-disable-next-line tailwindcss/no-arbitrary-value
                      <div className="w-[380px] overflow-hidden text-ellipsis text-left">
                        {singleBuildData.title}
                      </div>
                    }
                    asideContent={
                      <div className="m-4 flex">
                        <O11yBadge
                          wrapperClassName="text-sm font-medium"
                          onClick={() => {}}
                          hasRemoveButton={false}
                          modifier="error"
                          hasDot={false}
                          text={singleBuildData.badge}
                        />
                      </div>
                    }
                  />
                  <AccordionPanel wrapperClassName="bg-white w-full overflow-hidden">
                    <div className="border-base-300 mx-8 overflow-hidden rounded-t-md border">
                      {singleBuildData.content}
                    </div>
                  </AccordionPanel>
                </O11yAccordian>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}
