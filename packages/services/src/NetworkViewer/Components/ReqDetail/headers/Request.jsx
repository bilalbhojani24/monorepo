import React from 'react';
import PropTypes from 'prop-types';

const Request = ({ data }) => (
  <div className="mt-2 flex flex-col gap-3">
    {data.headers.request.map(({ name, value }) => (
      <p
        key={`${name}`}
        className="text-base-800 whitespace-normal break-all text-sm"
      >
        <span className="font-medium">{`${name}: `}</span>
        <span className="text-base-600">{value}</span>
      </p>
    ))}
  </div>
);

Request.propTypes = {
  data: PropTypes.objectOf(PropTypes.any)
};

Request.defaultProps = {
  data: null
};

export default Request;
