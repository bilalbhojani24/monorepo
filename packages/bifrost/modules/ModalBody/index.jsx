import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const ModalBody = ({ children, className }) => (
  <div
    className={twClassNames('px-6 flex-1 overflow-y-scroll', className)}
    tabIndex={0}
    role="scrollbar"
    aria-valuenow={0}
    aria-controls=""
  >
    {children}
  </div>
);

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

ModalBody.defaultProps = {
  className: ''
};

export default ModalBody;
