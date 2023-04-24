import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const TableHead = ({ children, wrapperClassName }) => (
  <thead className={twClassNames('bg-base-50', wrapperClassName)}>
    {children}
  </thead>
);

TableHead.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.node
};
TableHead.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default TableHead;
