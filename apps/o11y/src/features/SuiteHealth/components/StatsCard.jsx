import React from 'react';
import { Stats } from '@browserstack/bifrost';
import O11yLoader from 'common/O11yLoader';
import PropTypes from 'prop-types';

const StatsCard = ({ title, stat, subText, isLoading, graph }) => (
  <div className="relative flex-1">
    {isLoading && (
      <O11yLoader wrapperClassName="absolute top-0 left-0 w-full h-full rounded-lg z-10 bg-base-200 opacity-50" />
    )}
    <Stats
      cardWrapperClassname="cursor-default h-full"
      option={{
        id: `sh-${title}`,
        name: title,
        stat,
        subText,
        graph: (
          <div className="flex h-28 cursor-pointer justify-between">
            {graph}
          </div>
        ),
        icon: null,
        previousStat: null,
        link: null,
        onClick: () => {}
      }}
      variant="graph_variant"
      wrapperClassName="w-full h-full"
    />
  </div>
);

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  stat: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  graph: PropTypes.node.isRequired
};

StatsCard.defaultProps = {
  isLoading: false
};

export default StatsCard;
