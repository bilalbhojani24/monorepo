import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, InputField, Modal } from '@browserstack/bifrost';
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
    <Modal
      show
      withDismissButton
      handleDismissButtonClick={hideAddTestRunModal}
      onClose={hideAddTestRunModal}
    >
      <InputField
        wrapperClass="mb-2"
        label="TestRun Name"
        placeholder="TestRun Name 01"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.currentTarget.value })
        }
      />
      <div className="mt-3 flex justify-end">
        <Button variant="white" onClick={hideAddTestRunModal}>
          Cancel
        </Button>
        <Button
          variant="white"
          wrapperClassName="ml-3"
          onClick={createTestRunHandler}
        >
          Create Folder
        </Button>
      </div>
    </Modal>
  );
};

export default AddTestRuns;
