import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import fetchScreenReaderDevices, {
  fetchMockData
} from 'api/fetchScreenReaderDevices';
import { getBrowserStackEnvUrl } from 'utils';

import { getAlertShow, getShowBanner } from '../Dashboard/slices/selectors';

export default function useScreenReader() {
  const showBanner = useSelector(getShowBanner);
  const showAlert = useSelector(getAlertShow);
  const [deviceCombinations, setDeviceCombinations] = useState({});

  const handleCardClick = (startParams) => {
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
  };

  useEffect(() => {
    // fetchScreenReaderDevices().then(setDeviceCombinations);
    fetchMockData().then(setDeviceCombinations);
  }, []);

  return { deviceCombinations, handleCardClick, showBanner, showAlert };
}
