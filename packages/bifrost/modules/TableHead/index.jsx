import React from 'react';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';

import './styles.scss';

const TableHead = ({ children, wrapperClass }) => (
  <thead className={twClassNames('bg-base-50', wrapperClass)}>{children}</thead>
);

TableHead.propTypes = {
  children: PropTypes.node,
  wrapperClass: PropTypes.node,
};
TableHead.defaultProps = {
  children: null,
  wrapperClass: '',
};

export default TableHead;
