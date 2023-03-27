import React, { useState } from 'react';
import { Button } from '@browserstack/bifrost';
import { CreateIssue } from '@browserstack/integrations';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const jiraDescription = `Source URL:
  | Session ID | 6d23dfdaf7045acd087c0475b51cf637999aa1ac | | Status | completed | | Reason | | | Input Capabilities | {panel:borderWidth=0} | browserName | Chrome | | build | External monitoring - euw - 2023-01-18 | | name | Start time - 2023-01-18T08:30:01.957Z - hub-aps | | browserstack.debug | true | | browserstack.console | verbose | | acceptSslCert | false | | detected_language | selenium/4.0.0-alpha.7 (js linux) | | browserstack.useChromeDriver | true | | realMobile | true | | browserstack.seleniumLogs | true | | browserstack.appiumLogs | true | | browser_version | 109.0 | | browser | Chrome | {panel} | | Session URL | `;

  const options = {
    metaData: {
      jira: {
        description: jiraDescription
      }
    }
  };
  return (
    <div>
      <Button onClick={handleOpen}>Report a bug</Button>
      <CreateIssue
        isOpen={isOpen}
        handleClose={handleClose}
        authUrl="https://integrations.bsstag.com/api/user-access-tokens"
        options={options}
      />
    </div>
  );
};

export default Home;
