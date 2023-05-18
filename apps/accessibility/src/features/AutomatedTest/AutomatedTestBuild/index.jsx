import React from 'react';
import { MdOutlineSchedule, MdPerson, Tabs } from '@browserstack/bifrost';
import { ISSUES, SUMMARY, TESTS } from 'constants';
import format from 'date-fns/format';

import Issues from './components/Issues';
import Overview from './components/Overview';
import ViewPlatformPopOver from './components/Platforms';
import Tests from './components/Tests';
import ViewMetaPopOver from './components/ViewMetadata';
import useAutomatedTestBuild from './useAutomatedTestBuild';

const tabList = [
  {
    name: 'Overview',
    value: SUMMARY
  },
  {
    name: 'All issues',
    value: ISSUES
  },
  {
    name: 'Tests',
    value: TESTS
  }
];

const platforms = {
  chrome: {
    version: 112
  },
  mac: 'Ventura'
};

export default function AutomatedTestBuild() {
  const { buildData, buildMetaData, activeTab, onTabChange, testRuns } =
    useAutomatedTestBuild();
  let defaultIndex = 0;
  switch (activeTab) {
    case SUMMARY:
      defaultIndex = 0;
      break;
    case ISSUES:
      defaultIndex = 1;
      break;
    case TESTS:
      defaultIndex = 2;
      break;
    default:
      break;
  }

  if (!buildMetaData) {
    return null;
  }

  const { name, createdBy, createdAt } = buildMetaData.meta;
  console.log(buildMetaData);
  return (
    <div>
      <div className="bg-base-50 fixed z-[2] w-[calc(100vw-256px)]">
        <div className="px-6 pt-6">
          <h1 className="text-base-900 mb-2 text-2xl font-bold">{name}</h1>
          <div className="text-base-500 text-base-400 mb-6 flex font-medium">
            <div className="mr-6 flex items-center">
              <MdPerson className="mr-1.5" />
              <p className="text-sm">{createdBy.name}</p>
            </div>
            <div className="mr-6 flex items-center">
              <MdOutlineSchedule />
              <p className="ml-1 text-sm">
                {format(new Date(createdAt), 'MMM dd, yyyy • h:m:s aa')}
              </p>
            </div>
            <div className="mr-6">
              <ViewPlatformPopOver
                data={platforms}
                handleInteraction={({ interaction }) =>
                  console.log(interaction)
                }
              />
            </div>

            <ViewMetaPopOver
              data={buildMetaData.meta || {}}
              handleInteraction={({ interaction }) => console.log(interaction)}
            />
          </div>
        </div>
        <Tabs
          id="build-tabs"
          onTabChange={onTabChange}
          navigationClassName="ml-6"
          tabsArray={tabList}
          defaultIndex={defaultIndex}
        />
      </div>
      <div className="bg-base-50 relative top-[162px]">
        {activeTab === SUMMARY && buildMetaData.issueSummary && <Overview />}
        {activeTab === ISSUES && buildData && <Issues />}
        {activeTab === TESTS && testRuns && <Tests />}
      </div>
    </div>
  );
}
