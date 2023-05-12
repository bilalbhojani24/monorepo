import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useResizeObserver } from '@browserstack/hooks';

import INTGHeader from '../../../common/bifrostProxy/components/INTGHeader';
import { Sidebar } from '../../Sidebar/index';
import { setHeaderSize } from '../slices/headerSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const headerObservedSize = useResizeObserver(headerRef);
  useEffect(() => {
    const headerHeight =
      headerObservedSize.blockSize || headerObservedSize.height;
    const headerWidth =
      headerObservedSize.inlineSize || headerObservedSize.width;
    dispatch(setHeaderSize({ height: headerHeight, width: headerWidth }));
  }, [dispatch, headerObservedSize]);
  return (
    <div className="bg-base-100 min-h-screen text-3xl">
      <div ref={headerRef}>
        <INTGHeader />
      </div>
      <Sidebar />
    </div>
  );
};

export default Layout;
