/* eslint-disable tailwindcss/no-custom-classname */
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdBarChart, MdErrorOutline, Tooltip } from '@browserstack/bifrost';
import {
  O11yAccordian,
  O11yBadge,
  O11yEmptyState,
  O11yTableCell,
  O11yTableRow
} from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import VirtualisedTable from 'common/VirtualisedTable';
// import StackTraceTooltip from 'testops/components/StackTraceTooltip';
// import {
//   getBuildMetaDataSelector
// } from 'testops/TestList/slices/selectors';
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
            <p className="ti-top-errors__title-line monospace" key={text}>
              {text}
            </p>
          ))}
          {titleSplit.length > 3 && (
            <Tooltip
              placement="bottom"
              trigger={['hover']}
              // overlay={
              //   // <StackTraceTooltip
              //   //   traceLines={titleSplit || []}
              //   //   copyText={titleSplit?.join('\n')}
              //   // />
              // }
              overlayClassName="ti-top-errors__tooltip-overlay"
              destroyTooltipOnHide={{ keepParent: false }}
              showArrow={false}
              mouseEnterDelay={0.25}
              align={{ points: ['t', 'b'] }}
            >
              <p className="ti-top-errors__title-more-line monospace">
                ...{titleSplit.length - 3} more line(s)
              </p>
            </Tooltip>
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
      <div className="ti-top-errors ti-top-errors--loading">
        <div className="ti-top-errors__loading-spin">
          <O11yLoader text="Fetching data" />
        </div>
      </div>
    );
  }

  if (!buildMeta?.data.status || !topErrorsStats?.data?.ready) {
    return (
      <div className="ti-top-errors">
        <O11yEmptyState
          title="Analysis yet to run"
          description="Unique error analysis results will be available after build run completion"
          mainIcon={
            <MdBarChart className="text-base-400 inline-block !h-12 !w-12" />
          }
          buttonProps={null}
        />
        {/* <PlaceHolder
          text="Analysis yet to run"
          metaText="Unique error analysis results will be available after build run completion"
          type="empty"
        /> */}
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
        {/* <PlaceHolder
          type="error"
          text="Something went wrong"
          ctaText="Reload"
          onClickCTA={() => dispatch(getTopErrorsData({ buildId }))}
        /> */}
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
        {/* <PlaceHolder
          text="No Errors!"
          metaText="We found zero errors in this build"
          type="empty"
        /> */}
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

  console.log(
    'topErrorsStats',
    getFormattedData(topErrorsStats?.data?.data || [])
  );

  return (
    <div className="flex h-full flex-col">
      {/* <CardHeader title="Unique errors" /> */}
      <div className="mt-6">
        <BigNumber
          data={{ ...topErrorsStats?.data?.overview, title: '' }}
          config={{ noHover: true }}
        />
      </div>
      <div className="mt-4 h-96 flex-1">
        <VirtualisedTable
          data={getFormattedData(topErrorsStats?.data?.data || [])}
          // endReached={loadMoreRows}
          // showFixedFooter={isLoadingMore}
          tableContainerWrapperClassName=""
          itemContent={(index, singleBuildData) => {
            // <StabilityTableItem
            //   item={singleBuildData}
            //   selectedBuild={selectedBuild}
            // />
            console.log('singleBuildData', singleBuildData);
            return (
              <>
                <O11yTableCell>
                  <O11yAccordian
                    // pl-5 pt-0 bg-white flex items-center hover:bg-brand-50 rounded-b-md cursor-pointer
                    triggerClassName=""
                    triggerContentNode={
                      <div className="flex flex-col items-start break-all">
                        {singleBuildData.title}
                      </div>
                    }
                    panelContentNode={
                      <div className="flex flex-col items-start break-all">
                        {singleBuildData.content}
                      </div>
                    }
                    onTriggerClick={() => handleAccordionExpand}
                  />
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
            );
          }}
          fixedHeaderContent={() => (
            <O11yTableRow>
              <O11yTableCell wrapperClassName="text-base-900 bg-white" isSticky>
                Error
              </O11yTableCell>
              <O11yTableCell
                wrapperClassName="text-base-900 bg-white w-1/4"
                isSticky
              >
                Tests
              </O11yTableCell>
            </O11yTableRow>
          )}
          handleRowClick={() => {}}
        />
        {/* <Accordion
          autoClose
          className="ti-top-errors__accordion"
          data={getFormattedData(topErrorsStats?.data?.data || [])}
          onClick={handleAccordionExpand}
        /> */}
      </div>
    </div>
  );
}
