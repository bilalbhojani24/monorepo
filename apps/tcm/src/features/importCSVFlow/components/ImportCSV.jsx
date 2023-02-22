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
  setCSVConfigurations
  // setFieldsMapping
} from '../slices/importCSVSlice';

import ImportCSVSteps from './ImportCSVSteps';
import MapFields from './MapFields';
import PreviewAndConfirm from './PreviewAndConfirm';
import UploadFile from './UploadFile';
import useImportCSV from './useImportCSV';

const ImportCSV = () => {
  const dispatch = useDispatch();
  const { currentCSVScreen, importCSVSteps } = useImportCSV();

  const getCurrentScreen = () => {
    if (currentCSVScreen === UPLOAD_FILE) return <UploadFile />;
    if (currentCSVScreen === MAP_FIELDS) return <MapFields />;
    if (currentCSVScreen === PREVIEW_AND_CONFIRM_IMPORT)
      return <PreviewAndConfirm />;

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
        className="mt-4 flex flex-col items-center overflow-auto"
      >
        {getCurrentScreen()}
      </div>
    </>
  );
};

export default ImportCSV;
