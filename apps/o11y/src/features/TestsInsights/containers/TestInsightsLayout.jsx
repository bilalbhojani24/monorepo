import React, { useCallback, useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useSelector } from 'react-redux';
import {
  Button,
  DataVisualization,
  EllipsisVerticalIcon,
  MdDragIndicator,
  MdInfoOutline
} from '@browserstack/bifrost';
import { getStorage, setStorage } from '@browserstack/utils';
import {
  O11yDropdown,
  O11yDropdownOptionGroup,
  O11yDropdownOptionItem,
  O11yDropdownTrigger
} from 'common/bifrostProxy';
import { getBuildMeta } from 'features/BuildDetails/slices/selectors';
import useShowMoreOptions from 'features/TestsInsights/components/useShowMoreOptions';
// import { getBuildMetaDataSelector } from 'app/testops/TestList/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import { getActiveProject } from 'globalSlice/selectors';
import { getMergedLayoutValue, logOllyEvent } from 'utils/common';

import { cards, layoutConfig } from '../constants';

import DashboardCard from './DashboardCard';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const RGL_LS_KEY = 'testops-rgl-layouts-v3';
const RGL_LS_KEY_OLDER = 'testops-rgl-layouts-v2';

export default function TestInsightsLayout() {
  const buildMeta = useSelector(getBuildMeta);
  const activeProject = useSelector(getActiveProject);
  const handleClickViewTrends = useShowMoreOptions();
  const [rglLayouts, setRglLayouts] = useState(() => {
    localStorage.removeItem(RGL_LS_KEY_OLDER);
    return getStorage(RGL_LS_KEY)
      ? getMergedLayoutValue(layoutConfig, getStorage(RGL_LS_KEY))
      : layoutConfig;
  });

  const logInsightsInteractionEvent = useCallback(
    ({ interaction }) => {
      logOllyEvent({
        event: 'O11yBuildInsightsInteracted',
        data: {
          project_name: activeProject.name,
          project_id: activeProject.id,
          build_name: buildMeta?.name,
          build_uuid: buildMeta?.uuid,
          interaction
        }
      });
    },
    [activeProject.id, activeProject.name, buildMeta?.name, buildMeta?.uuid]
  );
  const onLayoutChange = (_, layouts) => {
    setStorage(RGL_LS_KEY, layouts);
    setRglLayouts(layouts);
  };

  const handleResize = () => {
    window.dispatchEvent(new Event('resize'));
    logInsightsInteractionEvent({ interaction: 'chart_resized' });
  };

  const getOtherOptions = (cardKey) => {
    if (
      cardKey === 'alwaysFailing' ||
      cardKey === 'newFailures' ||
      cardKey === 'flakiness' ||
      cardKey === 'mutedTests'
    ) {
      return (
        <>
          <O11yDropdown onClick={handleClickViewTrends}>
            <div className="flex">
              <O11yDropdownTrigger wrapperClassName="p-0 border-0 shadow-none">
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </O11yDropdownTrigger>
            </div>

            <O11yDropdownOptionGroup wrapperClassName="w-32">
              <O11yDropdownOptionItem
                option={{ body: 'View Trends', id: 'viewTrends' }}
              />
            </O11yDropdownOptionGroup>
          </O11yDropdown>
        </>
      );
    }
    return null;
  };

  useEffect(() => {
    window.scroll(0, 0);
    return () => {
      window.scroll(0, 0);
    };
  }, []);

  useEffect(() => {
    if (buildMeta?.uuid) {
      logOllyEvent({
        event: 'O11yBuildInsightsVisited',
        data: {
          project_name: activeProject.name,
          project_id: activeProject.id,
          build_name: buildMeta?.name,
          build_uuid: buildMeta?.uuid
        }
      });
    }
  }, [activeProject.id, activeProject.name, buildMeta?.name, buildMeta?.uuid]);

  return (
    <TestInsightsContext.Provider value={{ logInsightsInteractionEvent }}>
      <div className="overflow-x-hidden pb-24">
        <ResponsiveReactGridLayout
          className=""
          breakpoints={{ lg: 1440, md: 992, sm: 767, xs: 480, xxs: 0 }}
          cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 }}
          layouts={rglLayouts}
          rowHeight={116}
          margin={[20, 20]}
          onLayoutChange={onLayoutChange}
          onDragStop={() =>
            logInsightsInteractionEvent({ interaction: 'chart_moved' })
          }
          isResizable
          isDraggable
          autoSize
          draggableHandle=".ti-card-header__dragHandler"
          onResizeStop={handleResize}
          measureBeforeMount
        >
          {Object.keys(cards).map((key) => (
            <div className="flex flex-col" key={key} data-grid={cards[key]}>
              <DataVisualization
                analytics={<DashboardCard cardKey={key} />}
                headerInfo
                headerInfoTooltipProps={{
                  content: (
                    <div className="text-base-300 w-60 px-4 text-sm">
                      {cards[key].title}
                    </div>
                  ),
                  children: <MdInfoOutline className="h-5 w-5" />,
                  placementAlign: 'center',
                  placementSide: 'bottom',
                  size: 'xs',
                  theme: 'dark'
                }}
                KpiProps={null}
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
                otherOptions={getOtherOptions(key)}
                size="fit-content"
                title={cards[key].title}
                wrapperClassName="bg-white relative h-full"
                descPosition={null}
              />
            </div>
          ))}
        </ResponsiveReactGridLayout>
      </div>
    </TestInsightsContext.Provider>
  );
}
