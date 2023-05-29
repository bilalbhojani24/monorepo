import React from 'react';
import { useDispatch } from 'react-redux';
import { Banner, Button } from '@browserstack/bifrost';
import { setShowBanner } from 'features/Dashboard/slices/appSlice';

import useReverseTrialBanner from './useReverseTrialBanner';

export default function ReverseTrialBanner() {
  const { bannerDetails } = useReverseTrialBanner();
  const dispatch = useDispatch();

  const { description, icon: Icon, color, buttonText } = bannerDetails;
  return (
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
              onClick={() => {}}
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
        onDismissClick={() => dispatch(setShowBanner(false))}
        modifier={color}
      />
    </div>
  );
}
