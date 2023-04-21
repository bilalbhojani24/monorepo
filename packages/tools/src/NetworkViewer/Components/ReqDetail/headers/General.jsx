import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { GENERAL_HEADERS } from '../../../constants';

const General = ({ data }) => (
  <div className="mt-2 flex flex-col gap-3">
    {Object.entries(GENERAL_HEADERS)
      .filter(([, { key }]) => !!data[key])
      .map(([dataKey, { key, name }]) => (
        <p
          key={dataKey}
          className="text-base-800 whitespace-normal break-all text-sm"
        >
          <span className="font-medium">{`${name}: `}</span>
          <span
            className={twClassNames('text-base-600', {
              'font-medium': key === 'status',
              'text-brand-700':
                key === 'status' && data[key] > 99 && data[key] < 200,
              'text-success-700':
                key === 'status' && data[key] > 199 && data[key] < 300,
              'text-attention-700':
                key === 'status' && data[key] > 299 && data[key] < 400,
              'text-danger-700': key === 'status' && data[key] > 399
            })}
          >
            {data[key]}
          </span>
        </p>
      ))}
  </div>
);

General.propTypes = {
  data: PropTypes.object
};

General.defaultProps = {
  data: null
};

export default General;
