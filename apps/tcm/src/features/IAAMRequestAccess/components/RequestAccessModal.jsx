import React from 'react';
import {
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter
} from 'common/bifrostProxy';

import useRequestAccessModal from './useRequestAccessModal';

const RequestAccessModal = () => {
  const { isAdmin, userHasAccess, accessRequested, handleRequestClick } =
    useRequestAccessModal();

  return (
    <TMModal show={!userHasAccess}>
      <TMModalBody>
        <div>hello</div>
        <div>{isAdmin ? 'Admin' : 'User'}</div>
      </TMModalBody>
      <TMModalFooter>
        <TMButton onClick={handleRequestClick}>
          {accessRequested ? 'Requested' : 'Request'}
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

export default RequestAccessModal;
