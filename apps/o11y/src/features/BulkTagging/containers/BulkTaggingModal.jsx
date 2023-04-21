import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdWarningAmber } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import {
  O11yButton,
  O11yCheckbox,
  O11yEmptyState,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { getModalData } from 'common/ModalToShow/slices/selectors';
import O11yLoader from 'common/O11yLoader';
import RadioSmallCards from 'common/RadioSmallCards';
import { getBuildMeta } from 'features/BuildDetails/slices/selectors';
import {
  getAnalyzerSimilarTests,
  updateIssueTypes
} from 'features/TestList/slices/testListSlice';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import { logOllyEvent } from 'utils/common';
import { o11yNotify } from 'utils/notification';

import SimilarItem from '../components/SimilarItem';

const DATE_RANGE = {
  LAST_10_BUILDS: {
    label: 'Last 10 Builds',
    value: 'LAST_10_BUILDS'
  },
  LAST_10_DAYS: {
    label: 'Last 10 Days',
    value: 'LAST_10_DAYS'
  },
  CURRENT_BUILD: {
    label: 'Current Build',
    value: 'CURRENT_BUILD'
  }
};

function BulkTaggingModal() {
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const { defaultTypeSelection, buildId, testRunId, clusterIds, onSuccess } =
    useSelector(getModalData);
  const { data: buildMeta, analyticsData } = useSelector(getBuildMeta);
  const availableIssueTypes = buildMeta?.issueTypes;
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedTestRunIds, setSelectedTestRunIds] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(
    () => defaultTypeSelection || {}
  );
  const [timeFrame, setTimeFrame] = useState(DATE_RANGE.LAST_10_BUILDS.value);
  const [similarIssues, setSimilarIssues] = useState({
    isLoading: false,
    data: {}
  });
  const handleRadioChange = (e) => {
    setSelectedStatus(e);
  };

  const OllyTestListingEvent = useCallback(
    (eventName, data = {}) => {
      logOllyEvent({
        event: eventName,
        data: {
          project_name: activeProject.name,
          project_id: activeProject.id,
          build_name: buildMeta.data?.name,
          build_uuid: buildMeta.data?.uuid,
          source: analyticsData?.source,
          ...data
        }
      });
    },
    [
      activeProject.id,
      activeProject.name,
      analyticsData?.source,
      buildMeta.data?.name,
      buildMeta.data?.uuid
    ]
  );

  useEffect(() => {
    OllyTestListingEvent('O11yAnalyzerBulkTaggingInvoked');
  }, [OllyTestListingEvent]);

  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };
  const handleCheckBoxChange = (e, targetTestRunID) => {
    if (targetTestRunID === -1) {
      if (e.target.checked) {
        const newSelectedIDs = [];
        similarIssues?.data?.similar?.forEach((el) => {
          newSelectedIDs.push(el.id);
        });
        setSelectedTestRunIds(newSelectedIDs);
      } else {
        setSelectedTestRunIds([]);
      }
    } else {
      let newSelectedIDs = [...selectedTestRunIds];
      if (e.target.checked) {
        newSelectedIDs.push(targetTestRunID);
      } else {
        newSelectedIDs = newSelectedIDs.filter((id) => id !== targetTestRunID);
      }
      setSelectedTestRunIds(newSelectedIDs);
    }
  };

  useEffect(() => {
    setSimilarIssues({
      isLoading: true,
      data: {}
    });
    const payload = {
      buildId,
      selectedMode: timeFrame
    };
    if (clusterIds) {
      payload.clusterIds = clusterIds;
    } else {
      payload.testId = testRunId;
    }
    dispatch(getAnalyzerSimilarTests(payload))
      .unwrap()
      .then((res) => {
        setSimilarIssues({ isLoading: false, data: res });
      })
      .catch(() => {
        setSimilarIssues({ isLoading: false, data: {} });
      });
  }, [buildId, dispatch, testRunId, timeFrame, clusterIds]);

  const isValid = useMemo(() => {
    if (!selectedTestRunIds.length) {
      return false;
    }
    return !(!selectedStatus?.id && !defaultTypeSelection?.id);
  }, [defaultTypeSelection?.id, selectedStatus?.id, selectedTestRunIds.length]);

  const handleSubmitChanges = () => {
    if (isValid) {
      OllyTestListingEvent('O11yAnalyzerBulkTaggingExecuted', {
        similar_error_in: timeFrame.toLowerCase(),
        issue_type: selectedStatus.name.replace(' ', '_').toLowerCase(),
        select_all_clicked:
          Object.keys(selectedTestRunIds).length ===
          similarIssues?.data?.similar?.length
      });
      setIsUpdating(true);
      const payloadData = selectedTestRunIds.map((el) => ({
        testRunId: parseInt(el, 10),
        issueTypeId: parseInt(selectedStatus.id, 10)
      }));
      if (testRunId) {
        payloadData.push({
          testRunId,
          issueTypeId: parseInt(selectedStatus.id, 10)
        });
      }
      dispatch(
        updateIssueTypes({
          projectId: activeProject?.id,
          data: {
            issues: payloadData
          }
        })
      )
        .unwrap()
        .then(() => {
          o11yNotify({
            title: `Tests updated successfully!`,
            description: '',
            type: 'success'
          });
          const updateTestDefectTypeMappingPayload = selectedTestRunIds.map(
            (el) => ({
              id: parseInt(el, 10),
              issueType: { id: selectedStatus?.id, name: selectedStatus?.name }
            })
          );
          updateTestDefectTypeMappingPayload.push({
            id: testRunId,
            issueType: { id: selectedStatus?.id, name: selectedStatus?.name }
          });
          onSuccess?.(updateTestDefectTypeMappingPayload);
          handleCloseModal();
        })
        .finally(() => {
          setIsUpdating(false);
        });
    }
  };

  return (
    <O11yModal show size="3xl" onClose={handleCloseModal}>
      <O11yModalHeader
        dismissButton
        heading="Bulk update failure category"
        handleDismissClick={handleCloseModal}
      />
      <O11yModalBody wrapperClassName="px-2">
        <p className="text-base-900 mt-4 text-sm">Failure category options</p>
        <div className="mb-8 mt-4">
          <RadioSmallCards
            options={availableIssueTypes}
            onChange={handleRadioChange}
            selectedItem={selectedStatus}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-base-900 text-base">Bulk Select</p>
          <div className="pb-1">
            <O11yButton
              colors="white"
              wrapperClassName={twClassNames(
                `border border-base-300 rounded-none rounded-l-md border-r-0 text-sm
                        focus:ring-offset-0 focus:border-r peer/days7 focus:z-10 focus:ring-1 
                        ring-brand-500 text-sm font-medium text-base-700`,
                {
                  'border-brand-500 ring-1 z-10 border-r':
                    timeFrame === DATE_RANGE.CURRENT_BUILD.value
                }
              )}
              onClick={() => setTimeFrame(DATE_RANGE.CURRENT_BUILD.value)}
            >
              {DATE_RANGE.CURRENT_BUILD.label}
            </O11yButton>
            <O11yButton
              colors="white"
              wrapperClassName={twClassNames(
                `peer/days15 peer-focus/days7:border-l-0 focus:z-10 focus:ring-1 text-sm
                        ring-brand-500 border border-base-300 rounded-none focus:ring-offset-0 
                        focus:border-r border-r-0 text-sm font-medium text-base-700`,
                {
                  'border-brand-500 ring-1 z-10 border-r':
                    timeFrame === DATE_RANGE.LAST_10_BUILDS.value
                }
              )}
              onClick={() => setTimeFrame(DATE_RANGE.LAST_10_BUILDS.value)}
            >
              {DATE_RANGE.LAST_10_BUILDS.label}
            </O11yButton>
            <O11yButton
              colors="white"
              wrapperClassName={twClassNames(
                `peer-focus/days15:border-l-0 focus:z-10 focus:ring-1 ring-brand-500 text-sm
                        border border-base-300 rounded-none first:rounded-l-md last:rounded-r-md focus:ring-offset-0 
                        text-sm font-medium text-base-700`,
                {
                  'border-brand-500 ring-1 z-10':
                    timeFrame === DATE_RANGE.LAST_10_DAYS.value
                }
              )}
              onClick={() => setTimeFrame(DATE_RANGE.LAST_10_DAYS.value)}
            >
              {DATE_RANGE.LAST_10_DAYS.label}
            </O11yButton>
          </div>
        </div>
        {!isEmpty(similarIssues.data?.current) && (
          <div className="bg-base-100 border-base-200 group mt-4 rounded-md border p-4">
            <p className="text-base-900 mb-2 text-sm">Current Item</p>
            <SimilarItem
              data={similarIssues.data.current}
              key={similarIssues.data.current.id}
              border={false}
              showCheckBox={false}
            />
          </div>
        )}
        {similarIssues.data?.similar?.length > 1 && (
          <O11yCheckbox
            checked={
              selectedTestRunIds.length === similarIssues?.data?.similar?.length
            }
            border={false}
            wrapperClassName={twClassNames('py-4 border-base-200 border-b', {
              invisible: similarIssues?.isLoading
            })}
            data={{
              description:
                'Get notified when someones posts a comment on a posting',
              label: 'Select All',
              value: true
            }}
            onChange={(e) => {
              handleCheckBoxChange(e, -1);
            }}
          />
        )}
        <>
          {similarIssues?.isLoading ? (
            <div className="flex h-20 flex-col justify-center p-14">
              <O11yLoader />
            </div>
          ) : (
            <>
              {!similarIssues.data?.similar?.length ? (
                <div className="flex h-24 flex-col justify-center p-14">
                  <O11yEmptyState
                    title="No similar tests found"
                    description=""
                    mainIcon={
                      <MdWarningAmber className="text-base-400 inline-block !h-12 !w-12" />
                    }
                    buttonProps={null}
                  />
                </div>
              ) : (
                <div className="h-64 overflow-auto">
                  {similarIssues.data?.similar?.map((el) => (
                    <SimilarItem
                      data={el}
                      key={el.id}
                      handleSelect={handleCheckBoxChange}
                      checked={!!selectedTestRunIds.includes(el?.id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      </O11yModalBody>
      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={handleCloseModal}>
          Cancel
        </O11yButton>
        <O11yButton
          loading={isUpdating}
          isIconOnlyButton={isUpdating}
          onClick={handleSubmitChanges}
          type="submit"
          disabled={!isValid}
        >
          Apply
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

export default BulkTaggingModal;
