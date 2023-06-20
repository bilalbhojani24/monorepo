import React from 'react';
import PropagationBlocker from 'common/PropagationBlocker';

import { aggregateColors } from '../constants';

function DividedPill({ data, onIssueTypeClicked }) {
  const handleChartClick = (itemClicked) => {
    onIssueTypeClicked(itemClicked);
  };

  const totalDefects = Object.values(data.issueTypeAggregate).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return Object.keys(data?.issueTypeAggregate)?.map((item) =>
    data?.issueTypeAggregate[item] ? (
      <PropagationBlocker
        key={item}
        label={item}
        className="h-3"
        tabIndex={0}
        role="button"
        style={{
          width: `${(data?.issueTypeAggregate[item] * 100) / totalDefects}%`,
          backgroundColor: aggregateColors[item]
        }}
        onClick={() => handleChartClick(item)}
      />
    ) : null
  );
}

export default DividedPill;
