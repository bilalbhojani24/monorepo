import React from 'react';
import { twClassNames } from '@browserstack/utils';
import O11yFeatureCard from 'common/O11yFeatureCard';
import PropTypes from 'prop-types';

function PaywallFeatureCard({
  callout,
  illustration,
  title,
  desc,
  actions,
  cardConfig
}) {
  return (
    <O11yFeatureCard
      showBg={cardConfig.showBg}
      wrapperClassName={twClassNames(
        'shadow pt-10 pl-6 overflow-hidden break-words',
        cardConfig?.wrapperClassName
      )}
    >
      <div className="flex items-center justify-between gap-6">
        <div
          className={twClassNames(
            'flex max-w-xs flex-1 shrink-0 flex-col pb-6',
            {
              'w-full': cardConfig?.hideIllustration
            }
          )}
        >
          <p className="text-brand-800 text-xs uppercase">{callout}</p>
          <h3 className="mt-1 text-xl font-semibold leading-7">{title}</h3>
          <p className="text-base-500 mt-1.5 text-sm leading-5">{desc}</p>
          {actions && (
            <div className="mt-6 flex items-center gap-4">{actions}</div>
          )}
        </div>
        {!cardConfig?.hideIllustration && (
          <div
            className={twClassNames(
              'flex flex-1 justify-end',
              cardConfig?.illustrationWrapperClass
            )}
          >
            <img
              src={illustration}
              alt="feature illustration"
              className={twClassNames(
                'self-end',
                cardConfig.illustrationClassName
              )}
            />
          </div>
        )}
      </div>
    </O11yFeatureCard>
  );
}

PaywallFeatureCard.propTypes = {
  callout: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  illustration: PropTypes.node.isRequired,
  actions: PropTypes.node,
  wrapperClassName: PropTypes.string,
  cardConfig: PropTypes.objectOf(PropTypes.any)
};

PaywallFeatureCard.defaultProps = {
  callout: '',
  title: '',
  desc: '',
  wrapperClassName: '',
  actions: null,
  cardConfig: {}
};
export default PaywallFeatureCard;
