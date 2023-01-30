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
  const { currentScreen, testManagementProjects, allImportSteps } = useImport();

  const getCurrentScreen = () => {
    if (currentScreen === 'configureTool') return <ConfigureTool />;
    if (currentScreen === 'configureData')
      return <ConfigureData projects={testManagementProjects} />;
    if (currentScreen === 'confirmImport')
      return <ConfirmImport projects={testManagementProjects} />;
    return <>Something went wrong!</>;
  };

  useEffect(() => {
    if (localStorage.getItem('retryImport') === 'true') {
      dispatch(
        setImportSteps(
          IMPORT_STEPS.map((step, idx) => {
            if (idx === 0) return { ...step, status: 'complete' };
            if (idx === 1) return { ...step, status: 'current' };
            return step;
          })
        )
      );
    } else dispatch(setImportSteps(IMPORT_STEPS));
    localStorage.removeItem('retryImport');
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
