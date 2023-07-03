import React from 'react';
import { useIsMobile } from '@browserstack/hooks';
import RequestAccessBg from 'assets/images/RequestAccessBg.webp';
import RequestAccessBgMobile from 'assets/images/RequestAccessBgMobile.webp';

import RequestAccessModal from './components/RequestAccessModal';

const RequestAccess = () => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-base-50 h-full w-full">
      <img
        src={isMobile ? RequestAccessBgMobile : RequestAccessBg}
        alt="various charts used as background"
        className="h-full w-full object-contain"
      />
      <RequestAccessModal />
    </div>
  );
};

export default RequestAccess;
