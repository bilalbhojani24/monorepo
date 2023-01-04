import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dialog, Transition } from '@headlessui/react';
import { MODAL_SIZE } from './const/modalConstants';
import { XMarkIcon } from '../Icon';

import './styles.scss';

const Modal = (props) => {
  const { children, isFooter, handleDismissButtonClick, show, size, onClose, withDismissButton } = props;
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          if (onClose) onClose();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-base-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  'relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full px-0 sm:p-0',
                  {
                    'sm:max-w-sm': MODAL_SIZE[0] === size,
                    'sm:max-w-md': MODAL_SIZE[1] === size,
                    'sm:max-w-lg': MODAL_SIZE[2] === size
                  }
                )}
              >
                {withDismissButton ? (
                  <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-base-400 hover:text-base-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        if (handleDismissButtonClick) handleDismissButtonClick();
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                ) : null}
                {children ? children : null}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  isFooter: PropTypes.bool,
  onClose: PropTypes.func,
  size: PropTypes.string,
  show: PropTypes.bool
};

Modal.defaultProps = {
  children: null,
  isFooter: false,
  handleDismissButtonClick: () => {},
  onClose: () => {},
  show: false,
  size: MODAL_SIZE[2],
  withDismissButton: false
};

export default Modal;
