import React from 'react';
import PropTypes from 'prop-types';

const Response = ({ data }) => (
  <div className="mt-2 flex flex-col gap-3">
    {data.headers.response.map(({ name, value }) => (
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

Response.propTypes = {
  data: PropTypes.objectOf(PropTypes.any)
};

Response.defaultProps = {
  data: null
};

export default Response;
