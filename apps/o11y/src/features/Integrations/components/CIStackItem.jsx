import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteIntegrationStatusBySlug,
  getIntegrationStatusBySlug
} from 'api/integrations';
import AbruptExitModal from 'common/AbruptExitModal';
import {
  O11yBadge,
  O11yButton,
  O11yStackedListCommon,
  O11yStackedListItem
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';
import { o11yNotify } from 'utils/notification';

import { updateCiData } from '../slices/integrationsSlice';
import { getCiDataBySlug } from '../slices/selectors';

function CIStackItem({ icon, title, analyticKey, cta, apiSlug, modalKey }) {
  const isConfigured = useSelector(getCiDataBySlug(apiSlug));
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleClickConfigure = () => {
    logOllyEvent({
      event: 'O11yIntegrationsInteracted',
      data: {
        interaction: analyticKey
      }
    });
    dispatch(
      toggleModal({
        version: modalKey
      })
    );
  };

  const handleDisconnect = () => {
    setShowDeleteConfirm(false);
    setIsDisconnecting(true);
    deleteIntegrationStatusBySlug({ slug: apiSlug })
      .then(() => {
        o11yNotify({
          title: `Integration disconnected successfully`,
          type: 'success'
        });
        dispatch(
          updateCiData({
            [apiSlug]: null
          })
        );
      })
      .catch(() => {
        o11yNotify({
          title: `Something went wrong! Please try again`,
          type: 'error'
        });
      })
      .finally(() => {
        setIsDisconnecting(false);
      });
  };

  useEffect(() => {
    getIntegrationStatusBySlug({ slug: apiSlug }).then((res) => {
      dispatch(
        updateCiData({
          [apiSlug]: res.data
        })
      );
    });
  }, [apiSlug, dispatch]);

  return (
    <>
      <O11yStackedListItem
        isCard={false}
        actions={
          <div className="flex items-center gap-4">
            {!!isConfigured && (
              <O11yButton
                variant="rounded"
                colors="danger"
                size="small"
                onClick={() => setShowDeleteConfirm(true)}
                loading={isDisconnecting}
                isIconOnlyButton={isDisconnecting}
              >
                Disconnect
              </O11yButton>
            )}
            <O11yButton
              variant="rounded"
              colors="white"
              size="small"
              onClick={handleClickConfigure}
            >
              {cta || 'Configure'}
            </O11yButton>
          </div>
        }
      >
        <O11yStackedListCommon
          icon={icon}
          title={title}
          subTitle={
            isConfigured ? (
              <O11yBadge disabled hasDot modifier="success" text="Configured" />
            ) : (
              'Not Configured'
            )
          }
        />
      </O11yStackedListItem>
      <AbruptExitModal
        isAbruptModalOpen={showDeleteConfirm}
        onDiscard={handleDisconnect}
        onGoBack={() => setShowDeleteConfirm(false)}
        title="Disconnect integration"
        subtitle="Are you sure you want to disconnect?"
        confirmCtaText="Disconnect"
      />
    </>
  );
}

CIStackItem.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.node,
  analyticKey: PropTypes.string,
  cta: PropTypes.string,
  apiSlug: PropTypes.string.isRequired,
  modalKey: PropTypes.string.isRequired
};

CIStackItem.defaultProps = {
  icon: null,
  title: null,
  analyticKey: '',
  cta: ''
};

export default CIStackItem;
