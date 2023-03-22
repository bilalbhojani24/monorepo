import React from 'react';
import PropTypes from 'prop-types';

const componentType = {
  div: 'div',
  span: 'span',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  li: 'li'
};
export default function PropagationBlocker(props) {
  const { children, onClick, variant } = props;
  const handleStopPropagation = (e) => {
    e.stopPropagation();
    onClick?.(e);
  };
  const Component = componentType[variant];
  return (
    <Component role="presentation" {...props} onClick={handleStopPropagation}>
      {children}
    </Component>
  );
}
PropagationBlocker.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.string
};
PropagationBlocker.defaultProps = {
  onClick: undefined,
  variant: 'div'
};
