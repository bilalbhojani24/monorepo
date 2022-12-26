import React from 'react';
import PropTypes from 'prop-types';
import {
  CheckIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Modal from '../Modal';
import Button from '../Button';
import { MODAL_SIZE } from '../Modal/const/modalConstants';
import { BUTTON_ALIGNMENT } from './const/modalActionButtonConstants';

import './styles.scss';

const ModalWActionButtons = (props) => {
  const {
    buttonAlignment,
    description,
    handleNegativeButtonClick,
    handlePositiveButtonClick,
    isAlert,
    negativeButtonLabel,
    onClose,
    positiveButtonLabel,
    show,
    size,
    title,
  } = props;

  const renderHeader = () => {
    if (isAlert)
      return (
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 as="h3" className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        </div>
      );
    return (
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal size={size} show={show} onClose={onClose}>
      {renderHeader()}
      <div
        className={classNames(
          'mt-5 sm:flex sm:space-x-3 space-y-2 sm:space-y-0',
          {
            'sm:justify-end': isAlert,
            'sm:justify-start':
              buttonAlignment === BUTTON_ALIGNMENT[0] && isAlert,
          }
        )}
      >
        {negativeButtonLabel ? (
          <Button
            variant="white"
            wrapperClassName={classNames('inline-flex justify-center', {
              'w-full': !isAlert,
            })}
            onClick={() => {
              if (handleNegativeButtonClick) handleNegativeButtonClick();
            }}
          >
            {negativeButtonLabel}
          </Button>
        ) : null}
        {positiveButtonLabel ? (
          <Button
            buttonType="half-rounded-button"
            wrapperClassName={classNames('inline-flex justify-center', {
              'w-full': !isAlert,
              'bg-red-600': isAlert,
            })}
            onClick={() => {
              if (handlePositiveButtonClick) handlePositiveButtonClick();
            }}
          >
            {positiveButtonLabel}
          </Button>
        ) : null}
      </div>
    </Modal>
  );
};

ModalWActionButtons.propTypes = {
  buttonAlignment: PropTypes.string,
  description: PropTypes.string,
  handleNegativeButtonClick: PropTypes.func,
  handlePositiveButtonClick: PropTypes.func,
  isAlert: PropTypes.bool,
  negativeButtonLabel: PropTypes.string,
  onClose: PropTypes.func,
  positiveButtonLabel: PropTypes.string,
  show: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
};
ModalWActionButtons.defaultProps = {
  buttonAlignment: BUTTON_ALIGNMENT[1],
  description: '',
  handleNegativeButtonClick: () => {},
  handlePositiveButtonClick: () => {},
  isAlert: false,
  negativeButtonLabel: 'Cancel',
  onClose: () => {},
  positiveButtonLabel: 'Submit',
  show: false,
  size: MODAL_SIZE[0],
  title: '',
};

export default ModalWActionButtons;
