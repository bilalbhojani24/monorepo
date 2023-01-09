import React, { useEffect } from 'react';

// import Folders from './components/Folders';
import BlankPage from './components/BlankPage';
import Folders from './components/Folders';
import TestCases from './components/TestCases';
import TopSection from './components/TopSection';
import useFolders from './components/useFolders';

const Repository = () => {
  const { allFolders } = useFolders();

  return (
    <div className="flex flex-1 flex-col items-stretch">
      <TopSection />
      <div className="flex flex-1 flex-col items-stretch bg-base-100 p-5">
        <div className="flex flex-1 items-stretch justify-center overflow-hidden border border-base-200 bg-white sm:rounded-lg">
          {!allFolders.length ? (
            <BlankPage />
          ) : (
            <main className="w-full min-w-0 lg:flex">
              <section className="flex h-full w-full  min-w-0 overflow-y-auto lg:order-last">
                <TestCases />
              </section>

              <aside className="lg:order-first lg:block lg:shrink-0">
                <div className="bg-gray-100 relative flex h-full w-96 flex-col overflow-y-auto">
                  <Folders />
                </div>
              </aside>
            </main>
          )}
        </div>
      </div>
    </div>
  );
};

export default Repository;
