import React, { useEffect, useState } from 'react';
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

import { CI_API_SLUGS, INTEGRATIONS_EXT_LINKS } from '../constants';
import { updateCiData } from '../slices/integrationsSlice';
import { getCiDataBySlug } from '../slices/selectors';

function AzureIntegrationModal() {
  const data = useSelector(getCiDataBySlug(CI_API_SLUGS.AZURE_DEVOPS));
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.authToken) {
      setAuthToken(data.authToken);
    }
  }, [data]);

  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };

  const handleChangeAuthToken = ({ target: { value } }) => {
    setAuthToken(value);
  };

  const handleSubmit = () => {
    if (!isSubmittingData) {
      setIsSubmittingData(true);
      const payload = {
        authToken
      };
      updateIntegrationStatusBySlug({
        slug: CI_API_SLUGS.AZURE_DEVOPS,
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
              [CI_API_SLUGS.AZURE_DEVOPS]: payload
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

  return (
    <O11yModal show size="lg" onClose={handleCloseModal}>
      <O11yModalHeader
        dismissButton
        heading="Azure DevOps configuration"
        handleDismissClick={handleCloseModal}
      />

      <O11yModalBody>
        <p className="text-sm font-medium">Add credentials</p>
        <p className="text-base-500 mt-2 text-sm">
          BrowserStack Test Observability would need your Azure DevOps Personal
          Access Token (PAT) that can be used to trigger builds remotely.
        </p>
        <p className="text-base-500 mt-2 text-sm">
          {
            "To generate a PAT, you'd need to login to Azure Org > User settings > Personal access tokens > New token > set expiry and give access to Build read & execute"
          }
        </p>
        <O11yHyperlink
          href={INTEGRATIONS_EXT_LINKS.azurePAT}
          target="_blank"
          wrapperClassName="text-sm font-medium mt-2 inline-flex items-center"
        >
          Read more
          <MdOpenInNew className="ml-2" />
        </O11yHyperlink>
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
      </O11yModalBody>
      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={handleCloseModal}>
          Cancel
        </O11yButton>
        <O11yButton
          disabled={!authToken}
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

export default AzureIntegrationModal;
