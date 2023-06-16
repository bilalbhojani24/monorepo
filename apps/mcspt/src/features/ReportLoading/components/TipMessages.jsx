import React from 'react';
import { MdTipsAndUpdates } from '@browserstack/bifrost';

import useTipMessages from './useTipMessages';

const TipMessages = () => {
  const { selectedTipMsg } = useTipMessages();

  return (
    <div className="mt-2 flex rounded-md bg-info-50 p-4">
      <div className="mr-3 text-xl text-info-400">
        <MdTipsAndUpdates />
      </div>

      <div className="">
        <div className="mb-2 text-sm font-medium leading-5 text-info-800">
          Did you know?
        </div>
        <div className="text-sm font-normal leading-5 text-info-700">
          {selectedTipMsg}
        </div>
      </div>
    </div>
  );
};

export default TipMessages;
