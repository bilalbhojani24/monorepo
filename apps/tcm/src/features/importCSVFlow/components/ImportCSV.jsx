import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TMPageHeadings } from 'common/bifrostProxy';

import { IMPORT_CSV_STEPS } from '../const/importCSVConstants';
import { setCSVImportSteps } from '../slices/importCSVSlice';

import ImportCSVSteps from './ImportCSVSteps';
import UploadFile from './UploadFile';
import useImportCSV from './useImportCSV';

const ImportCSV = () => {
  const dispatch = useDispatch();
  const { currentCSVScreen, importCSVSteps } = useImportCSV();

  const getCurrentScreen = () => {
    if (currentCSVScreen === 'uploadFile') return <UploadFile />;
    // if (currentCSVScreen === 'mapFields')
    //   return <MapFields projects={testManagementProjects} />;
    // if (currentCSVScreen === 'reviewAndConfirmImport')
    //   return <ConfirmCSVUpload projects={testManagementProjects} />;
    return <>Something went wrong!</>;
  };

  useEffect(() => {
    dispatch(setCSVImportSteps(IMPORT_CSV_STEPS));
  }, [dispatch]);

  return (
    <>
      <TMPageHeadings
        breadcrumbs={[{ name: 'Test Cases' }, { name: 'Import via CSV/XLS' }]}
        heading="Import via CSV/XLS"
      />
      <ImportCSVSteps steps={importCSVSteps || IMPORT_CSV_STEPS} />
      {getCurrentScreen()}
    </>
  );
};

export default ImportCSV;
