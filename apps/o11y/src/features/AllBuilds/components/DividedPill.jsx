import React from 'react';
import { useParams } from 'react-router-dom';
import PropagationBlocker from 'common/PropagationBlocker';

import { aggregateColors } from '../constants';

function DividedPill({ data }) {
  const { projectNormalisedName } = useParams();

  const handleChartClick = (itemClicked) => {
    // eslint-disable-next-line no-console
    console.log('Analytics issueType : itemClicked', itemClicked);
  };

  const totalDefects = Object.values(data.issueTypeAggregate).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return Object.keys(data?.issueTypeAggregate)?.map((item) =>
    data?.issueTypeAggregate[item] ? (
      <PropagationBlocker
        variant="a"
        key={item}
        label={item}
        className="h-3"
        tabIndex={0}
        role="button"
        href={`/projects/${projectNormalisedName}/builds/${
          data?.isAutoDetectedName ? data?.originalName : data?.name
        }/3?tab=tests&issueType=${item}`}
        style={{
          width: `${(data?.issueTypeAggregate[item] * 100) / totalDefects}%`,
          backgroundColor: aggregateColors[item]
        }}
        onKeyDown={(e) => {
          if (e.key === ' ' && e.key === 'Enter') {
            handleChartClick(item);
          }
        }}
        onClick={() => handleChartClick(item)}
      />
    ) : null
  );
}

export default DividedPill;
