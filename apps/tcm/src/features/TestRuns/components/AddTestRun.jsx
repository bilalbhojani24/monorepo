import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTestRun } from 'api/testruns.api';
import {
  TMInputField,
  TMInputWButton,
  TMPageHeadings,
  TMSelectMenu,
} from 'bifrostProxy';

import { getFolders } from '../../../api/folders.api';
import { PostAddIcon } from '../../Icons';
import { ASSIGN_TO_OPTIONS, STATE_OPTIONS } from '../const/immutableConst';
import {
  addSingleTestRun,
  setAddTestCaseModal,
  setAddTestRun,
} from '../slices/testRunsSlice';

import TestCaseModal from './TestCaseModal';
import useTestRuns from './useTestRuns';

const AddTestRuns = () => {
  const dispatch = useDispatch();
  const [folders, setFolders] = useState([]);
  // const [showAddTestCaseModal, setShowAddTestCaseModal] = useState(false);
  const { projectId } = useParams();
  const { testRunFormData, handleTestRunFieldChange, showAddTestCaseModal } =
    useTestRuns();

  const cancelTestRunHandler = () => {
    dispatch(setAddTestRun(false));
  };

  const createTestRunHandler = () => {
    addTestRun({ projectId, payload: testRunFormData }).then((res) => {
      dispatch(addSingleTestRun(res.data.testrun));
      dispatch(setAddTestRun(false));
    });
  };

  const showTestCaseModalHandler = () => {
    dispatch(setAddTestCaseModal(true));
    getFolders({ projectId }).then((data) => {
      setFolders(data.folders);
    });
  };

  return (
    <>
      {!showAddTestCaseModal && (
        <div className="flex w-full flex-1 flex-col items-stretch border-l border-base-200">
          <TMPageHeadings
            heading="Create New Test Runs"
            actionsData={[
              {
                id: 'cancel-test-run',
                actionsNode: <>Cancel</>,
                actionFn: cancelTestRunHandler,
                colors: 'white',
                variant: 'primary',
              },
              {
                id: 'create-test-run',
                actionsNode: <>Create Run</>,
                actionFn: createTestRunHandler,
                colors: 'brand',
                variant: 'primary',
              },
            ]}
          />
          <div className="flex flex-1 flex-col items-stretch bg-base-100 p-5">
            <div className="flex flex-1 flex-col items-stretch justify-start overflow-hidden border border-base-200 bg-white p-4 sm:rounded-lg">
              <div className="mt-4">
                <TMInputField
                  value={testRunFormData.test_run.name}
                  id="test-run-name"
                  label="Test Run Name*"
                  onChange={handleTestRunFieldChange('test_run', 'name')}
                />
              </div>
              <div className="mt-4">
                <TMInputField
                  value={testRunFormData.test_run.description}
                  id="test-run-description"
                  label="Description"
                  onChange={handleTestRunFieldChange('test_run', 'description')}
                />
              </div>
              <div className="mt-4">
                <TMSelectMenu
                  defaultValue={ASSIGN_TO_OPTIONS[0]}
                  checkPosition="right"
                  label="Assign To"
                  isMultiSelect
                  options={ASSIGN_TO_OPTIONS}
                  onChange={handleTestRunFieldChange('test_run', 'assignTo')}
                />
              </div>
              <div className="mt-4">
                <TMSelectMenu
                  defaultValue={STATE_OPTIONS[0]}
                  checkPosition="right"
                  label="State"
                  isMultiSelect
                  options={STATE_OPTIONS}
                  onChange={handleTestRunFieldChange('test_run', 'state')}
                />
              </div>
              {/* <div> */}
              <div className="mt-4 text-lg font-medium text-base-900">
                Associated Test Cases
              </div>
              <div className="mt-4">
                <TMInputWButton
                  readOnly
                  id="add-test-cases"
                  label="Test Cases"
                  buttonElement="Add Test Cases"
                  icon={<PostAddIcon />}
                  onButtonClick={showTestCaseModalHandler}
                  placeholder={`${testRunFormData.test_case_ids.length} Test Cases Selected`} // this needs to change when test cases is selected
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {showAddTestCaseModal && <TestCaseModal allFolders={folders} />}
    </>
  );
};

export default AddTestRuns;
