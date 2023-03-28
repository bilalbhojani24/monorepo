import React from 'react';
import { TMTooltip, TMTooltipBody } from 'common/bifrostProxy';
import { bool, func, node, string } from 'prop-types';

const FolderInputWButton = ({
  label,
  text,
  icon,
  firstCta,
  secondCta,
  firstBtnDisabled,
  secondBtnDisabled,
  firstCtaClick,
  secondCtaClick
}) => (
  <div className="my-5">
    <div className="text-base-500 mb-2 text-sm font-medium">{label}</div>
    <div className="border-base-100 flex items-center justify-between rounded-md border-2 p-2">
      <span className="flex">
        <span>{icon}</span>
        <span className="text-base-900 ml-2 text-sm">{text}</span>
      </span>
      <span className="text-brand-500 text-sm font-medium">
        <button
          type="button"
          className="disabled:text-brand-300 cursor-pointer disabled:cursor-not-allowed "
          onClick={firstCtaClick}
          disabled={firstBtnDisabled}
        >
          {firstCta}
        </button>
        <span className="text-base-300 mx-2"> | </span>
        {secondBtnDisabled ? (
          <TMTooltip
            size="xs"
            placementAlign="center"
            placementSide="top"
            theme="dark"
            content={
              <>
                <TMTooltipBody>
                  <p className="text-sm">
                    <div>Upload to Root Location is</div>
                    <div>already selected as the folder</div>
                    <div>location.</div>
                  </p>
                </TMTooltipBody>
              </>
            }
          >
            <button
              type="button"
              className="disabled:text-brand-300 cursor-pointer disabled:cursor-not-allowed "
              onClick={secondCtaClick}
              disabled={secondBtnDisabled}
            >
              {secondCta}
            </button>
          </TMTooltip>
        ) : (
          <button
            type="button"
            className="cursor-pointer"
            onClick={secondCtaClick}
            disabled={secondBtnDisabled}
          >
            {secondCta}
          </button>
        )}
      </span>
    </div>
    <div className="text-base-500 mt-1 text-sm font-normal">
      Update your folder location where you want to import the test cases
    </div>
  </div>
);

FolderInputWButton.propTypes = {
  label: string,
  text: string,
  icon: node,
  firstCta: string,
  secondCta: string,
  firstBtnDisabled: bool,
  secondBtnDisabled: bool,
  firstCtaClick: func,
  secondCtaClick: func
};

FolderInputWButton.defaultProps = {
  label: '',
  text: '',
  icon: null,
  firstCta: '',
  secondCta: '',
  firstBtnDisabled: false,
  secondBtnDisabled: false,
  firstCtaClick: () => {},
  secondCtaClick: () => {}
};

export default FolderInputWButton;
