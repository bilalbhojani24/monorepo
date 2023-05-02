import React from 'react';
import { O11yBanner, O11yButton } from 'common/bifrostProxy';

function PlanTimingBanner() {
  return (
    <O11yBanner
      // bannerIcon={
      //   <MegaphoneIcon aria-hidden="true" className="h-6 w-6 text-white" />
      // }
      ctaButton={
        <O11yButton colors="white" variant="minimal">
          Upgrade now
        </O11yButton>
      }
      description="Your free trial for Observability Pro expires in 3 days."
      modifier="danger"
      onDismissClick={() => {}}
      align="centered"
    />
  );
}

export default PlanTimingBanner;
