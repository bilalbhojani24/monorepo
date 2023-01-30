import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';

import {
  BANNER_ALIGN,
  BANNER_MODIFIER,
  BANNER_PLACEMENT,
  classes
} from './const/bannerConstants';

import './styles.scss';

const Banner = ({
  align,
  bannerIcon,
  ctaButton,
  description,
  isDismissButton,
  modifier,
  onDismissClick,
  placement
}) => (
  <div
    className={twClassNames(
      'relative fixed inset-x-0 mx-auto',
      {
        'bottom-0': placement === BANNER_PLACEMENT[1]
      },
      classes[modifier].containerColor
    )}
  >
    <div
      className={twClassNames('flex flex-wrap items-center  py-3 px-8', {
        'justify-between': BANNER_ALIGN[0] === align,
        'justify-center space-x-2': BANNER_ALIGN[1] === align
      })}
    >
      <div
        className={twClassNames('flex items-center', {
          'flex-1': BANNER_ALIGN[0] === align,
          'flex-0': BANNER_ALIGN[1] === align
        })}
      >
        {bannerIcon ? (
          <span
            className={twClassNames(
              'flex rounded-lg p-2',
              classes[modifier].iconBackgroundColor
            )}
          >
            {bannerIcon}
          </span>
        ) : null}

        {description ? (
          <p
            className={twClassNames(
              'ml-3 truncate font-medium text-white',
              classes[modifier].textColor
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {ctaButton ? (
        <div className="mt-2 w-full shrink-0 sm:mt-0 sm:w-auto">
          {ctaButton}
        </div>
      ) : null}

      {isDismissButton ? (
        <div
          className={twClassNames('shrink-0 self-end sm:ml-3', {
            'fixed right-10': BANNER_ALIGN[1] === align
          })}
        >
          <button
            type="button"
            className="-mr-1 flex rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
            onClick={() => onDismissClick?.()}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon
              className={twClassNames(
                'h-6 w-6 text-white',
                classes[modifier].dismissIconColor
              )}
              aria-hidden="true"
            />
          </button>
        </div>
      ) : null}
    </div>
  </div>
);

Banner.propTypes = {
  align: PropTypes.oneOf(BANNER_ALIGN),
  bannerIcon: PropTypes.node,
  ctaButton: PropTypes.node,
  description: PropTypes.string,
  isDismissButton: PropTypes.bool,
  modifier: PropTypes.oneOf(BANNER_MODIFIER),
  onDismissClick: PropTypes.func,
  placement: PropTypes.oneOf(BANNER_PLACEMENT)
};
Banner.defaultProps = {
  align: BANNER_ALIGN[0],
  bannerIcon: null,
  ctaButton: null,
  description: '',
  isDismissButton: true,
  modifier: BANNER_MODIFIER[0],
  onDismissClick: null,
  placement: BANNER_PLACEMENT[0]
};

export default Banner;
