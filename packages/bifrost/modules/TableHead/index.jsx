import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const TableHead = ({ children, wrapperClass }) => (
  <thead className={twClassNames('bg-base-50', wrapperClass)}>{children}</thead>
);

TableHead.propTypes = {
  children: PropTypes.node,
  wrapperClass: PropTypes.node
};
TableHead.defaultProps = {
  children: null,
  wrapperClass: ''
};

export default TableHead;
