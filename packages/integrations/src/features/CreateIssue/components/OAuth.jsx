import React from 'react';
import {
  Button,
  CheckCircleIcon,
  MdArrowForward,
  MdCancel,
  MdSwapHoriz,
  Notifications
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import BrandLogo from './BrandLogo';
import { OAuthMetaType } from './types';

const OAuth = ({
  label,
  oAuthMeta: { logo_url: logo, title, feature_list: features, description },
  showAPIToken,
  hasOAuthFailed,
  hideFailedAuthMessage,
  shouldShowFailedAuthMessage
}) => {
  const handleAPIConnect = () => {
    showAPIToken();
  };
  return (
    <>
      {shouldShowFailedAuthMessage && (
        <div className="pb-6">
          <Notifications
            headerIcon={<MdCancel className="text-danger-400 mx-4 text-2xl" />}
            title=""
            wrapperClassName="mb-3 bg-danger-50"
            description={`There was some problem connecting to ${label} software`}
            handleClose={hideFailedAuthMessage}
          />
        </div>
      )}
      <div className="flex items-center justify-center ">
        <BrandLogo logo="/icons/browserstack.png" label="Browserstack" />
        <MdSwapHoriz className="text-brand-500 mx-4 text-3xl" />
        <BrandLogo logo={logo} label={label} />
      </div>
      <div className="border-b py-6 text-center">
        <p className="text-base-900 text-xl">{title}</p>
        <p className="text-base-500 text-sm">{description}</p>
      </div>
      <div>
        <p className="text-base-900 py-6">{`Connect ${label} Software`}</p>
        <p className="my-6">
          <ul>
            {features?.map((feature) => (
              <li className="text-base-700 flex py-2.5 text-sm">
                <CheckCircleIcon className="text-success-500 mr-2.5 w-6" />
                {feature}
              </li>
            ))}
          </ul>
        </p>
      </div>
      <Button
        variant="primary"
        wrapperClassName="mt-3"
        fullWidth
        icon={<MdArrowForward className="text-xl text-white" />}
        iconPlacement="end"
      >
        {`Connect to ${label}`}
      </Button>
      {hasOAuthFailed && (
        <Button
          wrapperClassName="mt-3"
          variant="secondary"
          fullWidth
          onClick={handleAPIConnect}
        >
          Connect using API Token
        </Button>
      )}
    </>
  );
};

OAuth.propTypes = {
  label: PropTypes.string.isRequired,
  oAuthMeta: PropTypes.shape(OAuthMetaType),
  hasOAuthFailed: PropTypes.bool,
  shouldShowFailedAuthMessage: PropTypes.bool,
  hideFailedAuthMessage: PropTypes.func.isRequired,
  showAPIToken: PropTypes.func.isRequired
};

OAuth.defaultProps = {
  oAuthMeta: {},
  hasOAuthFailed: false,
  shouldShowFailedAuthMessage: false
};

export default OAuth;
