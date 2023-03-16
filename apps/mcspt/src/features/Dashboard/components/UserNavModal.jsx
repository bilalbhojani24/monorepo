import React from 'react';
import { Button, MdClose, Modal } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import useUserNavModal from './useUserNavModal';

const UserNavModal = ({ showUserNavModal, setShowUserNavModal }) => {
  const { logOutUser, userData } = useUserNavModal(setShowUserNavModal);

  return (
    <Modal wrapperClassName="" show={showUserNavModal} size="lg">
      <div className="flex flex-col p-6">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="text-2xl font-bold leading-8">
              {userData?.attributes.name}
            </div>
            <div className="text-base-500 text-sm font-medium leading-5">
              {userData?.attributes.email}
            </div>
          </div>

          <MdClose
            className="text-2xl"
            onClick={() => {
              setShowUserNavModal(false);
            }}
          />
        </div>

        <div className="mt-6">
          <Button onClick={logOutUser} variant="minimal" colors="brand">
            Logout
          </Button>
        </div>
      </div>
    </Modal>
  );
};
UserNavModal.propTypes = {
  showUserNavModal: PropTypes.bool,
  setShowUserNavModal: PropTypes.func
};

UserNavModal.defaultProps = {
  showUserNavModal: false,
  setShowUserNavModal: () => {}
};

export default UserNavModal;
