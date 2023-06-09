import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TESTRAIL, ZEPHYR } from '../const/importSteps';
import { setTestRailsCred, setZephyrCred } from '../slices/importSlice';

const useForms = () => {
  const dispatch = useDispatch();
  const [testRailsCredTouched, setTestRailsCredTouched] = useState({
    email: false,
    host: false,
    key: false
  });
  const [zephyrCredTouched, setZephyrCredTouched] = useState({
    host: false,
    jira_key: false,
    email: false,
    zephyr_key: false
  });
  const currentTestManagementTool = useSelector(
    (state) => state.import.currentTestManagementTool
  );

  const handleInputFieldChange = (key) => (e) => {
    const { value } = e.target;
    if (currentTestManagementTool === TESTRAIL) {
      dispatch(setTestRailsCred({ key, value }));
      setTestRailsCredTouched({ ...testRailsCredTouched, [key]: true });
    } else if (currentTestManagementTool === ZEPHYR) {
      dispatch(setZephyrCred({ key, value }));
      setZephyrCredTouched({ ...zephyrCredTouched, [key]: true });
    }
  };

  return { testRailsCredTouched, zephyrCredTouched, handleInputFieldChange };
};

export default useForms;
