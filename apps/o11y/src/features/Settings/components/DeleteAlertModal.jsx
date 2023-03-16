import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdCheckCircleOutline,
  MdErrorOutline,
  Notifications,
  notify
} from '@browserstack/bifrost';
import {
  O11yButton,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { getModalData } from 'common/ModalToShow/slices/selectors';
import { getActiveProject } from 'globalSlice/selectors';

import { deleteAlertById } from '../slices/alertsSettings';

function DeleteAlertModal() {
  const modalData = useSelector(getModalData);
  const activeProject = useSelector(getActiveProject);
  const [isDeletingAlert, setIsDeletingAlert] = useState(false);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };

  const handleSubmitChanges = () => {
    setIsDeletingAlert(true);
    dispatch(
      deleteAlertById({
        alertId: modalData.alertId,
        alertType: modalData.alertType,
        projectNormalisedName: activeProject.normalisedName
      })
    )
      .unwrap()
      .then(() => {
        notify(
          <Notifications
            id="delete-alerts-success"
            title="Successfully deleted"
            description="Alert was deleted successfully"
            headerIcon={<MdCheckCircleOutline className="text-success-500" />}
            handleClose={(toastData) => {
              notify.remove(toastData.id);
            }}
          />,
          {
            position: 'top-right',
            duration: 3000
          }
        );
        handleCloseModal();
      })
      .catch(() => {
        notify(
          <Notifications
            id="delete-alerts-failed"
            title="Something went wrong!"
            description="There was an error while deleting alert"
            headerIcon={
              <MdErrorOutline className="text-danger-500 text-lg leading-5" />
            }
            handleClose={(toastData) => {
              notify.remove(toastData.id);
            }}
          />,
          {
            position: 'top-right',
            duration: 3000
          }
        );
      })
      .finally(() => {
        setIsDeletingAlert(false);
      });
  };
  return (
    <O11yModal show size="sm" onClose={handleCloseModal}>
      <O11yModalHeader
        dismissButton
        heading="Delete Alert"
        handleDismissClick={handleCloseModal}
      />

      <O11yModalBody>
        <p className="flex gap-1 text-sm font-medium leading-5">
          Are you sure you want to delete the alert?
        </p>
      </O11yModalBody>

      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={handleCloseModal}>
          Cancel
        </O11yButton>
        <O11yButton
          colors="danger"
          loading={isDeletingAlert}
          isIconOnlyButton={isDeletingAlert}
          onClick={handleSubmitChanges}
          type="submit"
        >
          Delete
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

export default DeleteAlertModal;
