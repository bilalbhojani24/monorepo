import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { MODAL_SIZE } from './const/modalConstants';

import './styles.scss';

const Modal = (props) => {
  const { body, footer, header, onClose, show, size } = props;
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
                className={`relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full ${classNames(
                  {
                    'sm:max-w-sm': MODAL_SIZE[0] === size,
                    'sm:max-w-md': MODAL_SIZE[1] === size,
                    'sm:max-w-lg': MODAL_SIZE[2] === size,
                  },
                )}`}
              >
                {header}
                <div className="mt-5 px-6">{body}</div>
                {footer}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

Modal.propTypes = {
  body: PropTypes.node,
  footer: PropTypes.node,
  header: PropTypes.node,
  onClose: PropTypes.func,
  show: PropTypes.bool,
  size: PropTypes.string,
};
Modal.defaultProps = {
  body: null,
  footer: null,
  header: null,
  onClose: () => {},
  show: false,
  size: MODAL_SIZE[2],
};

export default Modal;
