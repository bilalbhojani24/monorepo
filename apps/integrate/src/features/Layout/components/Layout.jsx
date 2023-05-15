import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useResizeObserver } from '@browserstack/hooks';

import INTGHeader from '../../../common/bifrostProxy/components/INTGHeader';
import Overview from '../../Overview';
import { Sidebar } from '../../Sidebar/index';
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
      <div ref={headerRef}>
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
        <div className="flex-1 overflow-auto">
          <Overview />
        </div>
      </div>
    </div>
  );
};

export default Layout;
