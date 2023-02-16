import React, { useEffect } from 'react';
import { TMPageHeadings, TMTabs } from 'common/bifrostProxy';

import useSettings from './useSettings';
// import useDashboard from './useDashboard';

export const SETTINGS_TABS_ARRAY = [
  { name: 'Integrations' },
  { name: 'API Keys' }
];

const Settings = () => {
  const { handleTabChange, fetchAPIKey } = useSettings();

  useEffect(() => {
    fetchAPIKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
      <div className="border-base-300 border-b">
        <TMPageHeadings
          wrapperClassName="px-4 pt-6 bg-transparent"
          heading="Settings"
        />
        <div className="mb-0 w-full px-4">
          <TMTabs
            id="settings-tabs"
            tabsArray={SETTINGS_TABS_ARRAY}
            onTabChange={handleTabChange}
          />
        </div>
      </div>
    </div>
  );
};

Settings.propTypes = {};

Settings.defaultProps = {};

export default Settings;
