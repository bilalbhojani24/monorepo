import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdOutlineMailOutline } from '@browserstack/bifrost';
import {
  O11yButton,
  O11yStackedListCommon,
  O11yStackedListItem
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { MODAL_TYPES } from 'constants/modalTypes';
import { logOllyEvent } from 'utils/common';

import { INTEGRATIONS_PARAMS } from '../constants';

function EmailCommunicationItem() {
  const dispatch = useDispatch();

  const showPrefModal = useCallback(
    (source) => {
      logOllyEvent({
        event: 'O11yIntegrationsOnEmailConfigure',
        data: {
          source
        }
      });
      dispatch(
        toggleModal({
          version: MODAL_TYPES.email_preference,
          data: {}
        })
      );
    },
    [dispatch]
  );

  const handleClickEmailConfigure = () => {
    showPrefModal('click');
  };

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    if (search.get(INTEGRATIONS_PARAMS.MANAGE_EMAIL_PREFERENCE) === 'true') {
      showPrefModal('direct');
    }
  }, [showPrefModal]);

  return (
    <O11yStackedListItem
      isCard={false}
      actions={
        <O11yButton
          variant="rounded"
          colors="white"
          size="small"
          onClick={handleClickEmailConfigure}
        >
          Configure
        </O11yButton>
      }
    >
      <O11yStackedListCommon
        icon={
          <MdOutlineMailOutline className="text-base-500 h-10 w-10 rounded-full" />
        }
        title="Email"
      />
    </O11yStackedListItem>
  );
}

export default EmailCommunicationItem;
