import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdNotInterested } from '@browserstack/bifrost';
import { ROUTES } from 'constants/routes';

import { INTGEmptyState } from '../bifrostProxy';

const NotFound = () => {
  const navigate = useNavigate();

  const goToDasboard = () => {
    navigate(ROUTES.overview);
  };

  return (
    <div className="bg-base-50 flex h-screen w-screen items-center justify-center">
      <div className="border-base-300 flex h-72 w-screen max-w-xl items-center justify-center rounded-md border">
        <INTGEmptyState
          title="Page Not Found"
          description="We couldn’t find the page you were looking for. "
          mainIcon={
            <MdNotInterested className="text-danger-600 inline-block !h-12 !w-12" />
          }
          buttonProps={{
            children: 'Back to Dashboard',
            onClick: goToDasboard,
            size: 'default'
          }}
        />
      </div>
    </div>
  );
};

export default NotFound;
