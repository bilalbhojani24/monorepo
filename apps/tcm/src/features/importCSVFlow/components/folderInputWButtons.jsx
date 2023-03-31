import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { TMTooltip, TMTooltipBody } from 'common/bifrostProxy';
import { bool, func, node, string } from 'prop-types';

import useTextTransformer from './useTextTransformer';

const FolderInputWButton = ({
  label,
  text,
  icon,
  firstCta,
  secondCta,
  description,
  firstBtnDisabled,
  secondBtnDisabled,
  firstCtaClick,
  secondCtaClick,
  descriptionIcon
}) => {
  const { textRef } = useTextTransformer({ text });

  return (
    <div className="my-5">
      <div className="text-base-500 mb-2 text-sm font-medium">{label}</div>
      <div className="border-base-100 flex items-center justify-between rounded-md border-2 p-2">
        <span className="flex overflow-auto whitespace-nowrap">
          <span>{icon}</span>
          <div
            ref={textRef}
            className="text-base-900 ml-2 overflow-hidden text-sm"
          >
            {text}
          </div>
        </span>
        <span className="text-brand-500 flex text-sm font-medium">
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
      <div
        className={twClassNames(
          'text-base-500 mt-1 flex items-center text-sm font-normal',
          {
            'text-base-700': descriptionIcon
          }
        )}
      >
        {descriptionIcon}
        {description}
      </div>
    </div>
  );
};

FolderInputWButton.propTypes = {
  label: string,
  text: string,
  icon: node,
  firstCta: string,
  secondCta: string,
  firstBtnDisabled: bool,
  secondBtnDisabled: bool,
  firstCtaClick: func,
  secondCtaClick: func,
  description: string,
  descriptionIcon: node
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
  secondCtaClick: () => {},
  description: '',
  descriptionIcon: null
};

export default FolderInputWButton;
