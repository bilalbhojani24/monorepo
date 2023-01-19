import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
    testRailProjects,
    selectedTestRailsProjects,
    allImportSteps,
  } = useImport();

  // console.log('all import steps', allImportSteps);
  // const currentScreen = allImportSteps.filter(
  //   (step) => step.status === 'current',
  // );

  const getCurrentScreen = () => {
    if (currentScreen === 'configureTool') return <ConfigureTool />;
    if (currentScreen === 'configureData')
      return <ConfigureData projects={testRailProjects} />;
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
        actions={[
          {
            id: 'change-setup',
            callback: () => {
              // console.log('Change Setup');
            },
            actionProps: {
              children: 'Change Setup',
              colors: 'white',
            },
          },
          {
            id: 'skip-for-now',
            callback: () => {
              // console.log('skip for now');
            },
            actionProps: {
              children: 'Skip for now',
              colors: 'white',
            },
          },
        ]}
      />
      <Steps steps={allImportSteps} />
      {getCurrentScreen()}
    </>
  );
};

export default Import;
