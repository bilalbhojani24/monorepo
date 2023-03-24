import React, { useState } from 'react';
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
import { triggerReRunBE } from 'features/BuildDetails/slices/testListSlice';
import { o11yNotify } from 'utils/notification';

function RenderTestModal() {
  const dispatch = useDispatch();
  const { buildId, testId } = useSelector(getModalData);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };
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
  const handleSubmitChanges = () => {
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
