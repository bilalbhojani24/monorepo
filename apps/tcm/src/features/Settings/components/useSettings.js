import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSettingsApiKeys } from 'api/settings.api';

import { setApiKey, setCurrentTab } from '../slices/settingsSlice';

export default function useSettings() {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleTabChange = (tabName) => {
    dispatch(setCurrentTab(tabName.name));
  };

  const fetchAPIKey = () => {
    getSettingsApiKeys().then((data) => {
      dispatch(setApiKey(data.api_key));
    });
  };

  return { handleTabChange, fetchAPIKey };
}
