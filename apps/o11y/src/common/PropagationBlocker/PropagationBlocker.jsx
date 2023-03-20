import React from 'react';
import PropTypes from 'prop-types';

export default function PropagationBlocker(props) {
  const { children, onClick } = props;
  const handleStopPropagation = (e) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <div role="presentation" {...props} onClick={handleStopPropagation}>
      {children}
    </div>
  );
}
PropagationBlocker.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
};
PropagationBlocker.defaultProps = {
  onClick: undefined
};
