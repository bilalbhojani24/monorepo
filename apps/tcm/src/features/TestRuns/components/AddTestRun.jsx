import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TMButton, TMInputField, TMModal } from '_proxyComp';
// import { addTestRuns } from 'api/projects.api';
import AppRoute from 'const/routes';

import { setAddTestRunsModalVisibility } from '../slices/testRunsSlice';

const AddTestRuns = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    access: 'private_proj',
  });

  const dispatch = useDispatch();
  const hideAddTestRunModal = () => {
    dispatch(setAddTestRunsModalVisibility(false));
  };

  const createTestRunHandler = () => {
    // addTestRuns(formData).then((res) => {
    // dispatch(updateTestRuns(res.data.project));
    // navigate(
    //   `${AppRoute.PROJECTS}/${res.data.project.id}${AppRoute.TEST_CASES}`,
    // );
    hideAddTestRunModal();
    // });
  };

  return (
    <TMModal
      show
      withDismissButton
      handleDismissButtonClick={hideAddTestRunModal}
      onClose={hideAddTestRunModal}
    >
      <TMInputField
        wrapperClass="mb-2"
        label="TestRun Name"
        placeholder="TestRun Name 01"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.currentTarget.value })
        }
      />
      <div className="mt-3 flex justify-end">
        <TMButton variant="white" onClick={hideAddTestRunModal}>
          Cancel
        </TMButton>
        <TMButton
          variant="white"
          wrapperClassName="ml-3"
          onClick={createTestRunHandler}
        >
          Create Folder
        </TMButton>
      </div>
    </TMModal>
  );
};

export default AddTestRuns;
