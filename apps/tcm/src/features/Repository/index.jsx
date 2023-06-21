import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TestCaseDetailsView from 'features/TestCaseDetailsView';
import PropTypes from 'prop-types';
import { logEventHelper } from 'utils/logEvent';

import Folders from './components/Folders';
import MiniatureRepository from './components/MiniatureRepository';
import TestCases from './components/TestCases';
import TopSection from './components/TopSection';
import useFolders from './components/useFolders';
import useTestCases from './components/useTestCases';

const Repository = ({ isSearch }) => {
  const dispatch = useDispatch();
  const { fetchAllFolders, setShowFreshChatButton, isSearchFilterView } =
    useFolders();

  const {
    searchKey,
    folderId,
    projectId,
    currentPage,
    testCaseDetailsIDs,
    detailsCloseHandler,
    initTestCaseDetails,
    fetchAllTestCases,
    setRepoView,
    cleanUpRepository
  } = useTestCases();

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

    return () => cleanUpRepository();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(
      logEventHelper(
        isSearch ? 'TM_TcSearchPageLoaded' : 'TM_TestCasesPageLoaded',
        {
          project_id: projectId,
          folder_id: folderId,
          keyword: isSearch ? searchKey : null
        }
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    setRepoView(isSearch);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearch]);

  useEffect(() => {
    dispatch(setShowFreshChatButton(false));
    return () => {
      dispatch(setShowFreshChatButton(true));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSearchFilterView) dispatch(setShowFreshChatButton(true));
    else dispatch(setShowFreshChatButton(false));
  }, [isSearchFilterView, dispatch, setShowFreshChatButton]);

  return (
    <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
      <TopSection />
      <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
        <div className="flex flex-1 shrink-0 grow  items-stretch justify-center  overflow-hidden bg-white">
          <main className="flex w-full min-w-0 shrink-0 grow overflow-hidden">
            <aside className="order-first block shrink-0">
              <div className="relative flex h-full w-72 flex-col overflow-hidden">
                <Folders />
              </div>
            </aside>
            <section className="order-last flex h-full  w-full min-w-0">
              <TestCases />
            </section>
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
