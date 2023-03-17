import React from 'react';
import PropTypes from 'prop-types';

import StatusBadgeItem from './StatusBadgeItem';

function StatusBadges({ statusStats }) {
  return (
    <div className="flex items-center gap-2">
      <StatusBadgeItem
        text="Passed"
        number={statusStats.passed}
        modifier="success"
      />
      <StatusBadgeItem
        text="Failed"
        number={statusStats.failed}
        modifier="error"
      />
      <StatusBadgeItem
        text="Skipped"
        number={statusStats.skipped}
        modifier="base"
      />
      <StatusBadgeItem
        text="Unknown"
        number={statusStats.timeout}
        modifier="warn"
      />
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
