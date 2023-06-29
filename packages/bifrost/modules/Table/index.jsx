import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const Table = ({
  children,
  containerWrapperClass,
  tableWrapperClass,
  bottomShadow,
  isSticky
}) => (
  <div
    className={twClassNames(
      'overflow-hidden overflow-x-auto bg-white shadow ring-1 ring-black/5 md:rounded-lg',
      !bottomShadow && 'shadow-none',
      containerWrapperClass
    )}
  >
    <table
      className={twClassNames(
        'divide-base-300 min-w-full',
        {
          'border-separate': isSticky
        },
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
  tableWrapperClass: PropTypes.string,
  bottomShadow: PropTypes.bool,
  isSticky: PropTypes.bool
};
Table.defaultProps = {
  children: null,
  containerWrapperClass: '',
  tableWrapperClass: '',
  bottomShadow: true,
  isSticky: false
};

export default Table;
