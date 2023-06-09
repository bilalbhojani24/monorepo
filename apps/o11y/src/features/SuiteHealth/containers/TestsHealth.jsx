import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TEST_DETAILS_SOURCE } from 'constants/common';
import SHTestDetailsSlideOver from 'features/SHTestDetails';
import { setIsSHTestsDetailsVisible } from 'features/SHTestDetails/slices/dataSlice';
import { getIsSHTestsDetailsVisible } from 'features/SHTestDetails/slices/selectors';
import TestDetails from 'features/TestDetails';
import { hideTestDetailsDrawer } from 'features/TestDetails/utils';

import { SUITE_HEALTH_CONTEXT } from '../context';
import { clearSnPTests } from '../slices/dataSlice';
import { getSnPTestsFiltersData } from '../slices/uiSlice';

import SHTests from './SHTests';

function TestsHealth() {
  const dispatch = useDispatch();
  const isSnPDetailsVisible = useSelector(getIsSHTestsDetailsVisible);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(setIsSHTestsDetailsVisible(false));
      dispatch(clearSnPTests());
      dispatch(hideTestDetailsDrawer());
    };
  }, [dispatch]);

  return (
    <SUITE_HEALTH_CONTEXT.Provider value={{ getSnPTestsFiltersData }}>
      <h1 className="p-6 pb-0 text-2xl font-bold">Tests Health</h1>
      <SHTests />
      {isSnPDetailsVisible && <SHTestDetailsSlideOver />}
      <TestDetails source={TEST_DETAILS_SOURCE.SUITE_HEALTH_TESTS} />
    </SUITE_HEALTH_CONTEXT.Provider>
  );
}

export default TestsHealth;
