import React from 'react';
import { useDispatch } from 'react-redux';
import {
  O11yButton,
  O11yModal,
  O11yModalBody,
  O11yModalFooter
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { DrillDownImage } from 'features/TestingTrends/components/DrillDownImage';

function DrillDownModal() {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };

  const handleSubmitChanges = () => {};

  return (
    <O11yModal show size="lg" onClose={handleCloseModal}>
      <O11yModalBody className="px-0">
        <div>
          <div className="mx-auto flex h-full w-full items-center justify-center rounded-full">
            <DrillDownImage />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 as="h3" className="text-base-900 text-lg font-medium leading-6">
              Drilldown to root cause with Observability Pro
            </h3>
            <div className="mt-2">
              <p className="text-base-500 text-sm">
                Deep dive into your data to improve your test suite health. .
                Find faulty tests and unique errors with Observability Pro.
              </p>
            </div>
          </div>
        </div>
      </O11yModalBody>
      <O11yModalFooter>
        <div className="flex flex-1 justify-between gap-3">
          <O11yButton colors="white" onClick={handleCloseModal} fullWidth>
            Cancel
          </O11yButton>
          <O11yButton
            colors="success"
            fullWidth
            loading={false}
            onClick={handleSubmitChanges}
            type="submit"
          >
            Start a 14 day free trial
          </O11yButton>
        </div>
      </O11yModalFooter>
    </O11yModal>
  );
}
export default DrillDownModal;
