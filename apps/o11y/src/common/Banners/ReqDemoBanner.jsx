import React from 'react';
import { useDispatch } from 'react-redux';
import { setStorage } from '@browserstack/utils';
import { O11yBanner, O11yButton } from 'common/bifrostProxy';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';
import { logOllyEvent } from 'utils/common';
import { REQ_DEMO_BANNER_SEEN } from 'utils/showBannerPerPriority';

function ReqDemoBanner() {
  const dispatch = useDispatch();

  const handleClickGetDemo = () => {
    logOllyEvent({
      event: 'O11yDemoCTAClicked',
      data: {
        source: 'hero',
        url: window.location.href
      }
    });
    window.open(
      'https://www.browserstack.com/contact?&ref=observability-dashboard-top-header-csf-lead#sales',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleDismissBanner = () => {
    setStorage(REQ_DEMO_BANNER_SEEN, Date.now());
    dispatch(
      toggleBanner({
        version: '',
        data: {}
      })
    );
    logOllyEvent({
      event: 'O11yDemoCTADismissed',
      data: {
        source: 'hero',
        url: window.location.href
      }
    });
  };

  return (
    <O11yBanner
      ctaButton={
        <O11yButton
          variant="primary"
          colors="white"
          onClick={handleClickGetDemo}
        >
          Get a demo
        </O11yButton>
      }
      description="Learn how to use Test Observability to improve the quality of your automation test suites."
      onDismissClick={handleDismissBanner}
      align="centered"
    />
  );
}

export default ReqDemoBanner;
