import React from 'react';
import { Banner, Button } from '@browserstack/bifrost';

import DependencyChecker from './DependencyChecker';
import ExistingSessionsTable from './RecentTests';
import SampleReportsTable from './SampleReports';
import useHome from './useHome';

const Home = () => {
  const {
    totalCompletedSessions,
    totalAllowedSessions,
    buildBannerMsg,
    shouldShowExistingSessionsTable,
    showAuthBanner
  } = useHome();

  return (
    <div id="home-container" className="flex w-full flex-col">
      {showAuthBanner && (
        <Banner
          align="centered"
          isDismissButton={false}
          ctaButton={
            <Button variant="primary" colors="white">
              Login Now
            </Button>
          }
          description={buildBannerMsg(
            totalCompletedSessions,
            totalAllowedSessions
          )}
          modifier={
            totalAllowedSessions === totalCompletedSessions
              ? 'danger'
              : 'attention'
          }
          placement="relative"
        />
      )}

      <div className="flex flex-1 flex-col">
        <DependencyChecker />

        <div className="border-base-300 bg-base-50 flex-1 border-t py-10 px-12">
          {shouldShowExistingSessionsTable ? (
            <ExistingSessionsTable />
          ) : (
            <SampleReportsTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
