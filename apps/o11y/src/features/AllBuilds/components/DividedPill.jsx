import React from 'react';
import PropagationBlocker from 'common/PropagationBlocker';

import { aggregateColors } from '../constants';

function DividedPill({ data }) {
  const handleChartClick = () => {
    // console.log(item);
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
        onKeyDown={(e) => {
          if (e.key === ' ' && e.key === 'Enter') {
            handleChartClick(item);
          }
        }}
        onClick={(e) => handleChartClick(e, item)}
      />
    ) : null
  );
}

export default DividedPill;
