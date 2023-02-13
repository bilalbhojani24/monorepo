import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HideSourceOutlinedIcon } from 'assets/icons';
import { TMEmptyState, TMPageHeadings } from 'common/bifrostProxy';

import { IMPORT_STEPS } from '../const/importSteps';
import {
  setImportSteps,
  setNotificationData,
  setTestRailsCred
} from '../slices/importSlice';

import ConfigureData from './ConfigureData';
import ConfigureTool from './ConfigureTool';
import ConfirmImport from './ConfirmImport';
import Steps from './ImportSteps';
import useImport from './useImport';

const Import = () => {
  const dispatch = useDispatch();
  const {
    currentScreen,
    testManagementProjects,
    allImportSteps,
    getUserEmail,
    importStatus
  } = useImport();

  const getCurrentScreen = () => {
    if (currentScreen === 'configureTool') return <ConfigureTool />;
    if (currentScreen === 'configureData')
      return <ConfigureData projects={testManagementProjects} />;
    if (currentScreen === 'confirmImport')
      return <ConfirmImport projects={testManagementProjects} />;
    return <>Something went wrong!</>;
  };

  useEffect(() => {
    dispatch(setImportSteps(IMPORT_STEPS));
    dispatch(setNotificationData(null));
    dispatch(setTestRailsCred({ key: 'email', value: getUserEmail }));
  }, [dispatch, getUserEmail]);

  if (!importStatus || importStatus === 'ongoing')
    return (
      <div className="flex h-full w-full flex-col items-stretch justify-center p-16">
        <TMEmptyState
          title="Import In Progress"
          description="Please wait for the current import to finish to start next import."
          mainIcon={
            <HideSourceOutlinedIcon className="text-base-400 !h-12 !w-12" />
          }
          buttonProps={null}
        />
      </div>
    );
  return (
    <>
      <TMPageHeadings
        heading="Quick Import"
        // actions={
        //   <>
        //     <TMButton variant="primary" colors="white" wrapperClassName="mr-4">
        //       Change Setup
        //     </TMButton>
        //     <TMButton variant="primary" colors="white">
        //       Skip for now
        //     </TMButton>
        //   </>
        // }
      />
      <Steps steps={allImportSteps} />
      <div id="current-screen-wrapper" className="overflow-auto">
        {getCurrentScreen()}
      </div>
    </>
  );
};

export default Import;
