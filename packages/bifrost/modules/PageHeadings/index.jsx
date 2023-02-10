import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Breadcrumbs from '../Breadcrumb';

import { PAGE_HEADINGS_THEME } from './const/pageHeadingsConstants';

import './styles.scss';

const PageHeadings = (props) => {
  const { breadcrumbs, metaData, heading, theme, actions, wrapperClassName } =
    props;
  return (
    <div className={wrapperClassName}>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          {/* breadcrumbs */}
          {breadcrumbs?.length > 0 && (
            <Breadcrumbs data={breadcrumbs} size="default" />
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

          {/* metadata */}
          <div className="flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            {metaData.map((data) => (
              <div
                key={data.id}
                className={twClassNames('mt-2 flex items-center text-sm', {
                  'text-base-500': theme === PAGE_HEADINGS_THEME[0],
                  'text-base-300': theme === PAGE_HEADINGS_THEME[1],
                  'mt-1': heading.length > 0
                })}
              >
                {data.metaNode}
              </div>
            ))}
          </div>
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
  metaData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      metaNode: PropTypes.node
    })
  ),
  wrapperClassName: PropTypes.string,
  actions: PropTypes.node,
  heading: PropTypes.string,
  theme: PropTypes.string
};
PageHeadings.defaultProps = {
  breadcrumbs: [],
  metaData: [],
  actions: [],
  heading: 'Frontend Engineers',
  theme: PAGE_HEADINGS_THEME[0],
  wrapperClassName: ''
};

export default PageHeadings;
