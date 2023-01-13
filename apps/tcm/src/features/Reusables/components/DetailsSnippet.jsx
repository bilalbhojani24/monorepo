import React from 'react';
import PropTypes from 'prop-types';

const DetailsSnippet = ({ title, value }) => (
  <div className="mb-4 flex flex-col">
    <div className="text-sm font-semibold">{title}</div>
    <div className="text-sm text-base-700">{value}</div>
  </div>
);

DetailsSnippet.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType(PropTypes.string, PropTypes.node),
};

DetailsSnippet.defaultProps = {
  title: '',
  value: '',
};

export default DetailsSnippet;
