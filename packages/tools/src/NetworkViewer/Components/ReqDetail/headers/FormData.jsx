import React from 'react';
import PropTypes from 'prop-types';

import { safeDecodeURIComponent } from '../../../utils';

const FormData = ({ data, isPayloadTransformed }) => (
  <div className="header-detail">
    {data?.headers.postData.params.map(({ name, value }, index) => (
      <p key={`${name}-${index}`} className="info-row">
        <span className="info-caption">{`${name}:`}</span>
        <span>
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
