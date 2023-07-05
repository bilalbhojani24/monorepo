import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { MdChevronRight } from '@browserstack/bifrost';
import confetti from 'canvas-confetti';
import { O11yBanner } from 'common/bifrostProxy';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';

function PlanSuccessBanner() {
  const dispatch = useDispatch();

  useEffect(() => {
    confetti({
      particleCount: 1080,
      spread: 900,
      startVelocity: 70,
      origin: {
        x: 0.5,
        y: -0.5
      }
    });
  }, []);

  const handleCloseBanner = () => {
    dispatch(
      toggleBanner({
        version: '',
        data: {}
      })
    );
  };
  return (
    <div className="text-sm">
      <O11yBanner
        // ctaButton={
        //   <O11yHyperlink
        //     href="#"
        //     wrapperClassName="text-white hover:text-brand-600 text-sm"
        //   >
        //     Learn More <MdChevronRight className="ml-1 text-lg" />
        //   </O11yHyperlink>
        // }
        description="Your Observability Pro 14 day trial has started"
        modifier="success"
        onDismissClick={handleCloseBanner}
        align="centered"
      />
    </div>
  );
}

export default PlanSuccessBanner;
