import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notifications, notify } from '@browserstack/bifrost';
import { CheckCircleRoundedIcon } from 'assets/icons';
import TestCaseDetailsView from 'features/TestCaseDetailsView';
import PropTypes from 'prop-types';

import { setNotificationConfigForConfirmCSVImport } from '../importCSVFlow/slices/importCSVSlice';

import Folders from './components/Folders';
import TestCases from './components/TestCases';
import TopSection from './components/TopSection';
import useFolders from './components/useFolders';
import useTestCases from './components/useTestCases';

const Repository = ({ isSearch }) => {
  const dispatch = useDispatch();
  const { fetchAllFolders } = useFolders();
  const { folderId, projectId, currentPage, fetchAllTestCases, setRepoView } =
    useTestCases();
  const confirmCSVImportNotificationConfig = useSelector(
    (state) => state.importCSV.confirmCSVImportNotificationConfig
  );
  const successfullyImportedProjects = useSelector(
    (state) => state.importCSV.previewData
  );

  useEffect(() => {
    if (confirmCSVImportNotificationConfig.status === 'success') {
      notify(
        <Notifications
          id="import-csv-success"
          title="Test Cases have been imported"
          description={`${successfullyImportedProjects.length} test cases have been successfully imported to your Test Cases.`}
          headerIcon={<CheckCircleRoundedIcon className="text-success-500" />}
          handleClose={(toastData) => {
            notify.remove(toastData.id);
            dispatch(
              setNotificationConfigForConfirmCSVImport({
                show: false,
                status: '',
                modalData: ''
              })
            );
          }}
        />,
        {
          position: 'top-right',
          duration: 2147483646
        }
      );
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
      <TestCaseDetailsView />
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
