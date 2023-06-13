import React from 'react';
import {
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter
} from 'common/bifrostProxy';

import useRequestAccessModal from './useRequestAccessModal';

const RequestAccessModal = () => {
  const {
    isAdmin,
    userHasAccess,
    accessRequested,
    handleRequestClick,
    requestLoader
  } = useRequestAccessModal();

  return (
    <TMModal show={!userHasAccess}>
      <TMModalBody>
        <div>hello</div>
        <div>{isAdmin ? 'Admin' : 'User'}</div>
      </TMModalBody>
      <TMModalFooter>
        <TMButton
          onClick={handleRequestClick}
          loading={requestLoader}
          isIconOnlyButton={requestLoader}
          disabled={accessRequested}
        >
          {accessRequested ? 'Requested' : 'Request'}
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

export default RequestAccessModal;
