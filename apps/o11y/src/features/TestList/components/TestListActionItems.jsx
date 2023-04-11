import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdOutlineBugReport,
  MdOutlineNotificationsActive,
  MdOutlineNotificationsOff,
  MdRedo
} from '@browserstack/bifrost';
import { O11yButton } from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { TEST_STATUS } from 'constants/common';
import { MODAL_TYPES } from 'constants/modalTypes';
import { getBuildMeta } from 'features/BuildDetails/slices/selectors';
import { toggleWidget } from 'features/IntegrationsWidget/slices/integrationsWidgetSlice';
import { singleItemTestDetails } from 'features/TestList/constants';
import { TestListContext } from 'features/TestList/context/TestListContext';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';

import { getTestReportDetails } from '../slices/testListSlice';

function TestListActionItems({ details }) {
  const dispatch = useDispatch();
  const [updatedMutedStatus, setUpdatedMutedStatus] = useState(null);
  const { buildUUID } = useContext(TestListContext);
  const activeProject = useSelector(getActiveProject);
  const buildMeta = useSelector(getBuildMeta);

  const getMutedStatus = () => {
    if (updatedMutedStatus !== null) {
      return updatedMutedStatus;
    }
    return details?.isMuted;
  };

  const handleMuteUnmuteTestCase = (shouldMute) => {
    const itemID = details?.id;
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

  const handleRerunButtonClick = () => {
    const itemID = details?.id;
    dispatch(
      toggleModal({
        version: MODAL_TYPES.rerun_test_modal,
        data: {
          buildId: buildUUID,
          testId: itemID,
          analyticsData: {
            testStatus: TEST_STATUS.FAIL,
            testFlaky: details?.isFlaky ? 'yes' : 'no',
            testNewFailure: details?.isNewFailure ? 'yes' : 'no',
            testAlwaysFailing: details?.isAlwaysFailing ? 'yes' : 'no',
            testPerformanceAnomaly: details?.isPerformanceAnomaly ? 'yes' : 'no'
          }
        }
      })
    );
  };

  const OllyTestListingEvent = (eventName) => {
    const itemID = details?.id;
    logOllyEvent({
      event: eventName,
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id,
        build_name: buildMeta.data?.name,
        build_uuid: buildMeta.data?.uuid,
        test_id: itemID
      }
    });
  };

  const handleReportBugClick = async () => {
    OllyTestListingEvent('O11yReportBugClicked');
    dispatch(toggleWidget(true));
    dispatch(
      getTestReportDetails({
        buildId: buildUUID,
        testRunId: details.id
      })
    );
  };

  // eslint-disable-next-line no-unused-vars
  const confirmClick = () => {
    OllyTestListingEvent('O11yReportBugExecuted');
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
        <O11yButton
          type="button"
          colors="white"
          isIconOnlyButton
          size="extra-small"
          onClick={handleRerunButtonClick}
          icon={<MdRedo className="h-5 w-5" />}
        />
      )}
      <div className="mx-1">
        {getMutedStatus() ? (
          <O11yButton
            type="button"
            colors="white"
            isIconOnlyButton
            size="extra-small"
            onClick={() => handleMuteUnmuteTestCase(false)}
            icon={<MdOutlineNotificationsOff className="h-5 w-5" />}
          />
        ) : (
          <O11yButton
            type="button"
            colors="white"
            isIconOnlyButton
            size="extra-small"
            onClick={() => handleMuteUnmuteTestCase(true)}
            icon={<MdOutlineNotificationsActive className="h-5 w-5" />}
          />
        )}
      </div>
      {details.status === TEST_STATUS.FAIL && (
        <O11yButton
          type="button"
          colors="white"
          isIconOnlyButton
          size="extra-small"
          onClick={handleReportBugClick}
          icon={<MdOutlineBugReport className="h-5 w-5" />}
        />
      )}
    </div>
  );
}

export default TestListActionItems;

TestListActionItems.propTypes = {
  details: PropTypes.shape(singleItemTestDetails).isRequired
};
TestListActionItems.defaultProps = {};
