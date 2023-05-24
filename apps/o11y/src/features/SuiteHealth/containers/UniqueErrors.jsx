import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TEST_DETAILS_SOURCE } from 'constants/common';
import SHErrorDetailsSlideOver from 'features/SHErrorDetails';
import { getIsUEDetailsVisible } from 'features/SHErrorDetails/slices/selectors';
import TestDetails from 'features/TestDetails';
import { hideTestDetailsDrawer } from 'features/TestDetails/utils';

import SHUniqueErrors from './SHUniqueErrors';

function UniqueErrors() {
  const dispatch = useDispatch();
  const isSnPErrorDetailsVisible = useSelector(getIsUEDetailsVisible);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(hideTestDetailsDrawer());
    };
  }, [dispatch]);

  return (
    <>
      <h1 className="p-6 pb-0 text-2xl font-bold">Unique Errors</h1>
      <SHUniqueErrors />
      {isSnPErrorDetailsVisible && <SHErrorDetailsSlideOver />}
      <TestDetails source={TEST_DETAILS_SOURCE.SUITE_HEALTH_ERRORS} />
    </>
  );
}

export default UniqueErrors;
