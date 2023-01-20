import React, { useEffect } from 'react';
import TestCaseDetailsView from 'features/TestCaseDetailsView';

// import Folders from './components/Folders';
import BlankPage from './components/BlankPage';
import Folders from './components/Folders';
import TestCases from './components/TestCases';
import TopSection from './components/TopSection';
import useFolders from './components/useFolders';
import useTestCases from './components/useTestCases';

const Repository = () => {
  const { allFolders, fetchAllFolders } = useFolders();
  const { fetchAllTestCases, folderId, projectId } = useTestCases();

  useEffect(() => {
    fetchAllFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    fetchAllTestCases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, folderId]);

  return (
    <div className="flex flex-1 flex-col items-stretch">
      <TopSection />
      <div className="bg-base-100 flex flex-1 flex-col items-stretch p-4">
        <div className="border-base-200 flex flex-1 items-stretch justify-center overflow-hidden border bg-white sm:rounded-lg">
          {!allFolders.length ? (
            <BlankPage />
          ) : (
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
          )}
        </div>
      </div>
      <TestCaseDetailsView />
    </div>
  );
};

export default Repository;
