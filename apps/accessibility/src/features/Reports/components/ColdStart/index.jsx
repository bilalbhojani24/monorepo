import React from 'react';
import { Button, MdOpenInNew } from '@browserstack/bifrost';
import FindInPage from 'assets/find_in_page.svg';
import { CHROME_EXTENSION_URL } from 'constants';

export default function ColdStart() {
  return (
    <>
      <img
        src={FindInPage}
        alt="search in page icon"
        className="mb-5 h-7 w-9"
      />
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
