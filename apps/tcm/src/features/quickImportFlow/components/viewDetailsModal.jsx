import React from 'react';
import { MdOutlineCloud } from '@browserstack/bifrost';
import {
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import TitleDescriptionNode from './titleDescriptionNode';

const ViewDetailsModal = ({ headerText, dismissHandler }) => (
  <TMModal show size="3xl">
    <TMModalHeader heading={headerText} handleDismissClick={dismissHandler} />
    <TMModalBody>
      <div className="border-base-300 rounded-md border">
        <div className="my-10 flex flex-col items-center">
          <MdOutlineCloud className="h-5 w-5" />
          <div className="text-lg">Quick Import is in progress...</div>
          <div>We’ll notify you once the overall import is completed</div>
        </div>
        <div className="border-base-200 bg-base-50 border p-6">
          <div className="flex">
            <TitleDescriptionNode
              title="Current Progress: 20%"
              description="Progress"
              wrapperClassName="basis-1/3"
            />
          </div>
          <div className="mt-6 flex justify-between">
            <TitleDescriptionNode
              title="Currently Importing"
              description="Project May Updates 2023"
            />
            <div className="flex justify-between">
              <TitleDescriptionNode
                title="Imported"
                description="1/12"
                wrapperClassName="basis-1/2"
              />
              <TitleDescriptionNode
                title="Not Imported"
                description="11/12"
                wrapperClassName="basis-1/2"
              />
            </div>
            <TitleDescriptionNode
              title="Time Remaining"
              description="About 5 min"
              wrapperClassName="basis-1/4"
            />
          </div>
        </div>
        <div className="my-2 flex justify-center">
          Want to add more projects, cancel this import and try again.
        </div>
      </div>
    </TMModalBody>
    <TMModalFooter position="right">
      <TMButton colors="white">Close</TMButton>
    </TMModalFooter>
  </TMModal>
);

ViewDetailsModal.propTypes = {
  headerText: PropTypes.string,
  dismissHandler: PropTypes.func
};

ViewDetailsModal.defaultProps = {
  headerText: '',
  dismissHandler: () => {}
};

export default ViewDetailsModal;
