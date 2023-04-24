import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const TestCapabilitiesList = ({ data }) => {
  const dataKeys = Object.keys(data);

  const renderValue = (value) => {
    if (typeof value === 'object' || typeof value === 'boolean') {
      return JSON.stringify(value);
    }
    if (value) {
      return value;
    }
    return '-';
  };

  return (
    <div className="">
      {dataKeys.map((key, index) => (
        <div
          className={twClassNames('pt-5', {
            'border-b border-base-200 pb-5': index !== dataKeys.length - 1
          })}
          key={key}
        >
          <p className="text-base-900 mb-3 text-sm font-medium leading-5">
            {key}
          </p>
          <div className="bg-base-100 rounded-md py-2 px-3">
            <pre className="text-base-700 overflow-hidden whitespace-normal break-words text-xs font-normal leading-5">
              {renderValue(data[key])}
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
};

TestCapabilitiesList.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};

export default TestCapabilitiesList;
