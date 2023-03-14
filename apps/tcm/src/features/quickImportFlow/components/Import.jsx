import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { HideSourceOutlinedIcon } from 'assets/icons';
import { TMButton, TMEmptyState, TMPageHeadings } from 'common/bifrostProxy';
import Loader from 'common/Loader';
import { setSelectedProject } from 'globalSlice';
import { logEventHelper } from 'utils/logEvent';

import AppRoute from '../../../const/routes';
import {
  setNotificationData,
  setProjectIdForQuickImport
} from '../slices/importSlice';
import { resetQuickImport } from '../slices/quickImportThunk';

import ConfigureData from './ConfigureData';
import ConfigureTool from './ConfigureTool';
import ConfirmImport from './ConfirmImport';
import Steps from './ImportSteps';
import useImport from './useImport';

const Import = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const {
    isFromOnboarding,
    beginImportLoading,
    currentScreen,
    testManagementProjects,
    allImportSteps,
    importStatus,
    configureToolPageLoading,
    onCancelClickHandler,
    populateQuickImportCredentials
  } = useImport();

  useLayoutEffect(() => {
    populateQuickImportCredentials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setNotificationData(null));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setProjectIdForQuickImport(projectId));
  }, [projectId, dispatch]);

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
    dispatch(logEventHelper('TM_QiPageLoaded', {}));
    return () => {
      dispatch(resetQuickImport());
    };
  }, [dispatch]);

  useEffect(() => {
    if (projectId) dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  if (configureToolPageLoading) return <Loader wrapperClassName="grow" />;
  if (
    importStatus === 'ongoing' &&
    !beginImportLoading &&
    currentScreen === 'configureTool'
  )
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

  const handleBreadcrumbClick = (_, clickedOption) => {
    const { name } = clickedOption;
    if (name === 'Test Cases') navigate(-1);
  };

  return (
    <>
      <TMPageHeadings
        heading="Quick Import"
        breadcrumbs={
          !isFromOnboarding
            ? [{ name: 'Test Cases' }, { name: 'Quick Import' }]
            : null
        }
        breadcrumbWrapperClassName="cursor-pointer"
        onBreadcrumbClick={handleBreadcrumbClick}
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
