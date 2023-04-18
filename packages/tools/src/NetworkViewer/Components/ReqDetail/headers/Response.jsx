import React from 'react';
import PropTypes from 'prop-types';

const Response = ({ data }) => (
  <div className="header-detail">
    {data.headers.response.map(({ name, value }, index) => (
      <p key={`${name}-${index}`} className="info-row">
        <span className="info-caption">{`${name}:`}</span>
        <span>{value}</span>
      </p>
    ))}
  </div>
);

Response.propTypes = {
  data: PropTypes.object
};

Response.defaultProps = {
  data: null
};

export default Response;
