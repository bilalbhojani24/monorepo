import React, { useState } from 'react';
import { Alerts } from '@browserstack/bifrost';

import BugReport from './BugReport';

const Home = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const handleDismissButton = () => {
    setAlertMessage('');
  };

  return (
    <div>
      {alertMessage && (
        <Alerts
          description={alertMessage}
          modifier="success"
          linkText=""
          dismissButton
          dismissButtonFn={handleDismissButton}
        />
      )}
      <BugReport setAlertMessage={setAlertMessage} />
    </div>
  );
};

export default Home;
