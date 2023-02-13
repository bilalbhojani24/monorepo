import React from 'react';

import { NewPerformanceSessionModal } from '../../NewPerformanceSession';

import ExistingUserHome from './ExistingUserHome';
import NewUserHome from './NewUserHome';
import useHome from './useHome';

export default function Home() {
  const {
    newTestClicked,
    showNewSessionModal,
    setShowNewSessionModal,
    previousUserSessions
  } = useHome();

  return (
    <div id="home-container" className="">
      {previousUserSessions?.length > 0 && (
        <ExistingUserHome
          newTestClicked={newTestClicked}
          previousUserSessions={previousUserSessions}
        />
      )}

      {previousUserSessions?.length === 0 && (
        <NewUserHome newTestClicked={newTestClicked} />
      )}

      <NewPerformanceSessionModal
        showNewSessionModal={showNewSessionModal}
        setShowNewSessionModal={setShowNewSessionModal}
      />
    </div>
  );
}
