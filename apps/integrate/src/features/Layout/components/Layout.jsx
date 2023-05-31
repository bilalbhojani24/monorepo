import React, { Suspense, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useResizeObserver } from '@browserstack/hooks';
import { INTGHeader } from 'common/index';
import { BSTACK_TOPNAV_ELEMENT_ID } from 'constants/common';
import { Sidebar } from 'features/Sidebar';

import { headerSizeSelector, setHeaderSize } from '../slices/headerSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const { height } = useSelector(headerSizeSelector);
  const headerObservedSize = useResizeObserver(headerRef);
  useEffect(() => {
    const headerHeight =
      headerObservedSize.blockSize || headerObservedSize.height;
    const headerWidth =
      headerObservedSize.inlineSize || headerObservedSize.width;
    dispatch(setHeaderSize({ height: headerHeight, width: headerWidth }));
  }, [dispatch, headerObservedSize]);

  return (
    <div className="bg-base-50 relative min-h-screen">
      <div id={BSTACK_TOPNAV_ELEMENT_ID} ref={headerRef}>
        <INTGHeader />
      </div>
      <div
        className="flex"
        style={{
          height: `calc(100vh - ${height}px)`,
          top: `${height}px`
        }}
      >
        <Sidebar />
        <Suspense>
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
