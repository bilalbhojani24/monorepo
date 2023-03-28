import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TMPageHeadings } from 'common/bifrostProxy';

import {
  IMPORT_CSV_STEPS,
  MAP_FIELDS,
  PREVIEW_AND_CONFIRM_IMPORT,
  UPLOAD_FILE
} from '../const/importCSVConstants';

import ImportCSVSteps from './ImportCSVSteps';
import MapFields from './MapFields';
import PreviewAndConfirm from './PreviewAndConfirm';
import UploadFile from './UploadFile';
import useImportCSV from './useImportCSV';

const ImportCSV = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const projectId = queryParams.get('project');
  const folderId = queryParams.get('folder');
  const { currentCSVScreen, importCSVSteps, fetchCSVConfigurations } =
    useImportCSV();

  const handleBreadcrumbClick = (_, clickedOption) => {
    const { name } = clickedOption;
    if (name === 'Test Cases') navigate(-1);
  };

  const getCurrentScreen = () => {
    if (currentCSVScreen === UPLOAD_FILE) return <UploadFile />;
    if (currentCSVScreen === MAP_FIELDS) return <MapFields />;
    if (currentCSVScreen === PREVIEW_AND_CONFIRM_IMPORT)
      return <PreviewAndConfirm />;

    return <>Something went wrong!</>;
  };

  useEffect(() => {
    console.log('fetch csv config');
    fetchCSVConfigurations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, folderId]);

  return (
    <>
      <TMPageHeadings
        breadcrumbs={[{ name: 'Test Cases' }, { name: 'Import via CSV file' }]}
        breadcrumbWrapperClassName="cursor-pointer"
        onBreadcrumbClick={handleBreadcrumbClick}
        heading="Import via CSV file"
      />
      <ImportCSVSteps steps={importCSVSteps || IMPORT_CSV_STEPS} />
      <div
        id="current-import-csv-screen"
        className="mb-4 flex flex-col items-center overflow-auto pt-4"
      >
        {getCurrentScreen()}
      </div>
    </>
  );
};

export default ImportCSV;
