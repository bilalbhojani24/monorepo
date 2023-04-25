import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';

import SignleColumnLayout from './component/SignleColumnLayout';
import TwoColumnLayout from './component/TwoColumnLayout';
import { LAYOUT_TYPES } from './const/emptyStateRecommendationConstants';

import './styles.scss';

const EmptyStateWRecommendation = (props) => {
  const {
    buttonLabel,
    data,
    heading,
    layout,
    recommendationTitle,
    subHeading,
    wrapperClassName
  } = props;

  const handleClick = (e, action, item = null) => {
    e.preventDefault();
    if (action) action(item);
  };

  return (
    <div className={twClassNames('mx-auto', wrapperClassName)}>
      <div>
        <div className="text-center">
          <svg
            className="text-base-400 mx-auto h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h2 className="text-base-900 mt-2 text-lg font-medium">{heading}</h2>
          <p className="text-base-500 mt-1 text-sm">{subHeading}</p>
        </div>
        <form className="mt-6 flex">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border-base-300 focus:border-brand-500 focus:ring-brand-500 block w-full rounded-md shadow-sm sm:text-sm"
            placeholder="Enter an email"
          />
          <Button wrapperClassName="ml-4 flex-shrink-0">{buttonLabel}</Button>
        </form>
      </div>
      <div className="mt-10">
        <h3 className="text-base-500 text-sm font-medium">
          {recommendationTitle}
        </h3>
        <ul
          className={twClassNames('mt-4', {
            'divide-y divide-base-200 border-t border-b border-base-200':
              LAYOUT_TYPES[1] === layout,
            'grid grid-cols-1 gap-4 sm:grid-cols-2': LAYOUT_TYPES[0] === layout
          })}
        >
          {data.map((item, itemIdx) => (
            <React.Fragment key={itemIdx}>
              {layout === LAYOUT_TYPES[0] ? (
                <TwoColumnLayout item={item} handleClick={handleClick} />
              ) : (
                <SignleColumnLayout item={item} handleClick={handleClick} />
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

EmptyStateWRecommendation.propTypes = {
  buttonLabel: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      buttonText: PropTypes.string,
      handleButtonClick: PropTypes.func
    })
  ),
  heading: PropTypes.string,
  layout: PropTypes.string,
  recommendationTitle: PropTypes.string,
  subHeading: PropTypes.string,
  wrapperClassName: PropTypes.string
};
EmptyStateWRecommendation.defaultProps = {
  buttonLabel: '',
  data: [],
  heading: '',
  layout: LAYOUT_TYPES[0],
  recommendationTitle: '',
  subHeading: '',
  wrapperClassName: ''
};

export default EmptyStateWRecommendation;
