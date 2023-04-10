import React from 'react';
import { O11yTooltip } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

function UniqueErrorTitle({ title }) {
  const titleSplit = title.split('\n');
  return (
    <>
      {titleSplit.slice(0, 3).map((text) => (
        <p className="" key={text}>
          {text}
        </p>
      ))}
      {titleSplit.length > 3 && (
        <O11yTooltip placementSide="bottom" mouseEnterDelay={250}>
          <p className="text-xs">...{titleSplit.length - 3} more line(s)</p>
        </O11yTooltip>
      )}
    </>
  );
}

UniqueErrorTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default UniqueErrorTitle;
