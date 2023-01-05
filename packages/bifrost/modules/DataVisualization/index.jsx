import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { DATA_VISUALIZATION_SIZES } from './const/dataVisualizationConstants';
import { InformationCircleIcon } from '../Icon';
import Dropdown from '../Dropdown';
import classNames from 'classnames';
import Stat from './components/Stat';
import Alerts from '../Alerts';

const DataVisualization = ({ size, title, desc, subDesc }) => {
  return (
    <div className="border shadow rounded-lg">
      <div
        className={classNames('p-6', {
          'w-[332px]': size === DATA_VISUALIZATION_SIZES[0],
          'w-[508px]': size === DATA_VISUALIZATION_SIZES[1],
          'w-[684px]': size === DATA_VISUALIZATION_SIZES[2],
          'w-[1388px]': size === DATA_VISUALIZATION_SIZES[3]
        })}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-lg font-medium leading-6 mr-2.5">{title}</h3>
            <InformationCircleIcon className="cursor-pointer h-5 w-5 flex-shrink-0" aria-hidden="true" />
          </div>

          <div className="flex items-center">
            <div className="mr-2">
              <Dropdown />
            </div>
            <Dropdown triggerVariant="menu-button" />
          </div>
        </div>
        <p className="font-normal text-gray-600 leading-6 mt-4">{desc}</p>

        <div className="mt-4">
          <Stat />
        </div>
        <div className="my-2 py-4">Chart comes here</div>
        <p className="text-base leading-6 font-normal text-gray-600">{subDesc}</p>
      </div>
      <Alerts />
    </div>
  );
};

DataVisualization.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  subDesc: PropTypes.string
};
DataVisualization.defaultProps = {
  size: DATA_VISUALIZATION_SIZES[1],
  title: '',
  desc: '',
  subDesc: ''
};

export default DataVisualization;
