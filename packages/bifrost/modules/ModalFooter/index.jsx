import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from '../Button';

import { POSITION, VARIANT } from './const/modalFooterConstants';

import './styles.scss';

const ModalFooter = ({
  backgroundColorClass,
  children,
  handlePrimaryButtonClick,
  handleSecondaryButtonClick,
  position,
  primaryButtonLabel,
  secondaryButtonLabel,
  variant,
}) => (
  <div
    className={classNames(
      `mt-5 space-y-2 space-x-3 px-6 py-4 sm:flex sm:space-y-0  ${backgroundColorClass}`,
      {
        'sm:justify-end': position === POSITION[1],
      },
    )}
  >
    {children || (
      <>
        {secondaryButtonLabel ? (
          <Button
            variant="white"
            wrapperClassName={classNames('inline-flex justify-center', {
              'w-full': position === POSITION[2],
              'order-last ml-3': position === POSITION[0],
            })}
            onClick={() => {
              if (handleSecondaryButtonClick) handleSecondaryButtonClick();
            }}
          >
            {secondaryButtonLabel}
          </Button>
        ) : null}
        {primaryButtonLabel ? (
          <Button
            buttonType="half-rounded-button"
            wrapperClassName={classNames('inline-flex justify-center', {
              'w-full': position === POSITION[2],
              'bg-danger-600 hover:bg-danger-700 text-white':
                variant === VARIANT[1],
              'bg-brand-600 text-white': variant === VARIANT[0],
            })}
            onClick={() => {
              if (handlePrimaryButtonClick) handlePrimaryButtonClick();
            }}
          >
            {primaryButtonLabel}
          </Button>
        ) : null}
      </>
    )}
  </div>
);

ModalFooter.propTypes = {
  backgroundColorClass: PropTypes.string,
  children: PropTypes.node,
  handlePrimaryButtonClick: PropTypes.func,
  handleSecondaryButtonClick: PropTypes.func,
  position: PropTypes.oneOf(POSITION),
  primaryButtonLabel: PropTypes.string,
  secondaryButtonLabel: PropTypes.string,
  variant: PropTypes.oneOf(VARIANT),
};
ModalFooter.defaultProps = {
  backgroundColorClass: '',
  children: null,
  handlePrimaryButtonClick: () => {},
  handleSecondaryButtonClick: () => {},
  position: POSITION[0],
  primaryButtonLabel: 'Submit',
  secondaryButtonLabel: 'Cancel',
  variant: VARIANT[0],
};

export default ModalFooter;
