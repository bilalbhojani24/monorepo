import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  MdLock,
  MdOutlineLock,
  MdOutlineTextSnippet
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { requestO11yAccess } from 'api/global';
import { O11yButton, O11yEmptyState, O11yHyperlink } from 'common/bifrostProxy';
import { DOC_KEY_MAPPING, WRAPPER_GAP_CLASS } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { setHasAcceptedTnC } from 'globalSlice/index';
import { getInitData } from 'globalSlice/selectors';
import { getDocUrl, logOllyEvent } from 'utils/common';
import { o11yNotify } from 'utils/notification';

function RequestAccess() {
  const initData = useSelector(getInitData);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  if (!initData.isLoading && initData.data?.hasAcceptedTnC) {
    return <Navigate to={ROUTES.get_started} />;
  }

  const handleRequestAccess = async () => {
    logOllyEvent({ event: 'O11yGetAccessClicked' });
    setIsLoading(true);
    try {
      await requestO11yAccess();
      dispatch(setHasAcceptedTnC(true));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      o11yNotify({
        title: 'Something went wrong!',
        description: `Please retry in some time.`,
        type: 'error'
      });
    }
  };

  return (
    <div
      className={twClassNames(
        'bg-base-50 flex w-screen flex-col items-center justify-center',
        WRAPPER_GAP_CLASS
      )}
    >
      <div className="border-base-300 flex h-72 w-screen max-w-xl flex-col items-center justify-center rounded-md border">
        <O11yEmptyState
          title="Test observability is in beta"
          description="You do not have access to the product yet."
          mainIcon={
            <MdLock className="text-base-500 inline-block !h-12 !w-12" />
          }
          buttonProps={null}
        />
        <div className="mt-6 flex gap-4">
          <O11yHyperlink
            target="_blank"
            href={getDocUrl({ path: DOC_KEY_MAPPING.introduction })}
          >
            <O11yButton
              size="default"
              colors="white"
              icon={<MdOutlineTextSnippet className="h-5 w-5" />}
            >
              View Documentation
            </O11yButton>
          </O11yHyperlink>
          <O11yButton
            size="default"
            icon={<MdOutlineLock className="h-5 w-5" />}
            loading={isLoading}
            onClick={handleRequestAccess}
            isIconOnlyButton={isLoading}
          >
            Get Access
          </O11yButton>
        </div>
      </div>
      <p className="mt-4 text-xs">
        By continuing you agree to our{' '}
        <O11yHyperlink
          target="_blank"
          wrapperClassName="inline font-normal text-xs"
          href={getDocUrl({ path: DOC_KEY_MAPPING.tnc })}
        >
          terms & conditions
        </O11yHyperlink>{' '}
        of test data collection.
      </p>
    </div>
  );
}

export default RequestAccess;
