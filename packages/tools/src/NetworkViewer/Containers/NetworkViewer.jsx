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
  responseHelpLink
}) => {
  const parentContainerRef = useRef(null);
  const parentContainerSize = useResizeObserver(parentContainerRef);

  return (
    <section
      className={twClassNames(
        'px-4 max-h-full flex flex-col',
        containerClassName
      )}
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
        />
      </NetworkProvider>
    </section>
  );
};

NetworkViewer.propTypes = {
  containerClassName: PropTypes.string,
  isResponseCaptured: PropTypes.bool,
  isResponseNotCapturedDueToCaps: PropTypes.bool,
  logsURL: PropTypes.string,
  showWaterfall: PropTypes.bool,
  fetchOptions: PropTypes.object,
  responseHelpLink: PropTypes.string
};

NetworkViewer.defaultProps = {
  containerClassName: null,
  isResponseCaptured: true,
  logsURL: '',
  isResponseNotCapturedDueToCaps: false,
  showWaterfall: false,
  fetchOptions: {},
  responseHelpLink: ''
};

export default React.memo(NetworkViewer);
