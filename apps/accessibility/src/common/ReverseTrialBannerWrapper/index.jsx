import React from 'react';
import { Banner, Button } from '@browserstack/bifrost';

import { TRIAL_STARTED } from '../../constants';

import useReverseTrialBanner from './useReverseTrialBanner';

export default function ReverseTrialBannerWrapper() {
  const {
    bannerDetails,
    handleBannerDismissClick,
    showBanner,
    handleBannerButtonClick,
    bannerName
  } = useReverseTrialBanner();

  console.log({ bannerName, TRIAL_STARTED });

  const { description, icon: Icon, color, buttonText } = bannerDetails;
  return (
    <>
      {showBanner && (
        <div className="fixed inset-x-0 top-[64px] z-10 flex justify-between">
          <Banner
            description={description}
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
