import React from 'react';
import {
  MdContentCopy,
  MdOutlineVpnKey,
  MdPersonOutline
} from '@browserstack/bifrost';
import CopyButton from 'common/CopyButton/components/CopyButton';
import PropTypes from 'prop-types';

const UserDetailsTable = ({ containerClassName, userDetails }) => (
  <div className="w-1/2 p-6">
    <div className={containerClassName}>
      <p className="text-base-900 text-lg font-medium leading-6">
        User Details
      </p>
      <div className="bg-white pt-4">
        <div
          className="border-base-200 flex flex-row items-center border-b py-3"
          key="user-name"
        >
          <div className="flex flex-row items-center">
            <MdPersonOutline width={20} height={20} />
            <div className="ml-2 w-52">
              <p className="text-base-500 text-base font-normal">User Name</p>
            </div>
          </div>

          <div className="flex flex-row items-center justify-start">
            <>
              <p className="text-base-900 mr-4 text-base font-normal">
                {userDetails.username}
              </p>

              <CopyButton
                copyValue={userDetails.username}
                textColor=""
                wrapperClassName="text-xl"
              >
                <MdContentCopy className="text-base-500" />
              </CopyButton>
            </>
          </div>
        </div>

        <div
          className="border-base-200 flex flex-row items-center border-b py-3"
          key="user-name"
        >
          <div className="flex flex-row items-center">
            <MdOutlineVpnKey width={20} height={20} />
            <div className="ml-2 w-52">
              <p className="text-base-500 text-base font-normal">Access Key</p>
            </div>
          </div>

          <div className="flex flex-row items-center justify-start">
            <>
              <p className="text-base-900 mr-4 text-base font-normal">
                {userDetails.accessKey}
              </p>

              <CopyButton
                copyValue={userDetails.accessKey}
                textColor=""
                wrapperClassName="text-xl"
              >
                <MdContentCopy className="text-base-500" />
              </CopyButton>
            </>
          </div>
        </div>
      </div>
    </div>
  </div>
);

UserDetailsTable.propTypes = {
  containerClassName: PropTypes.string.isRequired,
  userDetails: PropTypes.shape({
    accessKey: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
};

export default UserDetailsTable;
