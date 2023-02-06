import React from 'react';
import { TMPageHeadings } from 'common/bifrostProxy';

import { IMPORT_CSV_STEPS } from '../const/importCSVConstants';

import ImportCSVSteps from './ImportCSVSteps';
import MapFields from './MapFields';
import UploadFile from './UploadFile';
import useImportCSV from './useImportCSV';

const ImportCSV = () => {
  const { currentCSVScreen, importCSVSteps, mappingFieldsData } =
    useImportCSV();

  const getCurrentScreen = () => {
    if (currentCSVScreen === 'uploadFile') return <UploadFile />;
    if (currentCSVScreen === 'mapFields') {
      return (
        <MapFields
          importFields={mappingFieldsData.import_fields ?? []}
          defaultFields={mappingFieldsData?.fields_available?.default ?? []}
          customFields={mappingFieldsData?.fields_available?.custom ?? []}
          fieldMappings={mappingFieldsData?.field_mappings}
          isCondensed
        />
      );
    }
    // if (currentCSVScreen === 'reviewAndConfirmImport')
    //   return <ConfirmCSVUpload projects={testManagementProjects} />;
    return <>Something went wrong!</>;
  };

  return (
    <>
      <TMPageHeadings
        // breadcrumbs={[{ name: 'Test Cases' }, { name: 'Import via CSV/XLS' }]}
        heading="Import via CSV/XLS"
      />
      <ImportCSVSteps steps={importCSVSteps || IMPORT_CSV_STEPS} />
      {getCurrentScreen()}
    </>
  );
};

export default ImportCSV;
