import React from 'react';

import Folders from './components/Folders';
import TestCases from './components/TestCases';
import TopSection from './components/TopSection';
// import Folders from './components/Folders';

const Repository = () => {
  const data = null;

  return (
    <div className="flex flex-1 flex-col items-stretch">
      <TopSection />
      <div className="flex flex-1 flex-col items-stretch bg-base-100 p-5">
        <div className="flex flex-1 items-stretch overflow-hidden border border-base-200 bg-brand-500 sm:rounded-lg">
          <main className="min-w-0 flex-1 items-stretch lg:flex">
            <section className="flex  h-full min-w-0 flex-1 flex-col items-center justify-center overflow-y-auto lg:order-last">
              <TestCases />
            </section>

            <aside className="hidden flex-1 flex-col items-center justify-center lg:order-first lg:block lg:shrink-0">
              <div className="bg-gray-100 relative flex h-full w-96 flex-col overflow-y-auto border-r border-base-200">
                <Folders />
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Repository;
