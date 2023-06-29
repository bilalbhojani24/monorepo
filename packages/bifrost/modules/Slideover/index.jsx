import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { XMarkIcon } from '../Icon';

import { MODAL_SIZE } from './const/modalConstants';
import useSlideover from './useSlideover';

const Slideover = React.forwardRef((props) => {
  const containerRef = useRef();

  const {
    children,
    onCloseWithOutsideButton,
    onEscPress,
    onOverlayClick,
    show,
    backgroundOverlay,
    size,
    closeButtonOutside,
    topMarginElementId,
    isFluid,
    resizeableWrapper,
    initialFocusRef
  } = props;

  const ResizeableWraperProp = resizeableWrapper;
  const childrenWrapperClassNames =
    'relative flex h-full flex-col overflow-auto bg-white shadow-xl w-screen inset-0';
  const { marginTopAdjustment } = useSlideover(topMarginElementId);

  const handleIfEscapeClicked = useCallback(
    (event) => {
      if (event.key === 'Escape' && onEscPress) {
        onEscPress?.();
      }
    },
    [onEscPress]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleIfEscapeClicked);
    return () => {
      window.removeEventListener('keydown', handleIfEscapeClicked);
    };
  }, [handleIfEscapeClicked]);

  useEffect(() => {
    if (show) {
      if (initialFocusRef && initialFocusRef.current) {
        setTimeout(() => {
          initialFocusRef.current?.focus();
        }, 0);
      } else {
        const containerNode = containerRef.current;
        const focusableEls = containerNode.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstFocusableEl = focusableEls[0];
        setTimeout(() => {
          firstFocusableEl?.focus();
        }, 0);
      }
    }
  }, [initialFocusRef, show]);

  return (
    <div ref={containerRef}>
      <Transition show={show} unmount={false}>
        {backgroundOverlay ? (
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
                'opacity-0': !backgroundOverlay
              })}
              onClick={() => {
                onOverlayClick?.();
              }}
            />
          </Transition.Child>
        ) : null}

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
            className="fixed inset-y-0 right-0 z-10 flex items-start"
            style={{ marginTop: marginTopAdjustment }}
          >
            {closeButtonOutside && (
              <div className="flex pr-1 pt-4">
                <Button
                  colors="white"
                  size="large"
                  variant="minimal"
                  onClick={() => {
                    onCloseWithOutsideButton?.();
                  }}
                  aria-label="close icon"
                >
                  <XMarkIcon
                    className="text-base-300 h-6 w-6"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            )}

            {isFluid ? (
              <ResizeableWraperProp>
                <div
                  className={twClassNames(childrenWrapperClassNames, 'w-full')}
                >
                  {children}
                </div>
              </ResizeableWraperProp>
            ) : (
              <div
                className={twClassNames(childrenWrapperClassNames, {
                  'sm:max-w-sm': MODAL_SIZE[0] === size,
                  'sm:max-w-md': MODAL_SIZE[1] === size,
                  'sm:max-w-lg': MODAL_SIZE[2] === size,
                  'sm:max-w-xl': MODAL_SIZE[3] === size,
                  'sm:max-w-2xl': MODAL_SIZE[4] === size,
                  'sm:max-w-3xl': MODAL_SIZE[5] === size,
                  'sm:max-w-4xl': MODAL_SIZE[6] === size,
                  'sm:max-w-5xl': MODAL_SIZE[7] === size,
                  'sm:max-w-6xl': MODAL_SIZE[8] === size,
                  'sm:max-w-full': MODAL_SIZE[9] === size
                })}
              >
                {children}
              </div>
            )}
          </div>
        </Transition.Child>
      </Transition>
    </div>
  );
});

const DefaultResizeableComponent = ({ children }) => <>{children}</>;
DefaultResizeableComponent.propTypes = {
  children: PropTypes.node.isRequired
};

Slideover.propTypes = {
  children: PropTypes.node,
  initialFocusRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  onOverlayClick: PropTypes.func,
  onCloseWithOutsideButton: PropTypes.func,
  onEscPress: PropTypes.func,
  show: PropTypes.bool,
  backgroundOverlay: PropTypes.bool,
  size: PropTypes.string,
  closeButtonOutside: PropTypes.bool,
  topMarginElementId: PropTypes.string,
  isFluid: PropTypes.bool,
  resizeableWrapper: PropTypes.func
};

Slideover.defaultProps = {
  children: null,
  initialFocusRef: null,
  onOverlayClick: null,
  onCloseWithOutsideButton: null,
  onEscPress: null,
  show: false,
  backgroundOverlay: true,
  size: MODAL_SIZE[2],
  closeButtonOutside: false,
  topMarginElementId: '',
  isFluid: false,
  resizeableWrapper: DefaultResizeableComponent
};

export default Slideover;
