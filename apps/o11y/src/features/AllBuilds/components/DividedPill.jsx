import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropagationBlocker from 'common/PropagationBlocker';

import { aggregateColors } from '../constants';

function DividedPill({ data }) {
  const navigate = useNavigate();
  const { projectNormalisedName } = useParams();

  const handleChartClick = (itemClicked) => {
    let endpoint = `/projects/${projectNormalisedName}/builds/alertbuild/3?tab=tests`;
    endpoint += `&issueTypeGroup=${itemClicked}`;
    navigate(endpoint);
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
        onClick={() => handleChartClick(item)}
      />
    ) : null
  );
}

export default DividedPill;