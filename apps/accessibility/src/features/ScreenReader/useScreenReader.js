import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchScreenReaderDevices, {
  fetchMockData
} from 'api/fetchScreenReaderDevices';
import {
  getAlertShow,
  getShowBanner,
  getTrialState,
  getUser
} from 'features/Dashboard/slices/selectors';
import { getBrowserStackEnvUrl } from 'utils';

import { TRIAL_NOT_STARTED } from '../../constants';
import { setModalName, setModalShow } from '../Dashboard/slices/appSlice';

export default function useScreenReader() {
  const showBanner = useSelector(getShowBanner);
  const showAlert = useSelector(getAlertShow);
  const trialState = useSelector(getTrialState);
  const dispatch = useDispatch();
  const [deviceCombinations, setDeviceCombinations] = useState({});
  const { enterprise_plan: enterprisePlan } = useSelector(getUser);

  const handleCardClick = (startParams) => {
    if (enterprisePlan) {
      const url = getBrowserStackEnvUrl();
      const startLiveSessionUrl = new URL(`${url}/screen-reader/start`);
      startLiveSessionUrl.searchParams.set(
        'start_element',
        'accessibility_dashboard'
      ); // to track source of live session start
      Object.keys(startParams).forEach((key) => {
        startLiveSessionUrl.searchParams.set(key, startParams[key]);
      });
      window.open(startLiveSessionUrl, '_self');
    } else if (trialState === TRIAL_NOT_STARTED) {
      dispatch(setModalName('screenReader'));
      dispatch(setModalShow(true));
    }
  };

  useEffect(() => {
    // fetchScreenReaderDevices().then(setDeviceCombinations);
    fetchMockData().then(setDeviceCombinations);
  }, []);

  return { deviceCombinations, handleCardClick, showBanner, showAlert };
}
