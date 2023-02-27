import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Breadcrumbs from '../Breadcrumb';

import { PAGE_HEADINGS_THEME } from './const/pageHeadingsConstants';

import './styles.scss';

const PageHeadings = (props) => {
  const {
    breadcrumbs,
    subSection,
    heading,
    theme,
    actions,
    wrapperClassName,
    breadcrumbWrapperClassName,
    onBreadcrumbClick
  } = props;
  return (
    <div className={wrapperClassName}>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          {/* breadcrumbs */}
          {breadcrumbs?.length > 0 && (
            <Breadcrumbs
              size="default"
              data={breadcrumbs}
              onClick={onBreadcrumbClick}
              wrapperClassName={breadcrumbWrapperClassName}
            />
          )}

          {/* title */}
          <h2
            className={twClassNames(
              'text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight',
              {
                'text-base-900': theme === PAGE_HEADINGS_THEME[0],
                'text-white': theme === PAGE_HEADINGS_THEME[1],
                'mt-2': breadcrumbs?.length > 0
              }
            )}
          >
            {heading}
          </h2>

          {subSection}
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">{actions}</div>
      </div>
    </div>
  );
};

PageHeadings.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      current: PropTypes.bool
    })
  ),
  subSection: PropTypes.node,
  wrapperClassName: PropTypes.string,
  actions: PropTypes.node,
  heading: PropTypes.string,
  theme: PropTypes.string,
  breadcrumbWrapperClassName: PropTypes.string,
  onBreadcrumbClick: PropTypes.func
};
PageHeadings.defaultProps = {
  breadcrumbs: [],
  subSection: null,
  actions: [],
  heading: 'Frontend Engineers',
  theme: PAGE_HEADINGS_THEME[0],
  wrapperClassName: '',
  breadcrumbWrapperClassName: '',
  onBreadcrumbClick: null
};

export default PageHeadings;
