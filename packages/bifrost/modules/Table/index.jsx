import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const Table = ({ children, containerWrapperClass, tableWrapperClass }) => (
  <div
    className={twClassNames(
      'overflow-hidden overflow-x-auto bg-white shadow ring-1 ring-black/5 md:rounded-lg',
      containerWrapperClass
    )}
  >
    <table
      className={twClassNames(
        'divide-base-300 min-w-full divide-y ',
        tableWrapperClass
      )}
    >
      {children}
    </table>
  </div>
);

Table.propTypes = {
  children: PropTypes.node,
  containerWrapperClass: PropTypes.string,
  tableWrapperClass: PropTypes.string
};
Table.defaultProps = {
  children: null,
  containerWrapperClass: '',
  tableWrapperClass: ''
};

export default Table;
