import React, { useEffect } from 'react';
import { TMPageHeadings } from 'common/bifrostProxy';

import JiraConfigurationAvailable from './JiraConfigurationAvailable';
import JiraFooter from './JiraFooter';
import NoJiraConfiguration from './NoJiraConfiguration';
import useSettings from './useSettings';

// export const SETTINGS_TABS_ARRAY = [
//   { name: 'Integrations' },
//   { name: 'API Keys' }
// ];

const Settings = () => {
  const {
    jiraConfiguration,
    settingsApiKeys,
    fetchAPIKey,
    onIntegrationsButtonClick,
    fetchJiraConfigurations,
    configureJIRAInit
  } = useSettings();

  useEffect(() => {
    fetchJiraConfigurations();
    fetchAPIKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
      <div className="border-base-300 border-b pb-6">
        <TMPageHeadings
          wrapperClassName="px-4 pt-6 bg-transparent"
          heading="Settings"
        />
        {/* <div className="mb-0 w-full px-4">
          <TMTabs
            id="settings-tabs"
            tabsArray={SETTINGS_TABS_ARRAY}
            onTabChange={handleTabChange}
          />
        </div> */}
      </div>
      <div className="w-full max-w-4xl p-6">
        {jiraConfiguration?.data ? (
          <JiraConfigurationAvailable
            configuration={jiraConfiguration?.data}
            onIntegrationsButtonClick={onIntegrationsButtonClick}
          />
        ) : (
          <NoJiraConfiguration onAddJiraIntegration={configureJIRAInit} />
        )}
        <JiraFooter apiKey={settingsApiKeys.api_key} />
      </div>
    </div>
  );
};

Settings.propTypes = {};

Settings.defaultProps = {};

export default Settings;
