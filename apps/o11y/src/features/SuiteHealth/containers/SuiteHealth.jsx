import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { TABS_KEY_MAPPING } from '../constants';

function SuiteHealth() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  if (searchParams.get('tab') === TABS_KEY_MAPPING.unique_errors) {
    return (
      <Navigate
        to={`${location.pathname}/unique_errors/?${searchParams.toString()}`}
      />
    );
  }
  return (
    <Navigate to={`${location.pathname}/tests/?${searchParams.toString()}`} />
  );
}

export default SuiteHealth;
