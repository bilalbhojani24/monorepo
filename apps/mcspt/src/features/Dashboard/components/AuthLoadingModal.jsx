import React from 'react';
import { Modal } from '@browserstack/bifrost';
import dependencyLoader from 'assets/tripleDots.gif';

import useAuthLoadingModal from './useAuthLoadingModal';

const AuthLoadingModal = () => {
  const { showAuthLoadingModal, isUserLoggedIn } = useAuthLoadingModal();

  return (
    <Modal wrapperClassName="" show={showAuthLoadingModal} size="md">
      <div className="flex flex-col items-center justify-center p-14">
        <img src={dependencyLoader} alt="loading..." className="w-24" />
        <div className="text-2xl font-bold leading-7">{`Logging ${
          isUserLoggedIn ? 'Out' : 'In'
        }.`}</div>
      </div>
    </Modal>
  );
};

export default AuthLoadingModal;
