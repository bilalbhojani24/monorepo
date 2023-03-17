import React from 'react';
import { O11yBadge, O11yTooltip } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

function StatusBadges({ statusStats }) {
  return (
    <div className="flex items-center gap-2">
      <O11yTooltip
        theme="dark"
        placementSide="top"
        content={
          <div className="mx-4">
            <p className="text-base-300 text-sm">Passed</p>
          </div>
        }
      >
        <O11yBadge
          wrapperClassName="text-sm font-medium"
          hasRemoveButton={false}
          modifier="success"
          hasDot={false}
          text={statusStats.passed || 0}
        />
      </O11yTooltip>
      <O11yTooltip
        theme="dark"
        placementSide="top"
        content={
          <div className="mx-4">
            <p className="text-base-300 text-sm">Failed</p>
          </div>
        }
      >
        <O11yBadge
          wrapperClassName="text-sm font-medium"
          hasRemoveButton={false}
          modifier="error"
          hasDot={false}
          text={statusStats.failed || 0}
        />
      </O11yTooltip>
      <O11yTooltip
        theme="dark"
        placementSide="top"
        content={
          <div className="mx-4">
            <p className="text-base-300 text-sm">Skipped</p>
          </div>
        }
      >
        <O11yBadge
          wrapperClassName="text-sm font-medium"
          hasRemoveButton={false}
          modifier="base"
          hasDot={false}
          text={statusStats.skipped || 0}
        />
      </O11yTooltip>
      <O11yTooltip
        theme="dark"
        placementSide="top"
        content={
          <div className="mx-4">
            <p className="text-base-300 text-sm">Unknown</p>
          </div>
        }
      >
        <O11yBadge
          wrapperClassName="text-sm font-medium"
          hasRemoveButton={false}
          modifier="warn"
          hasDot={false}
          text={statusStats.timeout || 0}
        />
      </O11yTooltip>
    </div>
  );
}

StatusBadges.propTypes = {
  statusStats: PropTypes.shape({
    passed: PropTypes.number,
    failed: PropTypes.number,
    skipped: PropTypes.number,
    timeout: PropTypes.number
  })
};
StatusBadges.defaultProps = {
  statusStats: {
    passed: 0,
    failed: 0,
    skipped: 0,
    timeout: 0
  }
};

export default StatusBadges;
