import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notifications, notify } from '@browserstack/bifrost';
import { CheckCircleRoundedIcon } from 'assets/icons';
import TestCaseDetailsView from 'features/TestCaseDetailsView';
import PropTypes from 'prop-types';

import {
  setImportCSVSuccessNotificationShown,
  setNotificationConfigForConfirmCSVImport
} from '../importCSVFlow/slices/importCSVSlice';

import Folders from './components/Folders';
import MiniatureRepository from './components/MiniatureRepository';
import TestCases from './components/TestCases';
import TopSection from './components/TopSection';
import useFolders from './components/useFolders';
import useTestCases from './components/useTestCases';

const Repository = ({ isSearch }) => {
  const dispatch = useDispatch();
  const { fetchAllFolders } = useFolders();

  const {
    folderId,
    projectId,
    currentPage,
    testCaseDetailsIDs,
    detailsCloseHandler,
    initTestCaseDetails,
    fetchAllTestCases,
    setRepoView
  } = useTestCases();
  const confirmCSVImportNotificationConfig = useSelector(
    (state) => state.importCSV.confirmCSVImportNotificationConfig
  );
  const totalImportedProjectsInPreview = useSelector(
    (state) => state.importCSV.totalImportedProjectsInPreview
  );
  const importCSVSuccessNotificationShown = useSelector(
    (state) => state.importCSV.importCSVSuccessNotificationShown
  );

  useEffect(() => {
    if (
      confirmCSVImportNotificationConfig.status === 'success' &&
      !importCSVSuccessNotificationShown
    ) {
      notify(
        <Notifications
          id="import-csv-success"
          title="CSV data imported"
          description={`${totalImportedProjectsInPreview} test cases have been imported successfully`}
          headerIcon={<CheckCircleRoundedIcon className="text-success-500" />}
          handleClose={(toastData) => {
            notify.remove(toastData.id);
            dispatch(
              setNotificationConfigForConfirmCSVImport({
                show: false,
                status: '',
                modalData: '',
                csvImportProjectId: null,
                csvImportFolderId: null
              })
            );
          }}
        />,
        {
          position: 'top-right',
          duration: 2147483646
        }
      );
      dispatch(setImportCSVSuccessNotificationShown(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, confirmCSVImportNotificationConfig]);

  useEffect(() => {
    if (!isSearch) fetchAllFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, isSearch]);

  useEffect(() => {
    if (!isSearch) fetchAllTestCases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, folderId, currentPage, isSearch]);

  useEffect(() => {
    // onload set the testcase details IDs
    initTestCaseDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRepoView(isSearch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearch]);

  return (
    <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
      <TopSection />
      <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
        <div className="flex flex-1 shrink-0 grow  items-stretch justify-center  overflow-hidden bg-white">
          <main className="w-full min-w-0 shrink-0 grow overflow-hidden lg:flex">
            <section className="flex h-full w-full  min-w-0 lg:order-last">
              <TestCases />
            </section>

            <aside className="lg:order-first lg:block lg:shrink-0">
              <div className="relative flex h-full w-96 flex-col overflow-hidden">
                <Folders />
              </div>
            </aside>
          </main>
        </div>
      </div>
      <TestCaseDetailsView
        folderId={testCaseDetailsIDs?.folderId}
        projectId={projectId}
        testCaseId={testCaseDetailsIDs?.testCaseId}
        onDetailsClose={detailsCloseHandler}
      />
    </div>
  );
};

Repository.propTypes = {
  isSearch: PropTypes.bool
};

Repository.defaultProps = {
  isSearch: false
};

export default Repository;

export { MiniatureRepository };
