import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  O11yButton,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader,
  O11yRadioGroup
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { getModalData } from 'common/ModalToShow/slices/selectors';
import { getBuildMeta } from 'features/BuildDetails/slices/selectors';
import { triggerReRunBE } from 'features/TestList/slices/testListSlice';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';
import { o11yNotify } from 'utils/notification';

const testModalOptions = [
  {
    name: 'All failed tests',
    disabled: false,
    id: 'all_failed'
  },
  {
    name: 'Current Build',
    disabled: false,
    id: 'build'
  }
];
const testModalOptionsWithTestID = [
  ...testModalOptions,
  {
    name: 'Current Test',
    disabled: false,
    id: 'test'
  }
];

function RenderTestModal() {
  const dispatch = useDispatch();
  const { buildId, testId, analyticsData } = useSelector(getModalData);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const buildMeta = useSelector(getBuildMeta);
  const activeProject = useSelector(getActiveProject);
  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };
  const OllyTestListingEvent = useCallback(
    (eventName) => {
      logOllyEvent({
        event: eventName,
        data: {
          project_name: activeProject.name,
          project_id: activeProject.id,
          build_name: buildMeta.data?.name,
          build_uuid: buildMeta.data?.uuid,
          test_id: testId,
          test_status: analyticsData.testStatus,
          test_flaky: analyticsData?.testFlaky || 'no',
          test_new_failure: analyticsData?.testNewFailure || 'no',
          test_always_failing: analyticsData?.testAlwaysFailing || 'no',
          test_performance_anomaly:
            analyticsData?.testPerformanceAnomaly || 'no'
        }
      });
    },
    [
      activeProject.id,
      activeProject.name,
      analyticsData?.testAlwaysFailing,
      analyticsData?.testFlaky,
      analyticsData?.testNewFailure,
      analyticsData?.testPerformanceAnomaly,
      analyticsData.testStatus,
      buildMeta.data?.name,
      buildMeta.data?.uuid,
      testId
    ]
  );

  useEffect(() => {
    OllyTestListingEvent('O11yRerunClicked');
  }, [OllyTestListingEvent]);

  const handleSubmitChanges = () => {
    OllyTestListingEvent('O11yRerunExecuted');
    setIsUpdating(true);
    dispatch(
      triggerReRunBE({
        buildId,
        testId,
        type: selectedOption.id
      })
    )
      .unwrap()
      .then(() => {
        o11yNotify({
          title: `Re-run triggered!`,
          description: '',
          type: 'success'
        });
        handleCloseModal();
      })
      .catch(() => {
        o11yNotify({
          title: 'Re-run trigger failed!',
          description: 'There was some glitch during re-run.',
          type: 'error'
        });
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };
  return (
    <O11yModal show size="sm" onClose={handleCloseModal}>
      <O11yModalHeader
        dismissButton
        heading="Configure re-run"
        handleDismissClick={handleCloseModal}
      />
      <O11yModalBody>
        <p className="text-base-600 mb-3 text-sm">Select an option to re run</p>
        <O11yRadioGroup
          direction="vertical"
          onChange={(_, selectedItem) => {
            const selectedItemData = testModalOptionsWithTestID.filter(
              (el) => el.id === selectedItem
            );
            setSelectedOption(selectedItemData[0]);
          }}
          options={testId ? testModalOptionsWithTestID : testModalOptions}
          selectedOption={selectedOption}
        />
      </O11yModalBody>
      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={handleCloseModal}>
          Cancel
        </O11yButton>
        <O11yButton
          loading={isUpdating}
          isIconOnlyButton={isUpdating}
          onClick={handleSubmitChanges}
          type="submit"
        >
          Confirm
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}
export default RenderTestModal;
