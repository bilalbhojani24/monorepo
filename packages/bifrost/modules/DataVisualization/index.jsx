import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { DATA_VISUALIZATION_DESC_POSITION, DATA_VISUALIZATION_SIZES } from './const/dataVisualizationConstants';
import { InformationCircleIcon } from '../Icon';
import classNames from 'classnames';
import Kpi from './components/Kpi';

const DataVisualization = ({
  size,
  title,
  desc,
  descPosition,
  analytics,
  footerProps,
  KpiProps,
  otherOptions,
  filterDropdown,
  infoIconVisible
}) => {
  return (
    <div
      className={classNames('border shadow rounded-lg', {
        'w-[332px]': size === DATA_VISUALIZATION_SIZES[0],
        'w-[508px]': size === DATA_VISUALIZATION_SIZES[1],
        'w-[684px]': size === DATA_VISUALIZATION_SIZES[2],
        'w-[1388px]': size === DATA_VISUALIZATION_SIZES[3]
      })}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-lg font-medium leading-6 mr-2.5">{title}</h3>
            {infoIconVisible && (
              <InformationCircleIcon className="cursor-pointer h-5 w-5 flex-shrink-0" aria-hidden="true" />
            )}
          </div>

          <div className="flex items-center">
            <div className="mr-2">{filterDropdown}</div>
            {otherOptions}
          </div>
        </div>
        {descPosition === DATA_VISUALIZATION_DESC_POSITION[0] && (
          <p className="font-normal text-gray-600 leading-6 mt-4">{desc}</p>
        )}
        {KpiProps?.length > 0 && (
          <div
            className={classNames('mt-4', {
              'grid-cols-1 grid gap-2': size === DATA_VISUALIZATION_SIZES[0],
              'grid-cols-3 grid gap-2': size === DATA_VISUALIZATION_SIZES[1],
              'grid-cols-5 grid gap-2': size === DATA_VISUALIZATION_SIZES[2] || size === DATA_VISUALIZATION_SIZES[3],
              'flex align-items-center justify-between': size === DATA_VISUALIZATION_SIZES[4]
            })}
          >
            {KpiProps.map((propsObject) => {
              return <Kpi {...propsObject} />;
            })}
          </div>
        )}
        <div className="my-2 py-4">{analytics}</div>

        {descPosition === DATA_VISUALIZATION_DESC_POSITION[1] && (
          <p className="font-normal text-gray-600 leading-6 mt-4">{desc}</p>
        )}
      </div>

      {(footerProps.linkText?.length > 0 || footerProps.description?.length > 0) && (
        <div className="px-6 py-3.5 rounded-md bg-gray-50">
          <div className="flex justify-between items-baseline">
            {footerProps.description?.length > 0 && (
              <p className="text-base leading-6 font-normal text-gray-700">{footerProps.description}</p>
            )}

            {footerProps.linkText?.length > 0 && (
              <a href={footerProps.linkTo} className="text-sm leading-5 font-medium text-indigo-600">
                {footerProps.linkText}
                <span aria-hidden="true"> &rarr;</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

DataVisualization.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  descPosition: PropTypes.string,
  analytics: PropTypes.node,
  footerProps: PropTypes.shape({
    linkTo: PropTypes.string,
    linkText: PropTypes.string,
    description: PropTypes.string
  }),
  KpiProps: PropTypes.arrayOf({
    title: PropTypes.string,
    changeType: PropTypes.string,
    difference: PropTypes.string,
    description: PropTypes.string,
    percentage: PropTypes.string
  }),
  otherOptions: PropTypes.node,
  filterDropdown: PropTypes.node,
  infoIconVisible: PropTypes.bool
};
DataVisualization.defaultProps = {
  size: DATA_VISUALIZATION_SIZES[1],
  title: '',
  desc: '',
  descPosition: DATA_VISUALIZATION_DESC_POSITION[0],
  analytics: null,
  footerProps: {},
  KpiProps: [],
  otherOptions: null,
  filterDropdown: null,
  infoIconVisible: true
};

export default DataVisualization;
