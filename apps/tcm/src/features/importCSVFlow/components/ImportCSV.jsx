import React, { useEffect } from 'react';
import { TMPageHeadings } from 'common/bifrostProxy';

import {
  FIRST_SCREEN,
  SECOND_SCREEN,
  THIRD_SCREEN
} from '../const/importCSVConstants';

import MapFields from './MapFields';
import PreviewAndConfirm from './PreviewAndConfirm';
import TopSectionInfo from './topSectionInfo';
import UploadFile from './UploadFile';
import useImportCSV from './useImportCSV';

const ImportCSV = () => {
  const {
    currentCSVScreen,
    fetchCSVConfigurations,
    topInfoSteps,
    projectId,
    navigate,
    folderId
  } = useImportCSV();

  const handleBreadcrumbClick = (_, clickedOption) => {
    const { name } = clickedOption;
    if (name === 'Test Cases') navigate(-1);
  };

  const getCurrentScreen = () => {
    if (currentCSVScreen === FIRST_SCREEN) return <UploadFile />;
    if (currentCSVScreen === SECOND_SCREEN) return <MapFields />;
    if (currentCSVScreen === THIRD_SCREEN) return <PreviewAndConfirm />;

    return <>Something went wrong!</>;
  };

  useEffect(() => {
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
      <div
        id="current-import-csv-screen"
        className="flex flex-col items-center overflow-auto pt-6"
      >
        {topInfoSteps.length && currentCSVScreen !== FIRST_SCREEN ? (
          <TopSectionInfo steps={topInfoSteps} />
        ) : null}
        {getCurrentScreen()}
      </div>
    </>
  );
};

export default ImportCSV;
