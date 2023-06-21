import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { O11yButton } from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import O11yLoader from 'common/O11yLoader';
import { DOC_KEY_MAPPING } from 'constants/common';
import { MODAL_TYPES } from 'constants/modalTypes';
import { PAYWALL_FEATURES } from 'constants/paywall';
import { PaywallAlert } from 'features/Paywall';
import { getActiveProject, getPlanDetailsKey } from 'globalSlice/selectors';
import isEqual from 'lodash/isEqual';
import { getDocUrl } from 'utils/common';

import { AlwaysFailingTags } from '../components/AlwaysFailingTags';
import { FlakyTags } from '../components/FlakyTags';
import { NewFailureTags } from '../components/NewFailureTags';
import { PerformanceAnomaliesTags } from '../components/PerformanceAnomaliesTags';
import SettingsCard from '../components/SettingsCard';
import { getSmartTagsSettings } from '../slices/selectors';
import { getSmartTags } from '../slices/smartTagsSettings';

const getSmartTagsDocURL = (text) =>
  `${getDocUrl({
    path: DOC_KEY_MAPPING.smart_tags
  })}#${text.split(' ').join('-').toLowerCase()}`;

export default function SmartTags() {
  const smartTags = useSelector(getSmartTagsSettings);
  const activeProject = useSelector(getActiveProject);
  const planDetails = useSelector(
    getPlanDetailsKey(PAYWALL_FEATURES.SMART_TAGS)
  );
  const [isLoadingData, setIsLoadingData] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const mounted = useRef(false);
  const performanceAnomaliesRef = useRef(null);
  const newFailureRef = useRef(null);

  useEffect(() => {
    mounted.current = true;
    if (activeProject.normalisedName) {
      setIsLoadingData(true);
      dispatch(
        getSmartTags({
          projectNormalisedName: activeProject.normalisedName
        })
      )
        .unwrap()
        .finally(() => {
          setIsLoadingData(false);
        });
    }
    return () => {
      mounted.current = false;
    };
  }, [activeProject.normalisedName, dispatch]);

  useEffect(() => {
    if (
      location.search.includes('scrollTo=performanceAnomalies') &&
      performanceAnomaliesRef.current
    ) {
      performanceAnomaliesRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    if (
      location.search.includes('scrollTo=newFailure') &&
      newFailureRef.current
    ) {
      newFailureRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [location.search]);

  const handleClickSaveChanges = () => {
    if (!smartTags.isLoading) {
      dispatch(
        toggleModal({
          version: MODAL_TYPES.smart_tags_confirmation_modal,
          data: {}
        })
      );
    }
  };

  if (isLoadingData) {
    return (
      <SettingsCard>
        <div className="m-auto flex h-72 w-72 flex-col items-center justify-center p-6">
          <O11yLoader
            wrapperClassName="flex-1"
            text="Fetching settings"
            textClass="text-sm"
          />
        </div>
      </SettingsCard>
    );
  }

  return (
    <div className="flex max-h-full flex-col gap-4">
      {!planDetails?.isActive && (
        <PaywallAlert title="Configuring smart tags is a pro feature" />
      )}
      <SettingsCard>
        <FlakyTags
          data={smartTags.localState.flaky}
          isActive={planDetails?.isActive}
          isLoading={smartTags.isLoading}
          docLink={getSmartTagsDocURL('Flaky')}
        />
        <AlwaysFailingTags
          data={smartTags.localState.alwaysFailing}
          isActive={planDetails?.isActive}
          isLoading={smartTags.isLoading}
          docLink={getSmartTagsDocURL('Always Failing')}
        />
        <NewFailureTags
          ref={newFailureRef}
          data={smartTags.localState.newFailure}
          isActive={planDetails?.isActive}
          isLoading={smartTags.isLoading}
          docLink={getSmartTagsDocURL('New failure')}
        />
        <PerformanceAnomaliesTags
          ref={performanceAnomaliesRef}
          data={smartTags.localState.performanceAnomalies}
          isActive={planDetails?.isActive}
          isLoading={smartTags.isLoading}
          docLink={getSmartTagsDocURL('Performance anomaly')}
        />
        <div className="bg-base-50 sticky bottom-0 flex justify-end px-6 py-3">
          <O11yButton
            loading={smartTags.isLoading}
            isIconOnlyButton={smartTags.isLoading}
            disabled={
              (!planDetails?.isActive ||
                isEqual(smartTags.localState, smartTags.data)) &&
              !smartTags.isLoading
            }
            onClick={handleClickSaveChanges}
          >
            Save Changes
          </O11yButton>
        </div>
      </SettingsCard>
    </div>
  );
}
