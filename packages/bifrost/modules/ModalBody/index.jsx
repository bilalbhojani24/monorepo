import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

import './styles.scss';

const apply = true;

export const twClassNames = (...args) => twMerge(classNames(...args));

const ModalBody = ({ children, className }) => (
  <div
    className={twClassNames(
      'px-6 flex-1 overflow-y-scroll',
      { 'text-success-400': apply },
      className,
    )}
  >
    {children}
  </div>
);

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ModalBody.defaultProps = {
  className: '',
};

export default ModalBody;
