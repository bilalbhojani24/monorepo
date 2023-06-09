import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alerts, MdInfoOutline, MdWarning } from '@browserstack/bifrost';
import {
  O11yButton,
  O11yModal,
  O11yModalFooter,
  O11yModalHeader
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { getActiveProject } from 'globalSlice/selectors';

import { getSmartTagsSettings } from '../slices/selectors';
import { submitSmartTagsChanges } from '../slices/smartTagsSettings';

function SmartTagConfirmationModal() {
  const dispatch = useDispatch();
  const smartTags = useSelector(getSmartTagsSettings);

  const activeProject = useSelector(getActiveProject);

  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };

  const onSaveChanges = () => {
    dispatch(
      submitSmartTagsChanges({
        projectNormalisedName: activeProject.normalisedName,
        payload: smartTags?.localState
      })
    );
    handleCloseModal();
  };

  return (
    <>
      <O11yModal
        show
        size="lg"
        onClose={handleCloseModal}
        onOverlayClick={handleCloseModal}
      >
        <O11yModalHeader
          handleDismissClick={handleCloseModal}
          heading="Confirm changes"
          subHeading={
            <div>
              <Alerts
                alertIcon={<MdWarning className="text-attention-500 h-4 w-4" />}
                betaActionTitle="Dismiss"
                description="Disabling smart tags will stop calculations of it henceforth."
                detailsNode={null}
                modifier="warn"
              />
              <span className="justify-start pt-3">
                Are you sure you want to update smart tag rules? Changes will
                only apply to future build runs and won&apos;t affect previous
                ones.
              </span>
            </div>
          }
          icon={
            <MdInfoOutline
              className="text-brand-600 h-6 w-6"
              aria-hidden="true"
            />
          }
          iconWrapperClassname="bg-brand-100"
        />
        <O11yModalFooter position="right" backgroundColorClass="pt-0">
          <O11yButton colors="white" onClick={handleCloseModal}>
            Cancel
          </O11yButton>
          <O11yButton onClick={onSaveChanges}>Confirm</O11yButton>
        </O11yModalFooter>
      </O11yModal>
    </>
  );
}

export default SmartTagConfirmationModal;
