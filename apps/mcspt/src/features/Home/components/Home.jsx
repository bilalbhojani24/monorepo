import React from 'react';

import { NewPerformanceSessionModal } from 'features/NewPerformanceSession';

import ExistingUserHome from './ExistingUserHome';
import NewUserHome from './NewUserHome';
import useHome from './useHome';

const Home = () => {
  const {
    newTestClickHandler,
    showNewSessionModal,
    setShowNewSessionModal,
    previousUserSessions
  } = useHome();

  return (
    <div id="home-container" className="">
      {previousUserSessions?.length > 0 && (
        <ExistingUserHome
          newTestClickHandler={newTestClickHandler}
          previousUserSessions={previousUserSessions}
        />
      )}

      {previousUserSessions?.length === 0 && (
        <NewUserHome newTestClickHandler={newTestClickHandler} />
      )}

      <NewPerformanceSessionModal
        showNewSessionModal={showNewSessionModal}
        setShowNewSessionModal={setShowNewSessionModal}
      />
    </div>
  );
};

export default Home;
