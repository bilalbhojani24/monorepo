import React from 'react';
import { CTACard, CTACardContent, CTACardMedia } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import PaywallCTACardActions from './PaywallCTACardActions';

function PaywallFeatureCard({ illustration, title, desc, learnMoreLink }) {
  const IllustrationComponent = illustration;
  return (
    <div className="border-base-200 relative rounded-md border shadow">
      <CTACard isDismissable={false} wrapperClassName="shadow-none bg-white">
        <CTACardContent header={title} description={desc}>
          <PaywallCTACardActions
            showTextOnSubmit
            learnMoreLink={learnMoreLink}
          />
        </CTACardContent>
        <CTACardMedia>
          <IllustrationComponent className="h-full w-full" />
        </CTACardMedia>
      </CTACard>
    </div>
  );
}

PaywallFeatureCard.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  illustration: PropTypes.node.isRequired,
  learnMoreLink: PropTypes.string
};

PaywallFeatureCard.defaultProps = {
  title: '',
  desc: '',
  learnMoreLink: ''
};
export default PaywallFeatureCard;
