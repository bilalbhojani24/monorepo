import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TMPageHeadings } from 'common/bifrostProxy';

import {
  IMPORT_CSV_STEPS,
  MAP_FIELDS,
  PREVIEW_AND_CONFIRM_IMPORT,
  UPLOAD_FILE
} from '../const/importCSVConstants';
import {
  setCSVConfigurations,
  setFieldsMapping
} from '../slices/importCSVSlice';

import ImportCSVSteps from './ImportCSVSteps';
import MapFields from './MapFields';
import UploadFile from './UploadFile';
import useImportCSV from './useImportCSV';

const ImportCSV = () => {
  const dispatch = useDispatch();
  const { currentCSVScreen, importCSVSteps, mappingFieldsData } =
    useImportCSV();

  const getCurrentScreen = () => {
    if (currentCSVScreen === UPLOAD_FILE) return <UploadFile />;
    if (currentCSVScreen === MAP_FIELDS) {
      if (mappingFieldsData.field_mappings) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(
          mappingFieldsData?.field_mappings
        )) {
          dispatch(setFieldsMapping({ key, value }));
        }
      }
      return <MapFields />;
    }
    if (currentCSVScreen === PREVIEW_AND_CONFIRM_IMPORT)
      return <>Last Screen</>;
    //   return <ConfirmCSVUpload projects={testManagementProjects} />;
    return <>Something went wrong!</>;
  };

  useEffect(() => {
    dispatch(setCSVConfigurations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <TMPageHeadings
        // breadcrumbs={[{ name: 'Test Cases' }, { name: 'Import via CSV/XLS' }]}
        heading="Import via CSV/XLS"
      />
      <ImportCSVSteps steps={importCSVSteps || IMPORT_CSV_STEPS} />
      <div
        id="current-import-csv-screen"
        className="mt-4 flex justify-center overflow-auto"
      >
        {getCurrentScreen()}
      </div>
    </>
  );
};

export default ImportCSV;
