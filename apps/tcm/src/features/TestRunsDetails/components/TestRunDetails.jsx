import React, { useEffect } from 'react';

import MiniDetails from './MiniDetails';
import TopSection from './TopSection';
import useTestRunDetails from './useTestRunDetails';

const TestRunDetails = () => {
  const { projectId, testRunId, fetchTestRunDetails } = useTestRunDetails();

  useEffect(() => {
    fetchTestRunDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, testRunId]);

  return (
    <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
      <TopSection />
      <MiniDetails />
      <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
        <div className="flex flex-1 shrink-0 grow  items-stretch justify-center  overflow-hidden bg-white">
          <main className="w-full min-w-0 shrink-0 grow overflow-hidden lg:flex">
            <section className="flex h-full w-full  min-w-0 lg:order-last">
              Test cases
            </section>

            <aside className="lg:order-first lg:block lg:shrink-0">
              <div className="relative flex h-full w-96 flex-col overflow-hidden">
                Folders
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TestRunDetails;
