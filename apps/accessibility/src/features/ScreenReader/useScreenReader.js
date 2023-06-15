import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchScreenReaderDevices, {
  fetchMockData
} from 'api/fetchScreenReaderDevices';
import {
  TRIAL_EXPIRED,
  TRIAL_FAILED,
  TRIAL_IN_PROGRESS,
  TRIAL_NOT_STARTED,
  TRIAL_STARTED
} from 'constants';
import {
  getAlertShow,
  getShowBanner,
  getTrialState,
  getUser
} from 'features/Dashboard/slices/selectors';
import { getBrowserStackEnvUrl } from 'utils';

import { setModalName, setModalShow } from '../Dashboard/slices/appSlice';
import { setShowFreshChatButton } from '../Dashboard/slices/uiSlice';

export default function useScreenReader(noOfDevices) {
  const showBanner = useSelector(getShowBanner);
  const showAlert = useSelector(getAlertShow);
  const trialState = useSelector(getTrialState);
  const dispatch = useDispatch();
  const [deviceCombinations, setDeviceCombinations] = useState({});
  const { plan_type: planType } = useSelector(getUser);
  const [showTooltip, setShowTooltip] = useState(() =>
    Array.from({ length: noOfDevices }, () => false)
  );

  const handleCardClick = (startParams, tooltipIndex) => {
    if (trialState === TRIAL_STARTED || planType === 'paid') {
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
    } else if ([TRIAL_NOT_STARTED, TRIAL_FAILED].includes(trialState)) {
      dispatch(setModalName('screenReader'));
      dispatch(setModalShow(true));
    } else if (trialState === TRIAL_EXPIRED) {
      dispatch(setModalName('buyPlan'));
      dispatch(setModalShow(true));
    } else if (trialState === TRIAL_IN_PROGRESS) {
      setShowTooltip([
        ...showTooltip.slice(0, tooltipIndex),
        true,
        ...showTooltip.slice(tooltipIndex + 1, showTooltip.length)
      ]);
    }
  };

  const handlePointerDownOutside = () => {
    setShowTooltip(Array.from({ length: noOfDevices }, () => false));
  };

  useEffect(() => {
    // fetchScreenReaderDevices().then(setDeviceCombinations);
    fetchMockData().then(setDeviceCombinations);
  }, []);

  useEffect(() => {
    dispatch(setShowFreshChatButton(true));
  }, []);

  return {
    deviceCombinations,
    handleCardClick,
    showBanner,
    showAlert,
    trialState,
    showTooltip,
    handlePointerDownOutside
  };
}
