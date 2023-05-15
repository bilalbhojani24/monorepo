import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdChevronRight } from '@browserstack/bifrost';
import confetti from 'canvas-confetti';
import { O11yBanner, O11yHyperlink } from 'common/bifrostProxy';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';

function PlanSuccessBanner() {
  const dispatch = useDispatch();

  useEffect(() => {
    confetti({
      particleCount: 400,
      spread: 120,
      startVelocity: 40,
      origin: {
        x: 0,
        y: 0.5
      }
    });
    confetti({
      particleCount: 400,
      spread: 120,
      startVelocity: 40,
      origin: {
        x: 1,
        y: 0.5
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
        ctaButton={
          <O11yHyperlink
            href="#"
            wrapperClassName="text-white hover:text-brand-600 text-sm"
          >
            Learn More <MdChevronRight className="ml-1 text-lg" />
          </O11yHyperlink>
        }
        description="Your Observability Pro 14 day trial has started"
        modifier="success"
        onDismissClick={handleCloseBanner}
        align="centered"
      />
    </div>
  );
}

export default PlanSuccessBanner;
