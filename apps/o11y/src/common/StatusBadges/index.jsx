import React from 'react';
import { TEST_STATUS } from 'constants/common';
import PropTypes from 'prop-types';

import StatusBadgeItem from './StatusBadgeItem';

function StatusBadges({ statusStats, onClickHandler, size }) {
  return (
    <div className="flex items-center gap-2">
      <StatusBadgeItem
        size={size}
        text="Passed"
        number={statusStats.passed || 0}
        modifier="success"
        onClickHandler={(e) => {
          onClickHandler({ eventData: e, itemClicked: TEST_STATUS.PASS });
        }}
      />
      <StatusBadgeItem
        size={size}
        text="Failed"
        number={statusStats.failed || 0}
        modifier="error"
        onClickHandler={(e) =>
          onClickHandler({ eventData: e, itemClicked: TEST_STATUS.FAIL })
        }
      />
      <StatusBadgeItem
        size={size}
        text="Skipped"
        number={statusStats.skipped || 0}
        modifier="base"
        onClickHandler={(e) =>
          onClickHandler({ eventData: e, itemClicked: TEST_STATUS.SKIPPED })
        }
      />
      <StatusBadgeItem
        size={size}
        text="Unknown"
        number={statusStats.timeout || statusStats.unknown || 0}
        modifier="warn"
        onClickHandler={(e) =>
          onClickHandler({ eventData: e, itemClicked: TEST_STATUS.UNKNOWN })
        }
      />
    </div>
  );
}

StatusBadges.propTypes = {
  statusStats: PropTypes.shape({
    passed: PropTypes.number,
    failed: PropTypes.number,
    skipped: PropTypes.number,
    timeout: PropTypes.number,
    unknown: PropTypes.number
  }),
  onClickHandler: PropTypes.func,
  size: PropTypes.string
};
StatusBadges.defaultProps = {
  statusStats: {
    passed: 0,
    failed: 0,
    skipped: 0,
    timeout: 0,
    unknown: 0
  },
  onClickHandler: () => {},
  size: 'basic'
};

export default StatusBadges;
