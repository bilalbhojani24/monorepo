import React, { useLayoutEffect, useState } from 'react';
import { TMButton, TMSectionHeadings } from 'common/bifrostProxy';
import Loader from 'common/Loader';
import { number, shape, string } from 'prop-types';

import ConfigureDataList from './ConfigureDataList';
import NoProjects from './NoProjects';
import useImport from './useImport';

const ConfigureData = (props) => {
  const { projects } = props;
  const [artificialLoader, setLoader] = useState(false);
  const {
    testManagementProjects,
    handleConfigureDataProceed,
    currentTestManagementTool,
    showErrorForConfigData
  } = useImport();

  useLayoutEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  if (!testManagementProjects.length) return <NoProjects />;
  const displayNameOfTestTool =
    currentTestManagementTool === 'zephyr' ? 'Zephyr Scale' : 'Testrails';

  return (
    <div className="border-base-300 shadow-base-200 my-4 h-full w-3/4 max-w-7xl rounded-md border-2 bg-white">
      {artificialLoader ? (
        <div className="flex h-full flex-col items-center justify-center">
          <Loader />
          <div className="text-base-600 mt-4 text-sm font-medium">
            We are fetching your projects, this may take a few seconds
          </div>
        </div>
      ) : (
        <div
          className="relative overflow-scroll"
          style={{ height: 'calc(100vh - 310px)' }}
        >
          <div className="p-6">
            <TMSectionHeadings
              title={`We’ve fetched ${projects.length} projects from ${displayNameOfTestTool}, select projects you would like to import`}
            />
            <ConfigureDataList
              projects={projects}
              showError={showErrorForConfigData}
            />
          </div>
          <div className="bg-base-50 sticky bottom-0 flex justify-end p-4">
            <TMButton onClick={handleConfigureDataProceed}>
              Begin Importing
            </TMButton>
          </div>
        </div>
      )}
    </div>
  );
};

ConfigureData.propTypes = {
  projects: shape({
    id: number,
    name: string,
    suite_mode: number
  })
};

ConfigureData.defaultProps = {
  projects: []
};

export default ConfigureData;
