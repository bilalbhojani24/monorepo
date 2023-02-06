import React, { useEffect } from 'react';
import TestCaseDetailsView from 'features/TestCaseDetailsView';
import PropTypes from 'prop-types';

import Folders from './components/Folders';
import TestCases from './components/TestCases';
import TopSection from './components/TopSection';
import useFolders from './components/useFolders';
import useTestCases from './components/useTestCases';

const Repository = ({ isSearch }) => {
  const { fetchAllFolders } = useFolders();
  const { folderId, projectId, currentPage, fetchAllTestCases, setRepoView } =
    useTestCases();

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
    <div className="flex flex-1 flex-col items-stretch">
      <TopSection />
      <div className="flex flex-1 flex-col items-stretch">
        <div className="flex flex-1 items-stretch justify-center  bg-white">
          <main className="w-full min-w-0 lg:flex">
            <section className="flex h-full w-full  min-w-0 lg:order-last">
              <TestCases />
            </section>

            <aside className="lg:order-first lg:block lg:shrink-0">
              <div className="relative flex h-full w-96 flex-col overflow-y-auto">
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
