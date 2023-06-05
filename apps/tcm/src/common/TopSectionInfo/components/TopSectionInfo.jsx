import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import TopSectionSingleStep from './TopSectionSingleStep';

const TopSectionInfo = ({ steps, wrapperClassName, ctaCb }) => (
  <div
    className={twClassNames(
      'border-base-300 mb-3 w-4/5 max-w-7xl rounded-md border bg-white p-4',
      wrapperClassName
    )}
  >
    {steps?.map((step, idx) => (
      <div key={step.title}>
        <div
          className={twClassNames({
            'border-t border-base-300 my-3': idx > 0
          })}
        />
        <TopSectionSingleStep
          title={step.title}
          icon={step.icon}
          description={step.description}
          ctaText={step.ctaText}
          redirectTo={step.redirectTo}
          ctaCb={ctaCb}
        />
      </div>
    ))}
  </div>
);

TopSectionInfo.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      title: PropTypes.string,
      description: PropTypes.string,
      node: PropTypes.node
    })
  ),
  wrapperClassName: PropTypes.string,
  ctaCb: PropTypes.func
};

TopSectionInfo.defaultProps = {
  steps: [],
  wrapperClassName: '',
  ctaCb: () => {}
};

export default TopSectionInfo;
