import React from 'react';
import className from 'classnames';
import PropTypes from 'prop-types';

const DetailsSnippet = ({ title, value, isPrimary }) => (
  <div className="mb-4 flex flex-col">
    <div
      className={className(
        isPrimary ? 'text-base font-medium' : 'text-sm font-semibold'
      )}
    >
      {title}
    </div>
    <div className="text-base-700 text-sm capitalize">{value}</div>
  </div>
);

DetailsSnippet.propTypes = {
  title: PropTypes.string,
  isPrimary: PropTypes.bool,
  value: PropTypes.oneOfType(PropTypes.string, PropTypes.node)
};

DetailsSnippet.defaultProps = {
  isPrimary: false,
  title: '',
  value: ''
};

export default DetailsSnippet;
