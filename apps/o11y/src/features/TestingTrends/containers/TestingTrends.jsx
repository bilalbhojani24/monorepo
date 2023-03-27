import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import {
  Button,
  DataVisualization,
  MdBarChart,
  MdDragIndicator,
  MdInfoOutline
} from '@browserstack/bifrost';
import { O11yEmptyState } from 'common/bifrostProxy';
import BuildRunFreqTrend from 'features/TestingTrends/containers/BuildRunFreqTrend';
import CbtTrends from 'features/TestingTrends/containers/CbtTrends';
import FailureCategoryTrend from 'features/TestingTrends/containers/FailureCategoryTrend';
import PerformanceTrend from 'features/TestingTrends/containers/PerformanceTrend';
import StabilityTrend from 'features/TestingTrends/containers/StabilityTrend';
import TestingTrendsHeader from 'features/TestingTrends/containers/TestingTrendsHeader';
import TrendsCard from 'features/TestingTrends/containers/TrendsCard';
import useTestingTrends from 'features/TestingTrends/containers/useTestingTrends';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function TestingTrends() {
  const {
    handleResize,
    logTrendsInteractionEvent,
    onLayoutChange,
    rglLayouts,
    TREND_CARDS
  } = useTestingTrends();
  const renderDashboardCard = (key) => {
    switch (key) {
      case 'stability':
        return <StabilityTrend />;
      case 'performance':
        return <PerformanceTrend />;
      case 'testGrowthOverTime':
        return (
          <TrendsCard
            cardKey="testGrowthOverTime"
            apiKey="testGrowth"
            seriesOptions={{ id: 'tests', name: 'Tests' }}
            config={{
              abbrNumber: true,
              pointClickCb: () =>
                logTrendsInteractionEvent({
                  interaction: 'unique_test_cases_clicked'
                })
            }}
          />
        );
      case 'latestUniqueBuildRuns':
        return 'latestUniqueBuildRuns';
      // return <UniqueBuildRuns />;
      case 'flakiness':
        return (
          <TrendsCard
            cardKey="flakiness"
            apiKey="flakiness"
            config={{
              hideLegends: true,
              showTrendLine: true,
              fixedToTwoDigits: true,
              pointClickCb: () =>
                logTrendsInteractionEvent({
                  interaction: 'flakiness_clicked'
                })
            }}
            seriesOptions={{ id: 'flakiness', name: 'Flakiness' }}
            insightsSuffix="%"
          />
        );
      case 'alwaysFailing':
        return (
          <TrendsCard
            cardKey="alwaysFailing"
            apiKey="alwaysFailing"
            config={{
              hideLegends: true,
              pointClickCb: () =>
                logTrendsInteractionEvent({
                  interaction: 'always_failing_clicked'
                })
            }}
            seriesOptions={{ id: 'alwaysFailing', name: 'Always Failing' }}
            insightsSuffix="%"
          />
        );
      case 'newFailures':
        return (
          <TrendsCard
            cardKey="newFailures"
            apiKey="newFailures"
            config={{
              hideLegends: true,
              pointClickCb: () =>
                logTrendsInteractionEvent({
                  interaction: 'new_failure_clicked'
                })
            }}
            seriesOptions={{ id: 'newFailures', name: 'Newly Failed Tests' }}
            insightsSuffix="%"
          />
        );
      case 'failureCategories':
        return <FailureCategoryTrend />;
      case 'buildRunFrequency':
        return <BuildRunFreqTrend />;
      case 'testExecutions':
        return (
          <TrendsCard
            cardKey="testExecutions"
            apiKey="testExecutions"
            config={{
              showTrendLine: true,
              fixedToTwoDigits: true,
              abbrNumber: true,
              metaText: 'Test Executions',
              pointClickCb: () =>
                logTrendsInteractionEvent({
                  interaction: 'test_executions_clicked'
                })
            }}
            seriesOptions={{
              id: 'testExecutions',
              name: 'Test Executions',
              fillOpacity: 0.1,
              connectNulls: true
            }}
            chartType="areaspline"
          />
        );
      case 'parallelExecutions':
        return (
          <TrendsCard
            cardKey="parallelExecutions"
            apiKey="parallelExecutions"
            config={{
              showTrendLine: true,
              fixedToTwoDigits: true,
              pointClickCb: () =>
                logTrendsInteractionEvent({
                  interaction: 'parallel_executions_clicked'
                })
            }}
            seriesOptions={{
              id: 'parallelExecutions',
              name: 'Parallel Executions'
            }}
            chartType="column"
          />
        );
      case 'cbt':
        return <CbtTrends />;
      default:
        return (
          <div className="flex h-full flex-col">
            <p className="text-lg font-semibold">{TREND_CARDS[key].title}</p>
            <div className="flex h-80 flex-1 items-center justify-center">
              <O11yEmptyState
                title="No data found"
                description="Please update your access privileges by Contacting your administrator"
                mainIcon={
                  <MdBarChart className="text-base-400 inline-block !h-12 !w-12" />
                }
                buttonProps={null}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col">
      <TestingTrendsHeader />
      <div className="p-2">
        <ResponsiveReactGridLayout
          className="relative"
          draggableHandle=".to-test-trend__dragHandler"
          breakpoints={{ lg: 1440, md: 992, sm: 767, xs: 480, xxs: 0 }}
          cols={{ lg: 10, md: 10, sm: 1, xs: 1, xxs: 1 }}
          layouts={rglLayouts}
          onLayoutChange={onLayoutChange}
          onDragStop={() =>
            logTrendsInteractionEvent({ interaction: 'chart_moved' })
          }
          rowHeight={140}
          margin={[20, 20]}
          isResizable
          isDraggable
          autoSize
          onResizeStop={handleResize}
          measureBeforeMount
        >
          {Object.keys(TREND_CARDS).map((key) => (
            <div
              className="border-base-200 group relative h-96 max-h-full flex-1"
              key={key}
              data-grid={TREND_CARDS[key]}
            >
              <DataVisualization
                analytics={renderDashboardCard(key)}
                headerInfo={false}
                headerInfoTooltipProps={{
                  content: (
                    <div className="text-base-300 w-60 px-4 text-sm">
                      {TREND_CARDS[key].title}
                    </div>
                  ),
                  children: <MdInfoOutline className="h-5 w-5" />,
                  placementAlign: 'center',
                  placementSide: 'bottom',
                  size: 'xs',
                  theme: 'dark'
                }}
                filterDropdown={
                  <Button
                    colors="white"
                    onClick={() => {}}
                    icon={<MdDragIndicator className="ml-1" />}
                    isIconOnlyButton
                    size="small"
                    wrapperClassName="border-none to-test-trend__dragHandler invisible group-hover:visible group-hover:shadow-none"
                  />
                }
                size="fit-content"
                title={TREND_CARDS[key].title}
                wrapperClassName="bg-white relative h-full"
              />
            </div>
          ))}
        </ResponsiveReactGridLayout>
      </div>
    </div>
  );
}
