import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdArrowBack } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yButton } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import ReqDemoButton from 'common/ReqDemoButton';
import { URL_REGEX } from 'constants/common';
import { getHeaderSize } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { getDocUrl, logOllyEvent } from 'utils/common';

const getDomainName = (hostName) =>
  hostName.substring(
    hostName.lastIndexOf('.', hostName.lastIndexOf('.') - 1) + 1
  );

const allowedOrigin = (origin) => {
  if (!origin) return {};
  const domainName = getDomainName(origin);
  return !!(domainName === 'browserstack.com' || domainName === 'bsstag.com');
};
export default function FrameworkDocViewer({ onClickBack, selectedFramework }) {
  const [isLoading, setIsLoading] = useState(true);
  const headerSize = useSelector(getHeaderSize);

  const onLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedFramework.name) {
      logOllyEvent({
        event: 'O11yOnboardingVisited',
        data: {
          language_framework: selectedFramework.name
        }
      });
    }
  }, [selectedFramework.name]);

  const handleFrameTasks = useCallback((message) => {
    if (!message?.data) return;
    // Adding check for allowing messages only from browserstack domain
    if (!allowedOrigin(message?.origin)) return;
    const { type, payload } = message.data;
    if (type === 'update_route') {
      const isValidURL = URL_REGEX.test(payload.url);
      const sanitizedPayloadUrl = isValidURL ? payload.url : '';
      if (!sanitizedPayloadUrl) return;
      window.open(payload.url, payload.blank ? '_blank' : '_self');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleFrameTasks);
    return () => window.removeEventListener('message', handleFrameTasks);
  }, [handleFrameTasks]);

  return (
    <div
      className="m-auto flex w-full max-w-screen-xl flex-col overflow-hidden px-12 pb-6 pt-0"
      style={{
        height: `calc(100vh - ${headerSize}px)`
      }}
    >
      <div className="mb-5 w-full items-center justify-between pt-6">
        <O11yButton
          variant="minimal"
          icon={<MdArrowBack className="text-xl" />}
          onClick={onClickBack}
        >
          Back
        </O11yButton>
        <div className="mt-1 flex justify-between">
          <h1 className="text-2xl font-bold leading-7">
            {selectedFramework.name}
          </h1>
          <ReqDemoButton />
        </div>
      </div>
      {isLoading && <O11yLoader wrapperClassName="flex-1" />}
      <iframe
        className={twClassNames('w-full h-0 border-0 rounded', {
          'h-full border border-base-200 ': !isLoading
        })}
        title={selectedFramework.name}
        onLoad={onLoad}
        src={getDocUrl({
          path: `onboarding/test-observability/${selectedFramework.id}`,
          prependO11y: false
        })}
      />
      {!isLoading && (
        <O11yLoader
          wrapperClassName="h-10 mt-5"
          loaderClass="w-6 h-6"
          text="Waiting for first build to be triggered to view test results"
          textClass="text-base font-medium"
        />
      )}
    </div>
  );
}

FrameworkDocViewer.propTypes = {
  onClickBack: PropTypes.func.isRequired,
  selectedFramework: PropTypes.objectOf(PropTypes.any).isRequired
};
