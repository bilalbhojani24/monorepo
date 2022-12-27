import React from 'react';
import Breadcrumbs from '../Breadcrumb';
import Button from '../Button';
import PropTypes from 'prop-types';
import './styles.scss';
import { PAGE_HEADINGS_THEME } from './const/pageHeadingsConstants';
import classNames from 'classnames';

const PageHeadings = (props) => {
  const { breadcrumbData, metaData, heading, theme, actionsData } = props;
  return (
    <div
      className={classNames('p-8 overflow-hidden rounded-lg', {
        'border border-gray-300 bg-white color': theme === PAGE_HEADINGS_THEME[0],
        'bg-gray-800': theme === PAGE_HEADINGS_THEME[1],
      })}
    >
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          {/* breadcrumbs */}
          {breadcrumbData?.length > 0 && <Breadcrumbs data={breadcrumbData} size="default" />}

          {/* title */}
          <h2
            className={classNames('text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight', {
              'text-gray-900': theme === PAGE_HEADINGS_THEME[0],
              'text-white': theme === PAGE_HEADINGS_THEME[1],
              'mt-2': breadcrumbData?.length > 0,
            })}
          >
            {heading}
          </h2>

          {/* metadata */}
          <div className="flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            {metaData.map((data) => (
              <div
                key={data.id}
                className={classNames('mt-2 flex items-center text-sm', {
                  'text-gray-500': theme === PAGE_HEADINGS_THEME[0],
                  'text-gray-300': theme === PAGE_HEADINGS_THEME[1],
                  'mt-1': heading.length > 0,
                })}
              >
                {data.metaNode}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          {actionsData.map((data) => {
            return (
              <span key={data.id} className="ml-3 hidden sm:block">
                <Button
                  size="default"
                  variant={data.variant}
                  onClick={(event) => {
                    event.preventDefault();
                    if (data.actionFn) data.actionFn();
                  }}
                >
                  {data.actionsNode}
                </Button>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

PageHeadings.propTypes = {
  breadcrumbData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      current: PropTypes.bool,
    })
  ),
  metaData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      metaNode: PropTypes.node,
    })
  ),
  actionsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      actionNode: PropTypes.node,
      actionButtonFn: PropTypes.func,
      variant: PropTypes.string,
    })
  ),
  heading: PropTypes.string,
  theme: PropTypes.string,
};
PageHeadings.defaultProps = {
  breadcrumbData: [],
  metaData: [],
  actionsData: [],
  heading: 'Frontend Engineers',
  propTypes: PAGE_HEADINGS_THEME[0],
};

export default PageHeadings;
