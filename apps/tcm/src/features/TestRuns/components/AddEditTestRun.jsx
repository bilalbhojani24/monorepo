import React from 'react';

import useAddEditTestRun from './useAddEditTestRun';

const AddEditTestRun = () => {
  const { createTestRunHandler, cancelCreation } = useAddEditTestRun();

  return 'WIP';
  // return (
  //   <>
  //     {!isAddTestCaseModalVisible && (
  //       <div className="border-base-200 flex w-full flex-1 flex-col items-stretch border-l">
  //         <TMPageHeadings
  //           heading="Create New Test Runs"
  //           actions={
  //             <>
  //               <TMButton
  //                 variant="primary"
  //                 colors="white"
  //                 onClick={cancelCreation}
  //               >
  //                 Cancel
  //               </TMButton>
  //               <TMButton
  //                 wrapperClassName="ml-2"
  //                 variant="primary"
  //                 colors="brand"
  //                 onClick={createTestRunHandler}
  //               >
  //                 Create Run
  //               </TMButton>
  //             </>
  //           }
  //         />
  //         <div className="flex flex-1 flex-col items-stretch p-4">
  //           <div className="border-base-200 flex flex-1 flex-col items-stretch justify-start overflow-hidden border bg-white p-4 sm:rounded-lg">
  //             <div className="mt-4">
  //               <TMInputField
  //                 value={testRunFormData.test_run.name}
  //                 id="test-run-name"
  //                 label="Test Run Name*"
  //                 onChange={handleTestRunInputFieldChange('test_run', 'name')}
  //               />
  //             </div>
  //             <div className="mt-4">
  //               <TMInputField
  //                 value={testRunFormData.test_run.description}
  //                 id="test-run-description"
  //                 label="Description"
  //                 onChange={handleTestRunInputFieldChange(
  //                   'test_run',
  //                   'description'
  //                 )}
  //               />
  //             </div>
  //             <div className="mt-4">
  //               <TMSelectMenu
  //                 defaultValue={ASSIGN_TO_OPTIONS[0]}
  //                 checkPosition="right"
  //                 label="Assign To"
  //                 isMultiSelect
  //                 options={ASSIGN_TO_OPTIONS}
  //                 onChange={handleSelectMenuChange('test_run', 'assignTo')}
  //               />
  //             </div>
  //             <div className="mt-4">
  //               <TMSelectMenu
  //                 defaultValue={STATE_OPTIONS[0]}
  //                 checkPosition="right"
  //                 label="State"
  //                 options={STATE_OPTIONS}
  //                 onChange={handleSelectMenuChange('test_run', 'state')}
  //               />
  //             </div>
  //             <div className="text-base-900 mt-4 text-lg font-medium">
  //               Associated Test Cases
  //             </div>
  //             <div className="mt-4">
  //               <TMInputWButton
  //                 readOnly
  //                 id="add-test-cases"
  //                 label="Test Cases"
  //                 buttonElement="Add Test Cases"
  //                 icon={<PostAddIcon />}
  //                 onButtonClick={showTestCaseModalHandler}
  //                 placeholder={`${testRunFormData.test_case_ids.length} Test Cases Selected`} // this needs to change when test cases is selected
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );
};

export default AddEditTestRun;
