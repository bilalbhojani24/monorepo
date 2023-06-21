import React from 'react';
import { Banner, Button } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { TRIAL_FAILED, TRIAL_NOT_STARTED, TRIAL_STARTED } from 'constants';

import useReverseTrialBanner from './useReverseTrialBanner';

export default function ReverseTrialBannerWrapper() {
  const {
    bannerDetails,
    handleBannerDismissClick,
    showBanner,
    handleBannerButtonClick,
    bannerName,
    trialState
  } = useReverseTrialBanner();

  const {
    description,
    icon: Icon,
    color,
    buttonText,
    subDescription
  } = bannerDetails;
  return (
    <>
      {showBanner && (
        <div className="fixed inset-x-0 top-[64px] z-10 flex justify-between">
          <Banner
            description={
              <div
                className={twClassNames('', {
                  'flex gap-1': [TRIAL_NOT_STARTED, TRIAL_FAILED].includes(
                    trialState
                  )
                })}
              >
                <p>{description}</p>{' '}
                {subDescription && (
                  <p className="font-normal">{subDescription}</p>
                )}
              </div>
            }
            isDismissButton
            bannerIcon={
              Icon ? (
                <img src={Icon} alt="banner logo" height={26} width={26} />
              ) : (
                false
              )
            }
            ctaButton={
              buttonText && (
                <Button
                  onClick={handleBannerButtonClick}
                  size="small"
                  colors="white"
                  iconPlacement="end"
                >
                  {buttonText}
                </Button>
              )
            }
            onDismissClick={handleBannerDismissClick}
            modifier={color}
            align={bannerName === TRIAL_STARTED ? 'centered' : false}
          />
        </div>
      )}
    </>
  );
}
