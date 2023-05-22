import React from 'react';
import { Button, MdOutlineExpandMore, Popover } from '@browserstack/bifrost';
import ChromeIcon from 'assets/chrome_icon.svg';
import MacIcon from 'assets/mac_icon.svg';
import PropTypes from 'prop-types';

export default function ViewPlatformPopOver({ data, handleInteraction }) {
  return (
    <Popover
      theme="light"
      placementSide="bottom"
      arrowWidth={0}
      size="md"
      content={
        // eslint-disable-next-line tailwindcss/no-arbitrary-value
        <div className="divide-base-200 flex max-h-[30rem] w-80 flex-col divide-y overflow-auto px-5">
          <div className="flex flex-col py-1 first:pt-0 last:pb-0">
            <div className="flex items-center gap-1 pb-0.5">
              <img className="h-5 w-5" src={ChromeIcon} alt="chrome icon" />
              <p className="mr-3 truncate text-sm">{`Chrome ${data.chrome.version}`}</p>
              <img className="h-5 w-5" src={MacIcon} alt="chrome icon" />
              <p className="truncate text-sm">{data.mac}</p>
            </div>
          </div>
        </div>
      }
    >
      <div>
        <Button
          colors="white"
          iconPlacement="end"
          icon={<MdOutlineExpandMore className="text-xl" />}
          onClick={() => handleInteraction({ interaction: 'viewed_metadata' })}
          type="submit"
          variant="minimal"
          wrapperClassName="font-medium text-sm text-base-700"
        >
          Platforms
        </Button>
      </div>
    </Popover>
  );
}

ViewPlatformPopOver.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInteraction: PropTypes.func.isRequired
};
