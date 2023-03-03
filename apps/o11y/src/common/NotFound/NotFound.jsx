import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdNotInterested } from '@browserstack/bifrost';
import { O11yEmptyState } from 'common/bifrostProxy';
import { ROUTES } from 'constants/routes';

const NotFound = () => {
  const navigate = useNavigate();

  const goToProject = () => {
    navigate(ROUTES.projects);
  };

  return (
    <div className="bg-base-50 flex h-screen w-screen items-center justify-center">
      <div className="border-base-300 flex h-72 w-screen max-w-xl items-center justify-center rounded-md border">
        <O11yEmptyState
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
