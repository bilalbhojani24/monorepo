import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import { HideSourceOutlinedIcon } from 'assets/icons';
import { TMButton, TMEmptyState, TMPageHeadings } from 'common/bifrostProxy';
import Loader from 'common/Loader';
import TopSectionInfo from 'common/TopSectionInfo';
import { setSelectedProject } from 'globalSlice';
import { logEventHelper } from 'utils/logEvent';

import AppRoute from '../../../const/routes';
import { IMPORT_STATUS } from '../../ImportProgress/const/immutables';
import { SCREEN_1, SCREEN_2 } from '../const/importSteps';
import { setProjectIdForQuickImport } from '../slices/importSlice';
import { resetQuickImport } from '../slices/quickImportThunk';

import ConfigureData from './ConfigureData';
import ConfigureTool from './ConfigureTool';
import useImport from './useImport';

const Import = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const {
    configureToolPageLoading,
    currentScreen,
    handleChangeSetup,
    handleTopSectionCtaClick,
    isFromOnboarding,
    onCancelClickHandler,
    importStatus,
    populateQuickImportCredentials,
    showArtificialLoader,
    testManagementProjects,
    topImportInfoSteps
  } = useImport();

  useLayoutEffect(() => {
    populateQuickImportCredentials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setProjectIdForQuickImport(projectId));
  }, [projectId, dispatch]);

  const getCurrentScreen = () => {
    if (currentScreen === SCREEN_1) return <ConfigureTool />;
    if (currentScreen === SCREEN_2)
      return (
        <ConfigureData
          projects={testManagementProjects}
          showLoader={showArtificialLoader}
        />
      );

    return <>Something went wrong!</>;
  };

  useEffect(() => {
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
  if (importStatus === IMPORT_STATUS.ONGOING)
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
                  onClick={handleChangeSetup}
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
      <div
        id="current-screen-wrapper"
        className={twClassNames(
          'flex max-h-screen flex-col items-center pt-4 overflow-scroll',
          {
            'min-h-min': !showArtificialLoader,
            'h-screen': showArtificialLoader
          }
        )}
      >
        {topImportInfoSteps.length && currentScreen !== SCREEN_1 ? (
          <TopSectionInfo
            steps={topImportInfoSteps}
            wrapperClassName="w-3/4"
            ctaCb={(redirectTo) => handleTopSectionCtaClick(redirectTo)}
          />
        ) : null}
        {getCurrentScreen()}
      </div>
    </>
  );
};

export default Import;
