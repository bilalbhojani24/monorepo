import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useResizeObserver } from '@browserstack/hooks';
import { O11yHeader } from 'common/bifrostProxy';
import O11yTopBanner from 'common/O11yTopBanner';
import { setHeaderSize } from 'globalSlice/index';

function O11yTopContent() {
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const headerSize = useResizeObserver(headerRef);

  useEffect(() => {
    if (headerSize?.blockSize) {
      dispatch(setHeaderSize(headerSize.blockSize));
    }
  }, [dispatch, headerSize?.blockSize]);

  return (
    <div id="o11y-header" className="sticky top-0 z-10" ref={headerRef}>
      <O11yHeader />
      <O11yTopBanner />
    </div>
  );
}

export default O11yTopContent;
