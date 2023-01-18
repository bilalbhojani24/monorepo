/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';
import Button from '../Button';
import { XMarkIcon } from '../Icon';

import useSlideover from './useSlideover';

import './styles.scss';

const Slideover = (props) => {
  const {
    children,
    onClose,
    onOverlayClick,
    show,
    backgroundOverlay,
    slideoverWidth,
    closeButtonOutside,
    topMarginElementId,
  } = props;

  const { marginTopAdjustment } = useSlideover(topMarginElementId);

  return (
    <Transition show={show} unmount={false}>
      <Transition.Child
        appear="true"
        unmount={false}
        enter="ease-in duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          role="presentation"
          style={{ marginTop: marginTopAdjustment }}
          className={twClassNames(`bg-base-500 fixed inset-0 z-10`, {
            'opacity-75': backgroundOverlay,
            'opacity-0': !backgroundOverlay,
          })}
          onClick={() => {
            onOverlayClick?.();
          }}
        />
      </Transition.Child>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <Transition.Child
          as={Fragment}
          appear="true"
          unmount={false}
          enter="transform transition ease-out duration-500"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-out duration-500"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div
            style={{ marginTop: marginTopAdjustment }}
            className={twClassNames(
              `relative ml-auto flex h-full flex-col overflow-x-visible bg-white shadow-xl`,
              slideoverWidth,
            )}
          >
            {closeButtonOutside && (
              <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-1">
                <Button
                  colors="white"
                  size="large"
                  variant="minimal"
                  onClick={() => {
                    onClose?.();
                  }}
                >
                  <XMarkIcon
                    className="text-base-300 h-6 w-6"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            )}
            {children}
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

Slideover.propTypes = {
  children: PropTypes.node,
  onOverlayClick: PropTypes.func,
  onClose: PropTypes.func,
  show: PropTypes.bool,
  backgroundOverlay: PropTypes.bool,
  slideoverWidth: PropTypes.string,
  closeButtonOutside: PropTypes.bool,
  topMarginElementId: PropTypes.string,
};
Slideover.defaultProps = {
  children: null,
  onOverlayClick: null,
  onClose: null,
  show: false,
  backgroundOverlay: true,
  slideoverWidth: 'w-96',
  closeButtonOutside: false,
  topMarginElementId: '',
};

export default Slideover;
