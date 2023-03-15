import { useEffect, useState } from 'react';
import fetchScreenReaderDevices from 'api/fetchScreenReaderDevices';
import { getBrowserStackEnvUrl } from 'utils';

export default function useScreenReader() {
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
    fetchScreenReaderDevices().then(setDeviceCombinations);
  }, []);

  return { deviceCombinations, handleCardClick };
}
