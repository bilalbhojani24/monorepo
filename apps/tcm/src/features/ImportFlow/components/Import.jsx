import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TMButton } from 'common/bifrostProxy';

import { IMPORT_STEPS } from '../const/importSteps';
import { setImportSteps } from '../slices/importSlice';

import ConfigureData from './ConfigureData';
import ConfigureTool from './ConfigureTool';
import ConfirmImport from './ConfirmImport';
import ImportHeader from './ImportHeader';
import Steps from './ImportSteps';
import useImport from './useImport';

const Import = () => {
  const dispatch = useDispatch();
  const {
    currentScreen,
    testManagementProjects,
    selectedTestRailsProjects,
    allImportSteps,
  } = useImport();

  const getCurrentScreen = () => {
    if (currentScreen === 'configureTool') return <ConfigureTool />;
    if (currentScreen === 'configureData')
      return <ConfigureData projects={testManagementProjects} />;
    if (currentScreen === 'confirmImport')
      return <ConfirmImport projects={selectedTestRailsProjects} />;
    return <>Something went wrong!</>;
  };

  useEffect(() => {
    dispatch(setImportSteps(IMPORT_STEPS));
  }, [dispatch]);

  return (
    <>
      <ImportHeader
        heading="Quick Import"
        actions={
          <>
            <TMButton variant="primary" colors="white" wrapperClassName="mr-4">
              Change Setup
            </TMButton>
            <TMButton variant="primary" colors="white">
              Skip for now
            </TMButton>
          </>
        }
      />
      <Steps steps={allImportSteps} />
      {getCurrentScreen()}
    </>
  );
};

export default Import;
