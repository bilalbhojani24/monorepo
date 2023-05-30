import React from 'react';
import { Banner, Button } from '@browserstack/bifrost';

import useReverseTrialBanner from './useReverseTrialBanner';

export default function ReverseTrialBannerWrapper() {
  const {
    bannerDetails,
    handleBannerDismissClick,
    showBanner,
    handleBannerButtonClick
  } = useReverseTrialBanner();
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
              buttonText ? (
                <Button
                  onClick={handleBannerButtonClick}
                  size="small"
                  colors="white"
                  iconPlacement="end"
                >
                  {buttonText}
                </Button>
              ) : (
                false
              )
            }
            onDismissClick={handleBannerDismissClick}
            modifier={color}
          />
        </div>
      )}
    </>
  );
}
