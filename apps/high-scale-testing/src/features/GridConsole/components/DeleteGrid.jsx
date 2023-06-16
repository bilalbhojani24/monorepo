import React from 'react';
import {
  Alerts,
  CodeSnippet,
  Modal,
  ModalBody,
  ModalHeader
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const DeleteGrid = ({
  activeGridName,
  closeDeleteGridModal,
  deletionCommand,
  showDeleteGridModal
}) => {
  const ALERT_DESC = `Are you sure you want to delete ‘${activeGridName}’? All of your data will be permanently removed from our servers forever. This action cannot be undone.`;

  return (
    <Modal show={showDeleteGridModal} size="3xl">
      <ModalHeader
        heading="Delete Grid"
        handleDismissClick={closeDeleteGridModal}
      />
      <ModalBody className="overflow-auto">
        <div>
          <Alerts description={ALERT_DESC} linkText="" modifier="error" />

          <div className="mb-6 mt-4 text-base-900">
            <p className="mb-2 text-sm">
              Run the below command to delete the ‘high-scale-grid’.
            </p>
            <CodeSnippet
              code={deletionCommand}
              maxHeight="260px"
              singleLine
              language="bash"
            />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

DeleteGrid.propTypes = {
  activeGridName: PropTypes.string.isRequired,
  closeDeleteGridModal: PropTypes.func.isRequired,
  deletionCommand: PropTypes.string.isRequired,
  showDeleteGridModal: PropTypes.bool.isRequired
};

export default DeleteGrid;
