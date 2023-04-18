import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Hyperlink,
  MdDescription,
  MdOutlineCopyAll,
  MdOutlineError
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { HELP_LINKS, UI_MESSAGES } from '../../constants';

// displaying only 1500 characters on UI
const responseCharLimit = 1500;
const Response = ({
  data,
  isResponseCaptured,
  isResponseNotCapturedDueToCaps,
  id
}) => {
  const [copiedTooltipVisibleLocation, setCopiedTooltipVisibleLocation] =
    useState(null);
  const onCopyCallback = (location) => {
    setCopiedTooltipVisibleLocation(location);
    setTimeout(() => {
      setCopiedTooltipVisibleLocation(null);
    }, 3000);
  };
  const content = data?.body || null;
  const docsURLForNoResponse = isResponseNotCapturedDueToCaps
    ? HELP_LINKS.noResponse.automate
    : null;

  const handleDocsLinkClick = () => {
    const eventType = window.EDS.automateWebEvent;
    const name = 'AtmHARViewerDocsLinkClicked';
    const eventData = {
      team: 'automate',
      product: 'automate',
      link: docsURLForNoResponse
    };
    window.WebEventTracker?.logEvent?.([], eventType, name, eventData);
  };

  let responseNote = UI_MESSAGES.common.not_captured;
  if (docsURLForNoResponse) {
    responseNote = UI_MESSAGES.common.not_available;
  }

  // let appAutomateDocsLink = HELP_LINKS.viewDocumentation.app_automate.appium;
  // if (appAutomateFramework != '') {
  //   appAutomateDocsLink =
  //     HELP_LINKS.viewDocumentation.app_automate[appAutomateFramework];
  // }

  // let responseSubTitle = '';
  // if (product === 'app_automate') {
  //   responseSubTitle = '';
  // } else if (docsURLForNoResponse) {
  //   responseSubTitle = UI_MESSAGES.automate.limited_configuration;
  // } else {
  //   responseSubTitle = UI_MESSAGES.automate.not_captured_android;
  // }

  // if (!content && !isResponseCaptured) {
  //   return (
  //     <div className="response-content__no-data" id={id}>
  //       <div className="response-content__no-data--error-icon">
  //         <MdOutlineError />
  //       </div>
  //       <div className="response-content__no-data--title">{responseNote}</div>
  //       <div className="response-content__no-data--sub-title">
  //         {responseSubTitle}
  //       </div>
  //       {(product === 'app_automate' && (
  //         <div className="response-content__no-data--link">
  //           <Hyperlink
  //             href={appAutomateDocsLink}
  //             modifier="primary"
  //             icon={<MdDescription />}
  //             target="_blank"
  //           >
  //             Learn more
  //           </Hyperlink>
  //         </div>
  //       )) ||
  //         (!!docsURLForNoResponse && (
  //           <div className="response-content__no-data--link">
  //             <Hyperlink
  //               href={docsURLForNoResponse}
  //               modifier="primary"
  //               onClick={handleDocsLinkClick}
  //               target="_blank"
  //             >
  //               Learn more
  //             </Hyperlink>
  //           </div>
  //         ))}
  //     </div>
  //   );
  // }

  if (!content) {
    return (
      <div className="response-content__no-data" id={id}>
        <div className="response-content__no-data--icon">
          <svg>
            <use xlinkHref="#no-response-data" />
          </svg>
        </div>
        <div className="response-content__no-data--title">
          No response data available for this request
        </div>
      </div>
    );
  }

  return (
    <div className="response-content" id={id}>
      <pre className="response-content__pre">
        <div className="response-content__copy-pre">
          {/* <Tooltip
            description="Copied"
            type="dark"
            direction="left"
            isOpen={copiedTooltipVisibleLocation === 'pre'}
            clickable
          > */}
          <CopyToClipboard onCopy={() => onCopyCallback('pre')} text={content}>
            <MdOutlineCopyAll />
          </CopyToClipboard>
          {/* </Tooltip> */}
        </div>
        {content.substr(0, responseCharLimit)}
      </pre>
      {content.length > responseCharLimit && (
        <p className="response-content__message">
          Large responses have been truncated.
          {/* <Tooltip
            description={
              <span className="response-content__tooltip-text">Copied</span>
            }
            type="dark"
            isOpen={copiedTooltipVisibleLocation === 'p'}
            clickable
          > */}
          <CopyToClipboard onCopy={() => onCopyCallback('p')} text={content}>
            <span className="response-content__copy-handler">
              &nbsp;Copy&nbsp;
            </span>
          </CopyToClipboard>
          {/* </Tooltip> */}
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
  id: PropTypes.string
};

Response.defaultProps = {
  data: null,
  id: 'base-tabs-panel'
};

export default Response;
