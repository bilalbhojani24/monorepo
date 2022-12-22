import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '../Icon';
import Button from '../Button';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const Drawer = (props) => {
  const { bodyNode, brandingHeader, description, footer, overlay, title, wider } = props;
  const [open, setOpen] = useState(true);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        {!overlay && <div className="fixed inset-0" />}
        {overlay && (
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
        )}

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={classNames(
                { 'sm:pl-16': wider },
                'pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'
              )}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className={classNames({ 'max-w-2xl': wider }, 'pointer-events-auto w-screen max-w-md')}>
                  <div
                    className={classNames(
                      { 'py-6': !brandingHeader },
                      'flex h-full flex-col overflow-y-scroll bg-white  shadow-xl'
                    )}
                  >
                    <div className={classNames({ 'bg-indigo-700 py-6': brandingHeader }, 'px-4 sm:px-6')}>
                      <div className="flex items-start justify-between">
                        <Dialog.Title
                          className={classNames(
                            { 'text-white': brandingHeader, 'text-gray-900': !brandingHeader },
                            'text-lg font-medium'
                          )}
                        >
                          {title}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className={classNames(
                              {
                                'bg-white text-gray-400': !brandingHeader,
                                'bg-indigo-700 text-indigo-200': brandingHeader
                              },
                              'rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                            )}
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      {brandingHeader && (
                        <div className="mt-1">
                          <p className="text-sm text-indigo-300">{description}</p>
                        </div>
                      )}
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {bodyNode}
                      {!bodyNode && (
                        <div className="absolute inset-0 px-4 sm:px-6">
                          <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                    {footer && (
                      <div className="flex flex-shrink-0 justify-end px-4 py-4">
                        <Button size="default" variant="white" onClick={() => setOpen(false)} wrapperClassName="mx-3">
                          Cancel
                        </Button>
                        <Button size="default" variant="primary">
                          Save
                        </Button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

Drawer.propTypes = {
  bodyNode: PropTypes.node,
  brandingHeader: PropTypes.bool,
  description: PropTypes.string,
  footer: PropTypes.bool,
  overlay: PropTypes.bool,
  title: PropTypes.string,
  wider: PropTypes.bool
};
Drawer.defaultProps = {
  bodyNode: null,
  brandingHeader: false,
  description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit aliquam ad hic recusandae soluta.',
  footer: false,
  overlay: false,
  title: 'Panel Title',
  wider: false
};

export default Drawer;
