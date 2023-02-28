import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { HideSourceOutlinedIcon } from 'assets/icons';
import { TMButton, TMEmptyState, TMPageHeadings } from 'common/bifrostProxy';
import { setSelectedProject } from 'globalSlice';

import AppRoute from '../../../const/routes';
import { setNotificationData } from '../slices/importSlice';

import ConfigureData from './ConfigureData';
import ConfigureTool from './ConfigureTool';
import ConfirmImport from './ConfirmImport';
import Steps from './ImportSteps';
import useImport from './useImport';

const Import = () => {
  const dispatch = useDispatch();
  const {
    isFromOnboarding,
    currentScreen,
    testManagementProjects,
    allImportSteps,
    importStatus,
    onCancelClickHandler
  } = useImport();
  const { projectId } = useParams();

  const getCurrentScreen = () => {
    if (currentScreen === 'configureTool') return <ConfigureTool />;
    if (currentScreen === 'configureData')
      return <ConfigureData projects={testManagementProjects} />;
    if (currentScreen === 'confirmImport')
      return <ConfirmImport projects={testManagementProjects} />;
    return <>Something went wrong!</>;
  };

  useEffect(() => {
    dispatch(setNotificationData(null));
  }, [dispatch]);

  useEffect(() => {
    if (projectId) dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  if (!importStatus || importStatus === 'ongoing')
    return (
      <div className="flex h-full w-full flex-col items-stretch justify-center p-16">
        <TMEmptyState
          title="Import In Progress"
          description="Please wait for the current import to finish to start next import."
          mainIcon={
            <HideSourceOutlinedIcon className="text-base-400 !h-12 !w-12" />
          }
          buttonProps={null}
        />
      </div>
    );
  return (
    <>
      <TMPageHeadings
        heading="Quick Import"
        actions={
          <>
            {isFromOnboarding && (
              <Link to={AppRoute.ONBOARDING}>
                <TMButton
                  variant="primary"
                  colors="white"
                  wrapperClassName="mr-4"
                >
                  Change Setup
                </TMButton>
              </Link>
            )}
            <TMButton
              variant="primary"
              colors="white"
              onClick={onCancelClickHandler}
            >
              Cancel
            </TMButton>
          </>
        }
      />
      <Steps steps={allImportSteps} />
      <div
        id="current-screen-wrapper"
        className="flex justify-center overflow-auto pt-4"
      >
        {getCurrentScreen()}
      </div>
    </>
  );
};

export default Import;
