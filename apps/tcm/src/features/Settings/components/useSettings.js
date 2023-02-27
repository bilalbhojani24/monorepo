import { useDispatch, useSelector } from 'react-redux';

import { setJiraConfigurations, setSettingsApiKeys } from '../slices/thunk';

export default function useSettings() {
  const dispatch = useDispatch();
  const jiraConfiguration = useSelector(
    (state) => state.settings.jiraConfiguration
  );
  const settingsApiKeys = useSelector(
    (state) => state.settings.settingsApiKeys
  );
  // const handleTabChange = (tabName) => {
  //   dispatch(setCurrentTab(tabName.name));
  // };

  const onIntegrationsButtonClick = () => {
    if (jiraConfiguration?.data?.host)
      window.open(`${jiraConfiguration?.integration_url}`, 'popup');
  };

  const fetchAPIKey = () => {
    dispatch(setSettingsApiKeys());
  };

  const fetchJiraConfigurations = () => {
    dispatch(setJiraConfigurations());
  };

  return {
    jiraConfiguration,
    settingsApiKeys,
    fetchAPIKey,
    onIntegrationsButtonClick,
    fetchJiraConfigurations
  };
}
