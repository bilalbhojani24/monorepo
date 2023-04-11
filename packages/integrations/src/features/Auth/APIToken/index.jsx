import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, MdArrowBack, MdArrowForward } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { getTokenConnectionForToolThunk } from '../../../api';
import { Logo } from '../../../common/components';
import {
  clearGlobalAlert,
  setGlobalAlert
} from '../../../common/slices/globalAlertSlice';
import { LOADING_STATUS } from '../../slices/constants';
import { toolAuthLoadingSelector } from '../../slices/toolAuthSlice';
import { APITokenMetaType } from '../types';

import APITokenFormField from './APITokenFormField';

const APIToken = ({
  label,
  showOAuth,
  syncPoller,
  integrationKey,
  isSyncInProgress,
  apiTokenMeta: { logo_url: logo, title, description, fields }
}) => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const isLoading =
    useSelector(toolAuthLoadingSelector) === LOADING_STATUS.PENDING;

  const setDataForField = (fieldKey, dataFromField) => {
    setData({ ...data, [fieldKey]: dataFromField });
  };
  const handleConnect = () => {
    dispatch(clearGlobalAlert());
    dispatch(
      getTokenConnectionForToolThunk({
        integrationKey,
        data,
        integrationLabel: label
      })
    ).then((res) => {
      if (!res?.payload?.success) {
        const message =
          res?.payload?.message ||
          `There was some problem connecting to ${label} software`;
        dispatch(
          setGlobalAlert({
            kind: 'error',
            message,
            autoDismiss: true
          })
        );
      } else {
        syncPoller();
      }
    });
  };

  return (
    <>
      <Button
        variant="primary"
        colors="white"
        icon={<MdArrowBack className="text-base-500 text-xl" />}
        onClick={showOAuth}
      >
        Back
      </Button>
      <div className="flex items-center justify-center ">
        <Logo logo={logo} label={label} />
      </div>
      <div className="border-base-200 border-b py-6 text-center">
        <p className="text-base-900 text-xl">{title}</p>
        <p className="text-base-500 text-sm">{description}</p>
      </div>
      <div className="pt-5">
        {fields?.map(
          ({
            key: fieldKey,
            label: fieldLabel,
            type,
            doc_link: docLink,
            placeholder
          }) => (
            <APITokenFormField
              label={fieldLabel}
              type={type}
              docLink={docLink}
              value={data[fieldKey]}
              fieldKey={fieldKey}
              setDataForField={setDataForField}
              placeholder={placeholder}
            />
          )
        )}
      </div>
      <div className="sticky bottom-0 mb-1 bg-white pb-2">
        <Button
          variant="primary"
          fullWidth
          icon={<MdArrowForward className="text-xl text-white" />}
          iconPlacement="end"
          onClick={handleConnect}
          loading={isLoading || isSyncInProgress}
          loadingText="Loading"
        >
          {`Connect to ${label}`}
        </Button>
      </div>
    </>
  );
};

APIToken.propTypes = {
  integrationKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  apiTokenMeta: PropTypes.shape(APITokenMetaType),
  showOAuth: PropTypes.func.isRequired,
  syncPoller: PropTypes.func.isRequired,
  isSyncInProgress: PropTypes.func.isRequired
};

APIToken.defaultProps = {
  apiTokenMeta: {}
};

export default APIToken;
