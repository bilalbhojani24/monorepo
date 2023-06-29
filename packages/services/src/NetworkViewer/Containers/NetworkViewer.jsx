import React, { useRef } from 'react';
import { useResizeObserver } from '@browserstack/hooks';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import NetworkProvider from '../state/NetworkProvider';

import MainContainer from './MainContainer';

const NetworkViewer = ({
  logsURL,
  fetchOptions,
  containerClassName,
  showWaterfall,
  isResponseCaptured,
  isResponseNotCapturedDueToCaps,
  responseHelpLink,
  filtersWrapperClassName,
  tableHeaderClassName,
  reqDetailsWrapperClassName,
  noLogsHelpLink
}) => {
  const parentContainerRef = useRef(null);
  const parentContainerSize = useResizeObserver(parentContainerRef);

  return (
    <section
      className={twClassNames('flex flex-col', containerClassName)}
      ref={parentContainerRef}
    >
      <NetworkProvider
        file={logsURL}
        fetchOptions={fetchOptions}
        containerWidth={
          parentContainerSize.inlineSize || parentContainerSize.width
        }
      >
        <MainContainer
          isResponseCaptured={isResponseCaptured}
          isResponseNotCapturedDueToCaps={isResponseNotCapturedDueToCaps}
          responseHelpLink={responseHelpLink}
          logsURL={logsURL}
          fetchOptions={fetchOptions}
          showWaterfall={showWaterfall}
          filtersWrapperClassName={filtersWrapperClassName}
          tableHeaderClassName={tableHeaderClassName}
          reqDetailsWrapperClassName={reqDetailsWrapperClassName}
          noLogsHelpLink={noLogsHelpLink}
        />
      </NetworkProvider>
    </section>
  );
};

NetworkViewer.propTypes = {
  /**
   * NetworkViewer container class name
   */
  containerClassName: PropTypes.string,
  /**
   * Boolean to define if product is not capturing response, used to show no response captured screen
   */
  isResponseCaptured: PropTypes.bool,
  /** Boolean to define if product was unable to capture response due to capabilities, used to show no response captured screen with relevant message */
  isResponseNotCapturedDueToCaps: PropTypes.bool,
  /** Url api call will be made to fetch network logs in HAR format */
  logsURL: PropTypes.string,
  /** Url api call will be made to fetch network logs in HAR format */
  showWaterfall: PropTypes.bool,
  /** Config object[axios configuration] to pass to API call, useful in case like sending call cross-domain with cookies and thus setting withCredentials: true in axios */
  fetchOptions: PropTypes.objectOf(PropTypes.any),
  /** A help link/doc link to show on no-response screen, to help user learn more why response is not being shown */
  responseHelpLink: PropTypes.string,
  /** Classes name string for network logs filters container */
  filtersWrapperClassName: PropTypes.string,
  /** name string for network logs table header */
  tableHeaderClassName: PropTypes.string,
  /** name string for network logs table header */
  reqDetailsWrapperClassName: PropTypes.string,
  /** A help/doc link to be shown when no network logs are available */
  noLogsHelpLink: PropTypes.string
};

NetworkViewer.defaultProps = {
  containerClassName: null,
  isResponseCaptured: true,
  logsURL: '',
  isResponseNotCapturedDueToCaps: false,
  showWaterfall: false,
  fetchOptions: {},
  responseHelpLink: '',
  filtersWrapperClassName: '',
  tableHeaderClassName: '',
  reqDetailsWrapperClassName: '',
  noLogsHelpLink: ''
};

export default React.memo(NetworkViewer);
