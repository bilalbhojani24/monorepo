import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { MdLock } from '@browserstack/bifrost';
import { O11yEmptyState, O11yHyperlink } from 'common/bifrostProxy';
import { EXTERNAL_LINKS } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { getInitData } from 'globalSlice/selectors';
import { getExternalUrl, logOllyEvent } from 'utils/common';

function NoAccessPage() {
  const initData = useSelector(getInitData);

  useEffect(() => {
    if (!initData.isLoading && !initData?.data?.hasAccess) {
      logOllyEvent({
        event: 'O11yNoAccessPageVisited'
      });
    }
  }, [initData?.data?.hasAccess, initData.isLoading]);

  if (!initData.isLoading && initData.data?.hasAccess) {
    return <Navigate to={ROUTES.get_started} />;
  }
  return (
    <div className="bg-base-50 flex h-screen w-screen flex-col items-center justify-center p-14">
      <div className="border-base-300 flex h-72 w-screen max-w-xl flex-col items-center justify-center rounded-md border">
        <O11yEmptyState
          title="You do not have access to BrowserStack Test Observability yet!"
          description=""
          mainIcon={
            <MdLock className="text-base-500 inline-block !h-12 !w-12" />
          }
          buttonProps={null}
        />
        <p className="text-base-500 text-sm">
          Request your group owner or administrator to{' '}
          <O11yHyperlink
            href={getExternalUrl({ path: EXTERNAL_LINKS.manageUsers })}
            wrapperClassName="inline text-sm"
          >
            grant access.
          </O11yHyperlink>
        </p>
      </div>
    </div>
  );
}

export default NoAccessPage;
