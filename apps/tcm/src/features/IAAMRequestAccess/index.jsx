import React from 'react';
import RequestAccessBg from 'assets/images/RequestAccessBg.png';

import RequestAccessModal from './components/RequestAccessModal';

const RequestAccess = () => (
  <div className="bg-base-50 h-full w-full">
    <img
      src={RequestAccessBg}
      alt="various charts used as background"
      className="h-full w-full object-contain"
    />
    <RequestAccessModal />
  </div>
);

export default RequestAccess;
