import React from 'react';
import { CTACard, CTACardContent, CTACardMedia } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import bgIllustration from 'assets/illustrations/bg-illustration.png';
import PropTypes from 'prop-types';

import PaywallCTACardActions from './PaywallCTACardActions';

function PaywallFeatureCard({
  illustration,
  title,
  desc,
  cardConfig,
  learnMoreLink
}) {
  return (
    <div className="border-base-200 relative rounded-md border pl-6 pt-10 shadow">
      <img
        src={bgIllustration}
        alt=""
        className="absolute left-0 top-0 h-full w-full"
      />
      <CTACard isDismissable={false} wrapperClassName="shadow-none">
        <CTACardContent header={title} description={desc}>
          <PaywallCTACardActions
            showTextOnSubmit
            learnMoreLink={learnMoreLink}
          />
        </CTACardContent>
        <CTACardMedia>
          <img
            src={illustration}
            alt="feature illustration"
            className={twClassNames(
              'self-end',
              cardConfig.illustrationClassName
            )}
          />
        </CTACardMedia>
      </CTACard>
    </div>
  );
}

PaywallFeatureCard.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  illustration: PropTypes.node.isRequired,
  cardConfig: PropTypes.objectOf(PropTypes.any),
  learnMoreLink: PropTypes.string
};

PaywallFeatureCard.defaultProps = {
  title: '',
  desc: '',
  cardConfig: {},
  learnMoreLink: ''
};
export default PaywallFeatureCard;
