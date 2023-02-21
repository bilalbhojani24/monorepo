import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLock, MdMail, MdOutlineTextSnippet } from '@browserstack/bifrost';
import { TMButton, TMEmptyState } from 'common/bifrostProxy';
import AppRoute from 'const/routes';

const AlphaAccess = () => {
  const navigate = useNavigate();

  const goToProject = () => {
    navigate(AppRoute.ROOT);
  };

  return (
    <div className="bg-base-50 fixed top-16 left-0 flex h-full w-full items-center justify-center">
      <div className="border-base-300 flex h-72 w-screen max-w-xl flex-col items-center justify-center rounded-md border">
        <TMEmptyState
          title="Test Management is in private-alpha"
          description="You don't have access to Test Management yet"
          mainIcon={
            <MdLock className="text-base-500 inline-block !h-12 !w-12" />
          }
          buttonProps={null}
        />
        <div className="mt-6 flex gap-4">
          <TMButton
            size="default"
            colors="white"
            icon={<MdOutlineTextSnippet className="h-5 w-5" />}
          >
            View Documentation
          </TMButton>
          <TMButton size="default" icon={<MdMail className="h-5 w-5" />}>
            Request Access
          </TMButton>
        </div>
      </div>
    </div>
  );
};

export default AlphaAccess;
