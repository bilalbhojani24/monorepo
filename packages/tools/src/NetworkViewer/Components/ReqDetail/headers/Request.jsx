import React from 'react';
import PropTypes from 'prop-types';

const Request = ({ data }) => (
  <div className="header-detail">
    {data.headers.request.map(({ name, value }, index) => (
      <p key={`${name}-${index}`} className="info-row">
        <span className="info-caption">{`${name}:`}</span>
        <span>{value}</span>
      </p>
    ))}
  </div>
);

Request.propTypes = {
  data: PropTypes.object
};

Request.defaultProps = {
  data: null
};

export default Request;
