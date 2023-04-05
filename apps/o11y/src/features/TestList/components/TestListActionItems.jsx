import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  MdOutlineBugReport,
  MdOutlineNotificationsActive,
  MdOutlineNotificationsOff,
  MdRedo
} from '@browserstack/bifrost';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { TEST_STATUS } from 'constants/common';
import { MODAL_TYPES } from 'constants/modalTypes';
import { TestListContext } from 'features/BuildDetails/context/TestListContext';
import { singleItemTestDetails } from 'features/TestList/constants';
import PropTypes from 'prop-types';

function TestListActionItems({ details }) {
  const dispatch = useDispatch();
  const [updatedMutedStatus, setUpdatedMutedStatus] = useState(null);
  const { buildUUID } = useContext(TestListContext);

  const getMutedStatus = () => {
    if (updatedMutedStatus !== null) {
      return updatedMutedStatus;
    }
    return details?.isMuted;
  };

  const handleMuteUnmuteTestCase = (itemID, shouldMute) => {
    dispatch(
      toggleModal({
        version: MODAL_TYPES.mute_unmute_test,
        data: {
          buildId: buildUUID,
          testRunId: itemID,
          shouldMute,
          itemType: 'mute',
          onSuccess: () => {
            setUpdatedMutedStatus(shouldMute);
          }
        }
      })
    );
  };

  const handleRerunButtonClick = (itemID) => {
    dispatch(
      toggleModal({
        version: MODAL_TYPES.rerun_test_modal,
        data: {
          buildId: buildUUID,
          testId: itemID
        }
      })
    );
  };

  useEffect(() => {
    window.pubSub.subscribe('onToggleMuteStatus', ({ testRunId, status }) => {
      if (details.id === testRunId) {
        setUpdatedMutedStatus(status);
      }
    });
  }, [details.id]);

  return (
    <div className="hidden items-center justify-end group-hover:flex">
      {details.status === TEST_STATUS.FAIL && (
        <span
          tabIndex={0}
          role="button"
          title="Re Run"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleRerunButtonClick(details?.id);
            }
          }}
          onClick={() => handleRerunButtonClick(details?.id)}
          className="hover:bg-brand-100 text-base-600 hover:text-brand-800 mr-1"
        >
          <MdRedo className="m-1 cursor-pointer" />
        </span>
      )}
      {getMutedStatus() ? (
        <span
          tabIndex={0}
          role="button"
          title="Un-Mute"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleMuteUnmuteTestCase(details?.id, false);
            }
          }}
          onClick={() => handleMuteUnmuteTestCase(details?.id, false)}
          className="hover:bg-brand-100 text-base-600 hover:text-brand-800 mr-1"
        >
          <MdOutlineNotificationsOff className="m-1 cursor-pointer" />
        </span>
      ) : (
        <span
          tabIndex={0}
          role="button"
          title="Mute Test"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleMuteUnmuteTestCase(details?.id, true);
            }
          }}
          onClick={() => handleMuteUnmuteTestCase(details?.id, true)}
          className="hover:bg-brand-100 text-base-600 hover:text-brand-800 mr-1"
        >
          <MdOutlineNotificationsActive className="m-1 cursor-pointer" />
        </span>
      )}
      {details.status === TEST_STATUS.FAIL && (
        <span
          title="Report Bug"
          className="hover:bg-brand-100 text-base-600 hover:text-brand-800 mr-1"
        >
          <MdOutlineBugReport className="m-1 cursor-pointer" />
        </span>
      )}
    </div>
  );
}

export default TestListActionItems;

TestListActionItems.propTypes = {
  details: PropTypes.shape(singleItemTestDetails).isRequired
};
TestListActionItems.defaultProps = {};
