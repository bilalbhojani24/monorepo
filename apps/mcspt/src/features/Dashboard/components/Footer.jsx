import React from 'react';
import { MdOutlineFeedback } from '@browserstack/bifrost';

const Footer = () => (
  <div
    id="mcpFooter"
    className="border-base-300 flex h-8 items-center justify-end border-t px-3"
  >
    <div className="flex items-center">
      <div className="text-base-600 flex items-center">
        <div className="text-xl">
          <MdOutlineFeedback />
        </div>

        <div className="ml-1 text-xs font-medium leading-4">Feedback</div>
      </div>
    </div>
  </div>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
