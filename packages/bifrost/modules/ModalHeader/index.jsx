import React from 'react';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';
import { XMarkIcon } from '../Icon';

import './styles.scss';

const ModalHeader = ({
  dismissButton,
  handleDismissClick,
  heading,
  isBorder,
  Icon,
  subHeading,
}) => (
  <div
    className={twClassNames(
      'w-full rounded-t-lg bg-white px-6 py-4 sm:flex sm:items-start',
      {
        'border-b border-base-300': isBorder,
      },
    )}
  >
    {Icon ? (
      <div className="bg-danger-100 mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10">
        <Icon className="text-danger-600 h-6 w-6" aria-hidden="true" />
      </div>
    ) : null}

    <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
      {heading || dismissButton ? (
        <div
          className={twClassNames('flex w-full', {
            'justify-between': heading,
            'justify-end': !heading,
          })}
        >
          {heading ? (
            <h3 className="text-base-900 text-lg font-medium leading-6">
              {heading}
            </h3>
          ) : null}

          {dismissButton ? (
            <button
              type="button"
              className="hover:text-base-500 focus:ring-brand-500 text-base-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => {
                if (handleDismissClick) handleDismissClick();
              }}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="text-base-400 h-6 w-6" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      ) : null}

      {subHeading ? (
        <div className="mt-2">
          <p className="text-base-500 text-sm">{subHeading}</p>
        </div>
      ) : null}
    </div>
  </div>
);

ModalHeader.propTypes = {
  dismissButton: PropTypes.bool,
  handleDismissClick: PropTypes.func,
  heading: PropTypes.string,
  isBorder: PropTypes.bool,
  Icon: PropTypes.node,
  subHeading: PropTypes.string,
};
ModalHeader.defaultProps = {
  dismissButton: true,
  handleDismissClick: () => {},
  heading: '',
  isBorder: false,
  Icon: null,
  subHeading: '',
};

export default ModalHeader;
