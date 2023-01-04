import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Button from '../Button';
import { XMarkIcon } from '../Icon';
import classNames from 'classnames';

import './styles.scss';

const Notifications = (props) => {
  const {
    description,
    isCondensed,
    handleClose,
    handlePositiveClick,
    negativeButtonProps,
    NotificationIcon,
    NotificationIconClassName,
    positiveButtonProps,
    show,
    title
  } = props;

  const renderButton = (props) => {
    if (Button) return <Button {...props} />;
  };

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {!isCondensed && (
                    <NotificationIcon
                      className={`h-6 w-6 text-base-400 ${NotificationIconClassName}`}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div
                  className={classNames('w-0 flex-1 pt-0.5', {
                    'ml-3': !isCondensed
                  })}
                >
                  <p className="text-sm font-medium text-base-900">{title}</p>
                  {!isCondensed && <p className="mt-1 text-sm text-base-500">{description}</p>}
                  {!isCondensed && (
                    <div
                      className={classNames('mt-3 flex space-x-7', {
                        hidden: !negativeButtonProps?.children && !positiveButtonProps?.children
                      })}
                    >
                      {renderButton(positiveButtonProps)}
                      {renderButton(negativeButtonProps)}
                    </div>
                  )}
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  {isCondensed && (
                    <button
                      type="button"
                      className="mr-3 flex-shrink-0 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        if (handlePositiveClick) handlePositiveClick();
                      }}
                    >
                      Undo
                    </button>
                  )}
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white text-base-400 hover:text-base-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      if (handleClose) handleClose();
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};

Notifications.propTypes = {
  description: PropTypes.string,
  isCondensed: PropTypes.bool,
  handleClose: PropTypes.func,
  handlePositiveClick: PropTypes.func,
  negativeButtonProps: PropTypes.shape(Button.propTypes),
  NotificationIcon: PropTypes.elementType,
  NotificationIconClassName: PropTypes.string,
  positiveButtonProps: PropTypes.shape(Button.propTypes),
  show: PropTypes.bool,
  title: PropTypes.string
};

Notifications.defaultProps = {
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.',
  isCondensed: false,
  handleClose: () => {},
  handlePositiveClick: () => {},
  negativeButtonProps: {},
  NotificationIcon: CheckCircleIcon,
  NotificationIconClassName: '',
  positiveButtonProps: {},
  show: false,
  title: 'Discussion moved'
};

export default Notifications;
