import React from 'react';
import { MdOutlineAdd } from '@browserstack/bifrost';
import { O11yButton } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

export default function Initiator({
  illustration,
  title,
  desc,
  btnText,
  onClick
}) {
  return (
    <div className="m-auto flex max-w-lg flex-col items-center justify-center">
      <img src={illustration} alt="" className="h-28 w-28" />
      <p className="mt-2 text-sm font-medium leading-5">{title}</p>
      <p className="text-base-500 mt-1 text-center text-sm font-normal leading-5">
        {desc}
      </p>
      <div className="mt-6">
        <O11yButton
          icon={<MdOutlineAdd className="text-lg" />}
          onClick={onClick}
        >
          {btnText}
        </O11yButton>
      </div>
    </div>
  );
}

Initiator.propTypes = {
  illustration: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
