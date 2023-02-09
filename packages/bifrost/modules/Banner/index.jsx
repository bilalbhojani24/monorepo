import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { XMarkIcon } from '../Icon';

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
}) => {
  const renderDismissButton = () => (
    <button
      type="button"
      className="flex rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white"
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
  );

  const renderDescription = (truncate = true, inlineCTA = false) => (
    <p
      className={twClassNames(
        'ml-3 font-medium text-white',
        classes[modifier].textColor,
        {
          truncate
        }
      )}
    >
      {description}
      {inlineCTA && ctaButton ? (
        <span className="block sm:ml-2 sm:inline-block">{ctaButton}</span>
      ) : null}
    </p>
  );

  const renderCenteredBanner = () => (
    <>
      <div className="sm:px-16 sm:text-center">
        {description ? renderDescription(false, true) : null}
      </div>
      {isDismissButton ? (
        <div className="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:items-center sm:pr-2">
          {renderDismissButton()}
        </div>
      ) : null}
    </>
  );

  return (
    <div
      className={twClassNames(
        {
          'relative w-full': placement === BANNER_PLACEMENT[0],
          'fixed top-0 inset-x-0 z-999': placement === BANNER_PLACEMENT[1],
          'fixed bottom-0 inset-x-0 z-999': placement === BANNER_PLACEMENT[2]
        },
        classes[modifier].containerColor
      )}
    >
      <div className="mx-auto max-w-7xl p-3 sm:px-6 lg:px-8">
        {BANNER_ALIGN[1] === align ? (
          renderCenteredBanner()
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex w-0 flex-1 items-center">
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
                <p className="ml-3 truncate font-medium text-white">
                  {description ? renderDescription() : null}
                </p>
              </div>
              {ctaButton ? (
                <div className="mt-2 w-full sm:mt-0 sm:w-auto">{ctaButton}</div>
              ) : null}

              {isDismissButton ? (
                <div className={twClassNames('shrink-0 self-end sm:ml-3')}>
                  {renderDismissButton()}
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

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
