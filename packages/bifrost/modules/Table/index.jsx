import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Table = ({ children, containerClass, tableClass }) => (
  <div
    className={`overflow-hidden overflow-x-auto bg-white shadow ring-1 ring-black/5 md:rounded-lg ${containerClass}`}
  >
    <table className={`divide-base-300 min-w-full divide-y ${tableClass}`}>
      {children}
    </table>
  </div>
);

Table.propTypes = {
  children: PropTypes.node,
  containerClass: PropTypes.string,
  tableClass: PropTypes.string,
};
Table.defaultProps = {
  children: null,
  containerClass: '',
  tableClass: '',
};

export default Table;
