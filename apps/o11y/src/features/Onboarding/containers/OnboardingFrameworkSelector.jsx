import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { GridListWHorizontalLink } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { WRAPPER_GAP_CLASS } from 'constants/common';
import { ROUTES } from 'constants/routes';
import { getProjects } from 'globalSlice/selectors';

import FrameworkDocViewer from '../components/FrameworkDocViewer';
import { FRAMEWORK_IDS, FRAMEWORKS } from '../constants';

export default function OnboardingFrameworkSelector() {
  const projects = useSelector(getProjects);
  const [selectedFramework, setSelectedFramework] = useState('');
  const navigate = useNavigate();

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
    }
  }, []);

  const handleSelectFramework = (id) => {
    setSelectedFramework(FRAMEWORKS.find((item) => item.id === id));
    navigate({
      search: `?framework=${id}`
    });
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
  return (
    <div
      className={twClassNames(
        'flex w-screen items-center justify-center p-12',
        WRAPPER_GAP_CLASS
      )}
    >
      <div className="border-base-200 flex w-full max-w-2xl flex-col rounded-lg border bg-white p-6 shadow-sm">
        <div className="border-b-base-200 mb-6 border-b pb-6">
          <h1 className="text-lg font-medium leading-6">
            Welcome to Test Observability {projects?.list?.length}
          </h1>
          <h3 className="text-base-500 mt-1 text-sm font-normal leading-5">
            Select a framework to get started
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FRAMEWORKS.map((item) => (
            <GridListWHorizontalLink
              key={item.id}
              title={item.name}
              image={item.logo}
              // subTitle="another random desc"
              wrapperClassName="border-0 shadow-none px-2 hover:bg-base-100"
              onClick={() => handleSelectFramework(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
