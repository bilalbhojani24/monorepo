import React from 'react';
import PropTypes from 'prop-types';

import { safeDecodeURIComponent } from '../../../utils';

const FormData = ({ data, isPayloadTransformed }) => (
  <div className="mt-2 flex flex-col gap-3">
    {data?.headers.postData.params.map(({ name, value }, index) => (
      <p
        key={`${name}-${index}`}
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

FormData.propTypes = {
  data: PropTypes.object,
  isPayloadTransformed: PropTypes.bool.isRequired
};

FormData.defaultProps = {
  data: null
};

export default FormData;
