import React from 'react';
import { CTACard, CTACardContent, CTACardMedia } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import PaywallCTACardActions from './PaywallCTACardActions';

function PaywallFeatureCard({
  illustration,
  title,
  desc,
  learnMoreLink,
  wrapperClassName
}) {
  const IllustrationComponent = illustration;
  return (
    <div
      className={twClassNames(
        'border-base-200 relative rounded-md border shadow',
        wrapperClassName
      )}
    >
      <CTACard isDismissable={false} wrapperClassName="shadow-none bg-white">
        <CTACardContent header={title} description={desc}>
          <PaywallCTACardActions learnMoreLink={learnMoreLink} />
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
  learnMoreLink: PropTypes.string,
  wrapperClassName: PropTypes.string
};

PaywallFeatureCard.defaultProps = {
  title: '',
  desc: '',
  learnMoreLink: '',
  wrapperClassName: ''
};
export default PaywallFeatureCard;
