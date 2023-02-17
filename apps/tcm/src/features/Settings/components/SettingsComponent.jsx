import React, { useEffect } from 'react';

import {
    TMPageHeadings,
    TMTabs
} from 'common/bifrostProxy';
import useSettings from "./useSettings";
// import useDashboard from './useDashboard';

export const SETTINGS_TABS_ARRAY = [{ name: 'Integrations' }, { name: 'API Keys' }];

const SettingsComponent = () => {
    const {
        handleTabChange,
        fetchAPIKey
    } = useSettings();

    useEffect(() => {
        fetchAPIKey();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (<div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
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
                <div className="flex flex-1 shrink-0  grow flex-col overflow-y-auto p-4">
                    <div className="border-base-200 flex grow flex-col justify-start  rounded-md border bg-white">
                        Hello
                    </div>
                </div>
            </div>
        </div>
    );
};

SettingsComponent.propTypes = {};

SettingsComponent.defaultProps = {};
export default SettingsComponent;
