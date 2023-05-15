import React from 'react';
import { O11yBadge } from 'common/bifrostProxy';

function PlanTypeBadge() {
  return (
    <O11yBadge
      wrapperClassName="mx-1 flex-shrink-0 bg-success-600 text-white pointer-events-none"
      hasRemoveButton={false}
      modifier="info"
      hasDot={false}
      text="Pro"
    />
  );
}

export default PlanTypeBadge;
