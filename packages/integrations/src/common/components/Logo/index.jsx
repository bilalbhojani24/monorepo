import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { baseURLSelector } from '../../slices/configSlice';

const Logo = ({ label, logo }) => {
  const baseURL = useSelector(baseURLSelector);
  return (
    <p className="border-base-300 rounded-xl border p-4">
      <img
        className="h-12 w-12"
        src={`${baseURL}${logo}`}
        alt={`${label}_logo`}
      />
    </p>
  );
};

Logo.propTypes = {
  label: PropTypes.string.isRequired,
  logo: PropTypes.string
};

Logo.defaultProps = {
  logo: null
};

export default Logo;
