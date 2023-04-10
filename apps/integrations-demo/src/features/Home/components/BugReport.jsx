import React, { useState } from 'react';
import { Button } from '@browserstack/bifrost';
import { CreateIssue } from '@browserstack/integrations';

const ReportBug = ({ setAlertMessage, positionRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSuccess = ({
    event,
    data: {
      issueId,
      issueUrl,
      attachments,
      issueKey,
      integration: { label } = {}
    }
  }) => {
    setAlertMessage(`Your ${label} issue (${issueKey}) ${event}d successfully`);
  };

  const handleError = (args) => {};
  const jiraDescription = `Source URL:
  | Session ID | 6d23dfdaf7045acd087c0475b51cf637999aa1ac | | Status | completed | | Reason | | | Input Capabilities | {panel:borderWidth=0} | browserName | Chrome | | build | External monitoring - euw - 2023-01-18 | | name | Start time - 2023-01-18T08:30:01.957Z - hub-aps | | browserstack.debug | true | | browserstack.console | verbose | | acceptSslCert | false | | detected_language | selenium/4.0.0-alpha.7 (js linux) | | browserstack.useChromeDriver | true | | realMobile | true | | browserstack.seleniumLogs | true | | browserstack.appiumLogs | true | | browser_version | 109.0 | | browser | Chrome | {panel} | | Session URL | `;

  const options = {
    description: jiraDescription,
    successCallback: handleSuccess,
    errorCallback: handleError
  };

  const auth = {
    url: 'https://integrations.bsstag.com/api/user-access-tokens?unique_user_id=4',
    headers: {
      Authorization:
        'Basic aW50ZWdyYXRpb25zc2Vydl9TZzFEUk46S0ZjenFmc1hhSEdqcE51eVJqZnc='
    }
  };
  const [attachments, setAttachments] = useState(null);

  const handleChange = (event) => {
    if (event.target?.files?.[0]) {
      setAttachments([event.target?.files?.[0]]);
    }
  };

  const config = {
    baseURL: 'https://integrations.bsstag.com'
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <Button onClick={handleOpen}>Report a bug</Button>
      <CreateIssue
        auth={auth}
        position="left"
        isOpen={isOpen}
        config={config}
        options={options}
        handleClose={handleClose}
        attachments={attachments}
        // positionRef={positionRef}
      />
    </div>
  );
};

export default ReportBug;
