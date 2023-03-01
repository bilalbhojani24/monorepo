import React, { useState } from 'react';
import { Button, MdArrowBack, MdArrowForward } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { getTokenConnectionForTool } from '../../../api/getTokenConnectionForTool';
import BrandLogo from '../../../common/components/BrandLogo';
import { APITokenMetaType } from '../types';

import APITokenFormField from './APITokenFormField';

const APIToken = ({
  integrationKey,
  label,
  showOAuth,
  apiTokenMeta: { logo_url: logo, title, description, form_fields: fields }
}) => {
  const [data, setData] = useState({});

  const setDataForField = (fieldKey, dataFromField) => {
    setData({ ...data, [fieldKey]: dataFromField });
  };
  const handleConnect = () => {
    getTokenConnectionForTool(integrationKey, data);
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
        <BrandLogo logo={logo} label={label} />
      </div>
      <div className="border-b py-6 text-center">
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
