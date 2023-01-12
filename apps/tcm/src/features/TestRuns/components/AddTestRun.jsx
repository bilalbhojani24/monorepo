import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TMButton, TMInputField, TMModal } from 'bifrostProxy';
// import { addTestRuns } from 'api/projects.api';
// import AppRoute from 'const/routes';

// import { setAddTestRunsModalVisibility } from '../slices/testRunsSlice';

const AddTestRuns = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    access: 'private_proj',
  });

  const dispatch = useDispatch();
  const hideAddTestRunModal = () => {
    // dispatch(setAddTestRunsModalVisibility(false));
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

  return <div>Add test runs</div>;
};

export default AddTestRuns;
