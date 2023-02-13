import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TMPageHeadings } from 'common/bifrostProxy';

import { IMPORT_CSV_STEPS } from '../const/importCSVConstants';
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
    if (currentCSVScreen === 'uploadFile') return <UploadFile />;
    if (currentCSVScreen === 'mapFields') {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(
        mappingFieldsData?.field_mappings
      )) {
        dispatch(setFieldsMapping({ key, value }));
      }
      // eslint-disable-next-line no-restricted-syntax
      // for (const [key, value] of Object.entries(
      //   mappingFieldsData?.value_mappings
      // )) {
      //   dispatch(setValueMapping({ key, value }));
      // }
      return (
        <MapFields
          importId={mappingFieldsData?.import_id}
          importFields={mappingFieldsData.import_fields ?? []}
          defaultFields={mappingFieldsData?.fields_available?.default ?? []}
          customFields={mappingFieldsData?.fields_available?.custom ?? []}
          // fieldMappings={mappingFieldsData?.field_mappings}
          isCondensed
        />
      );
    }
    // if (currentCSVScreen === 'reviewAndConfirmImport')
    //   return <ConfirmCSVUpload projects={testManagementProjects} />;
    return <>Something went wrong!</>;
  };

  useEffect(() => {
    dispatch(setCSVConfigurations());
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
