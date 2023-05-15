import React from 'react';
import { MdPerson, Tabs } from '@browserstack/bifrost';
import { ISSUES, SUMMARY, TESTS } from 'constants';

import Issues from './components/Issues';
import Overview from './components/Overview';
import Tests from './components/Tests';
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
  if (activeTab === SUMMARY && !buildMetaData.issueSummary) {
    return null;
  }
  if (activeTab === ISSUES && !buildData) {
    return null;
  }

  if (activeTab === TESTS && !testRuns) {
    return null;
  }

  return (
    <div>
      <div className="px-6 pt-6">
        <h1 className="text-base-900 mb-2 text-2xl font-bold">
          Mocha awesome build regression #112
        </h1>
        <div className="text-base-500 mb-6">
          <div className="mr-6 flex items-center">
            <MdPerson className="text-base-400 mr-1.5" />
            <p className="text-sm">Mirudhula Nadar</p>
          </div>
        </div>
      </div>
      <Tabs
        id="build-tabs"
        onTabChange={onTabChange}
        navigationClassName="ml-6"
        tabsArray={tabList}
        defaultIndex={defaultIndex}
      />
      {activeTab === SUMMARY && <Overview />}
      {activeTab === ISSUES && <Issues />}
      {activeTab === TESTS && <Tests />}
    </div>
  );
}
