import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTestRun } from 'api/testruns.api';
import { PostAddIcon } from 'assets/icons';
import {
  TMInputField,
  TMInputWButton,
  TMPageHeadings,
  TMSelectMenu,
} from 'bifrostProxy';

import { ASSIGN_TO_OPTIONS, STATE_OPTIONS } from '../const/immutableConst';
import { addSingleTestRun, setAddTestRun } from '../slices/testRunsSlice';

import useTestRuns from './useTestRuns';

const AddTestRuns = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { testRunFormData, handleTestRunFieldChange } = useTestRuns();

  const cancelTestRunHandler = () => {
    dispatch(setAddTestRun(false));
  };

  const createTestRunHandler = () => {
    addTestRun({ projectId, payload: { test_run: testRunFormData } }).then(
      (res) => {
        dispatch(addSingleTestRun(res.data.testrun));
        dispatch(setAddTestRun(false));
      },
    );
  };

  return (
    <div className="border-base-200 flex w-full flex-1 flex-col items-stretch border-l">
      <TMPageHeadings
        heading="Create New Test Runs"
        actions={[
          {
            id: 'cancel-test-run',
            callback: cancelTestRunHandler,
            actionProps: {
              children: <>Cancel</>,
              variant: 'primary',
              colors: 'white',
            },
          },
          {
            id: 'create-test-run',
            callback: createTestRunHandler,
            actionProps: {
              children: <>Create Run</>,
              variant: 'primary',
              colors: 'brand',
            },
          },
        ]}
      />
      <div className="bg-base-100 flex flex-1 flex-col items-stretch p-5">
        <div className="border-base-200 flex flex-1 flex-col items-stretch justify-start overflow-hidden border bg-white p-4 sm:rounded-lg">
          <div className="mt-4">
            <TMInputField
              id="test-run-name"
              label="Test Run Name*"
              onChange={(e) =>
                handleTestRunFieldChange('name', e.currentTarget.value)
              }
            />
          </div>
          <div className="mt-4">
            <TMInputField
              id="test-run-description"
              label="Description"
              onChange={(e) =>
                handleTestRunFieldChange('description', e.currentTarget.value)
              }
            />
          </div>
          <div className="mt-4">
            <TMSelectMenu
              defaultValue={ASSIGN_TO_OPTIONS[0]}
              checkPosition="right"
              label="Assign To"
              isMultiSelect
              options={ASSIGN_TO_OPTIONS}
              onChange={(e) => handleTestRunFieldChange('assignTo', e.value)}
            />
          </div>
          <div className="mt-4">
            <TMSelectMenu
              defaultValue={STATE_OPTIONS[0]}
              checkPosition="right"
              label="State"
              isMultiSelect
              options={STATE_OPTIONS}
              onChange={(e) => handleTestRunFieldChange('state', e.value)}
            />
          </div>
          {/* <div> */}
          <div className="text-base-900 mt-4 text-lg font-medium">
            Associated Test Cases
          </div>
          <div className="mt-4">
            <TMInputWButton
              id="add-test-cases"
              label="Test Cases"
              buttonElement="Create Test Cases"
              icon={<PostAddIcon />}
              placeholder="0 Test Cases Selected"
            />
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddTestRuns;
