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

  const auth = {
    url: 'https://integrations.bsstag.com/api/user-access-tokens?unique_user_id=4',
    headers: {
      Authorization:
        'Basic dGVzdGludGVncmF0aW9uc19wckFNYTk6Z1F6YXA3cm1lMTluYkphWnZOc0o='
    }
  };
  const [attachment, setAttachment] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi1h3CULGItXdaYf2-72PtkqJ_7jk-eYzOtpAKmw5dBvP9lM4GNpe4cEk2GAmr5bb_8lUtdqBWHZo&usqp=CAU&ec=48600113'
  );

  const handleChange = (event) => {
    setAttachment(event.target?.files?.[0] ?? null);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <Button onClick={handleOpen}>Report a bug</Button>
      <CreateIssue
        isOpen={isOpen}
        handleClose={handleClose}
        auth={auth}
        options={options}
        attachment={attachment}
      />
    </div>
  );
};

export default Home;
