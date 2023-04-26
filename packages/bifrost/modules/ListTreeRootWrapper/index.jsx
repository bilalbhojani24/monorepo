import React from 'react';
import PropTypes from 'prop-types';

const ListTreeRootWrapper = ({ children }) => (
  <div role="tree" aria-busy="true">
    <div role="group">{children}</div>
  </div>
);

ListTreeRootWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default ListTreeRootWrapper;
