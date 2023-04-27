import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import SignleColumnLayout from './component/SignleColumnLayout';
import TwoColumnLayout from './component/TwoColumnLayout';
import { LAYOUT_TYPES } from './const/emptyStateStaringPointConstants';

import './styles.scss';

const EmptyStateWStartingPoints = (props) => {
  const { ctaText, data, handleCTAClick, heading, layout, subHeading } = props;

  const handleClick = (e, action, item = null) => {
    e.preventDefault();
    if (action) action(item);
  };

  return (
    <div>
      <h2 className="text-base-900 text-lg font-medium">{heading}</h2>
      <p className="text-base-500 mt-1 text-sm">{subHeading}</p>
      <ul
        className={twClassNames('', {
          'mt-6 grid grid-cols-1 gap-6 border-t border-b border-base-200 py-6 sm:grid-cols-2':
            layout === LAYOUT_TYPES[0],
          'mt-6 divide-y divide-base-200 border-t border-b border-base-200':
            layout === LAYOUT_TYPES[1]
        })}
      >
        {data.map((item, itemIdx) => {
          const id = itemIdx;
          return (
            <React.Fragment key={id}>
              {layout === LAYOUT_TYPES[0] ? (
                <TwoColumnLayout item={item} handleClick={handleClick} />
              ) : (
                <SignleColumnLayout item={item} handleClick={handleClick} />
              )}
            </React.Fragment>
          );
        })}
      </ul>
      <div className="mt-4 flex">
        <a
          href="/"
          className="text-brand-600 hover:text-brand-500 text-sm font-medium"
          onClick={(e) => {
            handleClick(e, handleCTAClick);
          }}
        >
          {ctaText}
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  );
};

EmptyStateWStartingPoints.propTypes = {
  ctaText: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      background: PropTypes.string,
      icon: PropTypes.elementType,
      onClick: PropTypes.func
    })
  ),
  handleCTAClick: PropTypes.func,
  heading: PropTypes.string,
  layout: PropTypes.string,
  subHeading: PropTypes.string
};

EmptyStateWStartingPoints.defaultProps = {
  ctaText: '',
  data: [],
  handleCTAClick: () => {},
  heading: '',
  layout: LAYOUT_TYPES[0],
  subHeading: ''
};

export default EmptyStateWStartingPoints;
