import React from 'react';
import { MdCheckCircleOutline, MdOutlineFeedback } from '@browserstack/bifrost';

const Footer = () => (
  <div
    id="mcpFooter"
    className="border-base-300 flex h-8 items-center justify-between border-t px-3"
  >
    <div className="flex items-center">
      <div className="flex items-center">
        {/* <Loader wrapperStyle="text-base-600" /> */}

        <div className="text-success-600 text-xl">
          <MdCheckCircleOutline />
        </div>

        <div className="text-base-600 ml-1 text-xs font-medium leading-4">
          Android Setup
        </div>
      </div>

      <div className="mx-2">&bull;</div>

      <div className="flex items-center ">
        <div className="text-success-600 text-xl">
          <MdCheckCircleOutline />
        </div>
        <div className="text-base-600 ml-1 text-xs font-medium leading-4">
          iOS Setup
        </div>
      </div>
    </div>

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
