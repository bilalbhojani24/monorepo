import React, { useEffect } from 'react';
import { Button, MdOpenInNew } from '@browserstack/bifrost';
import FindInPage from 'assets/accessibility_scan.svg';
import { CHROME_EXTENSION_URL } from 'constants';
import { logEvent } from 'utils/logEvent';

export default function ColdStart() {
  useEffect(() => {
    logEvent('OnManualTestReportsNoReports');
  }, []);

  return (
    <>
      <img src={FindInPage} alt="search in page icon" className="mb-5" />
      <p className="mb-1 font-semibold">Start your Accessibility testing!</p>
      <p className="text-base-500 mb-6">
        Use the extension to scan your web pages & workflows for accessibility
        issues.
      </p>
      <Button
        iconPlacement="start"
        icon={<MdOpenInNew className="h-5 w-5" />}
        onClick={() => {
          window.open(CHROME_EXTENSION_URL, '_target');
        }}
        wrapperClassName="py-2"
      >
        Download extension
      </Button>
    </>
  );
}
