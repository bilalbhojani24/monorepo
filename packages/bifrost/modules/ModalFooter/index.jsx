import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { POSITION } from './const/modalFooterConstants';

import './styles.scss';

const ModalFooter = ({
  backgroundColorClass,
  children,
  isBorder,
  position,
}) => (
  <div
    className={classNames(
      `sticky bottom-0 left-0 w-full space-y-2 space-x-3 px-6 py-4 sm:flex sm:space-y-0 ${backgroundColorClass}`,
      {
        'sm:justify-end': position === POSITION[1],
        'sm:justify-center': position === POSITION[2],
        'border-t border-base-300': isBorder,
      },
    )}
  >
    {children}
  </div>
);

ModalFooter.propTypes = {
  backgroundColorClass: PropTypes.string,
  children: PropTypes.node,
  isBorder: PropTypes.bool,
  position: PropTypes.oneOf(POSITION),
};
ModalFooter.defaultProps = {
  backgroundColorClass: '',
  children: null,
  isBorder: false,
  position: POSITION[0],
};

export default ModalFooter;
