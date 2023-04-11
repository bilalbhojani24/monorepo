import React, { useRef, useState } from 'react';
import { Alerts } from '@browserstack/bifrost';

import BugReport from './BugReport';

const Home = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const handleDismissButton = () => {
    setAlertMessage('');
  };

  const dockRef = useRef(null);

  return (
    <>
      {alertMessage && (
        <Alerts
          description={alertMessage}
          modifier="success"
          linkText=""
          dismissButton
          dismissButtonFn={handleDismissButton}
        />
      )}
      <div
        ref={dockRef}
        className="absolute right-0 top-1/4 flex h-3/4 w-1/2 flex-col"
      >
        <div className="bg-base-200 mb-4 h-full">
          <BugReport setAlertMessage={setAlertMessage} positionRef={dockRef} />
        </div>
      </div>
    </>
  );
};

export default Home;
