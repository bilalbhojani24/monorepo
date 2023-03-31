import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alerts,
  Button,
  MdArrowBack,
  MdArrowForward
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { getTokenConnectionForToolThunk } from '../../../api';
import { Loader, Logo } from '../../../common/components';
import { LOADING_STATUS } from '../../slices/constants';
import { toolAuthLoadingSelector } from '../../slices/toolAuthSlice';
import { APITokenMetaType } from '../types';

import APITokenFormField from './APITokenFormField';

const APIToken = ({
  label,
  showOAuth,
  syncPoller,
  integrationKey,
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
    dispatch(
      getTokenConnectionForToolThunk({
        integrationKey,
        data,
        integrationLabel: label
      })
    ).then(() => {
      syncPoller();
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />;
      </div>
    );
  }

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
  showOAuth: PropTypes.func.isRequired
};

APIToken.defaultProps = {
  apiTokenMeta: {}
};

export default APIToken;
