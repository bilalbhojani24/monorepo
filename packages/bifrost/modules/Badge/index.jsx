import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BADGE_SIZE, BADGE_MODIFIER } from './const/badgeConstants';
import './styles.scss';

const Badge = ({ hasDot, hasRemoveButton, isRounded, modifier, onClose, size, text, wrapperClassName }) => {
  return (
    <span
      className={classNames('inline-flex items-center font-medium ashutosh-badge', wrapperClassName, {
        'px-2.5 py-0.5 text-xs': size === BADGE_SIZE[0],
        'px-3 py-0.5 text-sm': size === BADGE_SIZE[1],
        'bg-gray-100 text-gray-800': modifier === BADGE_MODIFIER[0],
        'bg-blue-100 text-blue-800': modifier === BADGE_MODIFIER[1],
        'bg-green-100 text-green-800': modifier === BADGE_MODIFIER[2],
        'bg-red-100 text-red-800': modifier === BADGE_MODIFIER[3],
        'bg-yellow-100 text-yellow-800': modifier === BADGE_MODIFIER[4],
        'rounded-full': !isRounded,
        'rounded ': isRounded,
        'pr-0.5': hasRemoveButton && size === BADGE_SIZE[0],
        'pr-1': hasRemoveButton && size === BADGE_SIZE[1]
      })}
    >
      {hasDot && (
        <svg
          className={classNames('-ml-0.5 mr-1.5 h-2 w-2 ', {
            'text-gray-400': modifier === BADGE_MODIFIER[0],
            'text-blue-400': modifier === BADGE_MODIFIER[1],
            'text-green-400': modifier === BADGE_MODIFIER[2],
            'text-red-400': modifier === BADGE_MODIFIER[3],
            'text-yellow-400': modifier === BADGE_MODIFIER[4]
          })}
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle cx={4} cy={4} r={3} />
        </svg>
      )}
      {text}
      {hasRemoveButton && (
        <button
          onClick={onClose}
          type="button"
          className={classNames(
            'ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full focus:text-white focus:outline-none',
            {
              'hover:bg-gray-200 hover:text-gray-500 focus:bg-gray-500 text-gray-400': modifier === BADGE_MODIFIER[0],
              'hover:bg-blue-200 hover:text-blue-500 focus:bg-blue-500 text-blue-400': modifier === BADGE_MODIFIER[1],
              'hover:bg-green-200 hover:text-green-500 focus:bg-green-500 text-green-400':
                modifier === BADGE_MODIFIER[2],
              'hover:bg-red-200 hover:text-red-500 focus:bg-red-500 text-red-400': modifier === BADGE_MODIFIER[3],
              'hover:bg-yellow-200 hover:text-yellow-500 focus:bg-yellow-500 text-yellow-400':
                modifier === BADGE_MODIFIER[4]
            }
          )}
        >
          <span className="sr-only">Remove small option</span>
          <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
          </svg>
        </button>
      )}
    </span>
  );
};

Badge.propTypes = {
  hasDot: PropTypes.bool,
  hasRemoveButton: PropTypes.bool,
  isRounded: PropTypes.bool,
  modifier: PropTypes.string,
  onClose: PropTypes.func,
  size: PropTypes.string,
  text: PropTypes.string,
  wrapperClassName: PropTypes.string
};

Badge.defaultProps = {
  hasDot: false,
  hasRemoveButton: false,
  isRounded: false,
  modifier: BADGE_MODIFIER[0],
  onClose: () => {},
  size: BADGE_SIZE[0],
  text: '',
  wrapperClassName: ''
};

export default Badge;
