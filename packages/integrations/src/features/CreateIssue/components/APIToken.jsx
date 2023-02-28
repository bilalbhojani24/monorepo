import React from 'react';
import { Button, MdArrowBack } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import BrandLogo from './BrandLogo';
import { APITokenMetaType } from './types';

const APIToken = ({
  label,
  showOAuth,
  apiTokenMeta: { logo_url: logo, title, description }
}) => (
  <>
    <Button
      variant="primary"
      colors="white"
      wrapperClassName="mt-3"
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
  </>
);

APIToken.propTypes = {
  label: PropTypes.string.isRequired,
  apiTokenMeta: PropTypes.shape(APITokenMetaType),
  showOAuth: PropTypes.func.isRequired
};

APIToken.defaultProps = {
  apiTokenMeta: {}
};

export default APIToken;
