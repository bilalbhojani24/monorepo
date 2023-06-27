import React from 'react';
import { Outlet } from 'react-router-dom';
import { Loader, PageHeadings, Tabs } from '@browserstack/bifrost';

import ROUTES from '../../../constants/routes';

import useLayoutGridDetail from './useLayoutGridDetail';

const LayoutGridDetail = () => {
  const { fetchedGridData, gridData, onTabChangeHandler, currentTab } =
    useLayoutGridDetail();

  const TabsForGridDetail = (
    <Tabs
      tabsArray={[
        {
          index: 0,
          name: 'Overview'
        },
        {
          index: 1,
          name: 'Settings'
        },
        {
          index: 2,
          name: 'Utilization'
        }
      ]}
      onTabChange={onTabChangeHandler}
      defaultIndex={currentTab.index}
    />
  );

  return (
    <div className="flex-1">
      {fetchedGridData && (
        <>
          <div className="bg-white px-6 pt-6">
            <PageHeadings
              breadcrumbs={[
                { name: 'Grids', url: ROUTES.GRID_CONSOLE, current: false },
                {
                  name: currentTab.name,
                  url: '',
                  current: true
                }
              ]}
              heading={gridData.name || ''}
            />

            {TabsForGridDetail}
          </div>

          <Outlet />
        </>
      )}

      {!fetchedGridData && (
        <Loader
          heihgt="h-10"
          width="w-10"
          wrapperClassName="absolute inset-x-2/4 inset-y-2/4 text-base-300 fill-base-400"
        />
      )}
    </div>
  );
};

export default LayoutGridDetail;
