import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

import Modal from '../Modal';
import Button from '../Button';

const ModalWAlert = (props) => {
  const {
    description,
    handleNegativeButtonClick,
    handlePositiveButtonClick,
    negativeButtonLabel,
    onClose,
    positiveButtonLabel,
    show,
    size,
    title,
  } = props;

  return (
    <Modal size={size} show={show} onClose={onClose}>
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
      <div className="mt-5 sm:flex sm:space-x-3 space-y-2 sm:space-y-0">
        {negativeButtonLabel ? (
          <Button
            variant="white"
            wrapperClassName="inline-flex w-full justify-center"
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
            wrapperClassName="inline-flex w-full justify-center"
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

ModalWAlert.propTypes = {
  description: PropTypes.string,
  handleNegativeButtonClick: PropTypes.func,
  handlePositiveButtonClick: PropTypes.func,
  negativeButtonLabel: PropTypes.string,
  onClose: PropTypes.func,
  positiveButtonLabel: PropTypes.string,
  show: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
};
ModalWAlert.defaultProps = {
  description: '',
  handleNegativeButtonClick: () => {},
  handlePositiveButtonClick: () => {},
  negativeButtonLabel: 'Cancel',
  onClose: () => {},
  positiveButtonLabel: 'Submit',
  show: false,
  size: MODAL_SIZE[0],
  title: '',
};

export default ModalWAlert;
