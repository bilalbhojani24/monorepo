import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Tabs from '../Tabs';

import './styles.scss';

const SectionHeadings = ({
  trailingHeadNode,
  tabsWrapperClassName,
  description,
  subTitle,
  tabsProps,
  title
}) => (
  <div
    className={twClassNames('', {
      'border-b border-base-200 pb-5': !tabsProps
    })}
  >
    <div className="border-base-200 sm:flex sm:items-baseline sm:justify-between">
      <div className="w-auto" role="contentinfo">
        {(subTitle || title) && (
          <div className="flex flex-wrap items-baseline">
            {title && (
              <h3 className="text-base-900 text-lg font-medium leading-6">
                {title}
              </h3>
            )}
            {subTitle && (
              <p className="text-base-500 ml-2 mt-1 truncate text-sm">
                {subTitle}
              </p>
            )}
          </div>
        )}

        {description && (
          <p
            className={twClassNames('mt-2 max-w-4xl text-sm text-base-500', {
              'mb-2': !!tabsProps
            })}
          >
            {description}
          </p>
        )}
      </div>
      {trailingHeadNode}
    </div>
    {tabsProps && (
      <div className={tabsWrapperClassName}>
        <Tabs
          defaultIndex={tabsProps?.defaultIndex}
          id={tabsProps?.id}
          isContained={tabsProps?.isContained}
          isFullWidth={tabsProps?.isFullWidth}
          label={tabsProps?.label}
          onTabChange={tabsProps?.onTabChange}
          shape={tabsProps?.shape}
          tabsArray={tabsProps?.tabsArray}
        />
      </div>
    )}
  </div>
);

SectionHeadings.propTypes = {
  description: PropTypes.string,
  subTitle: PropTypes.string,
  tabsWrapperClassName: PropTypes.string,
  trailingHeadNode: PropTypes.node,
  tabsProps: PropTypes.shape(Tabs.propTypes),
  title: PropTypes.string.isRequired
};

SectionHeadings.defaultProps = {
  description: '',
  subTitle: '',
  tabsWrapperClassName: '',
  trailingHeadNode: <></>,
  tabsProps: null
};

export default SectionHeadings;
