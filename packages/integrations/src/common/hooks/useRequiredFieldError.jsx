import { useEffect, useState } from 'react';

import { REQUIRED_FIELD_ERROR_MESSAGE } from '../constants';

const useRequiredFieldError = (
  isRequired,
  fieldValue,
  areSomeRequiredFieldsEmpty
) => {
  const [error, setError] = useState(null);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    if (isRequired && !fieldValue && areSomeRequiredFieldsEmpty) {
      setError(REQUIRED_FIELD_ERROR_MESSAGE);
    } else {
      clearError();
    }
  }, [isRequired, fieldValue, areSomeRequiredFieldsEmpty]);

  return error;
};

export default useRequiredFieldError;
