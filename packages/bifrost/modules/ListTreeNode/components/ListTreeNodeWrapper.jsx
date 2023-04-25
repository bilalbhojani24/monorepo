import React from 'react';
import PropTypes from 'prop-types';

function ListTreeNodeWrapper(
  { isNodeSelectable, children, onNodeClick, wrapperClassName },
  ref
) {
  return isNodeSelectable ? (
    <div
      ref={ref}
      tabIndex="0"
      role="button"
      onClick={onNodeClick}
      onKeyPress={() => {}}
      className={wrapperClassName}
    >
      {children}
    </div>
  ) : (
    <div ref={ref} className={wrapperClassName}>
      {children}
    </div>
  );
}

ListTreeNodeWrapper.propTypes = {
  isNodeSelectable: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onNodeClick: PropTypes.func.isRequired,
  wrapperClassName: PropTypes.string.isRequired
};

export default React.forwardRef(ListTreeNodeWrapper);
