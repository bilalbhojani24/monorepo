import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { MdLock } from '@browserstack/bifrost';
import { O11yEmptyState } from 'common/bifrostProxy';
import { ROUTES } from 'constants/routes';
import { getInitData } from 'globalSlice/selectors';

function NoAccessPage() {
  const initData = useSelector(getInitData);

  if (!initData.isLoading && initData.data?.hasAccess) {
    return <Navigate to={ROUTES.get_started} />;
  }
  return (
    <div className="bg-base-50 flex h-screen w-screen flex-col items-center justify-center p-14">
      <div className="border-base-300 flex h-72 w-screen max-w-xl flex-col items-center justify-center rounded-md border">
        <O11yEmptyState
          title="It appears you don't have access to Test Observability yet!"
          description="Contact your administrator to provide access privileges."
          mainIcon={
            <MdLock className="text-base-500 inline-block !h-12 !w-12" />
          }
          buttonProps={{
            children: 'Request Access',
            // onClick: fetchBuildId,
            size: 'default'
          }}
        />
      </div>
    </div>
  );
}

export default NoAccessPage;
