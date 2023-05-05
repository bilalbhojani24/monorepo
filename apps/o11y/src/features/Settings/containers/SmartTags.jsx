import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yButton } from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import O11yLoader from 'common/O11yLoader';
import { MODAL_TYPES } from 'constants/modalTypes';
import { PAYWALL_FEATURES } from 'constants/paywall';
import { getActiveProject, getPlanDetailsKey } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import { AlwaysFailingTags } from '../components/AlwaysFailingTags';
import { FlakyTags } from '../components/FlakyTags';
import { NewFailureTags } from '../components/NewFailureTags';
import { PerformanceAnomaliesTags } from '../components/PerformanceAnomaliesTags';
import SettingsCard from '../components/SettingsCard';
import SmartTagPaywallAlert from '../components/SmartTagPaywallAlert';
import { getSmartTagsSettings } from '../slices/selectors';
import { getSmartTags } from '../slices/smartTagsSettings';

export default function SmartTags() {
  const smartTags = useSelector(getSmartTagsSettings);
  const activeProject = useSelector(getActiveProject);
  const planDetails = useSelector(
    getPlanDetailsKey(PAYWALL_FEATURES.SMART_TAGS)
  );
  const dispatch = useDispatch();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    if (activeProject.normalisedName) {
      dispatch(
        getSmartTags({
          projectNormalisedName: activeProject.normalisedName
        })
      );
    }
    return () => {
      mounted.current = false;
    };
  }, [activeProject.normalisedName, dispatch]);

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

  if (smartTags.isLoading && isEmpty(smartTags.data)) {
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
      <SmartTagPaywallAlert />
      <SettingsCard>
        <FlakyTags
          data={smartTags.localState.flaky}
          isActive={planDetails?.isActive}
          isLoading={smartTags.isLoading}
        />
        <AlwaysFailingTags
          data={smartTags.localState.alwaysFailing}
          isActive={planDetails?.isActive}
          isLoading={smartTags.isLoading}
        />
        <NewFailureTags
          data={smartTags.localState.newFailure}
          isActive={planDetails?.isActive}
          isLoading={smartTags.isLoading}
        />
        <PerformanceAnomaliesTags
          data={smartTags.localState.performanceAnomalies}
          isActive={planDetails?.isActive}
          isLoading={smartTags.isLoading}
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
