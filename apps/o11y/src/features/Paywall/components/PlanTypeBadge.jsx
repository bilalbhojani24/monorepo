import React from 'react';
import { useSelector } from 'react-redux';
import { O11yBadge } from 'common/bifrostProxy';
import { getPlanType } from 'globalSlice/selectors';

function PlanTypeBadge() {
  const planType = useSelector(getPlanType);

  if (!planType) {
    return null;
  }

  return (
    <O11yBadge
      wrapperClassName="mx-1 flex-shrink-0 bg-success-600 text-white pointer-events-none"
      hasRemoveButton={false}
      modifier="info"
      hasDot={false}
      text={planType}
    />
  );
}

export default PlanTypeBadge;
