import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { GridListWHorizontalLink } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yButton } from 'common/bifrostProxy';
import { EXTERNAL_LINKS } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { getHeaderSize, getProjects } from 'globalSlice/selectors';
import { getExternalUrl, logOllyEvent } from 'utils/common';

import FrameworkDocViewer from '../components/FrameworkDocViewer';
import { FRAMEWORK_IDS, FRAMEWORKS } from '../constants';

export default function OnboardingFrameworkSelector() {
  const projects = useSelector(getProjects);
  const [selectedFramework, setSelectedFramework] = useState('');
  const navigate = useNavigate();
  const headerSize = useSelector(getHeaderSize);

  useLayoutEffect(() => {
    const searchParams = new URLSearchParams(window?.location?.search);
    const searchFramework = searchParams.get('framework');
    if (
      searchFramework &&
      Object.keys(FRAMEWORK_IDS).includes(searchFramework)
    ) {
      setSelectedFramework(
        FRAMEWORKS.find((item) => item.id === searchFramework)
      );
    } else {
      logOllyEvent({
        event: 'O11yFrameworkSelectionVisited'
      });
    }
  }, []);

  const handleSelectFramework = (id) => {
    const foundFramework = FRAMEWORKS.find((item) => item.id === id);
    if (!foundFramework?.isUpComing) {
      setSelectedFramework(foundFramework);
      navigate({
        search: `?framework=${id}`
      });
    }
  };

  if (projects?.list?.length) {
    return <Navigate to={ROUTES.projects} />;
  }

  if (selectedFramework) {
    return (
      <FrameworkDocViewer
        selectedFramework={selectedFramework}
        onClickBack={() => handleSelectFramework('')}
      />
    );
  }

  const handleClickTalkToAutomationFW = () => {
    window.open(
      getExternalUrl({ path: EXTERNAL_LINKS.contact }),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div
      className="flex w-screen items-center justify-center overflow-auto p-12"
      style={{
        height: `calc(100vh - ${headerSize}px)`
      }}
    >
      <div className="border-base-200 flex w-full max-w-4xl flex-col rounded-lg border bg-white p-6 shadow-sm">
        <div className="border-b-base-200 mb-6 flex justify-between border-b pb-6">
          <div>
            <h1 className="text-lg font-medium leading-6">
              Welcome to Test Observability
            </h1>
            <h3 className="text-base-500 mt-1 text-sm font-normal leading-5">
              Select a framework to get started
            </h3>
          </div>
          <O11yButton colors="white" onClick={handleClickTalkToAutomationFW}>
            Talk to automation expert
          </O11yButton>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {FRAMEWORKS.map((item) => (
            <GridListWHorizontalLink
              key={item.id}
              title={item.name}
              image={item.logo}
              // subTitle="another random desc"
              wrapperClassName={twClassNames(
                'border-0 shadow-none px-2 hover:bg-base-100',
                {
                  'pointer-events-none opacity-75': item.isUpComing
                }
              )}
              onClick={() => handleSelectFramework(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
