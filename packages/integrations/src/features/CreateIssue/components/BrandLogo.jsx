import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ label, logo }) => (
  <p className="rounded-xl border p-5">
    <img
      className="h-12 w-12"
      src={`https://integrations.bsstag.com${logo}`}
      alt={`${label}_logo`}
    />
  </p>
);

Logo.propTypes = {
  label: PropTypes.string.isRequired,
  logo: PropTypes.string
};

Logo.defaultProps = {
  logo: null
};

export default Logo;
