import React from 'react';
import PropTypes from 'prop-types';

import { safeDecodeURIComponent } from '../../../utils';

const QueryString = ({ data, isPayloadTransformed }) => (
  <div className="header-detail">
    {data.headers.queryString.map(({ name, value }, index) => (
      <p key={`${name}-${index}`} className="info-row">
        <span className="info-caption">{`${name}:`}</span>
        <span>
          {isPayloadTransformed ? safeDecodeURIComponent(value) : value}
        </span>
      </p>
    ))}
  </div>
);

QueryString.propTypes = {
  data: PropTypes.object,
  isPayloadTransformed: PropTypes.bool.isRequired
};

QueryString.defaultProps = {
  data: null
};

export default QueryString;
