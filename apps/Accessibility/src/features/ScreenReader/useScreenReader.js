import { useEffect, useState } from 'react';
import fetchScreenReaderDevices from 'api/fetchScreenReaderDevices';
import { SCREEN_READER_LIVE_URL } from 'constants';

export default function useScreenReader() {
  const [deviceCombinations, setDeviceCombinations] = useState({});

  const handleCardClick = (startParams) => {
    const startLiveSessionUrl = new URL(SCREEN_READER_LIVE_URL);
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
