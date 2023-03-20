import React from 'react';
import { O11yBadge, O11yTooltip } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

function StatusBadgeItem({ text, number, modifier }) {
  return (
    <O11yTooltip
      theme="dark"
      placementSide="top"
      wrapperClassName="py-2"
      content={
        <div className="mx-4">
          <p className="text-base-300 text-sm">{text}</p>
        </div>
      }
    >
      <O11yBadge
        wrapperClassName="text-sm font-medium"
        hasRemoveButton={false}
        modifier={modifier}
        hasDot={false}
        text={number}
      />
    </O11yTooltip>
  );
}

StatusBadgeItem.propTypes = {
  text: PropTypes.string.isRequired,
  modifier: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};

export default StatusBadgeItem;
