import React from 'react';
import { Button, MdErrorOutline } from '@browserstack/bifrost';
import { DOC_LINKS_CONSTANTS } from '@browserstack/mcp-shared';

const ReportError = () => (
  <div className="flex flex-1 items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="bg-danger-100 flex h-12 w-12 items-center justify-center rounded-full">
        <MdErrorOutline className="text-danger-600 text-2xl" />
      </div>

      <div className="mt-5 text-lg font-medium leading-6">
        Oops! There was an error while loading the report
      </div>

      <div className="text-base-500 mt-2 text-sm font-normal leading-5">
        Please try again and if the error persists check troubleshooting docs or
        reach out to support
      </div>

      <div className="mt-6">
        <Button
          wrapperClassName="mr-3"
          size="default"
          colors="white"
          variant="primary"
          onClick={() => {
            window.open(
              DOC_LINKS_CONSTANTS.DEVICE_DETECT_TROUBLESHOOT,
              '_blank'
            );
          }}
        >
          Troubleshooting Docs
        </Button>

        <Button
          size="default"
          colors="white"
          variant="primary"
          onClick={() => {
            window.open(DOC_LINKS_CONSTANTS.CONTACT_US, '_blank');
          }}
        >
          Contact Support
        </Button>
      </div>
    </div>
  </div>
);

export default ReportError;
