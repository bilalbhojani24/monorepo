import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ESSP_DATA, LAYOUT_TYPES } from './const/emptyStateStaringPointConstants';
import TwoColumnLayout from './component/TwoColumnLayout';
import SignleColumnLayout from './component/SignleColumnLayout';

import './styles.scss';

const EmptyStateWStartingPoints = (props) => {
  const { ctaText, data, handleCTAClick, heading, layout, subHeading } = props;

  const handleClick = (e, action, item = null) => {
    e.preventDefault();
    if (action) action(item);
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-base-900">{heading}</h2>
      <p className="mt-1 text-sm text-base-500">{subHeading}</p>
      <ul
        role="list"
        className={classNames('', {
          'mt-6 grid grid-cols-1 gap-6 border-t border-b border-base-200 py-6 sm:grid-cols-2':
            layout === LAYOUT_TYPES[0],
          'mt-6 divide-y divide-base-200 border-t border-b border-base-200': layout === LAYOUT_TYPES[1]
        })}
      >
        {data.map((item, itemIdx) => (
          <div key={itemIdx}>
            {layout === LAYOUT_TYPES[0] ? (
              <TwoColumnLayout item={item} handleClick={handleClick} />
            ) : (
              <SignleColumnLayout item={item} handleClick={handleClick} />
            )}
          </div>
        ))}
      </ul>
      <div className="mt-4 flex">
        <a
          href="/"
          className="text-sm font-medium text-brand-600 hover:text-brand-500"
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
