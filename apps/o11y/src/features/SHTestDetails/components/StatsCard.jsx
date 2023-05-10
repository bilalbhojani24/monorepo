import React from 'react';
import PropTypes from 'prop-types';

const StatsCard = ({ title, data }) => (
  <div className="flex flex-1 flex-col gap-1 rounded-lg bg-white px-4 py-5 shadow-md">
    <span className="text-base-500 text-sm font-medium leading-5">{title}</span>
    <span className="text-base-900 text-3xl font-semibold leading-9">
      {data}
    </span>
  </div>
);

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired
};

export default StatsCard;
