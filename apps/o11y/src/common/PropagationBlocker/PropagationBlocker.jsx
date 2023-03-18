import React from 'react';
import PropTypes from 'prop-types';

export default function PropagationBlocker({ children, className }) {
  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={className}
      role="presentation"
      onClick={handleStopPropagation}
    >
      {children}
    </div>
  );
}
PropagationBlocker.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
PropagationBlocker.defaultProps = {
  className: ''
};
