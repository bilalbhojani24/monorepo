import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdNotInterested } from '@browserstack/bifrost';
import { TMEmptyState } from 'common/bifrostProxy';
import AppRoute from 'const/routes';

const NotFound = () => {
  const navigate = useNavigate();

  const goToProject = () => {
    navigate(AppRoute.ROOT);
  };

  return (
    <div className="bg-base-50 fixed top-16 left-0 flex h-full w-full items-center justify-center">
      <div className="border-base-300 flex h-72 w-screen max-w-xl items-center justify-center rounded-md border">
        <TMEmptyState
          title="Page Not Found"
          description="We couldn’t find the page you were looking for. "
          mainIcon={
            <MdNotInterested className="text-base-500 inline-block !h-12 !w-12" />
          }
          buttonProps={{
            children: 'Back to Projects',
            onClick: goToProject,
            size: 'default'
          }}
        />
      </div>
    </div>
  );
};

export default NotFound;
