import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AccordionInteractiveHeader,
  AccordionPanel,
  MdBarChart,
  MdErrorOutline
} from '@browserstack/bifrost';
import {
  O11yAccordian,
  O11yBadge,
  O11yEmptyState,
  O11yTableCell,
  O11yTableRow,
  O11yTooltip
} from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import VirtualisedTable from 'common/VirtualisedTable';
import {
  getBuildMeta,
  getBuildUUID
} from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import { isEmpty } from 'lodash';

import { getTopErrorStats } from '../slices/selectors';
import { getTopErrorsData } from '../slices/testInsightsSlice';

import BigNumber from './BigNumber';
import TopErrorsTestRun from './TopErrorsTestRun';

const getFormattedData = (data) =>
  data.map((item, idx) => {
    const titleSplit = item.title.split('\n');
    return {
      ...item,
      title: (
        <>
          {titleSplit.slice(0, 3).map((text) => (
            <p className="whitespace-pre-wrap" key={text}>
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
      <div className="flex flex-col">
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
      <div className="flex h-full flex-col">
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
      <div className="flex h-full flex-col">
        <O11yEmptyState
          title="No Errors!"
          description="We found zero errors in this build"
          mainIcon={
            <MdBarChart className="text-base-400 inline-block !h-12 !w-12" />
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
      <div className="mt-6">
        <BigNumber
          data={{ ...topErrorsStats?.data?.overview, title: '' }}
          config={{ noHover: true }}
        />
      </div>
      <div className="mt-4 h-full flex-1">
        <VirtualisedTable
          data={getFormattedData(topErrorsStats?.data?.data || [])}
          tableContainerWrapperClassName="overflow-visible overflow-x-visible md:rounded-none"
          tableHeaderWrapperClassName="bg-white"
          itemContent={(index, singleBuildData) => (
            <>
              <O11yTableCell wrapperClassName="first:pl-0 sm:first:pl-0 last:pr-0 sm:last:pr-0 p-0">
                <O11yAccordian>
                  <AccordionInteractiveHeader
                    onClick={handleAccordionExpand}
                    wrapperClassName="px-3 py-0 text-danger-600 flex-1 bg-white"
                    title={
                      <div className="overflow-hidden text-ellipsis break-all">
                        {singleBuildData.title}
                      </div>
                    }
                  />
                  <AccordionPanel>
                    <div className="overflow-hidden">
                      {singleBuildData.content}
                    </div>
                  </AccordionPanel>
                </O11yAccordian>
              </O11yTableCell>
              <O11yTableCell>
                {' '}
                <O11yBadge
                  wrapperClassName="text-sm font-medium"
                  onClick={() => {}}
                  hasRemoveButton={false}
                  modifier="error"
                  hasDot={false}
                  text={singleBuildData.badge}
                />
              </O11yTableCell>
            </>
          )}
          fixedHeaderContent={() => (
            <O11yTableRow>
              <O11yTableCell
                wrapperClassName="text-base-900 bg-white w-5/6"
                isSticky
              >
                Error
              </O11yTableCell>
              <O11yTableCell wrapperClassName="text-base-900 bg-white" isSticky>
                Impacted Tests
              </O11yTableCell>
            </O11yTableRow>
          )}
          handleRowClick={() => {}}
        />
      </div>
    </div>
  );
}
