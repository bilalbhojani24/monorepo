import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, MdArrowBack, MdArrowForward } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { getTokenConnectionForToolThunk } from '../../../api';
import { Loader, Logo } from '../../../common/components';
import { LOADING_STATUS } from '../../slices/constants';
import { setHasIntegrated } from '../../slices/integrationsSlice';
import {
  // toolAuthErrorSelector,
  toolAuthLoadingSelector
} from '../../slices/toolAuthSlice';
import { APITokenMetaType } from '../types';

import APITokenFormField from './APITokenFormField';

const APIToken = ({
  integrationKey,
  label,
  showOAuth,
  apiTokenMeta: { logo_url: logo, title, description, form_fields: fields }
}) => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const isLoading =
    useSelector(toolAuthLoadingSelector) === LOADING_STATUS.PENDING;
  // const error = useSelector(toolAuthErrorSelector);

  const setDataForField = (fieldKey, dataFromField) => {
    setData({ ...data, [fieldKey]: dataFromField });
  };
  const handleConnect = () => {
    dispatch(getTokenConnectionForToolThunk(integrationKey, data)).then(() => {
      dispatch(setHasIntegrated(integrationKey));
    });
  };

  if (isLoading) {
    return <Loader />;
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
      <Button
        variant="primary"
        fullWidth
        icon={<MdArrowForward className="text-xl text-white" />}
        iconPlacement="end"
        onClick={handleConnect}
      >
        {`Connect to ${label}`}
      </Button>
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
