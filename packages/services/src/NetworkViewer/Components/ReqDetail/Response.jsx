import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Button,
  Hyperlink,
  MdOutlineCopyAll,
  MdOutlineMobiledataOff,
  MdOutlineOpenInNew,
  Tooltip,
  TooltipBody
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { UI_MESSAGES } from '../../constants';
import { NL_EVENTS } from '../../nlEvents';

// displaying only 1500 characters on UI
const responseCharLimit = 1500;
const Response = ({
  data,
  isResponseCaptured,
  isResponseNotCapturedDueToCaps,
  responseHelpLink
}) => {
  const [copiedTooltipVisibleLocation, setCopiedTooltipVisibleLocation] =
    useState(null);
  const onCopyCallback = (location) => {
    setCopiedTooltipVisibleLocation(location);
    setTimeout(() => {
      setCopiedTooltipVisibleLocation(null);
    }, 1500);
  };
  const content = data?.body || null;

  const handleDocsLinkClick = () => {
    window.pubSub.publish(NL_EVENTS.NL_PUBSUB_EVENT_NAME, {
      event: NL_EVENTS.RESPONSE_DOC_LINK_CLICKED,
      data: {
        link: responseHelpLink
      }
    });
  };

  const renderNoResponse = ({
    title = UI_MESSAGES.not_available,
    subtitle = ''
  }) => (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <MdOutlineMobiledataOff className="text-base-600 mb-7 text-2xl" />
      <p className="text-base-600 text-base font-semibold leading-6">{title}</p>
      {!!subtitle && <p className="text-base-500 mt-2 text-sm">{subtitle}</p>}
      {!!responseHelpLink && (
        <Hyperlink
          href={responseHelpLink}
          modifier="primary"
          onClick={handleDocsLinkClick}
          target="_blank"
          wrapperClassName="text-sm mt-4 flex items-center gap-2"
        >
          Learn more <MdOutlineOpenInNew />
        </Hyperlink>
      )}
    </div>
  );

  if (!content && !isResponseCaptured) {
    return renderNoResponse({
      title: UI_MESSAGES.not_captured,
      subtitle: isResponseNotCapturedDueToCaps
        ? UI_MESSAGES.not_captured_due_to_caps
        : ''
    });
  }

  if (!content) {
    return renderNoResponse({});
  }

  return (
    <div className="text-base-700 relative mt-2 text-sm">
      <pre className="bg-base-50 border-base-300 overflow-auto rounded border py-3 px-4">
        <div className="bg-base-50 absolute right-2 top-2">
          <Tooltip
            content={
              <TooltipBody wrapperClassName="text-sm px-2">Copied</TooltipBody>
            }
            theme="dark"
            show={copiedTooltipVisibleLocation === 'pre'}
            placementSide="top"
            wrapperClassName="p-2"
          >
            <CopyToClipboard
              onCopy={() => onCopyCallback('pre')}
              text={content}
            >
              <Button
                icon={<MdOutlineCopyAll className="cursor-pointer text-lg" />}
                isIconOnlyButton
                variant="primary"
                colors="white"
              />
            </CopyToClipboard>
          </Tooltip>
        </div>
        {content.substr(0, responseCharLimit)}
      </pre>
      {content.length > responseCharLimit && (
        <p className="mt-2">
          Large responses have been truncated.
          <Tooltip
            content={
              <TooltipBody wrapperClassName="text-sm px-2">Copied</TooltipBody>
            }
            theme="dark"
            show={copiedTooltipVisibleLocation === 'p'}
            placementSide="top"
            wrapperClassName="p-2"
          >
            <CopyToClipboard onCopy={() => onCopyCallback('p')} text={content}>
              <span className="text-brand-600 hover:text-brand-800 cursor-pointer">
                &nbsp;Copy&nbsp;
              </span>
            </CopyToClipboard>
          </Tooltip>
          to view the entire response.
        </p>
      )}
    </div>
  );
};

Response.propTypes = {
  data: PropTypes.object,
  isResponseCaptured: PropTypes.bool.isRequired,
  isResponseNotCapturedDueToCaps: PropTypes.bool.isRequired,
  responseHelpLink: PropTypes.string.isRequired
};

Response.defaultProps = {
  data: null
};

export default Response;
