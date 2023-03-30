import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOpenInNew } from '@browserstack/bifrost';
import { updateIntegrationStatusBySlug } from 'api/integrations';
import {
  O11yButton,
  O11yHyperlink,
  O11yInputField,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { o11yNotify } from 'utils/notification';

import { CI_API_SLUGS } from '../constants';
import { updateCiData } from '../slices/integrationsSlice';
import { getCiDataBySlug } from '../slices/selectors';

function JenkinsIntegrationModal() {
  const data = useSelector(getCiDataBySlug(CI_API_SLUGS.JENKINS));
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [userName, setUserName] = useState('');
  const [authToken, setAuthToken] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.username) {
      setUserName(data.username);
    }
    if (data?.authToken) {
      setAuthToken(data.authToken);
    }
  }, [data]);

  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };

  const handleChangeUserName = ({ target: { value } }) => {
    setUserName(value);
  };

  const handleChangeAuthToken = ({ target: { value } }) => {
    setAuthToken(value);
  };

  const handleSubmit = () => {
    if (!isSubmittingData) {
      setIsSubmittingData(true);
      const payload = {
        authToken,
        username: userName
      };
      updateIntegrationStatusBySlug({
        slug: CI_API_SLUGS.JENKINS,
        payload,
        isUpdate: !!data
      })
        .then(() => {
          o11yNotify({
            title: `Configuration updated successfully`,
            type: 'success'
          });
          dispatch(
            updateCiData({
              [CI_API_SLUGS.JENKINS]: payload
            })
          );
          setIsSubmittingData(false);
          handleCloseModal();
        })
        .catch(() => {
          o11yNotify({
            title: `Something went wrong! Please try again`,
            type: 'error'
          });
          setIsSubmittingData(false);
        });
    }
  };

  const isValid = useMemo(() => userName && authToken, [authToken, userName]);

  return (
    <O11yModal show size="lg" onClose={handleCloseModal}>
      <O11yModalHeader
        dismissButton
        heading="Jenkins configuration"
        handleDismissClick={handleCloseModal}
      />

      <O11yModalBody>
        <div className="border-b-base-200 border-b pb-5">
          <p className="text-base-700 text-xs font-semibold uppercase">
            Step 1
          </p>
          <p className="text-sm font-medium">Install plugin</p>
          <p className="text-base-500 mt-2 text-sm">
            {`You'd need to add the BrowserStack plugin in your Jenkins setup. From your Jenkins dashboard navigate to Manage Jenkins > Manage Plugins and select the Available tab. Locate the plugin by searching for "browserstack-integration" and thereafter install it.`}
          </p>
          <O11yHyperlink
            href="https://plugins.jenkins.io/browserstack-integration/"
            target="_blank"
            wrapperClassName="text-sm font-medium mt-2 inline-flex items-center"
          >
            BrowserStack Jenkins Plugin
            <MdOpenInNew className="ml-2" />
          </O11yHyperlink>
        </div>
        <div className="mt-5">
          <p className="text-base-700 text-xs font-semibold uppercase">
            Step 2
          </p>
          <p className="text-sm font-medium">Add credentials</p>
          <p className="text-base-500 mt-2 text-sm">
            BrowserStack Test Observability would need to know your Jenkins
            username and an auth token that it can use to trigger builds
            remotely.
          </p>
          <p className="text-base-500 mt-2 text-sm">
            {
              "To generate an Auth Token, you'd need to go to Jenkins UI > Your name on the top right > Configure > API Token > Add new token. You can choose to delete the connection at any later point of time."
            }
          </p>
          <div className="mt-4">
            <O11yInputField
              label="Username"
              id="user-name-value"
              isMandatory
              placeholder="admin"
              value={userName}
              onChange={handleChangeUserName}
            />
          </div>
          <div className="mt-4">
            <O11yInputField
              label="Auth Token"
              id="auth-token-value"
              isMandatory
              placeholder="**********"
              type="password"
              value={authToken}
              onChange={handleChangeAuthToken}
            />
          </div>
        </div>
      </O11yModalBody>
      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={handleCloseModal}>
          Cancel
        </O11yButton>
        <O11yButton
          disabled={!isValid}
          loading={isSubmittingData}
          isIconOnlyButton={isSubmittingData}
          onClick={handleSubmit}
          type="submit"
        >
          Confirm
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

export default JenkinsIntegrationModal;
