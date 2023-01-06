import TopSection from './components/TopSection';
import Folders from './components/Folders';
import TestCases from './components/TestCases';
// import Folders from './components/Folders';

const Repository = () => {
  return (
    <div className="relative">
      <TopSection />
      <div className="bg-base-100 p-5 ">
        <div className="overflow-hidden border border-base-200 bg-white sm:rounded-lg">
          <main class="min-w-0 flex-1  lg:flex">
            <section class="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last">
              <TestCases />
            </section>

            <aside class="hidden lg:order-first lg:block lg:flex-shrink-0">
              <div class="bg-gray-100 relative flex h-full w-96 flex-col overflow-y-auto border-r border-base-200">
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
