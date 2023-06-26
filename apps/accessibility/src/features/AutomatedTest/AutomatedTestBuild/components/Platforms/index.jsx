import React from 'react';
import { Button, MdOutlineExpandMore, Popover } from '@browserstack/bifrost';
import PropTypes from 'prop-types';
import { getBrowserIcon, getOSIcon } from 'utils/helper';

export default function ViewPlatformPopOver({ data, handleInteraction }) {
  const { browser, os } = data;
  return (
    <Popover
      theme="light"
      placementSide="bottom"
      arrowWidth={0}
      size="lg"
      content={browser?.map((val, index) => (
        <div
          key={val.name + val.version}
          className="divide-base-200 text-base-900 flex flex-col divide-y overflow-auto px-5 font-normal"
        >
          <div className="flex flex-col py-1 first:pt-0 last:pb-0">
            <div className="border-base-200 flex items-center gap-1 border-b py-3">
              <img
                className="h-5 w-5"
                src={getBrowserIcon(val.logo)}
                alt="browser icon"
              />
              <p className="mr-3 truncate text-sm">{`${val.name} ${val.version}`}</p>
              <img
                className="h-5 w-5"
                src={getOSIcon(os[index].logo)}
                alt="chrome icon"
              />
              <p className="text-sm">{os[index].name}</p>
            </div>
          </div>
        </div>
      ))}
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
