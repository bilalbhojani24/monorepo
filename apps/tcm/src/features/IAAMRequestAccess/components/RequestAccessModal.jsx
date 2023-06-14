import React from 'react';
import RequestAccessImage from 'assets/images/RequestAccessImage.png';
import { TMModal, TMModalBody } from 'common/bifrostProxy';
import TMCTACard from 'common/bifrostProxy/components/TMCTACard';

import useRequestAccessModal from './useRequestAccessModal';

const RequestAccessModal = () => {
  const {
    isAdmin,
    getButtonText,
    userHasAccess,
    accessRequested,
    handleRequestClick,
    requestLoader
  } = useRequestAccessModal();

  return (
    <TMModal show={!userHasAccess} size="3xl">
      <TMModalBody className="px-0">
        <TMCTACard
          header={
            isAdmin
              ? 'Please update your access privileges for Test Management'
              : 'You don’t have access to Test Management yet'
          }
          description="Create, manage and track manual & automated test cases with integrated workflows and dashboards."
          primaryBtnText={getButtonText()}
          primaryBtnProps={{
            colors: isAdmin ? 'brand' : 'success',
            disabled: accessRequested,
            loading: requestLoader,
            isIconOnlyButton: requestLoader
          }}
          imageNode={
            <img
              src={RequestAccessImage}
              alt="Test Management test cases view"
            />
          }
          containerWrapperClassName="shadow-transparent md:py-4 lg:py-4 xl:py-4 2xl:py-4"
          onPrimaryBtnClick={handleRequestClick}
        />
      </TMModalBody>
    </TMModal>
  );
};

export default RequestAccessModal;
