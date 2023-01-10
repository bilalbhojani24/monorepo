import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { XMarkIcon } from '../Icon';

import './styles.scss';

const ModalHeader = ({
  dismissButton,
  handleDismissClick,
  heading,
  Icon,
  subHeading,
}) => (
  <div className="px-6 pt-4 sm:flex sm:items-start">
    {Icon ? (
      <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-danger-100 sm:h-10 sm:w-10">
        <Icon className="h-6 w-6 text-danger-600" aria-hidden="true" />
      </div>
    ) : null}

    <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
      {heading || dismissButton ? (
        <div
          className={`flex w-full  ${classNames({
            'justify-between': heading,
            'justify-end': !heading,
          })}`}
        >
          {heading ? (
            <h3 className="text-gray-900 text-lg font-medium leading-6">
              {heading}
            </h3>
          ) : null}

          {dismissButton ? (
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:ring-indigo-500 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => {
                if (handleDismissClick) handleDismissClick();
              }}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6 text-base-400" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      ) : null}

      {subHeading ? (
        <div className="mt-2">
          <p className="text-gray-500 text-sm">{subHeading}</p>
        </div>
      ) : null}
    </div>
  </div>
);

ModalHeader.propTypes = {
  dismissButton: PropTypes.bool,
  handleDismissClick: PropTypes.func,
  heading: PropTypes.string,
  Icon: PropTypes.node,
  subHeading: PropTypes.string,
};
ModalHeader.defaultProps = {
  dismissButton: true,
  handleDismissClick: () => {},
  heading: '',
  Icon: null,
  subHeading: '',
};

export default ModalHeader;
