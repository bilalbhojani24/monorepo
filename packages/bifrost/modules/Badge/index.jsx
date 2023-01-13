import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BADGE_SIZE, BADGE_MODIFIER } from './const/badgeConstants';
import './styles.scss';

const Badge = ({ hasDot, hasRemoveButton, isRounded, modifier, onClose, size, text, wrapperClassName }) => {
  return (
    <span
      className={classNames('inline-flex items-center font-medium', wrapperClassName, {
        'px-2.5 py-0.5 text-xs': size === BADGE_SIZE[0],
        'px-3 py-0.5 text-sm': size === BADGE_SIZE[1],
        'bg-base-100 text-base-800': modifier === BADGE_MODIFIER[0],
        'bg-brand-100 text-brand-800': modifier === BADGE_MODIFIER[1],
        'bg-success-100 text-success-800': modifier === BADGE_MODIFIER[2],
        'bg-danger-100 text-danger-800': modifier === BADGE_MODIFIER[3],
        'bg-attention-100 text-attention-800': modifier === BADGE_MODIFIER[4],
        'bg-info-100 text-info-800': modifier === BADGE_MODIFIER[5],
        'rounded-full': !isRounded,
        'rounded ': isRounded,
        'pr-0.5': hasRemoveButton && size === BADGE_SIZE[0],
        'pr-1': hasRemoveButton && size === BADGE_SIZE[1]
      })}
    >
      {hasDot && (
        <svg
          className={classNames('-ml-0.5 mr-1.5 h-2 w-2 ', {
            'text-base-400': modifier === BADGE_MODIFIER[0],
            'text-brand-400': modifier === BADGE_MODIFIER[1],
            'text-success-400': modifier === BADGE_MODIFIER[2],
            'text-danger-400': modifier === BADGE_MODIFIER[3],
            'text-attention-400': modifier === BADGE_MODIFIER[4],
            'text-info-400': modifier === BADGE_MODIFIER[5]
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
              'hover:bg-base-200 hover:text-base-500 focus:bg-base-500 text-base-400': modifier === BADGE_MODIFIER[0],
              'hover:bg-brand-200 hover:text-brand-500 focus:bg-brand-500 text-brand-400':
                modifier === BADGE_MODIFIER[1],
              'hover:bg-success-200 hover:text-success-500 focus:bg-success-500 text-success-400':
                modifier === BADGE_MODIFIER[2],
              'hover:bg-danger-200 hover:text-danger-500 focus:bg-danger-500 text-danger-400':
                modifier === BADGE_MODIFIER[3],
              'hover:bg-attention-200 hover:text-attention-500 focus:bg-attention-500 text-attention-400':
                modifier === BADGE_MODIFIER[4],
              'hover:bg-info-200 hover:text-info-500 focus:bg-info-500 text-info-400':
                modifier === BADGE_MODIFIER[5]
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
