/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';

import { MODAL_SIZE } from './const/modalConstants';

import './styles.scss';

const Modal = (props) => {
  const { children, onClose, onOverlayClick, show, size } = props;

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          if (onClose) onClose();
        }}
        onClick={() => {
          if (onOverlayClick) onOverlayClick();
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
          <div className="bg-base-500 fixed inset-0 opacity-75 transition-opacity" />
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
                className={twClassNames(
                  'relative flex max-h-[35rem] flex-col rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full',
                  {
                    'sm:max-w-sm': MODAL_SIZE[0] === size,
                    'sm:max-w-md': MODAL_SIZE[1] === size,
                    'sm:max-w-lg': MODAL_SIZE[2] === size,
                    'sm:max-w-xl': MODAL_SIZE[3] === size,
                    'sm:max-w-2xl': MODAL_SIZE[4] === size,
                    'sm:max-w-3xl': MODAL_SIZE[5] === size,
                    'sm:max-w-4xl': MODAL_SIZE[6] === size,
                    'sm:max-w-full': MODAL_SIZE[7] === size,
                  },
                )}
              >
                {children}
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
  onOverlayClick: PropTypes.func,
  onClose: PropTypes.func,
  show: PropTypes.bool,
  size: PropTypes.string,
};
Modal.defaultProps = {
  children: null,
  onOverlayClick: null,
  onClose: null,
  show: false,
  size: MODAL_SIZE[2],
};

export default Modal;
