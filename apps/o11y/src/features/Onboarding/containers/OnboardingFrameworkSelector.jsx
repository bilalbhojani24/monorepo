import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GridListWHorizontalLink } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yButton } from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import ReqDemoButton from 'common/ReqDemoButton';
import { MODAL_TYPES } from 'constants/modalTypes';
import { getHeaderSize, getProjects } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';

import FrameworkDocViewer from '../components/FrameworkDocViewer';
import { FRAMEWORK_IDS, FRAMEWORKS } from '../constants';
import { skipToDashboard } from '../utils';

export default function OnboardingFrameworkSelector() {
  const dispatch = useDispatch();
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

  const handleInteraction = (ctaText) => {
    logOllyEvent({
      event: 'O11yOnboardingInteracted',
      data: {
        cta_clicked: ctaText
      }
    });
  };

  const handleSelectFramework = (id) => {
    const foundFramework = FRAMEWORKS.find((item) => item.id === id);
    if (!foundFramework?.isUpComing) {
      setSelectedFramework(foundFramework);
      navigate({
        search: `?framework=${id}`
      });
    }
  };

  const handleClickSkipToDashboard = () => {
    handleInteraction('Skip to Dashboard Clicked');
    dispatch(skipToDashboard());
  };

  if (selectedFramework) {
    return (
      <FrameworkDocViewer
        selectedFramework={selectedFramework}
        onClickBack={() => handleSelectFramework('')}
      />
    );
  }

  const handleClickReqFramework = () => {
    logOllyEvent({
      event: 'O11yFrameworkRequestClicked'
    });
    dispatch(
      toggleModal({
        version: MODAL_TYPES.onboarding_framework_selection_modal,
        data: {}
      })
    );
  };

  return (
    <div
      className="flex w-screen items-center justify-center overflow-auto p-12"
      style={{
        height: `calc(100vh - ${headerSize}px)`
      }}
    >
      <div className="w-full max-w-4xl">
        <div className="border-base-200 flex flex-col rounded-lg border bg-white p-6 shadow-sm">
          <div className="border-b-base-200 mb-6 flex items-center justify-between border-b pb-6">
            <h1 className="text-base font-semibold leading-6">
              Select a framework to get started
            </h1>

            <div className="flex items-center gap-3">
              <ReqDemoButton
                clickCb={() => {
                  handleInteraction('Get Demo Clicked');
                }}
              />
              {!!projects?.list?.length && (
                <O11yButton size="default" onClick={handleClickSkipToDashboard}>
                  Skip to dashboard
                </O11yButton>
              )}
            </div>
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
        <div className="mt-5">
          <O11yButton variant="minimal" onClick={handleClickReqFramework}>
            Don’t see you framework listed?
          </O11yButton>
        </div>
      </div>
    </div>
  );
}
