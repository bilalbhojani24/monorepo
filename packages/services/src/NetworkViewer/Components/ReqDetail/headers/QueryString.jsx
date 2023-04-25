import React from 'react';
import PropTypes from 'prop-types';

import { safeDecodeURIComponent } from '../../../utils';

const QueryString = ({ data, isPayloadTransformed }) => (
  <div className="mt-2 flex flex-col gap-3">
    {data.headers.queryString.map(({ name, value }) => (
      <p
        key={`${name}`}
        className="text-base-800 whitespace-normal break-all text-sm"
      >
        <span className="font-medium">{`${name}: `}</span>
        <span className="text-base-600">
          {isPayloadTransformed ? safeDecodeURIComponent(value) : value}
        </span>
      </p>
    ))}
  </div>
);

QueryString.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  isPayloadTransformed: PropTypes.bool.isRequired
};

QueryString.defaultProps = {
  data: null
};

export default QueryString;
