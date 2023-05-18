import React, { forwardRef, Fragment } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Dialog, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

const Modal = forwardRef((props, ref) => {
  const {
    children,
    onClose,
    onOverlayClick,
    show,
    wrapperClassName,
    backdropWrapperClassName
  } = props;

  return (
    <Transition.Root show={show}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          if (onClose) onClose();
          if (onOverlayClick) onOverlayClick();
        }}
        initialFocus={ref}
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-base-500 fixed inset-0 transition-opacity" />
        </Transition.Child>

        <div
          className={twClassNames(
            'fixed inset-0 z-10 overflow-y-auto',
            backdropWrapperClassName
          )}
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel
                className={twClassNames(
                  'relative flex max-h-[75vh] sm:max-w-xl flex-col rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full',
                  wrapperClassName
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
});

Modal.propTypes = {
  children: PropTypes.node,
  onOverlayClick: PropTypes.func,
  onClose: PropTypes.func,
  show: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  backdropWrapperClassName: PropTypes.string
};
Modal.defaultProps = {
  children: null,
  onOverlayClick: null,
  onClose: null,
  show: false,
  wrapperClassName: '',
  backdropWrapperClassName: ''
};

export default Modal;
