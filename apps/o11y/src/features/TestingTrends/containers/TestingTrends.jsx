import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
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
  const { handleResize, onLayoutChange, rglLayouts, TREND_CARDS } =
    useTestingTrends();
  const renderDashboardCard = (key) => {
    const { title } = TREND_CARDS[key];
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
            config={{ abbrNumber: true }}
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
              fixedToTwoDigits: true
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
            config={{ hideLegends: true }}
            seriesOptions={{ id: 'alwaysFailing', name: 'Always Failing' }}
            insightsSuffix="%"
          />
        );
      case 'newFailures':
        return (
          <TrendsCard
            cardKey="newFailures"
            apiKey="newFailures"
            config={{ hideLegends: true }}
            seriesOptions={{ id: 'newFailures', name: 'Newly Failed Tests' }}
            insightsSuffix="%"
          />
        );
      case 'failureCategories':
        return <FailureCategoryTrend title={title} />;
      case 'buildRunFrequency':
        return <BuildRunFreqTrend title={title} />;
      case 'testExecutions':
        return (
          <TrendsCard
            cardKey="testExecutions"
            apiKey="testExecutions"
            config={{
              showTrendLine: true,
              fixedToTwoDigits: true,
              abbrNumber: true,
              metaText: 'Test Executions'
            }}
            seriesOptions={{
              id: 'testExecutions',
              name: 'Test Executions',
              fillOpacity: 0.1
            }}
            chartType="areaspline"
          />
        );
      case 'parallelExecutions':
        return (
          <TrendsCard
            cardKey="parallelExecutions"
            apiKey="parallelExecutions"
            config={{ showTrendLine: true, fixedToTwoDigits: true }}
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
        return 'default';
      // return (
      //   <div className="to-test-trend__placeholder">
      //     <p className="to-test-trend__card-title">
      //       {TREND_CARDS[key].title}
      //     </p>
      //     <div className="to-test-trend__placeholder-body">
      //       <PlaceHolder type="empty" text="No data found" />
      //     </div>
      //   </div>
      // );
    }
  };

  return (
    <div className="flex flex-col p-9">
      <TestingTrendsHeader />
      <div className="mt-1 p-2">
        <ResponsiveReactGridLayout
          className="relative"
          draggableHandle=".to-test-trend__dragHandler"
          breakpoints={{ lg: 1440, md: 992, sm: 767, xs: 480, xxs: 0 }}
          cols={{ lg: 10, md: 10, sm: 1, xs: 1, xxs: 1 }}
          layouts={rglLayouts}
          onLayoutChange={onLayoutChange}
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
              className="group rounded-lg bg-white border-base-200 relative h-full max-h-full flex-1 overflow-auto border shadow"
              key={key}
              data-grid={TREND_CARDS[key]}
            >
              {renderDashboardCard(key)}
            </div>
          ))}
        </ResponsiveReactGridLayout>
      </div>
    </div>
  );
}
