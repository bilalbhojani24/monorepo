import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOpenInNew } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import {
  O11yButton,
  O11yCheckbox,
  O11yHyperlink,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader,
  O11yRadioSmallCards
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { getModalData } from 'common/ModalToShow/slices/selectors';
import O11yLoader from 'common/O11yLoader';
import { getBuildMeta } from 'features/BuildDetails/slices/selectors';
import {
  getAnalyzerSimilarTests,
  updateIssueTypes
} from 'features/TestList/slices/testListSlice';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';
import { o11yNotify } from 'utils/notification';

import TestListStackTrace from './TestListStackTrace';

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
  const {
    defaultTypeSelection,
    buildId,
    testRunId,
    clusterIds,
    onSuccess,
    selectedTestItemData
  } = useSelector(getModalData);
  const { data: buildMeta, analyticsData } = useSelector(getBuildMeta);
  const availableIssueTypes = buildMeta?.issueTypes;
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedTestRunIds, setSelectedTestRunIds] = useState({});
  const [selectedStatus, setSelectedStatus] = useState(
    () => defaultTypeSelection || availableIssueTypes[0]
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
        const newSelectedIDs = {};
        similarIssues?.data?.similar?.forEach((el) => {
          newSelectedIDs[el.id] = true;
        });
        setSelectedTestRunIds(newSelectedIDs);
      } else {
        setSelectedTestRunIds({});
      }
    } else {
      const newSelectedIDs = { ...selectedTestRunIds };
      if (e.target.checked) {
        newSelectedIDs[targetTestRunID] = true;
      } else {
        delete newSelectedIDs[targetTestRunID];
      }
      setSelectedTestRunIds(newSelectedIDs);
    }
  };
  const handleSubmitChanges = () => {
    OllyTestListingEvent('O11yAnalyzerBulkTaggingExecuted', {
      similar_error_in: timeFrame.toLowerCase(),
      issue_type: selectedStatus.name.replace(' ', '_').toLowerCase(),
      select_all_clicked:
        Object.keys(selectedTestRunIds).length ===
        similarIssues?.data?.similar?.length
    });
    setIsUpdating(true);
    const payloadData = Object.keys(selectedTestRunIds).map((el) => ({
      testRunId: parseInt(el, 10),
      issueTypeId: parseInt(selectedStatus.id, 10)
    }));
    payloadData.push({
      testRunId,
      issueTypeId: parseInt(selectedStatus.id, 10)
    });
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
        const updateTestDefectTypeMappingPayload = Object.keys(
          selectedTestRunIds
        ).map((el) => ({
          id: parseInt(el, 10),
          issueType: { id: selectedStatus?.id, name: selectedStatus?.name }
        }));
        onSuccess?.(updateTestDefectTypeMappingPayload);
        handleCloseModal();
      })
      .catch(() => {
        o11yNotify({
          title: 'Something went wrong!',
          description: 'There was an error while updating tests',
          type: 'error'
        });
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const openTestDetailsUrl = (testId) => {
    const endpoint = window.location.href;
    return `${endpoint}&details=${testId}`;
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

  return (
    <O11yModal show size="3xl" onClose={handleCloseModal}>
      <O11yModalHeader
        dismissButton
        heading="Bulk update failure category"
        handleDismissClick={handleCloseModal}
      />
      <O11yModalBody wrapperClassName="px-2">
        <p className="text-base-900 text-sm">Failure category options</p>
        <div className="mb-8">
          <O11yRadioSmallCards
            heading=""
            options={availableIssueTypes.map((el) => ({ name: el.name }))}
            onChange={handleRadioChange}
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
              {DATE_RANGE.CURRENT_BUILD.label}
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
        {!!selectedTestItemData && (
          <div className="bg-base-100 border-base-200 group mt-4 rounded-md border p-4">
            <p className="text-base-900 mb-2 text-sm">Current Item</p>
            <div className="flex">
              <div className="w-full">
                <p className="text-sm font-medium leading-5">
                  {selectedTestItemData.displayName}
                </p>
                <TestListStackTrace
                  wrapperClassName="ml-0"
                  details={selectedTestItemData?.details}
                />
              </div>
              <div className="hidden group-hover:inline-block">
                <O11yHyperlink
                  href={openTestDetailsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdOpenInNew className="text-base-900 hover:text-brand-600 h-4 w-4" />
                </O11yHyperlink>
              </div>
            </div>
          </div>
        )}
        <O11yCheckbox
          checked={
            Object.keys(selectedTestRunIds).length ===
            similarIssues?.data?.similar?.length
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
        <div className="h-64 overflow-auto">
          {similarIssues?.isLoading ? (
            <O11yLoader />
          ) : (
            <>
              {similarIssues?.data?.similar?.map((el) => (
                <div
                  className="border-base-200 group flex w-full border-b py-4 pr-4"
                  key={el.id}
                >
                  <O11yCheckbox
                    border={false}
                    wrapperClassName="w-full"
                    description="block"
                    checked={!!selectedTestRunIds[el?.id]}
                    data={{
                      description: (
                        <TestListStackTrace
                          wrapperClassName="ml-0"
                          details={{
                            retries: [
                              {
                                logs: {
                                  TEST_FAILURE: el.stackTrace
                                }
                              }
                            ]
                          }}
                        />
                      ),
                      label: el.name,
                      value: el.id
                    }}
                    onChange={(e) => {
                      handleCheckBoxChange(e, el.id);
                    }}
                  />
                  <div className="hidden group-hover:inline-block">
                    <O11yHyperlink
                      href={openTestDetailsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MdOpenInNew className="text-base-900 hover:text-brand-600 h-4 w-4" />
                    </O11yHyperlink>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
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
        >
          Apply
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

export default BulkTaggingModal;
