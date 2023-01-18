import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';
import { XMarkIcon } from '../Icon';

import './styles.scss';

const SlideoverHeader = ({
  dismissButton,
  handleDismissClick,
  heading,
  isBorder,
  Icon,
  subHeading,
  backgroundColorClass,
  lightText,
}) => (
  <div
    className={twClassNames(
      `sticky top-0 left-0 w-full overflow-hidden  bg-white px-6 py-4 sm:flex sm:items-start`,
      {
        'border-b border-base-300': isBorder,
      },
      backgroundColorClass,
    )}
  >
    {Icon ? (
      <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10">
        {Icon}
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
            <h3
              className={twClassNames(
                'text-base-900 text-lg font-medium leading-6',
                {
                  'text-white': lightText,
                },
              )}
            >
              {heading}
            </h3>
          ) : null}

          {dismissButton ? (
            <button
              type="button"
              className={twClassNames(
                ' focus:ring-brand-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
                {
                  'text-white hover:text-base-100  bg-tansparent': lightText,
                  'text-base-400 hover:text-base-500 bg-white': !lightText,
                },
              )}
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
          <p
            className={twClassNames(' text-sm', {
              'text-white': lightText,
              'text-base-500': !lightText,
            })}
          >
            {subHeading}
          </p>
        </div>
      ) : null}
    </div>
  </div>
);

SlideoverHeader.propTypes = {
  dismissButton: PropTypes.bool,
  handleDismissClick: PropTypes.func,
  heading: PropTypes.string,
  isBorder: PropTypes.bool,
  Icon: PropTypes.node,
  subHeading: PropTypes.string,
  backgroundColorClass: PropTypes.string,
  lightText: PropTypes.bool,
};
SlideoverHeader.defaultProps = {
  dismissButton: true,
  handleDismissClick: () => {},
  heading: '',
  isBorder: false,
  Icon: null,
  subHeading: '',
  backgroundColorClass: '',
  lightText: false,
};

export default SlideoverHeader;
