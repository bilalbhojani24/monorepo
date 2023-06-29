import React from 'react';
import { O11yBadge } from 'common/bifrostProxy';

function PlanTypeBadge() {
  return (
    <O11yBadge
      wrapperClassName="mx-1 flex-shrink-0 pointer-events-none"
      hasRemoveButton={false}
      modifier="success"
      hasDot={false}
      text="Pro"
    />
  );
}

export default PlanTypeBadge;
